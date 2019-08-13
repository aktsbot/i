const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  console.log('-------')
  console.log(req.ip)
  console.log(req.ips)
  console.log(req.hostname)
  console.log('-------')
  return res.send('hooah!')
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`server running on ${PORT}`)
})

