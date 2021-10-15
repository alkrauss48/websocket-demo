const express = require('express');
const http = require('http');
const sanitizeHtml = require('sanitize-html');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// This will allow for 15 messages per 8 seconds
const RATE = 15;
const PER = 8;

const validateRateLimit = () => {
  let lastCheck = new Date();
  const current = new Date();
  const timePassed = Math.floor((current - lastCheck) / 1000);

  let allowance = RATE;

  lastCheck = current;

  allowance += timePassed * (RATE / PER);
  if (allowance > RATE){
    allowance = RATE;
  }

  if (allowance < 1.0){
    return false
  }

  allowance--

  return true;
}

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    if (!validateRateLimit()) {
      return;
    }

    // we tell the client to execute 'message'
    socket.broadcast.emit('message', {
      message: sanitizeHtml(data)
    });
  });
});

server.listen(7070);
