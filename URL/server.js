//https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
//https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require("body-parser");
const dns = require('dns');
let count = 0;
let save = {};

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/")
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/api/shorturl', function(req, res,err) {
  res.json({ "original_url": req.body.url,
    "short_url" : "/api/shorturl/" + count++});
    save[count] = req.body.url;
  if(err)res.json({
     error: 'invalid url' 
  });
});

app.get('/api/shorturl/:shorturl', (req, res) => {
  let shorturl = req.params.shorturl;
  let result = obj[shorturl];
  if (result === undefined) res.json({ "error": "Invalid URL" })
  else res.redirect(obj[shorturl])
}

