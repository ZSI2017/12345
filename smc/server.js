var express = require("express");

// var fs = require("fs");
var app = express();

var crypto = require('crypto');

function cryptPwd(password) {
     // md5 加随机盐
     var saltPassword = password + Math.random().toString().slice(2,12);
     var md5 = crypto.createHash('md5'); // 使用 md5 的hash 实例
     var result = md5.update(saltPassword).digest('hex');  // 值经过编码后，以16 进制输出
     return result;
}
app.use(express.static(__dirname + "/static"));
app.get("/smc", function (request, response) {
  // console.log("adfasdfasdf");
    // cryptPwd("password");
    if(request.headers.cookie !== null) {
       console.log("cookie: "+request.headers.cookie);
    }
    request.headers.cookie && request.headers.cookie.split(';').forEach(function(value){
             var tempArr = value.split('=');
             console.log("cookie: "+tempArr[0]+' '+tempArr[1]);
             if(tempArr[0] == "ALIPAYJSESSIONID") {
                response.cookie('SMJSESSIONID', cryptPwd(tempArr[1]));
             }
       });
  // response.cookie('ASDSASASSS', cryptPwd("ASDSASASSS"), { expires: new Date(Date.now() + 900000), httpOnly: true });
   response.sendFile( __dirname + "/" + "index.html" );
});

var server = app.listen(9090, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log("应用实例，访问地址端口为", host, port);
})
