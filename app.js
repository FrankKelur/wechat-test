const http = require('http');
const sha1 = require('sha1');

const hostname = '0.0.0.0';
const port = 8888;

const server = http.createServer((req, res) => {
  console.log('req', req.url);
  let params = req.url.split('?')[1].split('&').reduce((res, item) => { let [key, val] = item.split('='); res[key] = val; return res; }, {});
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
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});