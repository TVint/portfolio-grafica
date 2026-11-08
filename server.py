#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NICOLA VIANELLO PORTFOLIO — ADMIN BACKEND SERVER (server.py)
Zero-dependency Python 3 HTTP + REST API Server for managing projects,
uploading high-res boards/images, writing projects-data.js, and pushing to GitHub.

Usage:
  python3 server.py [port]
Default port: 8080 -> http://localhost:8080/admin.html
"""

import base64
import datetime
import http.server
import json
import os
import re
import shutil
import socketserver
import subprocess
import sys
import urllib.parse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_JS_PATH = BASE_DIR / "projects-data.js"
DATA_JSON_PATH = BASE_DIR / "projects-db.json"
BACKUP_DIR = BASE_DIR / "backups"

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"}


def extract_initial_json_from_js():
    """
    If projects-db.json does not exist yet, parse PORTFOLIO_CATEGORIES and
    PORTFOLIO_DATA from projects-data.js using a lightweight JS-object-literal
    to JSON converter or node/python tokenizer.
    """
    if DATA_JSON_PATH.exists():
        try:
            with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[WARN] Could not read {DATA_JSON_PATH}: {e}")

    if not DATA_JS_PATH.exists():
        return {"categories": [], "projects": []}

    raw = DATA_JS_PATH.read_text(encoding="utf-8")

    # Strip block and line comments outside strings
    def strip_js_comments(text):
        pattern = r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|//[^\r\n]*|/\*[\s\S]*?\*/)'
        def replacer(match):
            s = match.group(0)
            if s.startswith('/'):
                return ''
            return s
        return re.sub(pattern, replacer, text)

    clean = strip_js_comments(raw)

    cat_match = re.search(
        r"window\.PORTFOLIO_CATEGORIES\s*=\s*(\[[\s\S]*?\])\s*;", clean
    )
    proj_match = re.search(
        r"window\.PORTFOLIO_DATA\s*=\s*(\[[\s\S]*?\])\s*;\s*$", clean.strip()
    )

    def js_obj_to_python(js_text):
        # Convert single-quoted JS strings to double-quoted JSON strings safely
        out = []
        i = 0
        n = len(js_text)
        while i < n:
            ch = js_text[i]
            if ch == "'":
                # parse single-quoted string
                i += 1
                buf = []
                while i < n and js_text[i] != "'":
                    if js_text[i] == "\\" and i + 1 < n:
                        nxt = js_text[i + 1]
                        if nxt == "'":
                            buf.append("'")
                        elif nxt == '"':
                            buf.append('\\"')
                        else:
                            buf.append("\\" + nxt)
                        i += 2
                        continue
                    if js_text[i] == '"':
                        buf.append('\\"')
                    else:
                        buf.append(js_text[i])
                    i += 1
                i += 1  # skip closing '
                out.append('"' + "".join(buf) + '"')
            elif ch == '"':
                # parse double-quoted string
                out.append(ch)
                i += 1
                while i < n and js_text[i] != '"':
                    if js_text[i] == "\\" and i + 1 < n:
                        out.append(js_text[i : i + 2])
                        i += 2
                        continue
                    out.append(js_text[i])
                    i += 1
                if i < n:
                    out.append(js_text[i])
                    i += 1
            else:
                out.append(ch)
                i += 1

        step1 = "".join(out)
        # Quote unquoted object keys: { key: or , key:
        step2 = re.sub(
            r'([\{\[,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:',
            r'\1"\2":',
            step1,
        )
        # Remove trailing commas before } or ]
        step3 = re.sub(r",\s*([\}\]])", r"\1", step2)
        return json.loads(step3)

    categories = []
    projects = []
    try:
        if cat_match:
            categories = js_obj_to_python(cat_match.group(1))
        if proj_match:
            projects = js_obj_to_python(proj_match.group(1))
    except Exception as e:
        print(f"[ERROR] Failed parsing projects-data.js: {e}")

    data = {"categories": categories, "projects": projects}
    if categories and projects:
        with open(DATA_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    return data


def write_data_to_disk(categories, projects):
    """
    Creates a timestamped backup of projects-data.js, writes projects-db.json,
    and regenerates projects-data.js so index.html works seamlessly everywhere.
    """
    BACKUP_DIR.mkdir(exist_ok=True)
    if DATA_JS_PATH.exists():
        ts = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        backup_file = BACKUP_DIR / f"projects-data.{ts}.bak.js"
        shutil.copy2(DATA_JS_PATH, backup_file)
        # Keep only the 15 most recent backups
        backups = sorted(BACKUP_DIR.glob("projects-data.*.bak.js"))
        for old_b in backups[:-15]:
            try:
                old_b.unlink()
            except OSError:
                pass

    # Normalize sequenceNum ("01", "02", ...)
    for idx, proj in enumerate(projects):
        proj["sequenceNum"] = f"{idx + 1:02d}"

    payload = {"categories": categories, "projects": projects}
    with open(DATA_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    js_header = (
        "/**\n"
        " * NICOLA VIANELLO — SELECTED WORKS & ARCHIVE MONOGRAPH (PORTFOLIO A + B)\n"
        f" * Auto-generated by Portfolio Admin CMS on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        f" * Total Curated Works: {len(projects)}\n"
        " */\n\n"
    )
    cat_json = json.dumps(categories, indent=2, ensure_ascii=False)
    proj_json = json.dumps(projects, indent=2, ensure_ascii=False)

    js_content = (
        f"{js_header}"
        f"window.PORTFOLIO_CATEGORIES = {cat_json};\n\n"
        f"window.PORTFOLIO_DATA = {proj_json};\n"
    )
    DATA_JS_PATH.write_text(js_content, encoding="utf-8")


def list_workspace_images():
    """Returns all image files in BASE_DIR with size and modification date."""
    images = []
    for entry in sorted(BASE_DIR.iterdir(), key=lambda p: p.name.lower()):
        if entry.is_file() and entry.suffix.lower() in IMAGE_EXTENSIONS:
            stat = entry.stat()
            images.append(
                {
                    "name": entry.name,
                    "size": stat.st_size,
                    "sizeKB": round(stat.st_size / 1024, 1),
                    "modified": datetime.datetime.fromtimestamp(stat.st_mtime).strftime(
                        "%Y-%m-%d %H:%M"
                    ),
                }
            )
    return images


def safe_filename(name):
    """Sanitize uploaded filename while keeping spaces/hyphens allowed like 'Portfolio C-01.jpg'."""
    name = os.path.basename(name)
    name = re.sub(r"[^a-zA-Z0-9._\-\s()]", "", name).strip()
    return name or f"upload-{int(datetime.datetime.now().timestamp())}.jpg"


class PortfolioAdminHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        # Allow CORS and prevent stale caching of projects-data.js during editing
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header(
            "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"
        )
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        if self.path.endswith(".js") or self.path.endswith(".json") or self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            self.send_json(
                {
                    "ok": True,
                    "mode": "server",
                    "workspace": str(BASE_DIR),
                    "timestamp": datetime.datetime.now().isoformat(),
                }
            )
            return

        if path == "/api/projects":
            data = extract_initial_json_from_js()
            data["images"] = list_workspace_images()
            self.send_json(data)
            return

        if path == "/api/images":
            self.send_json({"images": list_workspace_images()})
            return

        if path == "/admin":
            self.send_response(302)
            self.send_header("Location", "/admin.html")
            self.end_headers()
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # 1. Save full portfolio database (categories + projects)
        if path == "/api/projects":
            try:
                body = self.read_json_body()
                categories = body.get("categories")
                projects = body.get("projects")
                if not isinstance(categories, list) or not isinstance(projects, list):
                    self.send_json(
                        {"ok": False, "error": "Formato dati non valido."}, status=400
                    )
                    return

                write_data_to_disk(categories, projects)
                self.send_json(
                    {
                        "ok": True,
                        "message": f"Salvati {len(projects)} progetti in projects-data.js",
                        "count": len(projects),
                    }
                )
            except Exception as e:
                self.send_json({"ok": False, "error": str(e)}, status=500)
            return

        # 2. Upload image (Base64 JSON payload)
        if path == "/api/upload":
            try:
                body = self.read_json_body()
                filename = safe_filename(body.get("filename", ""))
                data_url = body.get("data", "")
                overwrite = bool(body.get("overwrite", True))

                if not filename or not data_url:
                    self.send_json(
                        {"ok": False, "error": "Nome file o dati mancanti."}, status=400
                    )
                    return

                if "," in data_url:
                    _, b64_data = data_url.split(",", 1)
                else:
                    b64_data = data_url

                binary = base64.b64decode(b64_data)
                target_path = BASE_DIR / filename

                if target_path.exists() and not overwrite:
                    stem = target_path.stem
                    suffix = target_path.suffix
                    counter = 1
                    while target_path.exists():
                        target_path = BASE_DIR / f"{stem}-{counter}{suffix}"
                        counter += 1

                with open(target_path, "wb") as f:
                    f.write(binary)

                self.send_json(
                    {
                        "ok": True,
                        "filename": target_path.name,
                        "sizeKB": round(len(binary) / 1024, 1),
                        "images": list_workspace_images(),
                    }
                )
            except Exception as e:
                self.send_json({"ok": False, "error": str(e)}, status=500)
            return

        # 3. Git Commit & Push to GitHub
        if path == "/api/git-sync":
            try:
                body = self.read_json_body()
                commit_msg = body.get(
                    "message",
                    f"CMS Update: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}",
                )

                def run_git(args):
                    return subprocess.run(
                        ["git"] + args,
                        cwd=str(BASE_DIR),
                        capture_output=True,
                        text=True,
                        timeout=60,
                    )

                add_res = run_git(["add", "."])
                status_res = run_git(["status", "--porcelain"])

                if not status_res.stdout.strip():
                    self.send_json(
                        {
                            "ok": True,
                            "message": "Nessuna nuova modifica da inviare: il repository GitHub è già aggiornato.",
                        }
                    )
                    return

                commit_res = run_git(["commit", "-m", commit_msg])
                if commit_res.returncode != 0:
                    self.send_json(
                        {
                            "ok": False,
                            "error": f"Errore git commit: {commit_res.stderr or commit_res.stdout}",
                        },
                        status=500,
                    )
                    return

                push_res = run_git(["push", "origin", "main"])
                if push_res.returncode != 0:
                    self.send_json(
                        {
                            "ok": False,
                            "error": f"Commit locale eseguito, ma push fallito: {push_res.stderr}",
                        },
                        status=500,
                    )
                    return

                self.send_json(
                    {
                        "ok": True,
                        "message": "Modifiche salvate e pubblicate con successo su GitHub (main)!",
                        "details": commit_res.stdout.strip(),
                    }
                )
            except Exception as e:
                self.send_json({"ok": False, "error": str(e)}, status=500)
            return

        self.send_json({"ok": False, "error": "Endpoint non trovato"}, status=404)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/images/"):
            raw_name = urllib.parse.unquote(path[len("/api/images/") :])
            filename = safe_filename(raw_name)
            target = BASE_DIR / filename
            if target.exists() and target.is_file() and target.suffix.lower() in IMAGE_EXTENSIONS:
                try:
                    target.unlink()
                    self.send_json(
                        {
                            "ok": True,
                            "deleted": filename,
                            "images": list_workspace_images(),
                        }
                    )
                except Exception as e:
                    self.send_json({"ok": False, "error": str(e)}, status=500)
            else:
                self.send_json(
                    {"ok": False, "error": "Immagine non trovata"}, status=404
                )
            return

        self.send_json({"ok": False, "error": "Endpoint non trovato"}, status=404)


class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    # Ensure initial JSON cache is synced with projects-data.js
    extract_initial_json_from_js()

    server = ThreadedHTTPServer(("127.0.0.1", port), PortfolioAdminHandler)
    print("=" * 72)
    print("  NICOLA VIANELLO — PORTFOLIO ADMIN BACKEND & STUDIO CMS")
    print("=" * 72)
    print(f"  • Admin Studio CMS : http://localhost:{port}/admin.html")
    print(f"  • Public Portfolio : http://localhost:{port}/index.html")
    print(f"  • Print Edition    : http://localhost:{port}/portfolio-print.html")
    print(f"  • Workspace Dir    : {BASE_DIR}")
    print("=" * 72)
    print("  Premi CTRL+C per arrestare il server.\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Arresto del server in corso...")
        server.server_close()


if __name__ == "__main__":
    main()
