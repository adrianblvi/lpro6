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
    socket.on('data', (datos) => {
        const recv = datos.data;
        console.log(recv);
        const tempint = recv.substring(0, 2);
        //console.log('Temperatura Interior:', parseInt(tempint, 16));
        let tempint_parse = parseInt(tempint, 16);
        const tempext = recv.substring(2, 4);
        //console.log('Temperatura Exterior:', parseInt(tempext, 16));
        let tempext_parse = parseInt(tempext, 16);
        const caida = recv.substring(4, 6);

        //Calculo de temperatura!

        const config_thermistor_resistor = 99001
        const resistencia_ti = config_thermistor_resistor * ((1023.0 / tempint_parse) - 1)
        tempint_parse = Math.log(resistencia_ti)
        tempint_parse = (1 / (0.001129148 + (0.000234125 * tempint_parse) + (0.0000000876741 * tempint_parse * tempint_parse * tempint_parse))) - 273.15
        console.log('TI:', tempint_parse);
        const resistencia_te = config_thermistor_resistor * ((1023.0 / tempext_parse) - 1)
        tempext_parse = Math.log(resistencia_ti)
        tempext_parse = (1 / (0.001129148 + (0.000234125 * tempext_parse) + (0.0000000876741 * tempext_parse * tempext_parse * tempext_parse))) - 273.15
        console.log('TE:', tempext_parse);
        console.log('Caida:', parseInt(caida, 16));
        const caida_parse = parseInt(caida, 16);
        const pulso = recv.substring(6, 8);
        const pulso_parse = parseInt(pulso, 16)
        console.log('Pulso:', parseInt(pulso, 16));
        socket.broadcast.emit('prueba', { 'tempint': tempint_parse, 'tempext': tempext_parse, 'pulso': pulso_parse, 'caida': caida_parse });
    });
});


