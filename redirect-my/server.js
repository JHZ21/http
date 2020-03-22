const http = require("http");

http.createServer(function (request, response) {
    console.log("request come", request.url);

    if (request.url === "/") {
        // response.writeHead(200)
        response.writeHead(301, {
            "Location": "/new",
            // "Cache-Control": "no-cache"
        })
        response.end()
    } 
    if (request.url === "/new") {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        })

        response.end("Go WuHan !!!")
    }
}).listen(8888);

console.log("listen port 8888");