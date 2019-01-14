const express = require('express');
const formidable = require('formidable');
const SoxCommand = require('sox-audio');
const uuid = require('uuid');
const app = express();
const port = 1235;
const UPLOAD_DIR = `${__dirname}/uploads`;
const OUTPUT_DIR = `${__dirname}/output`;
const getStartTime = require('./lib/get-start-time');
const getEndTime = require('./lib/get-end-time');

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function(name, file) {
    console.log('name', name);
    file.path = `${UPLOAD_DIR}/${name}.mp3`;
  });

  form.on('file', function(name, file) {
    console.log('Uploaded ' + file.name);
  });

  res.send('Success!');
});

app.post('/mix', (req, res, next) => {
  const data = req.body;
  const command = SoxCommand();
  data.forEach(meta => {
    const inFile = `${UPLOAD_DIR}/${meta.id}.mp3`;
    const subCommand = SoxCommand()
      .input(inFile)
      .output('-p')
      .outputFileType('mp3')
      .trim(getStartTime(meta), getEndTime(meta))
      .addEffect('fade', ['h', '0:5', '0', '0:5']);
    command.inputSubCommand(subCommand);
  });
  command.output(`${OUTPUT_DIR}/${uuid.v1()}.mp3`).concat();

  command.on('start', commandLine => {
    console.log('Spawned sox with command: ' + commandLine);
  });
  command.on('progress', progress => {
    console.log('Processing progress: ', progress);
  });
  command.on('error', (err, stdout, stderr) => {
    console.log('Cannot process audio: ' + err.message);
    console.log('Sox Command Stdout: ', stdout);
    console.log('Sox Command Stderr: ', stderr);
    next(err.message);
  });
  command.on('end', () => {
    console.log('Sox command succeeded!');
    res.send('Success!');
  });

  command.run();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
