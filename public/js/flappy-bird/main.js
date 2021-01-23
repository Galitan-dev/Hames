import Bird from "./Bird.js";
import Pipe from "./Pipe.js";

var bird,
    pipes = [];

bird = new Bird();
pipes.push(new Pipe(bird));

window.socket.on('flap', force => {
    bird.flap(force);
});

window.draw = function () {

    background(0, 0, 0);

    if (pipes[0].offscreen) pipes.shift();

    pipes.forEach(pipe => {
        pipe.update();
        pipe.draw();
    });

    bird.update();
    bird.draw();

    if (frameCount % 120 == 0) pipes.push(new Pipe(bird));

}