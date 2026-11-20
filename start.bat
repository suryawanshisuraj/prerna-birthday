@echo off
echo Starting Birthday Website...
start "" "http://127.0.0.1:3000"
python -m http.server 3000 --bind 127.0.0.1
pause
