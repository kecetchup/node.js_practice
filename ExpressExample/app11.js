var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
//post 처리 방식
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var multer = require('multer');
var fs = require('fs');
var cors = require('cors');

var app = express();

app.set('port',process.env.PORT||3000);
app.use(static(path.join(__dirname, 'public')));
app.use(static(path.join(__dirname,'uploads')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));
app.use(cors());

var storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'uploads');
    },
    filename:function(req,file,callback){
        //callback(null, file.originalname + Date.now())
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname,extension);
        callback(null,basename+Date.now() + extension)
    }
});

var upload = multer({
    storage : storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});

var router =express.Router();

router.route('/process/photo').post(upload.array("photo",1),
    function(req,res){
        console.log('/process/photo 라우팅 함수 호출됨');
        
        var files = req.files;
        console.log('=== 업로드된 파일 ===');
        if(files.length>0){
            console.dir(files[0]);
        }else{
            console.log('파일이 없습니다.');
        }
        var originalname;
        var filename;
        var mimetype;
        var size;
        if(Array.isArray(files)){
            for(var i = 0; i < files.length;i++){
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        }
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.write("<h1>파일업로드 성공</h1>");
        res.write("<p>원본파일 :" + originalname + "</p>");
        res.write("<p>저장파일 : "+ filename +" </p>");
        res.end();
});

router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨');

    res.cookie('user',{
        id:'mike',
        name:'소녀시대',
        authorized:true
    });

    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 라우팅 함수에서 받음 ');
    res.send(req.cookies);
});

app.use('/',router)

app.all('*',function(req,res){
    res.status(404).send("<h1>요청하신 페이지는 없어요.</h1>")
});

var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('express로 웹 서버 실행함 : '+ app.get('port'));
});