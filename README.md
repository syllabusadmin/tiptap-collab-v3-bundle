# Tiptap Railway Example

This repository contains a simple Express server located in `railway-app`. The server serves a demo editor and exposes configuration values via `/env` for the front end.

## Getting Started

1. Install dependencies:

```bash
cd railway-app
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on `PORT` (defaults to `3000`) and serve the files in `railway-app/public`.

## Environment Variables

Create a `.env` file in `railway-app` based on `.env.example` with the following entries:

- `COLLABORATION_KEY` – JWT used for collaboration
- `CONTENT_AI_KEY` – API key for content AI
- `SERVER_KEY` – key for authenticating the websocket provider
- `SERVER_ADDRESS` – websocket address (e.g. `wss://collab.tiptap.dev`)
- `PORT` – optional port for the Express server

## Project Structure

```
railway-app/
  public/         # client files
  server.js       # Express server
  package.json    # dependencies
```
