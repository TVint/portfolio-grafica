#!/bin/zsh
cd "$(dirname "$0")"
PORT=8080

# Se la porta 8080 è già occupata dal nostro server, apri direttamente il browser
if lsof -i :$PORT >/dev/null 2>&1; then
  echo "Il server Admin è già attivo sulla porta $PORT."
  open "http://localhost:$PORT/admin.html"
  exit 0
fi

# Apri il browser dopo 1 secondo
(sleep 1 && open "http://localhost:$PORT/admin.html") &

# Avvia il backend Python
python3 server.py $PORT
