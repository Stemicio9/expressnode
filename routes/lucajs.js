import express from 'express'
import im from 'imagemagick'
import moment from 'moment-timezone'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const date = moment().tz('Europe/Rome').format('HH:mm');
  im.convert(`-background lightblue -fill blue -font Digital7.ttf -size 256x256 caption:${date} png:-`.split(' '), function (err, data) {
    if (err) res.status(501).send(err);
    var img = Buffer.from(data, 'ascii');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img); 
  });
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})