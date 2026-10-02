#!/usr/bin/env python3
"""Acorta una voz ya grabada: saca frases enteras, achica los silencios largos y, si hace falta, la acelera un poco.

  python3 herramientas/recortar.py voz.mp3 voz.json salida.wav salida.json \\
      --cortar="le sonrió, y el chico le sonrió" --cortar="pero saberlo no lo salvó" [--silencio=0.35] [--tempo=1.0]

- Cada --cortar es una frase tal como la dice la voz (sin mayúsculas ni signos, como W() del motor; "#2" para la segunda vez).
  Se corta en el punto más silencioso de cada borde, así no se come una sílaba.
- --silencio: los silencios más largos que esto (en segundos) se achican a ese largo, sacándoles el medio.
- --tempo: acelera sin cambiar el tono (ffmpeg atempo). Más de 1,06 empieza a notarse.
Los tiempos por palabra se recalculan, así que pausas.py, eco.py y W() siguen funcionando sobre la salida.
"""
import json, re, subprocess, sys
import numpy as np
import imageio_ffmpeg

args = [a for a in sys.argv[1:] if not a.startswith("--")]
cortes_txt = [a.split("=", 1)[1] for a in sys.argv[1:] if a.startswith("--cortar=")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and not a.startswith("--cortar="))
src, src_json, dst, dst_json = args
SIL, TEMPO = float(opts.get("silencio", 0.35)), float(opts.get("tempo", 1.0))
SR = 44100
ff = imageio_ffmpeg.get_ffmpeg_exe()
raw = subprocess.run([ff, "-loglevel", "error", "-i", src, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
audio = np.frombuffer(raw, np.float32)
d = json.load(open(src_json))
P = d["palabras"]
norm = lambda s: re.sub(r"[¿?¡!.,;:«»\"“”…]", "", s.lower()).strip()
N = [norm(p["w"]) for p in P]

# energía en ventanas de 10 ms (dB)
H = SR // 100
nv = len(audio) // H
rms = np.sqrt((audio[:nv * H].reshape(nv, H) ** 2).mean(1) + 1e-12)
db = 20 * np.log10(rms)

def punto_silencioso(a, b):
    """Un punto de corte entre a y b (segundos): el medio del silencio más largo, o el instante más bajo si no hay silencio."""
    i0, i1 = max(int(a * 100), 0), min(int(b * 100) + 1, nv)
    if i1 <= i0:
        return (a + b) / 2
    mejor, k = None, i0
    while k < i1:
        if db[k] < -45:
            m = k
            while m < i1 and db[m] < -45:
                m += 1
            if mejor is None or m - k > mejor[1] - mejor[0]:
                mejor = (k, m)
            k = m
        else:
            k += 1
    if mejor:
        return (mejor[0] + mejor[1]) / 200
    return (i0 + int(np.argmin(db[i0:i1]))) / 100 + 0.005

quitar = []  # (desde, hasta) en segundos del original
fuera = set()  # palabras de las frases cortadas
for c in cortes_txt:
    texto, n = (c.split("#") + ["1"])[:2]
    partes = [norm(x) for x in texto.split()]
    hits = [i for i in range(len(N) - len(partes) + 1) if N[i:i + len(partes)] == partes]
    if len(hits) < int(n):
        sys.exit(f"La voz no dice «{texto}» ({n})")
    i, j = hits[int(n) - 1], hits[int(n) - 1] + len(partes) - 1
    a = punto_silencioso(P[i - 1]["e"] - 0.05, P[i]["s"] + 0.08) if i > 0 else 0
    b = punto_silencioso(P[j]["e"] - 0.05, P[j + 1]["s"] + 0.08) if j + 1 < len(P) else len(audio) / SR
    quitar.append((a, b))
    fuera.update(range(i, j + 1))
    print(f"corto «{texto}»: {a:.2f}–{b:.2f} s ({b - a:.1f} s)")

# silencios largos: tramos de energía baja más largos que SIL; se saca el medio
quieto = db < -45
i = 0
while i < nv:
    if quieto[i]:
        k = i
        while k < nv and quieto[k]:
            k += 1
        largo = (k - i) / 100
        if largo > SIL:
            m = (i + k) / 200
            quitar.append((m - (largo - SIL) / 2, m + (largo - SIL) / 2))
        i = k
    else:
        i += 1

# unir tramos a quitar y armar los que quedan
quitar.sort()
unidos = []
for a, b in quitar:
    if unidos and a <= unidos[-1][1]:
        unidos[-1] = (unidos[-1][0], max(unidos[-1][1], b))
    else:
        unidos.append((a, b))
dur = len(audio) / SR
quedan, t = [], 0.0
for a, b in unidos:
    if a > t:
        quedan.append((t, a))
    t = max(t, b)
if t < dur:
    quedan.append((t, dur))

def nuevo(x):
    """Tiempo original → tiempo nuevo. Lo que cae en un tramo cortado va al punto del empalme."""
    acc = 0.0
    for a, b in quedan:
        if x < a:
            return acc / TEMPO
        if x <= b:
            return (acc + x - a) / TEMPO
        acc += b - a
    return acc / TEMPO

trozos = [audio[int(a * SR):int(b * SR)] for a, b in quedan]
# fundidos de 8 ms en cada empalme para que no haya clics
f = int(0.008 * SR)
for k, tr in enumerate(trozos):
    tr = tr.copy()
    if len(tr) > 2 * f:
        tr[:f] *= np.linspace(0, 1, f)
        tr[-f:] *= np.linspace(1, 0, f)
    trozos[k] = tr
salida = np.concatenate(trozos)
filtro = ["-af", f"atempo={TEMPO}"] if TEMPO != 1.0 else []
subprocess.run([ff, "-y", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", *filtro, dst],
               input=salida.astype(np.float32).tobytes(), check=True)

palabras = []
for k, p in enumerate(P):
    if k not in fuera:
        palabras.append({"w": p["w"], "s": round(nuevo(p["s"]), 3), "e": round(nuevo(p["e"]), 3)})
duracion = round(len(salida) / SR / TEMPO, 3)
out = {"duracion": duracion, "palabras": palabras, "segmentos": [],
       "recorte": {"origen": src, "cortes": cortes_txt, "silencio_max": SIL, "tempo": TEMPO}}
json.dump(out, open(dst_json, "w"), ensure_ascii=False, indent=1)
print(f"{dst}: {dur:.1f} s → {duracion:.1f} s ({len(P) - len(palabras)} palabras menos)")
