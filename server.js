const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
// https://expressjs.com/en/guide/behind-proxies.html
app.enable('trust proxy');

app.get('/', (req, res) => {
  const ip = req.ips.length > 0 ? req.ips[req.ips.length - 1] : req.ip;
  res.set('Content-Type', 'text/plain')
  return res.send(ip)
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`server running on ${PORT}`)
})

