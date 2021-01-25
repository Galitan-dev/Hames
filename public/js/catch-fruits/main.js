import Basket from "./Basket.js";

const basket = new Basket();

window.draw = function () {
    background("#403b3f");
    basket.draw();
}

window.socket.on("motion", acceleration => basket.applyAcceleration(acceleration.y));