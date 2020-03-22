const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

http.createServer(function(request, response) {
  console.log("request come", request.headers.host);
  const html = fs.readFileSync("test.html", "utf-8");
  const img = fs.readFileSync("test.jpg");

  if (request.url === "/") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Encoding": "gzip",
      "Connection": "close",
      "Link": "</test.jpg>; as=image; rel=preload"
    });
    response.end(zlib.gzipSync(html));
    // response.end(html);
  } else {
    response.writeHead(200, {
      "Content-Type": "image/jpg",
    });
    response.end(img);
  }
}).listen(8888);

console.log("listen port 8888");
