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
        qrScanner = new QrScanner(videoElem, result => alert(esult));

    qrScanner.start();
}