#!/usr/bin/env python3
"""Compara el guion con la voz transcrita (la que alimenta los subtítulos) y marca toda diferencia.

  python3 herramientas/cotejar.py videos/03-narciso/guion.md videos/03-narciso/audio/voz-editada.json

Toma del guion el primer bloque de citas (las líneas que empiezan con ">") de la primera sección "## Guion".
Encuentra palabras que faltan, que sobran (por ejemplo, una palabra duplicada al empalmar dos grabaciones, como el
"Bruegel Bruegel" del 02) y que la transcripción escuchó mal ("se intimidó" por "se inclinó", en el 03).
Sale con código 1 si hay diferencias, para usarlo antes del render.
"""
import difflib, json, re, sys

guion, voz = sys.argv[1], sys.argv[2]
norm = lambda s: re.sub(r"[¿?¡!.,;:«»\"“”…()*_]", "", s.lower()).strip()

lineas, dentro, empezo = [], False, False
for l in open(guion, encoding="utf-8"):
    if l.startswith("## Guion"):
        dentro = True
        continue
    if dentro and l.startswith("#"):
        if empezo:
            break
        continue
    if dentro and l.startswith(">"):
        empezo = True
        lineas.append(l[1:])
    elif dentro and empezo and l.strip():
        break
G = [w for w in (norm(x) for x in " ".join(lineas).replace("—", " ").split()) if w]
P = json.load(open(voz))["palabras"]
V = [norm(p["w"]) for p in P]
for k in range(len(V) - 1, 0, -1):  # "85 %" → "85%" (la transcripción a veces separa el signo)
    if V[k] == "%":
        V[k - 1] += "%"; V[k] = ""
P = [p for p, v in zip(P, V) if v]
V = [v for v in V if v]

dif = 0
for op, a0, a1, b0, b1 in difflib.SequenceMatcher(None, G, V, autojunk=False).get_opcodes():
    if op == "equal":
        continue
    dif += 1
    t = P[min(b0, len(P) - 1)]["s"]
    ctx = " ".join(G[max(0, a0 - 4):a0])
    que = {"replace": "cambia", "delete": "falta en la voz", "insert": "sobra en la voz"}[op]
    print(f"{t:7.2f} s  {que}: guion «{' '.join(G[a0:a1])}» · voz «{' '.join(V[b0:b1])}»   (…{ctx})")
print(f"{len(G)} palabras en el guion, {len(V)} en la voz, {dif} diferencias")
sys.exit(1 if dif else 0)
