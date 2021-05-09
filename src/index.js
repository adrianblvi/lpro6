require('dotenv').config();

const app = require('./server');
require('./database');
const SocketIO = require('socket.io')

const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
const io = SocketIO(server);
//require('./sockets/socket')(io);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('fin:user', async () => {
        console.log('Fin');
        socket.broadcast.emit('fin', { continue: false });
    });
    socket.on('inicio:user', () => {
        console.log('hola');
        socket.broadcast.emit('inicio', { continue: true });
    });
    socket.on('data', () => {
        socket.emit('prueba', 'data');
        socket.broadcast.emit('prueba', 'data');
        io.sockets.emit('prueba', 'data');
    });
});


