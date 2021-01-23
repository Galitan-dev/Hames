const socket = io();

socket.on('already appeared', () => {
    alert("Cet appareil est déjà jumelé !");
});

socket.on('appeared', () => {
    socket.emit('module', "catch-fruits");

    getDeviceMotion("catch-fruits", e => socket.emit("motion", e.acceleration));
});

function main () {
    const id = parseCookie(document.cookie).id;
    if (!id)
        return; 
        //window.location.replace("http://" + window.location.host + "/scan.html");

    socket.emit('appear', id);
}

/**
 * @param {string} buttonId
 * @param {(e: DeviceMotionEvent) => null} cb 
 */
function getDeviceMotion(buttonId, cb) {

    document.getElementById(buttonId).onclick = function () {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == 'granted') {
                window.addEventListener("devicemotion", cb);
            }
        });
    }

}