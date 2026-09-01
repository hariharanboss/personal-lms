# 🪐 Jupiter Lab Codes

A password-protected online library (called an "LMS") that lets you browse and download laboratory code files — like C++ programs — right from your browser. Think of it as a secure digital folder for school code.

**Made by:** Hariharan — [github.com/hariharanboss](https://github.com/hariharanboss)

---

## 🎯 What This Project Does

Once you set it up, you'll have your own website where:

- 🔐 Visitors type a password to get in (like a secret handshake)
- 📂 You can browse folders full of code files
- 📄 You can preview and download files (`.cpp`, `.pdf`, `.docx`, `.png`, and more)
- 🔍 You can search and filter files
- 🌙 You can switch between light and dark mode
- 📤 Admins can upload new files
- ☁️ It runs on Cloudflare's global network (super fast, everywhere)

---

## 📦 What's Inside This Folder

| File | What It Is |
|------|-----------|
| `index.html` | The website's design (colors, buttons, layout) |
| `worker.js` | The "brain" of the website — handles requests and logic |
| `sw.js` | A helper that caches files so the site works offline |
| `build.js` | A tool that packages everything together |
| `wrangler.toml` | Configuration file telling Cloudflare how to run your site |
| `package.json` | Lists what tools the project needs |
| `virtual-fs.default.js` | The default folder structure (your code files and where they link to) |
| `virtual-fs.index.json` | A saved copy of the folder structure |

---

## 🛠️ Tech Stack (What Technologies Are Used)

Don't worry if these terms are new — here's what each one means:

| Technology | What It Does |
|------------|-------------|
| **Cloudflare Workers** | Runs your website on Cloudflare's computers around the world — no need to buy your own server |
| **Cloudflare KV** | A simple key-value storage (like a giant folder) that saves your file metadata |
| **Vanilla JavaScript** | The programming language that makes the website interactive |
| **Three.js** | Creates a cool animated particle background |
| **Mammoth.js** | Converts `.docx` Word documents so you can read them in the browser |
| **highlight.js** | Adds color to C++ code so it's easy to read |
| **pdf.js** | Lets you view PDF files directly in the browser |

---

## 🚀 Live Demo

The site is currently running at:

🔗 **https://lms.vasudevhere0.workers.dev/**

---

## 📁 Subjects Available

| Subject | Files | What's Inside |
|---------|-------|---------------|
| **MATLAB** | 15 | Code examples for MATLAB |
| **MPMC** | 9 | 8085 & 8051 Microprocessor/Microcontroller assembly codes |
| **OOPS Lab** | 90+ | C++ Object-Oriented Programming across 6 sessions |
| **DS Model-SEM Lab** | 16 | Data Structures: AVL trees, BFS, BST, sorting, linked lists, stacks, queues |

---

## 🏗️ How the Website Works (Architecture)

Here's what happens when you visit the site:

```
Your Browser → Cloudflare Worker → Cloudflare KV Storage
   (You)         (The Brain)         (The Storage)
```

1. You open the website in your browser
2. Cloudflare receives your request and runs the worker code
3. The worker checks the KV storage for the file list
4. The website is sent to your browser with all the code links

---

## ⚙️ How to Set Up and Host This Project

This guide will walk you through everything, step by step. **Follow each step in order** — do not skip ahead.

---

### Step 1: Create a Free Cloudflare Account

What is Cloudflare? → It's a company that hosts websites for free. Think of it like a free web hosting service.

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **https://dash.cloudflare.com/**
3. Click **"Sign Up"** (top right corner)
4. Enter your email address and create a password
5. Check your email and click the verification link
6. Log in with your new account

---

### Step 2: Install Node.js (The Programming Tool)

What is Node.js? → It's a tool that lets your computer run the project's scripts. Think of it like installing Java or Adobe Reader, but for this website project.

1. Open your web browser
2. Go to: **https://nodejs.org/**
3. You'll see a big yellow button that says **"LTS"** — click it to download the installer
4. Run the downloaded file (it will be in your "Downloads" folder)
5. Keep clicking **"Next"** through the installer — just accept all the defaults
6. When it finishes, you're done!

**To check it worked:**
1. Press `Windows Key + R` on your keyboard
2. Type `cmd` and press Enter (this opens the "Command Prompt" — a black window where you type commands)
3. Type this exactly and press Enter:
   ```
   node --version
   ```
4. You should see a number like `v20.x.x` — that means Node.js is installed! ✅

---

### Step 3: Install Wrangler (Cloudflare's Command-Line Tool)

What is Wrangler? → It's a tool that lets you send your website to Cloudflare without logging into the website. It talks to Cloudflare from the command window.

1. Open the **Command Prompt** (press `Windows Key + R`, type `cmd`, press Enter)
2. Type this exactly and press Enter:
   ```
   npm install -g wrangler
   ```
3. Wait a minute or two — you'll see text scrolling by. When it finishes, you're done!

**To check it worked:**
```
wrangler --version
```
You should see a version number like `4.x.x`. ✅

---

### Step 4: Log In to Cloudflare Through Wrangler

1. In the Command Prompt, type:
   ```
   wrangler login
   ```
2. A web browser window will automatically open asking you to log in to Cloudflare
3. Log in with the Cloudflare account you created in **Step 1**
4. You'll see a message saying something like "✓ Successfully authenticated"

---

### Step 5: Download This Project to Your Computer

1. Open the Command Prompt (`Windows Key + R`, type `cmd`, Enter)
2. Navigate to where you want to save the project. For example, to save it on your Desktop:
   ```
   cd Desktop
   ```
3. Download the project from GitHub by typing:
   ```
   git clone https://github.com/hariharanboss/jupiter-lab-codes.git
   ```
4. Go into the project folder:
   ```
   cd jupiter-lab-codes
   ```

**What just happened?** → This downloaded all the project files from GitHub (a website where code is stored) to your computer.

---

### Step 6: Create a KV Namespace (Your File Storage)

What is a KV Namespace? → Think of it as a special folder in the cloud where Cloudflare will store information about your files (their names, descriptions, and links). It's like a database — a smart filing cabinet.

1. In the Command Prompt, make sure you're inside the project folder (you should see files like `worker.js` and `wrangler.toml`), then type:
   ```
   wrangler kv:namespace create "FILES_DB"
   ```
2. You'll see output that looks something like this:
   ```
   ✓ Created KV namespace FILES_DB
   ✓ Add this to your wrangler.toml:
     kv_namespaces = [ { binding = "FILES_DB", id = "abc123def456", preview_id = "xyz789" } ]
   ```
3. **Copy the `id` value** — it looks like a random string of letters and numbers (e.g., `abc123def456`). You'll need it in the next step.
4. **Copy the `preview_id` value** too — it looks similar. You'll need this as well.

---

### Step 7: Update the Configuration File

1. In the project folder, find a file called **`wrangler.toml`** — right-click it and choose **"Open with" → "Notepad"** (or any text editor)
2. You'll see something like this:
   ```toml
   [[kv_namespaces]]
   binding = "FILES_DB"
   id = "your-kv-namespace-id"
   ```
3. Replace `your-kv-namespace-id` with the **`id`** you copied from Step 6
4. Replace `your-kv-namespace-preview-id` with the **`preview_id`** you copied from Step 6
5. Save the file and close Notepad

**What is this file?** → `wrangler.toml` is like an address book — it tells Wrangler where your KV storage is and what your website is called.

---

### Step 8: Set Up Your Passwords (Security)

What is a "secret"? → A secret is a password that Cloudflare stores securely. It's never visible in the code files — it only exists on Cloudflare's servers.

You need to set **two passwords**:

1. **App Password** — The password visitors will use to access the website
2. **Admin Password** — A stronger password for uploading and managing files

**To set your App Password:**
1. In the Command Prompt, type:
   ```
   wrangler secret put APP_PASSWORD
   ```
2. It will ask you to type a password — enter your chosen app password and press Enter
3. It won't show the characters as you type — that's normal! Just type it carefully and press Enter

**To set your Admin Password:**
1. In the Command Prompt, type:
   ```
   wrangler secret put MANAGE_LINKS_PASSWORD
   ```
2. Enter a strong password and press Enter

**Password tips:**
- Use at least 8 characters
- Mix letters, numbers, and symbols (e.g., `MySecret123!`)
- The admin password should be different and stronger than the app password
- Don't share these passwords publicly!

---

### Step 9: Build the Project (Package Everything Together)

What does "build" mean? → The project has source files (`index.html`, `sw.js`) that need to be packaged into single files (`html.js`, `sw-content.js`) so Cloudflare can run them properly. Think of it like compiling a recipe — gathering all ingredients into one dish.

1. In the Command Prompt, make sure you're in the project folder
2. Type:
   ```
   npm run build
   ```
3. You should see:
   ```
   Generated html.js (xxxxx chars inlined)
   Generated sw-content.js (xxxxx chars inlined)
   ```

---

### Step 10: Run Locally (Test on Your Computer)

Before you put the site on the internet, let's test it on your own computer!

1. In the Command Prompt, type:
   ```
   npm run dev
   ```
2. You should see something like:
   ```
   ⚡ Started local server at http://localhost:8787
   ```
3. Open your web browser and go to: **http://localhost:8787**
4. The website will appear! You'll see a password screen
5. Type your **App Password** and click enter — you're now inside! 🎉
6. To stop the local server, go back to the Command Prompt and press `Ctrl + C`

---

### Step 11: Deploy to Production (Put It on the Internet!)

Now it's time to share your website with the world! 🌍

1. **First, build the project** (from Step 9):
   ```
   npm run predeploy
   ```
   Or simply:
   ```
   npm run build
   ```

2. **Then deploy:**
   ```
   wrangler deploy
   ```

3. Wait a minute — you'll see your worker name being deployed. When it finishes, you'll see a URL like:
   ```
   https://lms.vasudevhere0.workers.dev/
   ```

4. Open that URL in your browser — your site is live! 🎉

---

## 🔌 What Each Page and Button Does

| What You See | What It Does |
|-------------|-------------|
| **Password screen** | Enter the App Password to access the website |
| **Sidebar (left)** | Shows all your folders — click to navigate |
| **Search box** | Type to find files by name |
| **Filters** | Filter files by type, size, date, or tags (admin only) |
| **File cards** | Click a file to preview it in a modal window |
| **Upload area** | Drag and drop `.docx` files to upload them (admin only) |
| **Theme switcher (top right)** | Toggle between light and dark mode |
| **Breadcrumb** | Shows your current location in the folder tree — click to go back |

---

## 🔐 Security Notes

- **Passwords are stored securely** using Cloudflare's secret manager — they never appear in the code files
- **Session-based authentication** means you log in once per browser session
- **URL encoding** is used to prevent malicious file path access
- **Admin-only features** like file uploads are protected by a separate password

---

## 📖 Quick Reference: Commands Cheat Sheet

| Command | What It Does |
|---------|-------------|
| `npm run build` | Packages the project files |
| `npm run dev` | Starts a local testing server |
| `npm run deploy` | Publishes your site to the internet |
| `wrangler login` | Logs into Cloudflare |
| `wrangler kv:namespace create "FILES_DB"` | Creates your cloud storage |
| `wrangler secret put APP_PASSWORD` | Sets the visitor password |
| `wrangler secret put MANAGE_LINKS_PASSWORD` | Sets the admin password |

---

## 🆘 Troubleshooting

**Problem: `node` is not recognized**
→ You haven't installed Node.js properly. Reinstall it from https://nodejs.org/ and restart your Command Prompt.

**Problem: `wrangler` is not recognized**
→ You haven't installed Wrangler. Run `npm install -g wrangler` and restart Command Prompt.

**Problem: `git` is not recognized**
→ You need Git installed. Download it from https://git-scm.com/ and install it.

**Problem: Build fails with errors**
→ Make sure you're in the right folder (you should see `worker.js`, `index.html`, and `wrangler.toml`). Check that you ran `npm run build` successfully.

**Problem: Site shows "Error" when deployed**
→ Check that you replaced the placeholder IDs in `wrangler.toml` with your real KV namespace IDs (Step 7). Check that you set both secrets (Step 8).

**Problem: Password doesn't work**
→ Double-check you set the secrets correctly. Run `wrangler secret put APP_PASSWORD` again if needed. Remember: the password won't show as you type — that's normal!

---

## 🙏 Acknowledgments

- [Cloudflare Workers](https://workers.cloudflare.com/) — Free serverless platform
- [Three.js](https://threejs.org/) — 3D particle animation library
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) — DOCX document converter
- [Pastelink](https://pastelink.net/) — External code hosting service

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

---

## 👤 Author

**Hariharan** ([hariharanboss](https://github.com/hariharanboss))

- 🌐 GitHub: https://github.com/hariharanboss
- 📧 Email: Vasudevhere0@gmail.com

---

<p align="center">
  <i>Built with ❤️ and ☁️ Cloudflare Workers</i>
</p>
