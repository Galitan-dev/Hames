const socket = io();

socket.on('already appeared', () => {
    alert("Cet appareil est déjà jumelé !");
});

socket.on('appeared', () => {
    document.querySelectorAll(".game").forEach(e => e.disable = false);
});

function main () {
    const id = parseCookie(document.cookie).id;
    if (!id)
        return; 
        //window.location.replace("http://" + window.location.host + "/scan.html");

    socket.emit('appear', id);
}

/**
 * @param {(e: DeviceMotionEvent) => null} cb 
 */
function getDeviceMotion(cb) {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('devicemotion', (e) => cb(e));
            }
        }).catch(console.error)
    } else {
        window.addEventListener("devicemotion", e => cb(e));
    }
}

function launchGame(game) {
    switch (game) {
        case "flappy-bird":
            socket.emit("module", "flappy-bird");
            document.body.onclick = () => socket.emit("flap");
            break;
    
        case "catch-fruits":
            socket.emit("module", "catch-fruits");
            getDeviceMotion(e => socket.emit("motion", e.acceleration));
            break;

        default:
            console.error("Invalid game \"" + game + "\"");
            break;
    }
}

window.onerror = (e) => alert(e);