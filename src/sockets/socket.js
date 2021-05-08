module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Connected', socket.id);
        socket.emit('inicio', 'inicio');
        socket.on('fin', () => {
            console.log('Fin');
        })
    });

}
