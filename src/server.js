var express = require("express"),
    fs = require('fs');
var app = express();
//var http = require("http");
//var url = require("url");
//var router = require("./router");

app.configure('development', function () {
    app.use('/static', express.static(__dirname + '/static'));
    app.use(express.bodyParser());
    app.use(app.router);
});

var start = function () {
    var onRequest = function (request, response) {
        fs.readFile(__dirname + "/static/index.html", "utf-8",
            function (err, html) {
                response.send(html);
            });
    }
    app.get("/", onRequest);
    app.listen(3333);
};


//var startServer = function () {
//    var onRequest = function (request, response) {
//        var pathname = url.parse(request.url).pathname;
//        var realPath = "static" + pathname;
//        path.exists(realPath, function (exists) {
//            if (!exists) {
//                response.writeHead(404, {
//                    'Content-Type':'text/plain'
//                });
//                response.write("This request URL " + pathname + " was not found on this server.");
//                response.end();
//            } else {
//                fs.readFile(realPath, "binary", function (err, file) {
//                    if (err) {
//                        response.writeHead(500, {
//                            'Content-Type':'text/plain'
//                        });
//                        response.end(err);
//                    } else {
//                        response.writeHead(200, {
//                            'Content-Type':'text/html'
//                        });
//                        response.write(file, "binary");
//                        response.end();
//                    }
//                });
//            }
//        });
////        router.route(handle, pathname, response);
//
//    };
//    http.createServer(onRequest).listen(3333);
//    console.log("Server(3333) start!");
//};

exports.start = start;