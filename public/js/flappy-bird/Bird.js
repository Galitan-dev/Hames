export default class Bird {

    constructor () {

        this.x = width / 3;
        this.y = height / 2;
        this.width = 50;
        this.height = 50;

        this.force = 10;
        this.velocity = 5;
        this.gravity = .25;

        this.color = "#f1b841";

    }

    draw () {

        fill(this.color);
        ellipse(this.x, this.y, this.width, this.height);

    }

    flap (force = this.force) {

        this.velocity = force;

    }

    update() {

        this.velocity -= this.gravity / 2;
        this.y -= this.velocity;

        if (this.y > height - this.height / 2) { 
            this.y = height - this.height / 2;
        } else if (this.y < this.height / 2) {
            this.y = this.height / 2;
            this.velocity = 0; 
        }

    }

}