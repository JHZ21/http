const http = require("http");
const fs = require("fs");

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

http
  .createServer(function(request, response) {
    console.log("request come", request.url);
    const html = fs.readFileSync("test.html", "utf-8");

    if (request.url === "/") {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(html);
    }

    if (request.url === "/data") {
      wait(2).then(() => {
        response.writeHead(200, {
					"Cache-Control": "s-maxage=200",
					"Vary": "X-Test-Cache"
        });
        response.end("success");
      });
    } else {
      response.end();
    }
  })
  .listen(8888);

console.log("listen port 8888");
