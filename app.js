const sha1 = require('sha1');
const express = require('express')
const app = express()
app.use('/static', express.static('public'));
app.use('/', express.static('public'));
var request = require('request');
const hostname = '0.0.0.0';
const port = 8888;

var allowCrossDomain = function (req, res, next) {
  // console.log('req.origin', req.headers)
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);

// let appid = 'wx79e4dff84f30084b';
// let secret = '28fbe39d77453b42dd63cc607c790339';
let appid = 'wx661994a569e2f0e3'
let secret = '4ee9efca1c18ade6b163603dfb217522'
function getParams(req) {
  return (req.url.split('?')[1] || '').split('&').reduce((res, item) => { let [key, val] = item.split('='); res[key] = val; return res; }, {});
}
app.get('/get-ticket', (req, res) => {
  console.log('req', req.url);
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
    function (error, response, body) {
      let ACCESS_TOKEN = JSON.parse(body).access_token;
      let url_get_ticket = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
      request(url_get_ticket, function (error, response, body) {
        let ticket = JSON.parse(body).ticket;
        console.log('api_ticket', ticket);
        res.json({
          ticket,
        });
      });
    });
});
app.get('/get-data', (req, res) => {
  console.log('req', req.url);
  let { code } = getParams(req);
  console.log(' openid: ', openid);
  let access_token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
  request(access_token_url, function (error, response, body) {
    let { access_token, openid } = JSON.parse(body);
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    request(url, function (error, response, body) {
      res.json({
        re: '200',
        data: JSON.parse(body),
      });
    })
  })
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
