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
