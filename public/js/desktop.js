const socket = io();
socket.on('connect', () => {
    socket.emit('identify', "desktop");
});

var qrcode = null;

socket.on('id', id => {
    document.getElementById('id').innerHTML = id;

    if (!qrcode) {
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text: id,
            width: document.getElementById("qrcode").getBoundingClientRect().height,
            height: document.getElementById("qrcode").getBoundingClientRect().height,
            colorDark : "#f1b841",
            colorLight : "#403b3f",
            correctLevel : QRCode.CorrectLevel.H
        });
    } else window.qrcode.makeCode(id)
});

socket.on('appeared', () => {
    document.getElementById('id').hidden = true;
});

socket.on('flappy bird', async () => {
    window.draw = (await (await import('./flappy-bird/main.js')).main(socket));
})

socket.on('disappeared', () => {
    window.location.reload();
});

socket.on('p5', (fn, ...args) => {
    if (typeof window[fn] != "function") return console.log(fn);
    window[fn].call(window, args)
});

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}