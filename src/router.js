var route = function (handle, pathname, response) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === "function") {
        handle[pathname](response);
    }
    else {
        console.log("No request handler found!");
        response.writeHead({"ContextType":"text/plain"});
        response.write("404 not found.");
        response.end();
    }
};

exports.route = route;