export default class Pipe {

    constructor (bird) {

        this.bird = bird;

        this.x = width;
        this.width = 40;

        this.speed = 3;

        this.minimalSize = height / 10;
        this.top = this.minimalSize + (Math.random() * (height - (bird.height + 50) - this.minimalSize * 2));
        this.bottom = height - this.top - (bird.height + 50 + Math.random() * 200);

        this.color = color(213, 211, 212);
        this.hitColor = color(255, 105, 97);

    }

    draw () {

        fill(this.collision ? this.hitColor : this.color);
        rect(this.x, 0, this.width, this.top);
        rect(this.x, height - this.bottom, this.width, this.bottom);

    }

    update () {

        this.x -= this.speed;

    }

    get offscreen () {
        return this.x < -this.width;
    }

    get collision () {
        return inRange(this.bird.x, this.x, this.width) && (
            inRange(this.bird.y, 0, this.top) ||
            inRange(this.bird.y, height - this.bottom, this.bottom)
        )
    }

}

function inRange(n, start, length) {
    return n >= start && n <= start + length;
}