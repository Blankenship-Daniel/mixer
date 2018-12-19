const express = require('express');
const formidable = require('formidable');
const ffmpeg = require('fluent-ffmpeg');
const uuid = require('uuid');
const app = express();
const port = 1235;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function(name, file) {
    console.log('name', name);
    file.path = `${__dirname}/uploads/${name}.mp3`;
  });

  form.on('file', function(name, file) {
    console.log('Uploaded ' + file.name);
  });

  res.send('Success!');
});

app.post('/mix', (req, res, next) => {
  const files = req.files;
  for (const key in files) {
    const file = files[key];
    ffmpeg(file.path)
      .audioFilter('afade=t=in:ss=0:d=15') // Fade in first 15 seconds of audio
      .on('error', err => {
        console.log(`An error occurred: ${err.message}`);
        next(err);
      })
      .on('end', () => {
        console.log('Processing finished !');
        res.send('Success!');
      })
      .save(`${__dirname}/${file.name}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
