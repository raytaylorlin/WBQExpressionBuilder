var express = require("express"),
    fs = require('fs'),
    handler = require("./requestHandler.js");
var app = express();

app.configure('development', function () {
    app.use('/static', express.static(__dirname + '/static'));
    app.use(express.bodyParser());
    app.use(app.router);
});

var start = function () {
    app.get("/", handler.onRequestRoot);
    app.get("/tmp/:img", handler.onRequestDownload);
    app.post("/upload", handler.onRequestSaveImage);
    app.listen(3333);
};

exports.start = start;