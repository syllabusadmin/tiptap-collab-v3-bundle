const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/env', (req, res) => {
  res.json({
    COLLABORATION_KEY: process.env.COLLABORATION_KEY || '',
    CONTENT_AI_KEY: process.env.CONTENT_AI_KEY || '',
    SERVER_KEY: process.env.SERVER_KEY || '',
    SERVER_ADDRESS: process.env.SERVER_ADDRESS || ''
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
