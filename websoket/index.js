const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const { join } = require('node:path');

const port = 1000;
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

server.listen(port, () => {
    console.log(`Port ${port} running....`)
})