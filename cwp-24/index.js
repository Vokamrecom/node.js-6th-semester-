const app=  require('express')();
const http = require('http').Server(app);
const path = require('path');
const io= require('socket.io')(http);
const express =  require('express');
const Worker = require('./worker');
const worker = new Worker();


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.join('buy');
    socket.join('sell');

    socket.emit('codes', Object.keys(worker.getData()));

    socket.on('btc', ({ code, interval }) => {
        if (socket.intervalId) {
            clearInterval(socket.intervalId);
        }

        worker.setInterval(interval);

        socket.intervalId = setInterval(() => {
            socket.emit('btc', worker.getData(code));
        }, interval);
    });

    socket.on('message', ({ room, message }) => {
        if (room === 'buy' || room === 'sell') {
            socket.nsp.to(room).emit('message', {
                room,
                message,
                id: socket.id,
            });
        }
    });

    socket.on('disconnect', () => {
        clearInterval(socket.intervalId);
    });
});
worker.start();
http.listen(3000);
console.log("http://localhost:3000/");








