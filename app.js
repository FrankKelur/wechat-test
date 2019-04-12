const sha1 = require('sha1');
const express = require('express')
const app = express()
// app.use('/static', express.static('public'));
// app.use('/', express.static('public'));
var request = require('request');
const hostname = '0.0.0.0';
const port = 8888;

// let appid = 'wx79e4dff84f30084b';
let appid = 'wx661994a569e2f0e3'

function getParams(req) {
  return (req.url.split('?')[1] || '').split('&').reduce((res, item) => { let [key, val] = item.split('='); res[key] = val; return res; }, {});
}

app.get('/*', (req, res) => {
  console.log('req', req.url);
  let { echostr, nonce, signature, timestamp } = getParams(req);
  let token = 'zhaipengchao';
  let arr = [token, nonce, timestamp].sort();
  let result = sha1(arr.join(''));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (result == signature) {
    res.end(echostr);
    return;
  }
  res.end('Hello World\n');
})

app.listen(port, () => console.log('Example app listening on port 8888!'))
