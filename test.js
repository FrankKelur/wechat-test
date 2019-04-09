var request = require('request');
request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx661994a569e2f0e3&secret=4ee9efca1c18ade6b163603dfb217522', 
function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  let ACCESS_TOKEN = JSON.parse(body).access_token;
  let url_get_ticket = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
  request(url_get_ticket, function (error, response, body) {
    let ticket = JSON.parse(body).ticket;
    console.log('api_ticket', ticket);
  });
});