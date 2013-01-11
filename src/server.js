var express = require("express"),
    fs = require('fs');
var app = express();

app.configure('development', function () {
    app.use('/static', express.static(__dirname + '/static'));
//    app.use('/tmp', express.static(__dirname + '/tmp'));
    app.use(express.bodyParser());
    app.use(app.router);
});

var start = function () {
    var onRequestRoot = function (request, response) {
        fs.readFile(__dirname + "/static/index.html", "utf-8",
            function (err, html) {
                response.send(html);
                response.end();
            });
    }

    //保存base64图片POST方法
    var onRequestUpload = function (request, response) {
        //接收前台POST过来的base64
        var imgData = request.body.imgData;
        //过滤data:URL
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var filePath = "./tmp/out1.png";
        fs.writeFile(filePath, dataBuffer, function (err) {
            if (err) {
                console.log("error");
                response.send(err);
            } else {
                response.writeHead(200, {
                    'Content-Type':'text/html'
                });
                response.write(filePath);
                response.end();
            }
        });
    };

    var onRequestDownload = function (request, response) {
        var filePath = "./tmp/out1.png";
        fs.readFile(filePath,
            function (err, file) {
                response.setHeader('Content-disposition', 'attachment; filename=' + filePath);
                response.send(file);
                response.end();
            });
    };

    app.get("/", onRequestRoot);
    app.get("/tmp/:img", onRequestDownload);
    app.post("/upload", onRequestUpload);
    app.listen(3333);
};

exports.start = start;