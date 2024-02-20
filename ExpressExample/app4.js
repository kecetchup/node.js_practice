var express = require('express');
var http = require('http');

var app = express();

app.set('port',process.env.PORT||3000);

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨');

    req.user = 'mike';

    next();
});

app.use(function(req, res, next) {
    console.log('두번째 미들웨어 호출됨');

    // 첫 번째 미들웨어에서 설정한 req.user 값을 사용하여 응답을 보냄
    var person = {name : '소녀시대', age:20};
    //res.send(person);

    var personStr = JSON.stringify(person);
    //res.send(personStr);
    res.writeHead(200,{"COntent-Type":"application/json;charset=utf8"});
    res.write(personStr);
    res.end();
});


var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('express로 웹 서버 실행함 : '+ app.get('port'));
});