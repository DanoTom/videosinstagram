"""Recorte tipo tijera: polígono trazado a mano sobre la pintura + borde de papel blanco."""
from PIL import Image, ImageDraw, ImageFilter

def recortar(src, poly, dst, borde=16):
    im = Image.open(src).convert("RGB")
    xs, ys = [p[0] for p in poly], [p[1] for p in poly]
    pad = borde * 2
    box = (min(xs) - pad, min(ys) - pad, max(xs) + pad, max(ys) + pad)
    crop = im.crop(box)
    local = [(x - box[0], y - box[1]) for x, y in poly]
    mask = Image.new("L", crop.size, 0)
    ImageDraw.Draw(mask).polygon(local, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(0.8))
    papel = mask.filter(ImageFilter.MaxFilter(borde * 2 + 1)).filter(ImageFilter.GaussianBlur(0.6))
    out = Image.new("RGBA", crop.size, (0, 0, 0, 0))
    out.paste(Image.new("RGBA", crop.size, (246, 242, 233, 255)), mask=papel)
    out.paste(crop.convert("RGBA"), mask=mask)
    out.save(dst)
    print(dst, out.size)

# Automat (1927): la mujer, cortada a la altura del plato
MUJER = [(1392,692),(1430,688),(1465,698),(1490,725),(1500,760),(1510,800),(1532,828),(1540,855),(1528,880),
         (1512,888),(1535,915),(1565,935),(1592,968),(1606,1010),(1612,1060),(1612,1110),(1618,1165),
         (1195,1165),(1198,1120),(1210,1090),(1235,1060),(1262,1020),(1290,975),(1318,940),(1330,905),
         (1332,860),(1338,832),(1336,800),(1340,760),(1352,725),(1370,702)]
recortar("assets/automat.jpg", MUJER, "assets/automat-mujer.png")
