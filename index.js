var app = require('express')();
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

app.listen(process.env.PORT || 5000);

app.post('/image-annotate', function(req, res) {
    var image = req.body.imageContent;
    request.post(
        'https://vision.googleapis.com/v1/images:annotate?key=<api_key>', {
            json: {
                "requests": [{
                    "image": {
                        "content": image
                    },
                    "features": [{
                        "type": "DOCUMENT_TEXT_DETECTION"
                    }]
                }]
            }
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var code = body.responses[0].textAnnotations[0].description;
                console.log(code);
                res.status(200).json({data: code});
            }
        }
    );
})