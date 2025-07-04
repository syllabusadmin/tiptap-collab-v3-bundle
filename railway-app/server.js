const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/env', (req, res) => {
  res.json({
    CONTENT_AI_KEY: process.env.CONTENT_AI_KEY || '',
    APP_ID: process.env.APP_ID || '',
    CONVERSION_KEY: process.env.CONVERSION_KEY || '',
    REGISTRY_TOKEN: process.env.REGISTRY_TOKEN || '',
    SERVER_ID: process.env.SERVER_ID || '',
    SERVER_KEY: process.env.SERVER_KEY || '',
    DOC_API_KEY: process.env.DOC_API_KEY || '',
    SERVER_ADDRESS: process.env.SERVER_ADDRESS || ''
  })
})

app.get('/token', (req, res) => {
  const { docId } = req.query

  if (!docId) {
    return res.status(400).json({ error: 'Missing docId' })
  }

  const payload = {
    docId,
    appId: process.env.APP_ID || '',
    serverId: process.env.SERVER_ID || ''
  }

  const token = jwt.sign(payload, process.env.SERVER_KEY || '')

  res.json({ token })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
