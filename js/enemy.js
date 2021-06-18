
class Enemy {
    constructor(ctx, gameWidth, playerPosYZero, playerHeight) {

        this.ctx = ctx;
        this.width = 80
        this.height = 80

        this.imageInstance = new Image()
        this.imageInstance.src = './img/enemy.png'

        this.imageInstance.frames = 7
        this.imageInstance.framesIndex = 0

        this.gameWidth = gameWidth
        
       
        this.posX = gameWidth
        this.posY = playerPosYZero + playerHeight - this.height

        this.posYZero = this.posY
        
        this.velY = 1
        this.gravity = 0.4

        this.velX = 3
    }

    draw(framesCounter) {
        
        this.walk(framesCounter)
        this.move()
        
    }

    walk(framesCounter) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
            0,
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            this.imageInstance.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        )

        this.animateSprite(framesCounter)
    }
    
    animateSprite(framesCounter) {
        if (framesCounter % 3 == 0) {
            this.imageInstance.framesIndex++
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0
        }
    }

    move() {
        this.posX -= this.velX
    }

    
    shoot() {
      
            return new Attack(this.ctx, this.posX, this.posY, this.posYZero, this.width, this.height)
        
    }

}



class Enemy2 extends Enemy {
    constructor(ctx, gameWidth, playerPosYZero, playerHeight) {
        super(ctx, gameWidth, playerPosYZero, playerHeight)
       
        this.height = 60
        this.width = 60
        this.posY = playerPosYZero + playerHeight - this.height
        this.velX = 5
        this.imageInstance.frames = 6
       
        this.imageInstance.src = './img/enemy2.png'
    }

    shoot() {}
}