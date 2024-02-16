var express = require('express');
var http = require('http');

var app = express();

app.set('port',process.env.PORT || 3000 );

//express로 서버 만들기
var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('express로 웹서버 실행함 : ' + app.get('port'));
});
