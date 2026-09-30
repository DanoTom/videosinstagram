#!/bin/bash
# Prepara el entorno de Claude Code en la web para producir videos:
# dependencias de Node (Playwright y fuentes), de Python (transcripción, imágenes) y ffmpeg.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Node: Playwright fijo en 1.56.1 porque usa el Chromium preinstalado en /opt/pw-browsers
npm install --no-audit --no-fund

# Python
pip install --quiet --root-user-action=ignore -r requirements.txt

# ffmpeg estático que trae imageio-ffmpeg (el de apt no está disponible en este entorno)
if ! command -v ffmpeg >/dev/null 2>&1; then
  ln -sf "$(python3 -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')" /usr/local/bin/ffmpeg
fi

# El modelo de transcripción (faster-whisper "medium") se baja solo la primera vez que se transcribe una voz.
