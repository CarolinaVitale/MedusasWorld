class Attack {

    constructor(ctx, enemyPosX, enemyPosY, enemyPosYZero, enemyHeight) {
        this.ctx = ctx
        this.width = 25
        this.height = 25
        this.posX = enemyPosX 
        this.posY = enemyPosY 


        this.enemyPosYZero = enemyPosYZero - this.height
        this.enemyHeight = enemyHeight 

        this.imageInstance = new Image()
        this.imageInstance.src = './img/attack.png'

        this.velX = - 10
        this.velY = 4

        this.gravity = 0.5
    }


    draw() {

        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)

        this.move()
    }

    move() {
        this.posX += this.velX
        this.posY += this.velY

        this.velY += this.gravity

        if (this.posY >= this.enemyPosYZero + this.enemyHeight) {
            this.velY *= -1
        }
    }

}
