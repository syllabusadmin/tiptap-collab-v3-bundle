import React, { useEffect, useRef } from 'react'

export default function App() {
  const editorContainer = useRef(null)

  useEffect(() => {
    let editor
    ;(async () => {
      const { Editor } = await import('https://esm.sh/@tiptap/core@2?bundle')
      const StarterKit = (await import('https://esm.sh/@tiptap/starter-kit@2?bundle')).default
      const Collaboration = (await import('https://esm.sh/@tiptap/extension-collaboration@2?bundle')).default
      const CollaborationCursor = (await import('https://esm.sh/@tiptap/extension-collaboration-cursor@2?bundle')).default
      const ContentAI = (await import('https://esm.sh/@tiptap-pro/extension-content-ai?bundle')).default
      const Y = await import('https://esm.sh/yjs@13?bundle')
      const { WebsocketProvider } = await import('https://esm.sh/y-websocket@1?bundle')

      const ydoc = new Y.Doc()
      const provider = new WebsocketProvider('wss://collab.tiptap.dev', 'example-doc', ydoc)

      editor = new Editor({
        element: editorContainer.current,
        extensions: [
          StarterKit,
          Collaboration.configure({ document: ydoc }),
          CollaborationCursor.configure({ provider }),
          ContentAI.configure({ apiKey: 'YOUR_OPENAI_KEY' })
        ],
        content: '<p>Hello World!</p>'
      })
    })()

    return () => {
      if (editor) editor.destroy()
    }
  }, [])

  return React.createElement('div', { className: 'editor', ref: editorContainer })
}
