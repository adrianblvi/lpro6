const socket = io();

let tempExt = document.getElementById('tempExt');
let tempInt = document.getElementById('tempInt');
let btnFin = document.getElementById('btnFin');
let btnIni = document.getElementById('btnIni');

wait(5000);
console.log('id:', socket.id);
socket.emit('inicio:user', 'data');

btnIni.addEventListener('click', () => {
    socket.emit('inicio:user', 'Crear nueva Int');
});

btnFin.addEventListener('click', () => {
    console.log(socket);
    socket.emit('fin:user', 'fin');
});

socket.on('prueba', () => {
    console.log('a ver');
});

