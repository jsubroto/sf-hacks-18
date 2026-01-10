const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.post('/image-annotate', async (req, res) => {
  const image = req.body?.imageContent
  if (!image) {
    return res.status(400).json({ error: 'missing imageContent' })
  }

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            image: { content: image },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
          }
        ]
      })
    }
  )

  if (!response.ok) {
    return res.status(response.status).send('Error with API request')
  }

  const json = await response.json()
  const code = json.responses?.[0]?.textAnnotations?.[0]?.description

  if (!code) {
    return res.status(500).json({ error: 'invalid API response' })
  }

  res.json({ data: code })
})

app.listen(process.env.PORT || 5000)
