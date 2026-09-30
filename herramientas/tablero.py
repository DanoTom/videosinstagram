#!/usr/bin/env python3
"""Arma un tablero con capturas 1080x1920.
  python3 herramientas/tablero.py <carpeta_out> <salida.jpg> <cols> id1 id2 ... [--rotulos="1 · Gancho|2 · ..."] [--prefijo=ui-]
"""
import sys
from PIL import Image, ImageDraw, ImageFont

args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
carpeta, salida, cols, ids = args[0], args[1], int(args[2]), args[3:]
rotulos = opts.get("rotulos", "").split("|") if "rotulos" in opts else ids
prefijo = opts.get("prefijo", "")
W, H, pad, top = 360, 640, 20, 50
filas = (len(ids) + cols - 1) // cols
img = Image.new("RGB", (pad + cols * (W + pad), filas * (H + pad + top) + pad), (30, 30, 30))
d = ImageDraw.Draw(img)
f = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
for i, id_ in enumerate(ids):
    x, y = pad + (i % cols) * (W + pad), pad + (i // cols) * (H + pad + top)
    d.text((x, y + 10), rotulos[i], fill=(235, 235, 235), font=f)
    im = Image.open(f"{carpeta}/{prefijo}{id_}.png").convert("RGB").resize((W, H), Image.LANCZOS)
    img.paste(im, (x, y + top))
img.save(salida, quality=90)
print(salida, img.size)
