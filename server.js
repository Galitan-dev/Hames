const express = require('express');
const device = require('express-device');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { generateId } = require('./utils');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const PORT = process.env.PORT || 200;

app.use(express.static(path.join(__dirname, "public"), { index: false, extensions: ["html"] }));
app.use(device.capture());
app.use(cookieParser());

app.all(/\/[ABCDEF]{4}/g, (req, res) => {

    res.cookie("id", req.url.substr(1));
    res.redirect("/");

});

app.get('/', (req, res) => {

    if (req.device.type == "phone") {
        if (req.cookies.id != null) res.sendFile(path.join(__dirname, "public", "mobile.html"));
        else res.sendFile(path.join(__dirname, "public", "scan.html"));
    } 
    
    else res.sendFile(path.join(__dirname, "public", "desktop.html"));

});

let desktops = {};

io.on('connection', /** @type {(socket: socketIo.Socket) => null} */ socket => {

    socket.on('identify', device => { if (device == "desktop") {
        const id = generateId(4, Object.values(desktops));
            desktops[id] = { socket, id, appeared: false };

        socket.emit('id', id);
    }});

    socket.on('appear', id => {

        if (!desktops[id]) return socket.emit("invalid id");
        if (desktops[id].appeared) return socket.emit("already appeared");
            desktops[id].appeared = true;

        const phone = socket;
        /** @type {socketIo.Socket} */
        const desktop = desktops[id].socket;

        phone.emit("appeared");
        desktop.emit("appeared");

        phone.on('disconnect', () => {
            desktop.emit("disappeared");
        });

        phone.onAny(desktop.emit.bind(desktop));
        desktop.onAny(phone.emit.bind(phone));

    });

})

server.listen(PORT, () => console.log('Server listening on port ' + PORT));