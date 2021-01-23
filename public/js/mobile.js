const socket = io();

socket.on('already appeared', () => {
    alert("Cet appareil est déjà jumelé !");
});

socket.on('appeared', () => {
    socket.emit('module', "catch-fruits");

    var button = document.createElement("button");
        button.innerHTML = "Catch fruits";
        document.appendChild(button);

    getDeviceMotion(button, e => socket.emit("motion", e.acceleration);
});

function main () {
    const id = parseCookie(document.cookie).id;
    if (!id) window.location.replace("http://" + window.location.host + "/scan.html");

    socket.emit('appear', id);
}

/**
 * @param {HTMLButtonElement} button 
 * @param {(e: DeviceMotionEvent) => null} cb 
 */
function getDeviceMotion(button, cb) {

    button.onclick = function () {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == 'granted') {
                window.addEventListener("devicemotion", cb);
            }
        });
    }

}