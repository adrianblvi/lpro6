const Intervention = require('../models/Intervention');


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Connected', socket.id);
        socket.on('fin:user', async () => {
            console.log('Fin');
            socket.broadcast.emit('fin', { continue: false });

        });
        socket.on('inicio:user', () => {
            socket.broadcast.emit('inicio', { continue: true });
        });
        socket.on('data', () => {
            console.log('data')
            socket.broadcast.emit('data:newdata', 'data');
            io.sockets.emit('data:newdata', 'data');
        });
    });

}
