export class Pipe {

    constructor (bird) {

        this.bird = bird;

        this.x = width;
        this.width = 20;

        this.speed = 3;

        this.minimalSize = height / 10;
        this.top = this.minimalSize + (Math.random() * (height - (bird.height + 50) - this.minimalSize * 2));
        this.bottom = height - this.top - (bird.height + 50 + Math.random() * 200);

        this.color = color(213, 211, 212);

    }

    draw () {

        fill(this.color);
        rect(this.x, 0, this.width, this.top);
        rect(this.x, height - this.bottom, this.width, this.bottom);

    }

    update () {

        this.x -= this.speed;

    }

    get offscreen () {
        return this.x < -this.width;
    }

}