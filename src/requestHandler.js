var fs = require("fs");

//请求根目录，载入默认主页index.html
var onRequestRoot = function (request, response) {
    fs.readFile(__dirname + "/static/index.html", "utf-8",
        function (err, html) {
            response.send(html);
            response.end();
        });
}

//保存base64图片到服务器
var onRequestSaveImage = function (request, response) {
    //接收前台POST过来的base64
    var imgData = request.body.imgData;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');

    var guidName = getGuid();
    var filePath = "./tmp/" + guidName + ".png";
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

//下载图片
var onRequestDownload = function (request, response) {
    var filePath = "." + request.url;
    fs.readFile(filePath,
        function (err, file) {
            response.setHeader('Content-disposition', 'attachment; filename=' + filePath);
            response.send(file);
            response.end();
            fs.unlink(filePath, function () {
                console.log("deleted!");
            })
        });
};

var getGuid = function () {
    var G = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    var guid = (G() + G() + "-" + G() + "-" + G() + "-" +
        G() + "-" + G() + G() + G()).toUpperCase();
    return guid;
};

exports.onRequestRoot = onRequestRoot;
exports.onRequestSaveImage = onRequestSaveImage;
exports.onRequestDownload = onRequestDownload;