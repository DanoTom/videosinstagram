#!/usr/bin/env python3
"""Agrega silencios en puntos de la voz (dentro de pausas existentes) y corre los tiempos de las palabras.

  python3 herramientas/pausas.py voz.mp3 voz.json salida.wav salida.json "vio?:0.6" "cuarto.:0.7" ... [--cola=2.5]

Cada pausa es "palabra:segundos" (la palabra tal cual la transcribió whisper, puntuación incluida; "palabra#2"
para la segunda aparición). El silencio se inserta en el medio del hueco entre esa palabra y la siguiente,
así nunca corta una sílaba.
"""
import json, subprocess, sys
import numpy as np
import imageio_ffmpeg

args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
src, src_json, dst, dst_json, pausas = args[0], args[1], args[2], args[3], args[4:]
SR = 44100
ff = imageio_ffmpeg.get_ffmpeg_exe()
raw = subprocess.run([ff, "-loglevel", "error", "-i", src, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
audio = np.frombuffer(raw, np.float32)
d = json.load(open(src_json))
P = d["palabras"]

cortes = []  # (tiempo de inserción, segundos)
for p in pausas:
    clave, seg = p.rsplit(":", 1)
    palabra, n = (clave.split("#") + ["1"])[:2]
    idx = [i for i, w in enumerate(P) if w["w"] == palabra][int(n) - 1]
    fin = P[idx]["e"]
    sig = P[idx + 1]["s"] if idx + 1 < len(P) else fin
    cortes.append(((fin + sig) / 2, float(seg)))
cortes.sort()

partes, prev = [], 0
for t, seg in cortes:
    k = int(t * SR)
    partes += [audio[prev:k], np.zeros(int(seg * SR), np.float32)]
    prev = k
partes += [audio[prev:], np.zeros(int(float(opts.get("cola", 0)) * SR), np.float32)]
salida = np.concatenate(partes)
subprocess.run([ff, "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", dst], input=salida.tobytes(), check=True)

def mover(t):
    return round(t + sum(seg for c, seg in cortes if c <= t), 3)

d["palabras"] = [{**w, "s": mover(w["s"]), "e": mover(w["e"])} for w in P]
d["segmentos"] = [{**s, "s": mover(s["s"]), "e": mover(s["e"])} for s in d["segmentos"]]
d["duracion"] = round(len(salida) / SR, 3)
d["pausas"] = [{"t": round(c, 3), "seg": s} for c, s in cortes]
json.dump(d, open(dst_json, "w"), ensure_ascii=False, indent=1)
print(f"{dst}: {d['duracion']} s ({len(cortes)} pausas)")
