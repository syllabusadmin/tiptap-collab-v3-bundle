# Tiptap Railway Example

This repository contains a simple Express server located in `railway-app`. The server serves a demo editor and exposes configuration values via `/env` for the front end. A `/token` endpoint is available to generate JWTs for the collaboration service.

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

The server will run on `PORT` (defaults to `8080`) and serve the files in `railway-app/public`.

## Environment Variables

Create a `.env` file in `railway-app` based on `.env.example` with the following entries:

- `CONTENT_AI_KEY` – API key for content AI
- `APP_ID` – id of your Tiptap application
- `CONVERSION_KEY` – key for the conversion service
- `REGISTRY_TOKEN` – token for installing private packages
- `SERVER_ID` – id of your collaboration server
- `SERVER_KEY` – secret used to sign collaboration tokens
- `DOC_API_KEY` – key for accessing the document API
- `SERVER_ADDRESS` – websocket address (e.g. `wss://collab.tiptap.dev`)
- `PORT` – optional port for the Express server

## Project Structure

```
railway-app/
  public/         # client files
  server.js       # Express server
  package.json    # dependencies
```
