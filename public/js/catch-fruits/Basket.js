export default class {

    constructor() {

        this.x = width / 2;
        this.y = height;

        this.height = 100;
        this.width = 250;

        this.color = "#f1b841";

    }

    draw () {
        
        fill(this.color);
        rect(this.x - this.width / 2, this.y - this.height, this.width, this.height);

    }
    
    move (x) {

        this.x += x;

        if (this.x + this.width / 2 > width) {
            this.x = width - this.width / 2;
        } else if (this.x - this.width / 2 < 0) {
            this.x = 0 + this.width / 2;
        }

    }

    applyAcceleration(acceleration) {
        if (Math.abs(acceleration) < 1) return

        this.x += acceleration * 10;
    }

}