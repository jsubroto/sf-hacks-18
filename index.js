var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.listen(process.env.PORT || 5000);

app.post('/image-annotate', async function(req, res) {
    const image = req.body.imageContent;
    const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=<api_key>', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "requests": [{
                "image": {
                    "content": image
                },
                "features": [{
                    "type": "DOCUMENT_TEXT_DETECTION"
                }]
            }]
        })
    })
    if (response.status !== 200) {
        res.status(response.status).send("Error with API request")
    }
    const json = await response.json()
    const code = json.responses[0].textAnnotations[0].description;
    console.log(code);
    res.status(200).json({ data: code });
})
