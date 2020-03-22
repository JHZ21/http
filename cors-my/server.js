const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    console.log("request come", request.url)
    if (request.url === "/") {
        const html = fs.readFileSync("./test.html", "utf-8");
        response.writeHead(200, {
            "Content-Type": "text/html"
        })
        response.end(html);
    }
    const responseHeader = {
        "Content-Type": "text/javascript",
        "Cache-Control": "max-age=20000, no-store",
        "if-Modified-Since": "1/26",
        "Etag": "qqqq"
    }
    if (request.url === "/script.js") {
        console.log(request.headers);
        const etag = request.headers["if-none-match"];
        if (etag === "qqqq" ) {
            response.writeHead(304, responseHeader)
            response.end();
        }  else {
            response.writeHead(200, responseHeader)
            const js = `console.log("script loaded;")`;
            response.end(js);
        }
  
    }
 
}).listen(8888)

console.log("server listening on 8888");
