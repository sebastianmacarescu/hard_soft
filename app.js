"use strict";

var http = require('http')
var express = require('express'),
    app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

/* Include the app engine handlers to respond to start, stop, and health checks. */
//app.use(require('./lib/appengine-handlers'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    'use strict';
    res.sendfile('index.html');
});

server.listen(process.env.PORT || '8080', '0.0.0.0', function () {
    'use strict';
    console.log('listening on *:8080');
});


io.on('connection', function (socket) {
    'use strict';
    console.log('a user connected');
    socket.on('JSON', function(data){
        socket.broadcast.emit('JSON', data);
    });
    socket.on('disconnect', function(data){
        socket.broadcast.emit('devDisconnected', {data:data});
    });
    socket.on('devConnected', function(data){
        socket.broadcast.emit('devConnected', {data:data});
    });
});

