import SteerWheel from "./SteerWheel.js";
import Road from "./Road.js";

const road = window.road = new Road(),
    steerWheel = window.wheel = new SteerWheel(road);
    
window.draw = function () {

    background("#403b3f");

    steerWheel.update();

    road.draw();
    steerWheel.draw();

}

window.socket.on("orientation", orientation => steerWheel.rotate(orientation.alpha, 0));