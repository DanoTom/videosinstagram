#!/usr/bin/env python3
"""Busca tramos de pantalla vacía o quieta en un video renderizado.

  python3 herramientas/quietud.py videos/03-narciso/out/video.mp4 [--vacia=2.5] [--quieta=4] [--ocupacion=0.18]

- Pantalla vacía: más de --vacia segundos seguidos en que casi todo el cuadro es fondo liso (menos de --ocupacion del
  cuadro tiene algo encima). Es lo que se notó en el 02: casi 10 s de "¿Por qué nadie ayuda?" sobre el verde, hasta que
  aparecían las personitas.
- Pantalla quieta: más de --quieta segundos sin que entre ni se mueva nada (el grano y el agua no cuentan).
Sale con código 1 si encuentra tramos vacíos.
"""
import subprocess, sys
import numpy as np
import imageio_ffmpeg

args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
VACIA, QUIETA, OCUP = float(opts.get("vacia", 2.5)), float(opts.get("quieta", 4)), float(opts.get("ocupacion", 0.18))
FPS, W, H = 4, 54, 96
ff = imageio_ffmpeg.get_ffmpeg_exe()
raw = subprocess.run([ff, "-loglevel", "error", "-i", args[0], "-vf", f"fps={FPS},scale={W}:{H}:flags=area",
                      "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3).astype(np.int16)
fr = fr[:, 5:-15]  # sin los bordes donde Instagram pone la interfaz

ocup, cambio = [], []
for k, f in enumerate(fr):
    q = (f // 24).reshape(-1, 3)
    vals, cuenta = np.unique(q, axis=0, return_counts=True)
    fondo = vals[cuenta.argmax()] * 24 + 12
    ocup.append(float((np.abs(f - fondo).sum(2) > 45).mean()))
    cambio.append(float(np.abs(f - fr[max(k - FPS, 0)]).mean()) if k else 99.0)

def tramos(cond, minimo):
    out, ini = [], None
    for k, c in enumerate(cond + [False]):
        if c and ini is None:
            ini = k
        elif not c and ini is not None:
            if (k - ini) / FPS >= minimo:
                out.append((ini / FPS, k / FPS))
            ini = None
    return out

vacios = tramos([o < OCUP for o in ocup], VACIA)
quietos = tramos([c < 2.0 for c in cambio], QUIETA)
for a, b in vacios:
    print(f"VACÍA   {a:6.1f}–{b:6.1f} s ({b - a:.1f} s): menos del {OCUP:.0%} del cuadro tiene algo")
for a, b in quietos:
    print(f"quieta  {a:6.1f}–{b:6.1f} s ({b - a:.1f} s): no entra ni se mueve nada")
print(f"{len(fr) / FPS:.1f} s revisados · {len(vacios)} tramos vacíos · {len(quietos)} quietos")
sys.exit(1 if vacios else 0)
