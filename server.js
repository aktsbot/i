// https://blog.risingstack.com/your-first-node-js-http-server/
// https://github.com/CITGuru/express-ip/blob/master/index.js

const http = require('http');
const geoip = require('geoip-lite');

const port = process.env.PORT || 3000;

const getIpInfo = (ip) => {
  // IPV6 addresses can include IPV4 addresses
  // So req.ip can be '::ffff:86.3.182.58'
  // However geoip-lite returns null for these
  if (ip.includes('::ffff:')) {
    ip = ip.split(':').reverse()[0]
  }
  const lookedUpIP = geoip.lookup(ip);
  if ((ip === '127.0.0.1' || ip === '::1')) {
    return "THIS IS LOCALHOST!";
  }
  if (!lookedUpIP) {
    return "geoip-lite b0rked";
  }
  return lookedUpIP;
}

const requestHandler = (req, res) => {
  console.log(req.url);
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  const ipInfo = getIpInfo(ip);
  res.end(ipInfo);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    console.log('Something bad happened', err);
    return;
  }

  console.log(`server is listening on ${port}`);
});



