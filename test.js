var request = require('request');
<<<<<<< HEAD
let appid ='wx661994a569e2f0e3'; 
//let appid ='wx79e4dff84f30084b';
let secret = 'e2ca297d0073ae01026906fb1359c83d'; //'4ee9efca1c18ade6b163603dfb217522';
//let secret =  '28fbe39d77453b42dd63cc607c790339';
=======
let appid = 'wx661994a569e2f0e3';
let secret = '4ee9efca1c18ade6b163603dfb217522';
//wx661994a569e2f0e3
// 4ee9efca1c18ade6b163603dfb217522
>>>>>>> 0198847fa34da51dd867189d8fc4859cbfa9f6a5
request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret, 
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
