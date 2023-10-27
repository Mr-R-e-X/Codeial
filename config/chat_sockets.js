module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
          origin: 'http://localhost:8000', // Set the allowed origins for WebSocket connections
        }
    });

    io.sockets.on('connection', (socket)=>{
        console.log("new connection received ==>", socket.id);

        socket.on('disconnect', ()=>{
            console.log('Socket Disconnected!');
        });

        socket.on('join_room', (data)=>{
            console.log('chat room joining request received ==>', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        })

        socket.on('send_message', (data)=>{
            io.in(data.chatroom).emit('receive_message', data);
        })
    })
}