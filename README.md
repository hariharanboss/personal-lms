# 🪐 Personal LMS

Self-hosted LMS for study materials — upload PDFs/images and access them anywhere with just one password, no user accounts needed. Runs on Cloudflare KV's globally-distributed edge storage for fast, worldwide access.

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)
[![Platform](https://img.shields.io/badge/Platform-Vanilla_JavaScript-blue?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🎯 About

Self-hosted LMS for study materials — upload PDFs/images and access them anywhere with just one password, no user accounts needed. Runs on Cloudflare KV's globally-distributed edge storage for fast, worldwide access.

---

## 🏷️ Topics / Tags

`lms` `self-hosted` `cloudflare-kv` `edge-storage` `file-storage` `single-password-auth` `study-tools` `no-login` `lightweight` `serverless`

---

## ✨ Features

- 🔐 **Single Password Access** — Simple authentication gate, no signups or user accounts required.
- 📂 **Virtual Filesystem** — Hierarchical folder browser with breadcrumbs, search, and filtering.
- 📄 **Rich Previews** — View PDFs, Word documents (`.docx`), code files, and images directly in the browser.
- ☁️ **Cloudflare KV Storage** — Edge-accelerated file storage and metadata index.
- 🌙 **Theme Switcher** — Built-in light and dark mode toggle.
- 📤 **File Upload** — Drag-and-drop file uploader for admin management.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Cloudflare Workers** | Serverless edge compute |
| **Cloudflare KV** | Key-value storage for file metadata and blobs |
| **Vanilla JavaScript** | Client-side application logic |
| **Three.js** | 3D particle background animation |
| **Mammoth.js** | DOCX → HTML conversion |
| **pdf.js** | PDF preview support |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (>= 18.0.0)
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account

### Step 1 — Clone and Install
```bash
git clone https://github.com/your-username/personal-lms.git
cd personal-lms
npm install
```

### Step 2 — Configure KV Namespace
Create your KV namespace in Cloudflare:
```bash
wrangler kv:namespace create "FILES_DB"
```
Copy the generated `id` and `preview_id` into `wrangler.toml`.

### Step 3 — Set Secrets
```bash
wrangler secret put APP_PASSWORD
wrangler secret put MANAGE_LINKS_PASSWORD
```

### Step 4 — Build and Run Locally
```bash
npm run build
npm run dev
```

### Step 5 — Deploy to Production
```bash
npm run deploy
```

---

## 📄 License

Licensed under the [MIT License](LICENSE).
