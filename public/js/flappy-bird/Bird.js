export class Bird {

    constructor () {

        this.x = width / 10;
        this.y = height / 2;
        this.width = 50;
        this.height = 50;

        this.force = 15;
        this.velocity = 5;
        this.gravity = .5;

        this.color = "#f1b841";

    }

    draw () {

        fill(this.color);
        ellipse(this.x, this.y, this.width, this.height);

    }

    flap (force) {

        this.velocity = force;

    }

    update() {

        this.velocity -= this.gravity;
        this.y -= this.velocity;

        if (this.y > height) { 
            this.y = height - this.height / 2;
        } else if (this.y < 0) {
            this.y = 0 + this.height / 2;
            this.velocity = 0; 
        }

    }

}