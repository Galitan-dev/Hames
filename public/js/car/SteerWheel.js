import Road from "./Road.js";

export default class {


    /** @param {Road} road */
    constructor (road) {

        this.road = road;

        this.x = width / 2;
        this.y = height / 7 * 6;
        this.diameter = height / 1.8; 

        this.orientation = 0;

        this.image = loadImage("assets/images/steeringWheel.png");

    }

    update () {

        let normalizedOrientation = this.orientation;

        this.road.move(normalizedOrientation / 90 * 5);

    }

    draw () {

        translate(this.x, this.y);
        rotate(Math.PI * (this.orientation / 360 * 2));
        image(this.image, -this.diameter / 2, -this.diameter / 2, this.diameter, this.diameter);

    }

    rotate(angle, base = this.orientation) {
        this.orientation = base + angle;

        if (this.orientation > 90) this.orientation = 90;
        if (this.orientation < -90) this.orientation = -90;
    }


}