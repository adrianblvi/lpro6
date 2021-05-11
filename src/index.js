require('dotenv').config();

const app = require('./server');
require('./database');
const SocketIO = require('socket.io')

const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
const io = SocketIO(server);
//require('./sockets/socket')(io);

let bd = false;
let intmode = false;
let trmode = false;
let simmode = false;
const Intervention = require('./models/Intervention');
const IntData = require('./models/InterventionData');
const Simulacrum = require('./models/Simulacrum');
const SimData = require('./models/SimulacrumData');
const Training = require('./models/Training');
const TrData = require('./models/TrainingData');


io.on('connection', (socket) => {
    socket.on('fin:user', async () => {
        console.log('Fin');
        bd = false;
        intmode = false;
        trmode = false;
        simmode = false;
        socket.broadcast.emit('fin', { continue: false });
    });
    socket.on('inicio:user', (mode) => {
        bd = true;
        if (mode == 'Intervention') {
            console.log('Intervention mode');
            intmode = true;
        } else if (mode == 'Simulacrum') {
            console.log('Simulacrum mode');
            simmode = true;
        } else if (mode == 'Training') {
            console.log('Training mode');
            trmode = true;
        }
        socket.broadcast.emit('inicio', { continue: true });
    });
    socket.on('data', async (datos) => {
        const recv = datos.data;
        if (!(recv == undefined)) {
            const tempint = recv.substring(0, 2);
            let tempint_parse = parseInt(tempint, 16);
            const tempext = recv.substring(2, 4);
            let tempext_parse = parseInt(tempext, 16);
            const caida = recv.substring(4, 6);

            //Calculo de temperatura!

            const config_thermistor_resistor = 99001
            const resistencia_ti = config_thermistor_resistor * ((1023.0 / tempint_parse) - 1)
            tempint_parse = Math.log(resistencia_ti)
            tempint_parse = (1 / (0.001129148 + (0.000234125 * tempint_parse) + (0.0000000876741 * tempint_parse * tempint_parse * tempint_parse))) - 273.15
            const resistencia_te = config_thermistor_resistor * ((1023.0 / tempext_parse) - 1)
            tempext_parse = Math.log(resistencia_te)
            tempext_parse = (1 / (0.001129148 + (0.000234125 * tempext_parse) + (0.0000000876741 * tempext_parse * tempext_parse * tempext_parse))) - 273.15

            //Fin calculo

            const caida_parse = parseInt(caida, 16);
            const pulso = recv.substring(6, 8);
            const pulso_parse = parseInt(pulso, 16)
            if (bd) {
                console.log('bd es true');
                if (intmode) {
                    const interventions = await Intervention.find();
                    const int_id = interventions[interventions.length - 1].id;
                    const bombero_id = interventions[interventions.length - 1].id_bombero;
                    const date = new Date();
                    const datetime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    const newData = new IntData({
                        id_bombero: bombero_id,
                        id_intervention: int_id,
                        pulso: pulso_parse,
                        temp_int: tempint_parse.toFixed(2),
                        temp_ext: tempext_parse.toFixed(2),
                        caida: caida_parse,
                        date: datetime
                    });
                    const dataAdd = await newData.save();
                } else if (simmode) {
                    const simulacrums = await Simulacrum.find();
                    const int_id = simulacrums[simulacrums.length - 1].id;
                    const bombero_id = simulacrums[simulacrums.length - 1].id_bombero;
                    const date = new Date();
                    const datetime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    const newData = new SimData({
                        id_bombero: bombero_id,
                        id_simulacrum: int_id,
                        pulso: pulso_parse,
                        temp_int: tempint_parse.toFixed(2),
                        temp_ext: tempext_parse.toFixed(2),
                        caida: caida_parse,
                        date: datetime
                    });
                    const dataAdd = await newData.save();
                } else if (trmode) {
                    const trainings = await Training.find();
                    const int_id = trainings[trainings.length - 1].id;
                    const bombero_id = trainings[trainings.length - 1].id_bombero;
                    const date = new Date();
                    const datetime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    const newData = new TrData({
                        id_bombero: bombero_id,
                        id_training: int_id,
                        pulso: pulso_parse,
                        temp_int: tempint_parse.toFixed(2),
                        temp_ext: tempext_parse.toFixed(2),
                        caida: caida_parse,
                        date: datetime
                    });
                    const dataAdd = await newData.save();
                }
            } else {
                console.log('bd es false');
            }
            socket.broadcast.emit('prueba', { 'tempint': tempint_parse.toFixed(2), 'tempext': tempext_parse.toFixed(2), 'pulso': pulso_parse, 'caida': caida_parse });
        }
    });
});


