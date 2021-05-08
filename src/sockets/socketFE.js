const socket = io();

let tempExt = document.getElementById('tempExt');
let tempInt = document.getElementById('tempInt');
let btnFin = document.getElementById('btnFin');



btnFin.addEventListener('click', () => {
    socket.emit('fin', 'fin');
});