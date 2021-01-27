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

function launchGame(game) {
    switch (game) {
        case "flappy-bird":
            socket.emit("module", "flappy-bird");
            document.body.onclick = () => socket.emit("flap");
            break;
    
        case "catch-fruits":
            socket.emit("module", "catch-fruits");
            break;

        case "car":
            socket.emit("module", "car");
            break;

        default:
            console.error("Invalid game \"" + game + "\"");
            break;
    }
}

/** @param {(e: DeviceMotionEvent) => void} cb */
function onDeviceMotion(cb) {
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            window.addEventListener('devicemotion', cb);
        } else alert("Permission " + response);
    }).catch(alert);
}

/** @param {(e: DeviceOrientationEvent) => void} cb */
function onDeviceOrientation(cb) {
    DeviceOrientationEvent.requestPermission().then(response => {
        if (response == 'granted') {
            window.addEventListener('deviceorientation', cb);
        } else alert("Permission " + response);
    }).catch(alert);
}

function catchFruits() {
    
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            alert("Permission granted")
            window.addEventListener('devicemotion', e => {
                socket.emit('motion', e.accelerationIncludingGravity)
            });
        } else alert("Permission " + response);
    }).catch(alert);

    launchGame("catch-fruits")

}

function car() {
    DeviceOrientationEvent.requestPermission().then(response => {
        if (response == 'granted') {
            window.addEventListener('deviceorientation', e => socket.emit({ alpha: e.alpha, beta: e.beta, gamma: e.gamma }));
        } else alert("Permission " + response);
    }).catch(alert);

    
    launchGame("car")
}