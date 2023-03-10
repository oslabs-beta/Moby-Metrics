const fs = require('fs');
const http = require('http');
const process = require('process');
const express = require('express');
const logGetter = require('./logGetter.js');

const app = express();

app.get('/hello', (_req, res) => {
  res.send({ message: 'Hello World 3' });
});

// logGetter.getContainers, 
app.get('/logs', (req, res) => {
  res.send(200).json();
});

const sock = process.argv[2];

fs.stat(sock, (err) => {
  if (!err) {
    fs.unlinkSync(sock);
  }
  http.createServer(app).listen(sock, () => {
    fs.chmodSync(sock, '777');
    console.log(`Express server listening on ${sock}`);
  });
});
