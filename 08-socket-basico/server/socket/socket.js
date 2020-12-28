const {io} = require('../server');

io.on('connection', (client) => {
    console.log("Usuario conectado");
    client.emit('enviarMensaje', {
        user: 'Admin',
        message: 'Welcome to the app'
    });
    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        client.broadcast.emit('enviarMensaje', data);
    });
});