#!/usr/bin/env python3
"""Buscar y descargar obras de Wikimedia Commons.

  python3 herramientas/commons.py buscar "Nighthawks Hopper"
  python3 herramientas/commons.py info "File:Nighthawks by Edward Hopper 1942.jpg"
  python3 herramientas/commons.py bajar "File:Nighthawks by Edward Hopper 1942.jpg" destino.jpg [--ancho=1920]

Wikimedia limita las descargas: solo sirve miniaturas en anchos estándar (960, 1280, 1920...)
y responde 429 si se pide rápido. Por eso cada pedido reintenta con espera.
"""
import json, sys, time, urllib.parse, urllib.request

UA = "DanoArteVideoBot/0.1 (https://github.com/danotom/videosinstagram)"
API = "https://commons.wikimedia.org/w/api.php"
ANCHOS = [3840, 2560, 1920, 1280, 960]


def pedir(url, binario=False, intentos=6):
    for i in range(intentos):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
                data = r.read()
                return data if binario else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and i < intentos - 1:
                time.sleep(5 * (i + 1))
                continue
            raise
        except json.JSONDecodeError:  # a veces devuelve HTML de "demasiados pedidos"
            time.sleep(2 * (i + 1))
    raise RuntimeError("Wikimedia no respondió: " + url)


def api(**params):
    return pedir(API + "?" + urllib.parse.urlencode({"format": "json", **params}))


def buscar(q, n=8):
    r = api(action="query", list="search", srnamespace=6, srlimit=n, srsearch=q)
    return [x["title"] for x in r["query"]["search"]]


def info(titulo):
    r = api(action="query", titles=titulo, prop="imageinfo", iiprop="url|size|extmetadata")
    p = next(iter(r["query"]["pages"].values()))
    ii = p["imageinfo"][0]
    meta = {k: v.get("value") for k, v in ii.get("extmetadata", {}).items()
            if k in ("LicenseShortName", "Artist", "DateTimeOriginal", "Credit")}
    return {"titulo": titulo, "url": ii["url"].split("?")[0], "ancho": ii["width"], "alto": ii["height"], **meta}


def bajar(titulo, destino, ancho=None):
    i = info(titulo)
    time.sleep(2)  # upload.wikimedia.org corta con 429 si el pedido llega pegado al de la API
    # Las miniaturas se piden por upload.wikimedia.org/.../thumb/<ruta>/<ancho>px-<nombre>
    ruta = i["url"].split("?")[0].split("/wikipedia/commons/")[1]
    nombre = ruta.rsplit("/", 1)[1]
    candidatos = [a for a in ANCHOS if a < i["ancho"] and (ancho is None or a <= ancho)]
    for a in candidatos:
        url = f"https://upload.wikimedia.org/wikipedia/commons/thumb/{ruta}/{a}px-{nombre}"
        if nombre.lower().endswith((".tif", ".tiff")):
            url += ".jpg"
        try:
            data = pedir(url, binario=True, intentos=3)
            open(destino, "wb").write(data)
            return {**i, "bajado": a}
        except urllib.error.HTTPError:
            continue
    data = pedir(i["url"], binario=True)  # original, si es chico
    open(destino, "wb").write(data)
    return {**i, "bajado": i["ancho"]}


if __name__ == "__main__":
    cmd, *rest = sys.argv[1:]
    opts = {a.split("=")[0][2:]: a.split("=")[1] for a in rest if a.startswith("--")}
    rest = [a for a in rest if not a.startswith("--")]
    if cmd == "buscar":
        print("\n".join(buscar(rest[0])))
    elif cmd == "info":
        print(json.dumps(info(rest[0]), ensure_ascii=False, indent=1))
    elif cmd == "bajar":
        print(json.dumps(bajar(rest[0], rest[1], int(opts["ancho"]) if "ancho" in opts else None), ensure_ascii=False, indent=1))
