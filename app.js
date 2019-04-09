const sha1 = require('sha1');
const express = require('express')
const app = express()
app.use('/static', express.static('public'));

const hostname = '0.0.0.0';
const port = 8888;

app.get('/', (req, res) => {
  console.log('req', req.url);
  let params = (req.url.split('?')[1] || '').split('&').reduce((res, item) => { let [key, val] = item.split('='); res[key] = val; return res; }, {});
  let { echostr, nonce, signature, timestamp } = params;
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