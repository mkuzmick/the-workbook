// server/socketServer.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 3000;

// In-memory store
let adjustments = {
  exposure: 0,
  contrast: 1,
  // Add more
};

let imageData = null; // could store as a base64 string, or handle it differently

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIO(httpServer);

  console.log('Socket server starting...');
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Send current adjustments & image to new client
    socket.emit('initialState', { adjustments, imageData });

    // Listen for adjustments
    socket.on('updateAdjustments', (newAdjustments) => {
      adjustments = { ...adjustments, ...newAdjustments };
      // Broadcast to all connected clients
      io.emit('adjustmentsUpdated', adjustments);
    });

    // Listen for new image
    socket.on('updateImage', (newImageData) => {
      imageData = newImageData;
      // Broadcast new image
      io.emit('imageUpdated', imageData);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Use Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on http://localhost:${port}`);
  });
});
