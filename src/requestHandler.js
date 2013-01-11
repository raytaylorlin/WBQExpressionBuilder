var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;

var start = function (response) {
//    var realPath = "/static" + pathname;
//    path.exists(realPath, function (exists) {
//        if (!exists) {
//            response.writeHead(404, {
//                'Content-Type':'text/plain'
//            });
//            response.write("This request URL " + pathname + " was not found on this server.");
//            response.end();
//        } else {

    fs.readFile("static/index.html", function (err, html) {
        if (err) {
            throw(err);
        } else {
            var ext = path.extname("static/index.html");
            ext = ext ? ext.slice(1) : 'unknown';
            var contentType = mime[ext] || "text/plain";
            response.writeHeader(200, {"Content-Type":contentType});
            response.write(html);
            response.end();
        }
    });


//    response.writeHead(200, {"Context-Type":"text/plain"});
//    response.write("Hello world!");
//    response.end();
};


var upload = function (response) {
    console.log("upload");

    response.writeHead(200, {"Context-Type":"text/plain"});
    response.write("upload");
    response.end();
};

exports.start = start;
exports.upload = upload;