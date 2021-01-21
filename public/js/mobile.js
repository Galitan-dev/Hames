import QrScanner from "../libraries/qr-scanner.min.js";




// ################ SCANNER ################ \\

QrScanner.WORKER_PATH = "../libraries/qr-scanner-worker.min.js";

const videoElem = document.getElementById("scanView"),
    qrScanner = new QrScanner(videoElem, setResult, setResult);

qrScanner.start();

function setResult(result) {
    document.getElementById("result").innerHTML = result;
}




// ################# SOCKET ################# \\

const socket = io();

socket.on('already appeared', () => {
    alert("Cet appareil est déjà jumelé !");
});

socket.on('appeared', () => {
    document.write("");

    socket.emit('flappy bird');
    document.onclick = () => socket.emit("flap", 15);
});