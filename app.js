const sha1 = require('sha1');
const express = require('express')
const app = express()
app.use('/static', express.static('public'));
app.use('/', express.static('public'));
var request = require('request');
const hostname = '0.0.0.0';
const port = 8888;

function getParams() {
  return (req.url.split('?')[1] || '').split('&').reduce((res, item) => { let [key, val] = item.split('='); res[key] = val; return res; }, {});
}
app.post('/get-data', (req, res) => {
  console.log('req', req.url);
  let params = getParams();
  let appid = 'wx79e4dff84f30084b';
  let secret = '28fbe39d77453b42dd63cc607c790339';
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
    function (error, response, body) {
      let ACCESS_TOKEN = JSON.parse(body).access_token;
      let url_get_ticket = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
      request(url_get_ticket, function (error, response, body) {
        let ticket = JSON.parse(body).ticket;
        console.log('api_ticket', ticket);
        res.json({
          ticket,
          ACCESS_TOKEN,
        });
      });
    });
});

app.get('/', (req, res) => {
  console.log('req', req.url);
  let { echostr, nonce, signature, timestamp } = getParams();
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
