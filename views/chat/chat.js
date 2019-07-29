const socket = io();
socket.on('send-client', msg => {
    document.getElementById('chat').innerHTML += msg;
});
const enviar = () => {
    const nome = document.getElementById('nome').value;
    const msg = document.getElementById('msg').value;

    socket.emit('send-server', { nome, msg });

    document.getElementById('msg').value = '';
};