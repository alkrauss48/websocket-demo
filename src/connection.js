// Dependency requires
const { Server } = require('socket.io');
const sanitizeHtml = require('sanitize-html');

// App requires
const { handleRateLimit } = require('./handleRateLimit');

const init = (server) => {
  const io = new Server(server);

  // Handle the websocket connection
  io.on('connection', (socket) => {
    socket.on('message', (data) => {

      // Verify that the rate limit hasn't been exceeded.
      if (!handleRateLimit()) {
        return;
      }

      // Broadcast the message to all clients, making sure
      // to sanitize the content first.
      socket.broadcast.emit('message', {
        message: sanitizeHtml(data)
      });
    });
  });
};

module.exports = {
  init,
}
