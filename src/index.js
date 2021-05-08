require('dotenv').config();

const app = require('./server');
require('./database');
const SocketIO = require('socket.io')

const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
const io = SocketIO(server);
require('./sockets/socket')(io);




