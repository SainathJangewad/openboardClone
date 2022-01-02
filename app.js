const express = require('express');
const socket = require('socket.io');
const app = express();


app.use(express.static('public'));

let server = app.listen('3000',(e)=>{
    console.log('server listening on 3000 ....');
})

let io = socket(server);

io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('beginPath',(data)=>{
        io.sockets.emit('beginPath',data);

    })


    socket.on('drawStroke',(data)=>{
        io.sockets.emit('drawStroke',data);
    })


    socket.on('redoundo',(data)=>{
        io.sockets.emit('redoundo',data);
    })

    socket.on('colorandwidth',(data)=>{
        io.sockets.emit('colorandwidth',data);
    })
    
    socket.on('pencilWidth',(data)=>{
        io.sockets.emit('pencilWidth',data);
    })

    socket.on('pencilColor',(data)=>{
        io.sockets.emit('pencilColor',data);
    })

    socket.on('eraserWidth',(data)=>{
        io.sockets.emit('eraserWidth',data);
    })

})


 