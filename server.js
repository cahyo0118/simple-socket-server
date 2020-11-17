const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
});

app.get('/', (req, res) => {
    console.log('get-req', req.query);

    res.send(req.query);
});

app.post('/notify-to', (req, res) => {
    console.log('notify-to-req', req.query);

    if (req.query.socket_id) {

        // Realtime Message
        io.to(req.query.socket_id).emit(req.query.event_name, req.query);

        // Notification
        io.to(req.query.socket_id).emit('notification', req.query);

    } else if(req.query.socket_ids) {

        JSON.parse(req.query.socket_ids).forEach(socket_id => {
            // Realtime Message
            io.to(socket_id).emit(req.query.event_name, req.query);
    
            // Notification
            io.to(socket_id).emit('notification', req.query);
        });
    }

    res.send(req.query);
});


server.listen(3000, () => {
    console.log('SERVER RUNNING ON PORT 3000');
});


