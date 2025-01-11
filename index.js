const http = require('http');

const server = http.createServer(function (req, res) {
    console.log(req.url);
    console.log(req.method);
    res.writeHead(200, { "content-type": "application/json" });
    res.json({ "Hi": "everyone" });
});

server.listen(5050, () => {
    console.log("listening on 5050...")
});
