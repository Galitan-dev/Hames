import QrScanner from "../libraries/qr-scanner.min.js";
QrScanner.WORKER_PATH = "../libraries/qr-scanner-worker.min.js';

const socket = io();

socket.on('already appeared', () => {
    alert("Cet appareil est déjà jumelé !");
});

socket.on('appeared', () => {
    document.write("");

    socket.emit('flappy bird');
    document.onclick = () => socket.emit("flap", 15);
});

function main() {
    const videoElem = document.getElementById("scanView"),
        qrScanner = new QrScanner(videoElem, setResult, setResult);

    qrScanner.start();
}

function setResult(result) {
    document.getElementById("result").innerHTML = result;
}