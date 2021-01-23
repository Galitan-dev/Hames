const socket = window.socket = io();
socket.on('connect', () => {
    socket.emit('identify', "desktop");
});

var qrcode = null;

socket.on('id', id => {
    document.getElementById('id').innerHTML = id;

    var url = "http://" + window.location.host + "/" + id;

    if (!qrcode) {
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text: url,
            width: document.getElementById("qrcode").getBoundingClientRect().height,
            height: document.getElementById("qrcode").getBoundingClientRect().height,
            colorDark : "#f1b841",
            colorLight : "#403b3f",
            correctLevel : QRCode.CorrectLevel.H
        });
    } else window.qrcode.makeCode(url);
});

socket.on('appeared', () => {
    document.getElementById('id').hidden = true;
});

socket.on('disappeared', () => {
    window.location.reload();
});

socket.on('module', moduleName => importModule(moduleName))

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function importModule(moduleName) {
    const node = document.createElement("script");
        node.src = "js/" + moduleName + "/main.js";
        node.type = "module";
    
    document.getElementById("modules").innerHTML = "";
    document.getElementById("modules").appendChild(node);
    
}