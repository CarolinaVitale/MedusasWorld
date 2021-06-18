class Bullets {

    constructor(ctx, playerPosX, playerPosY, playerPosYZero, playerWidth, playerHeight) {
        this.ctx = ctx
        this.width = 30
        this.height = 30
        this.posX = playerPosX + playerWidth 
        this.posY = playerPosY + playerHeight /4
        

        this.playerPosYZero = playerPosYZero - this.height
        this.playerHeight = playerHeight

        this.imageInstance = new Image()
        this.imageInstance.src = './img/bullets.png'

        this.velX = 10
        this.velY = 1

        this.gravity = 1
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX += this.velX
        this.posY += this.velY

        this.velY += this.gravity

        if (this.posY >= this.playerPosYZero + this.playerHeight) {
            this.velY *= -1
        }
    }

}
