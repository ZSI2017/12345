var express = require('express');
var fs = require('fs');
// var path = require('path')
var app = express();
// var bodyParser = require("body-parser");

var crypto = require('crypto');

function cryptPwd(password) {
     // md5 加随机盐
     var saltPassword = password + Math.random().toString().slice(2,12);
     var md5 = crypto.createHash('md5'); // 使用 md5 的hash 实例
     var result = md5.update(saltPassword).digest('hex');  // 值经过编码后，以16 进制输出
     return result;
}
// var urlencodeParser = bodyParser.urlencoded({extended: false})

// var staticPath = path.posix.join('static', "static")
app.use('/static',express.static('static'));
 // app.get('/',function(req,res){
 //     res.send("111hello world")
 // })
app.get('/',function(request,response){
       request.headers.cookie && request.headers.cookie.split(';').forEach(function(value){
             var tempArr = value.split('=');
             console.log("cookie: "+tempArr[0]+' '+tempArr[1]);
             if(tempArr[0] == " ASDSASASSS") {
               response.cookie('ASDSASASSS', cryptPwd(tempArr[1]), { expires: new Date(Date.now() + 900000), httpOnly: true });
             }
       })
       response.cookie('ASDSASASSS', cryptPwd("ASDSASASSS"), { expires: new Date(Date.now() + 900000), httpOnly: true });
      // response.cookie("name","value")
     // response.send("111hello world")
      response.sendFile( __dirname + "/" + "index.html" );
    //  fs.readFile('/index.html',function(err,data){
    //    console.log("dsdfsd")
    //       if(err) {
    //
    //       }else {
    //          response.send("sdfasdfasd");
    //       }
    //
    //  })
})

var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址端口为 localhost://',port);
})
