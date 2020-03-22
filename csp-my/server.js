const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    console.log("request come", request.url);
    const html = fs.readFileSync("test.html", "utf-8");

    if (request.url === "/") {
        response.writeHead(200, {
            "Content-Type": "text/html",
            // "Content-Security-Policy": "script-src \'self\' https://dss0.bdstatic.com; form-action \'self\'; report-uri /report"
        })
        response.end(html);
    } else {
        response.writeHead(200, {
            "Content-Type": "application/javascript",
        })
        response.end(`console.log("loaded script")`);
    }

}).listen(8888);

console.log("listen port 8888");