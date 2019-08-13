// https://blog.risingstack.com/your-first-node-js-http-server/

const http = require('http');

const port = process.env.PORT || 3000;

const requestHandler = (req, res) => {
  console.log(req.url);
  const realIp = req.headers["x-real-ip"];
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  const ips = `${realIp}
${ip}
  `
  res.end(ips);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    console.log('Something bad happened', err);
    return;
  }

  console.log(`server is listening on ${port}`);
});



