// File: package.json
{
  "name": "tiptap-collab-v3-bundle",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "rollup -c"
  },
  "dependencies": {
    "@tiptap/core": "^3.0.0",
    "@tiptap/starter-kit": "^3.0.0",
    "@tiptap-pro/extension-collaboration": "^3.0.0",
    "@tiptap-pro/extension-collaboration-cursor": "^3.0.0",
    "@tiptap-pro/extension-content-ai": "^3.0.0",
    "yjs": "^13.5.27",
    "y-websocket": "^1.4.5"
  }
}

// File: rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/editor.js',
  output: {
    file: 'dist/tiptap-collab-v3.js',
    format: 'iife',
    name: 'TiptapCollabV3'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};

// File: src/editor.js
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap-pro/extension-collaboration';
import CollaborationCursor from '@tiptap-pro/extension-collaboration-cursor';
import ContentAI from '@tiptap-pro/extension-content-ai';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

window.TiptapCollabV3 = {
  Editor,
  StarterKit,
  Collaboration,
  CollaborationCursor,
  ContentAI,
  Y,
  WebsocketProvider,
};

// File: README.md
# Tiptap v3 Bundle for Bubble (with Pro Extensions)

This project bundles Tiptap v3 with Collaboration, Cursor, and Content-AI extensions into a browser-compatible script for use in environments like Bubble.io.

## ✅ Features
- Tiptap v3 core
- StarterKit (basic formatting, headings, etc.)
- Collaboration (Yjs + WebSocket sync)
- Collaboration Cursor (multi-user awareness)
- Content AI (automated suggestions via OpenAI)

## 🧱 Prerequisites
- Node.js ≥ 16
- Tiptap Pro access token (TIPTAP_PRO_TOKEN)

## 📦 Setup
1. Clone this repo:
```bash
git clone https://github.com/YOUR_USERNAME/tiptap-collab-v3-bundle.git
cd tiptap-collab-v3-bundle
```

2. Authenticate to install Pro extensions:
```bash
npm config set //npm.pkg.github.com/:_authToken=<TIPTAP_PRO_TOKEN>
npm install
```

3. Build the bundle:
```bash
npm run build
```

4. Upload `dist/tiptap-collab-v3.js` to a public host (e.g. Bubble plugin assets, GitHub Pages, Cloudflare).

## 🧩 Use in Bubble Plugin
1. Add this script to your plugin’s Shared Resources:
```html
<script src="https://yourdomain.com/tiptap-collab-v3.js"></script>
```

2. In your plugin element code:
```js
const { Editor, StarterKit, Collaboration, CollaborationCursor, ContentAI, Y, WebsocketProvider } = window.TiptapCollabV3;

const div = document.createElement("div");
div.style.minHeight = "200px";
instance.canvas.appendChild(div);

const ydoc = new Y.Doc();
const provider = new WebsocketProvider("wss://collab.tiptap.dev", "doc-id", ydoc, {
  params: { token: instance.data.jwt }
});

const editor = new Editor({
  element: div,
  extensions: [
    StarterKit,
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({ provider }),
    ContentAI.configure({ apiKey: "your-openai-key" })
  ],
  content: instance.data.initialContent || "",
  onUpdate: ({ editor }) => instance.publishState("html", editor.getHTML())
});

instance.data.editor = editor;
```

3. Create plugin actions to generate JWT via `jsonwebtoken` in server-side plugin code.

## ✨ Extras
- You can expand with Pro Tables, Mentions, Placeholders, etc.
- Add dropdown UI to trigger Content-AI suggestions.
- Securely manage OpenAI and Tiptap API keys.

---
Let me know if you want this published to a real GitHub repo or want a working demo in Bubble!
