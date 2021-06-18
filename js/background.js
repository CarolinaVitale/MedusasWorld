class Background {

    constructor(ctx, width, height, imgSource) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.imageInstance = new Image();
        this.imageInstance.src = imgSource;

        this.posX = 0;
        this.posY = 0;

        this.velX = 1;
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.imageInstance, this.posX + this.width, this.posY, this.width, this.height);
        this.move()
    }

    move() {
        if (this.posX <= -this.width) {
            this.posX = 0;
        }
        this.posX -= this.velX;
    }
}