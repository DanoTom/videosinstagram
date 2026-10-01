#!/usr/bin/env python3
"""Agrega eco (copias que se repiten cada vez más débiles) a palabras puntuales de la voz.

  python3 herramientas/eco.py voz.wav voz.json salida.wav "a vos#2" "adiós#2" [--retardo=0.42] [--copias=3]

Cada frase se busca en los tiempos por palabra (como W() en el motor: sin mayúsculas ni signos; "#2" para la segunda vez).
Las copias se suman después de la frase, así que conviene dejar silencio detrás con pausas.py.
"""
import json, re, subprocess, sys
import numpy as np
import imageio_ffmpeg

args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
src, src_json, dst, frases = args[0], args[1], args[2], args[3:]
retardo, copias = float(opts.get("retardo", 0.42)), int(opts.get("copias", 3))
SR = 44100
ff = imageio_ffmpeg.get_ffmpeg_exe()
raw = subprocess.run([ff, "-loglevel", "error", "-i", src, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
audio = np.frombuffer(raw, np.float32).copy()
P = json.load(open(src_json))["palabras"]
norm = lambda s: re.sub(r"[¿?¡!.,;:«»\"“”…]", "", s.lower()).strip()
N = [norm(p["w"]) for p in P]

salida = audio.copy()
for f in frases:
    texto, n = (f.split("#") + ["1"])[:2]
    partes = [norm(x) for x in texto.split()]
    hits = [i for i in range(len(N) - len(partes) + 1) if N[i:i + len(partes)] == partes]
    i = hits[int(n) - 1]
    s, e = P[i]["s"] - 0.03, P[i + len(partes) - 1]["e"] + 0.12
    trozo = audio[int(s * SR):int(e * SR)]
    # cada copia llega más tarde, más baja y más opaca (un filtro de paso bajo simple, como la voz que rebota en la piedra)
    for k in range(1, copias + 1):
        c = trozo * (0.5 ** k)
        for _ in range(k):
            c = np.convolve(c, np.ones(5) / 5, mode="same")
        a = int((s + k * retardo) * SR)
        b = min(a + len(c), len(salida))
        salida[a:b] += c[:b - a]
    print(f"eco en «{texto}» ({n}): {s:.2f}–{e:.2f} s")

salida = np.clip(salida, -1, 1)
subprocess.run([ff, "-y", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", dst],
               input=salida.astype(np.float32).tobytes(), check=True)
print(dst)
