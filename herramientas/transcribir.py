#!/usr/bin/env python3
"""Transcribe una voz con tiempos por palabra.
  python3 herramientas/transcribir.py audio.mp3 salida.json [--modelo=small]
Salida: {"segmentos": [{"s","e","texto"}], "palabras": [{"w","s","e"}]}
"""
import json, sys
from faster_whisper import WhisperModel

args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
m = WhisperModel(opts.get("modelo", "small"), device="cpu", compute_type="int8", cpu_threads=4)
segs, info = m.transcribe(args[0], language="es", word_timestamps=True, vad_filter=False,
                          initial_prompt=opts.get("prompt"))
segs = list(segs)
out = {
    "duracion": round(info.duration, 3),
    "segmentos": [{"s": round(s.start, 3), "e": round(s.end, 3), "texto": s.text.strip()} for s in segs],
    "palabras": [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)} for s in segs for w in s.words],
}
json.dump(out, open(args[1], "w"), ensure_ascii=False, indent=1)
for s in out["segmentos"]:
    print(f"[{s['s']:6.2f}-{s['e']:6.2f}] {s['texto']}")
