export default class {

    constructor () {

        this.x = width / 2;
        this.y = 0;
        this.width = width * 3;
        this.height = height * 3;

        this.image = loadImage("assets/images/road.jpg")

    }

    draw () {
        
        image(this.image, this.x - this.width / 2, this.y - height / 3 * 2, this.width, this.height);

    }

    move(x) {
        
        this.x -= x;
    }
    
}