var bird,
    pipes = [];

var Pipe;

export async function main(socket) {

    bird = new (await import('./Bird.js')).Bird();

    Pipe = (await import('./Pipe.js')).Pipe;
        pipes.push(new Pipe(bird));

    socket.on('flap', force => {
        bird.flap(force);
    });

    return update;

}

function update() {

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