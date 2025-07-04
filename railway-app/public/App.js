import React, { useEffect, useRef, useState } from 'react'

export default function App() {
  const editorContainer = useRef(null)
  const envRef = useRef(null)
  const editorRef = useRef(null)
  const [docId, setDocId] = useState(() => {
    const existing = window.location.hash.slice(1)
    if (existing) return existing
    const id = Math.random().toString(36).slice(2, 10)
    window.location.hash = id
    return id
  })
  const [envLoaded, setEnvLoaded] = useState(false)

  useEffect(() => {
    fetch('/env').then(res => res.json()).then(env => {
      envRef.current = env
      setEnvLoaded(true)
    })
  }, [])

  const initEditor = async id => {
    if (!envRef.current) return

    if (editorRef.current) {
      editorRef.current.destroy()
      editorRef.current = null
    }

    const { Editor } = await import('https://esm.sh/@tiptap/core@2?bundle')
    const StarterKit = (await import('https://esm.sh/@tiptap/starter-kit@2?bundle')).default
    const Collaboration = (await import('https://esm.sh/@tiptap/extension-collaboration@2?bundle')).default
    const CollaborationCursor = (await import('https://esm.sh/@tiptap/extension-collaboration-cursor@2?bundle')).default
    const ContentAI = (await import('https://esm.sh/@tiptap-pro/extension-content-ai?bundle')).default
    const Y = await import('https://esm.sh/yjs@13?bundle')
    const { WebsocketProvider } = await import('https://esm.sh/y-websocket@1?bundle')

    const ydoc = new Y.Doc()

    const tokenRes = await fetch(`/token?docId=${id}`)
    const { token } = await tokenRes.json()

    const provider = new WebsocketProvider(envRef.current.SERVER_ADDRESS, id, ydoc, {
      params: { key: envRef.current.SERVER_KEY, token }
    })

    editorRef.current = new Editor({
      element: editorContainer.current,
      extensions: [
        StarterKit,
        Collaboration.configure({ document: ydoc }),
        CollaborationCursor.configure({ provider }),
        ContentAI.configure({ apiKey: envRef.current.CONTENT_AI_KEY })
      ],
      content: '<p>Hello World!</p>'
    })
  }

  const handleLoad = () => {
    if (docId) {
      window.location.hash = docId
      initEditor(docId)
    }
  }

  const handleNew = () => {
    const id = Math.random().toString(36).slice(2, 10)
    setDocId(id)
    window.location.hash = id
    initEditor(id)
  }

  useEffect(() => {
    if (envLoaded && docId) {
      initEditor(docId)
    }
  }, [envLoaded])

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'controls' },
      React.createElement('input', {
        value: docId || '',
        onChange: e => setDocId(e.target.value),
        placeholder: 'Doc ID'
      }),
      React.createElement('button', { onClick: handleLoad }, 'Load Doc'),
      React.createElement('button', { onClick: handleNew }, 'New Doc')
    ),
    React.createElement('div', { className: 'editor', ref: editorContainer })
  )
}
