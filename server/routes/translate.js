const express = require('express');
const request = require('request');
const router = express.Router();

const CLIENT_ID = 'nWmgvodBfUAycOM7CcRK';
const CLIENT_SECRET = 'PUBrH3G_A9';
const API_URL = 'https://openapi.naver.com/v1/papago/n2mt';

router.post('/', function(req, res, next) {
  console.log(req.body.query);
  var options = {
    url: API_URL,
    form: {
      'source': 'ja', 
      'target': 'ko', 
      'text': req.body.query
    },
    headers: {
      'X-Naver-Client-Id': CLIENT_ID, 
      'X-Naver-Client-Secret': CLIENT_SECRET
    }
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

module.exports = router;