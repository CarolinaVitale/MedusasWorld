// window.onload = () => {
//     finishGame()

// }


class Finish {

    constructor(ctx, gameWidth, playerPosYZero, playerHeight) {
        this.ctx = ctx
        this.width = 200
        this.height = 200
        this.posX = gameWidth + this.width
        this.posY = playerPosYZero + playerHeight - this.height
        this.gameWidth = gameWidth
       

        this.imageInstance = new Image()
        this.imageInstance.src = './img/finish.png'

        this.velX = -5
    }

    draw() {
        
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.move()
    }


    move() {
        this.posX += this.velX
    }
}