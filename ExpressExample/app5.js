var express = require('express');
var http = require('http');

var app = express();

app.set('port',process.env.PORT||3000);

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨');

    res.redirect('http://google.co.kr');
    
});


var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('express로 웹 서버 실행함 : '+ app.get('port'));
});