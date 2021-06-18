class Player {

    constructor(ctx, gameWidth, gameHeight) {

        this.ctx = ctx

        this.width = 170
        this.height = 150

        this.imageInstance = new Image()
        this.imageInstance.src = './img/player.png'

        this.imageInstance.frames = 24
        this.imageInstance.framesIndex = 0

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.posX = 50
        this.posY = this.gameHeight - this.height - 70
        this.posYZero = this.posY

        this.velY = 1
        this.gravity = 0.4
        
        this.bullets = []
        this.life = 5
        this.invincible = false
        this.jumpSound = new Audio('./sounds/jump.mp3')
        this.shootSound = new Audio('./sounds/shoot.mp3')
        

        this.setListeners()
    }

    draw(framesCounter) {

        this.walk(framesCounter)

        this.move()

        this.bullets.forEach(bullet => bullet.draw()) 
        this.clearBullets()
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
        if (framesCounter % 2 == 0) {
            this.imageInstance.framesIndex++
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0
        }
    }

    move() {
        if (this.posY < this.posYZero) {   
            this.posY += this.velY;
            this.velY += this.gravity;
        } else {
            this.posY = this.posYZero;
            this.velY = 1        }
    }

    setListeners() {

        document.addEventListener("keydown", e => {

            switch (e.code) {
                case "ArrowUp":
                    this.jump()
                    this.jumpSound.play()
                    break
                case "ArrowRight":
                    this.shoot()
                    this.shootSound.play()
                    break
            }
        });
    }

    jump() {
        if (this.posY >= this.posYZero) {
            this.posY -= 135;
            this.velY -= 8;
        }
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posYZero, this.width, this.height));
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth)
    }
}