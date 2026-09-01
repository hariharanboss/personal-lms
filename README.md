# 📚 Personal LMS

**A self-hosted, single-password library for your study materials — no accounts, no database, no server to babysit.**

Personal LMS turns a Cloudflare Worker into a lightweight learning-management system: upload PDFs, images, Word docs, and code files, organize them into folders, and access everything from anywhere in the world with just one password. It runs entirely on Cloudflare's free edge network, so there's no VPS to maintain and no monthly hosting bill.

🔗 **Live demo:** [lms.vasudevhere0.workers.dev](https://lms.vasudevhere0.workers.dev/)

---

## ✨ Features

- 🔐 **Single-password access** — one shared password gets visitors in; no sign-up, no user accounts, no OAuth to configure.
- 🗂️ **Folder-based library** — organize files into subjects/folders and browse them in a clean sidebar.
- 📄 **In-browser previews** — view PDFs (`pdf.js`), Word documents (`mammoth.js`), and syntax-highlighted code (`highlight.js`) without downloading anything.
- 🔍 **Search & filter** — find files instantly by name, type, size, date, or tag.
- 🌙 **Light/dark theme** — toggle appearance to match your preference.
- 📤 **Admin upload panel** — a separate, stronger admin password unlocks drag-and-drop uploads and file management.
- 📶 **Offline-friendly** — a service worker (`sw.js`) caches assets so the app keeps working with a spotty connection.
- ☁️ **Edge-native storage** — file metadata lives in Cloudflare KV, replicated globally for fast reads no matter where a visitor connects from.
- 💸 **Runs on the free tier** — no dedicated server, no database service, and (for typical personal use) no hosting cost.

---

## 🏗️ Architecture & Tech Stack

Personal LMS has no traditional backend server or database — Cloudflare's edge platform plays both roles.

```
Browser  →  Cloudflare Worker  →  Cloudflare KV
 (UI)         (routing/logic)      (file metadata store)
```

1. The browser requests the site; the **Cloudflare Worker** (`worker.js`) handles routing, authentication, and API logic at the edge.
2. The Worker reads/writes file metadata (names, paths, tags) from **Cloudflare KV**, a globally-replicated key-value store.
3. The Worker returns the pre-built HTML/JS bundle, and the browser renders the library, previews files, and talks back to the Worker for search, filtering, and (for admins) uploads.
4. A **service worker** caches static assets client-side for offline resilience.

| Layer | Technology | Purpose |
|---|---|---|
| **Compute** | Cloudflare Workers | Serverless edge runtime — no server to provision or patch |
| **Storage** | Cloudflare KV | Key-value store for file metadata, globally distributed |
| **Frontend** | Vanilla JavaScript, HTML/CSS | No framework overhead; fast load times |
| **3D/Visual** | Three.js | Animated particle background |
| **Document rendering** | pdf.js | In-browser PDF viewing |
| **Document conversion** | Mammoth.js | Renders `.docx` files as readable HTML |
| **Code highlighting** | highlight.js | Syntax highlighting for previewed source files |
| **Tooling** | Wrangler CLI | Build, local dev server, and deployment to Cloudflare |
| **Build** | Node.js + `build.js` | Bundles `index.html`/`sw.js` into `html.js`/`sw-content.js` for the Worker |

### Project structure

| File | Purpose |
|---|---|
| `index.html` | Frontend markup, styling, and layout |
| `worker.js` | Core Worker logic — routing, auth, KV reads/writes |
| `sw.js` | Service worker for offline asset caching |
| `build.js` | Bundles `index.html` and `sw.js` into inlined JS the Worker can serve |
| `html.js`, `sw-content.js` | Generated bundles (output of `npm run build`) |
| `virtual-fs.default.js` | Default virtual folder structure / file index |
| `wrangler.toml` | Cloudflare Worker + KV binding configuration |
| `package.json` | npm scripts and project metadata |

---

## ✅ Requirements

Before installing, make sure you have:

- **Node.js** ≥ 18 ([nodejs.org](https://nodejs.org/)) — check with `node --version`
- **npm** (bundled with Node.js)
- **Wrangler CLI** — Cloudflare's deployment tool (installed below)
- A **free Cloudflare account** ([dash.cloudflare.com](https://dash.cloudflare.com/))
- **Git** (to clone the repository)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/hariharanboss/personal-lms.git
cd personal-lms
```

### 2. Install Wrangler

```bash
npm install -g wrangler
wrangler --version   # confirm install
```

### 3. Authenticate with Cloudflare

```bash
wrangler login
```

This opens a browser window — log in with your Cloudflare account and approve the request.

### 4. Create a KV namespace

This is where file metadata will be stored.

```bash
wrangler kv:namespace create "FILES_DB"
```

Wrangler prints an `id` and `preview_id` — copy both; you'll need them next.

### 5. Configure `wrangler.toml`

Open `wrangler.toml` and replace the placeholder values with the `id` and `preview_id` from the previous step:

```toml
[[kv_namespaces]]
binding = "FILES_DB"
id = "your-kv-namespace-id"
preview_id = "your-kv-namespace-preview-id"
```

### 6. Set your passwords

Two secrets are required — they're stored securely by Cloudflare and never appear in your code:

```bash
wrangler secret put APP_PASSWORD            # password visitors use to view the library
wrangler secret put MANAGE_LINKS_PASSWORD   # stronger password for admin/upload access
```

> Use a strong, unique password for `MANAGE_LINKS_PASSWORD` in particular, since it controls who can upload and manage content.

### 7. Build the project

Bundles `index.html` and `sw.js` into the Worker-servable `html.js` / `sw-content.js`:

```bash
npm run build
```

---

## 🚀 Usage

### Run locally

```bash
npm run dev
```

Visit `http://localhost:8787`, enter your `APP_PASSWORD`, and you're in.

### Deploy to production

```bash
npm run build     # or: npm run predeploy
wrangler deploy
```

Wrangler prints a live URL (e.g. `https://your-project.workers.dev/`) — that's your deployed library.

### Using the app

| UI element | What it does |
|---|---|
| Password screen | Enter `APP_PASSWORD` to access the library |
| Sidebar | Browse folders/subjects |
| Search box | Find files by name |
| Filters | Narrow results by type, size, date, or tag |
| File cards | Click to preview a file in a modal |
| Upload area | Drag & drop files (requires `MANAGE_LINKS_PASSWORD`) |
| Theme switcher | Toggle light/dark mode |
| Breadcrumb | Shows and navigates your current folder path |

### 🔑 Entering admin mode

Admin mode is hidden from the regular UI on purpose — there's no visible "Admin" button for casual visitors. You can unlock it in either of these ways:

**Option A — keyboard shortcut**
Press **`Ctrl + Shift + A`** anywhere on the site (after logging in with the visitor password). This reveals the admin/upload controls once you authenticate with `MANAGE_LINKS_PASSWORD`.

**Option B — direct URL**
Navigate straight to the admin route by appending `?admin#/` to your site's URL:

```
https://your-deployed-site.workers.dev/?admin#/
```

Either method drops you into the same admin-gated view — you'll still need to enter `MANAGE_LINKS_PASSWORD` to actually unlock uploads and management actions.

**Logging out of admin mode**
Open the menu icon in the top corner of the UI, then select **Admin Logout**. This ends the admin session and returns you to normal (visitor) browsing.

### Uploading files (admin)

Uploads are gated behind the **admin password** (`MANAGE_LINKS_PASSWORD`), kept separate from the visitor password so regular users can browse and download but can't add or change content.

1. Log in to the site with the visitor `APP_PASSWORD` as usual.
2. Enter admin mode using **`Ctrl + Shift + A`** or the **`?admin#/`** URL (see above), then enter `MANAGE_LINKS_PASSWORD` when prompted.
3. **Drag and drop** files onto the upload zone, or use the file picker if one is shown — the app is set up to handle `.docx` uploads out of the box (rendered in-browser via Mammoth.js), alongside the other previewable types (`.pdf`, images, code files) that already ship in the library.
4. Once uploaded, the Worker writes the file's metadata (name, path, tags) to the **Cloudflare KV** namespace (`FILES_DB`), so it's immediately available to every visitor worldwide — no redeploy needed.
5. New uploads appear in the sidebar/search results as soon as the KV write completes; use the search box or filters to confirm they're indexed correctly.
6. When you're done managing content, log out of admin mode via the menu icon → **Admin Logout**.

**Things to keep in mind:**
- Only share `MANAGE_LINKS_PASSWORD`, and the `Ctrl+Shift+A` / `?admin#/` access method, with people you trust to manage the library — it has full upload/management access.
- Because storage is KV-backed rather than a traditional file server, very large binaries or extremely high upload volume may hit Cloudflare's KV value-size and rate limits — fine for personal/study-material use, but worth knowing if you plan to host a large archive.
- If an upload doesn't appear, re-check that `MANAGE_LINKS_PASSWORD` was entered correctly and that your KV namespace ID in `wrangler.toml` matches the one created in Step 4 of setup.

### Command reference

| Command | Description |
|---|---|
| `npm run build` | Bundle source files for deployment |
| `npm run dev` | Start a local development server |
| `npm run deploy` | Build and deploy to Cloudflare |
| `wrangler login` | Authenticate the CLI with Cloudflare |
| `wrangler kv:namespace create "FILES_DB"` | Create the KV storage namespace |
| `wrangler secret put APP_PASSWORD` | Set/update the visitor password |
| `wrangler secret put MANAGE_LINKS_PASSWORD` | Set/update the admin password |

---

## 🔐 Security Notes

- Passwords are stored as **Cloudflare Worker secrets** — encrypted at rest and never committed to the codebase.
- Authentication is **session-based**; visitors log in once per browser session.
- File paths are URL-encoded to reduce path-traversal risk.
- Admin capabilities (uploads, file management) are gated behind a separate, stronger password from the general viewer password.
- Admin mode itself isn't exposed as a visible button in the UI — it's reached via the `Ctrl+Shift+A` shortcut or the `?admin#/` URL route, then still requires `MANAGE_LINKS_PASSWORD` to unlock. Treat both the shortcut/URL and the password as sensitive — knowing the entry point plus a weak password is what actually protects the library, so keep `MANAGE_LINKS_PASSWORD` strong.

---

## 🩺 Troubleshooting

| Problem | Fix |
|---|---|
| `node` not recognized | Reinstall Node.js from [nodejs.org](https://nodejs.org/) and restart your terminal |
| `wrangler` not recognized | Run `npm install -g wrangler` and restart your terminal |
| `git` not recognized | Install Git from [git-scm.com](https://git-scm.com/) |
| Build fails | Confirm you're in the project root (should contain `worker.js`, `index.html`, `wrangler.toml`) before running `npm run build` |
| Deployed site errors | Double-check the `id`/`preview_id` in `wrangler.toml` and confirm both secrets are set |
| Password not accepted | Re-run `wrangler secret put APP_PASSWORD`; note the terminal won't echo characters as you type |

---

## 🤝 Contributing

Contributions are welcome! To propose a change:

1. **Fork** the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, following the existing code style (vanilla JS, no build-step frameworks).
4. Test locally with `npm run dev` before submitting.
5. Commit with a clear message and push to your fork:
   ```bash
   git commit -m "Add: short description of the change"
   git push origin feature/your-feature-name
   ```
6. Open a **Pull Request** describing what you changed and why.

**Good areas to contribute:**
- Additional file preview formats
- Accessibility improvements
- UI/UX polish
- Bug fixes and performance improvements

Please open an issue first for larger changes so the approach can be discussed before you invest significant time.

---

## 📄 License

Released under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.

## 🙏 Acknowledgments

- [Cloudflare Workers](https://workers.cloudflare.com/) — serverless edge platform
- [Three.js](https://threejs.org/) — particle background animation
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) — DOCX-to-HTML conversion
- [pdf.js](https://mozilla.github.io/pdf.js/) — in-browser PDF rendering
- [highlight.js](https://highlightjs.org/) — code syntax highlighting

## 👤 Author

**Hari Haran**
- 🌐 GitHub: [github.com/hariharanboss](https://github.com/hariharanboss)
- 💼 Portfolio: [reachhari.vercel.app](https://reachhari.vercel.app)
- 💬 Telegram: [@haris_garage](https://t.me/haris_garage)
- 📧 Email: [reachthatguyhari@gmail.com](mailto:reachthatguyhari@gmail.com)

---

*Built with ❤️ on Cloudflare Workers.*
