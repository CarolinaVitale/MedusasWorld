class Power {

    constructor(ctx, gameWidth, gameHeight) {
        this.ctx = ctx
        this.width = 30
        this.height = 30
        this.posX = gameWidth
        this.posY = this.height
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        
      

        this.imageInstance = new Image()
        this.imageInstance.src = './img/power.png'

        this.velX = -13
        this.velY = 13

        this.gravity = -8
    }
        
    draw() {
    
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.move()
    }


    move() {
        this.posX += this.velX
        this.posY += this.velY

        this.velY += this.gravity

        if (this.posY <= 500) {
            this.velY *= -0.5
        }
    }
}