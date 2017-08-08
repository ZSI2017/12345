var express = require("express");

var fs = require("fs");
var app = express();


app.use('/static',express.static("static"));

app.get("/smc", function (request, response) {
   response.sendFile( __dirname + "/" + "index.html" );
    // fs.readFile("./index.html", function (err, data) {
    //     if (err) {
    //         return console.error(err);
    //     } else {
    //         response.write(data);
    //     }
    // })
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址端口为", host, port);
})
