const game = {
    name: '',
    description: '',
    version: '1.0.0',
    author: 'Carolina Vitale y Juan Fuertes',
    width: undefined,
    height: undefined,
    ctx: undefined,
    canvas: undefined,
    enemies: [],
    enemyAttacks: [],
    power: undefined,
    finish: undefined,
    score: 0,
    winner: undefined,

    framesCounter: 0,
    collisionCounter: 0,

    FPS: 60,
    player: undefined,



    init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
    },

    start() {

        this.reset()

        this.interval = setInterval(() => {

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.clear()
            this.drawAll()
            this.enemiesShoot()
            this.player.life <= 0 ? this.gameOver() : null
            this.generatePower()
            
            this.clearPower()
            this.generateEnemies()
            this.clearEnemies()
            this.clearEnemyAttacks()

            if(this.power) this.isPower()
            if(!this.finish) this.isFinish()
            this.isCollisionBullets()
            this.isAttack() 
            this.winnerCup()
            this.gameOver()
            this.isCollision() ? this.removeLife() : null 

        }, 1000 / this.FPS)
    },


    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "./img/bg.png")
        this.background = new Background(this.ctx, this.width, this.height, "./img/bg2.png")
        this.background = new Background(this.ctx, this.width, this.height, "./img/bg3.png")
        this.background = new Background(this.ctx, this.width, this.height, "./img/bg4.png")
        this.player = new Player (this.ctx, this.width, this.height, this.keys)
        this.power = undefined
        this.winCup =  new Image()
        this.winCup.src = './img/winner.png'
        this.gameOverP = new Image()
        this.gameOverP.src = './img/gameover.png'
    },

    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.enemyAttacks.forEach(elm => elm.draw())
        this.enemies.forEach(elm => elm.draw(this.framesCounter))
        if(this.power !== undefined) {
            this.power.draw()
        }
        if (this.finish !== undefined) {
            this.finish.draw()
        }
        this.drawLifes()
        this.drawScore()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        
    },

    generateEnemies() {
        
        if (this.framesCounter % 120 === 0) {
            this.enemies.push(new Enemy(this.ctx, this.width, this.player.posYZero, this.player.height))
        }
        if (this.framesCounter % 120 === 0) {
            this.enemies.push(new Enemy2(this.ctx, this.width, this.player.posYZero, this.player.height))
        }
    },

    enemiesShoot() {
        if (this.framesCounter % 50 === 0) {
            this.enemies.forEach(elm => {
                const enemyBullet = elm.shoot()
                if (enemyBullet !== undefined) {
                    this.enemyAttacks.push(enemyBullet)
                }

            })
        }
    },


    
    generatePower() {

        if (this.collisionCounter === 15 && this.collisionCounter !== 0  && this.power === undefined) {
            this.power = new Power(this.ctx, this.width, this.height)
            this.collisionCounter = 0
        }
    },

    clearEnemies() {
        this.enemies = this.enemies.filter(elm => elm.posX >= 0)
    },

    clearPower() {
        if(this.power !== undefined && this.power.posX < 0) {
        this.power = undefined
        }
    },


    isCollision() {
        return this.enemies.some((elm) => {

            if (this.player.posX + this.player.width >= elm.posX &&
                this.player.posY + this.player.height >= elm.posY &&
                this.player.posX <= elm.posX + elm.width && !this.player.invincible) {
                
                this.removeLife()
                this.player.invincible = true
                setTimeout(() => {
                    this.player.invincible = false
                }, 500);
                return true
            }
            
        })

    },

    isCollisionBullets() {
        return this.enemies.some((enemy, idxEnemies) => {
            return this.player.bullets.some((bullet, idxBullet) => {

                if (
                    bullet.posX >= enemy.posX &&
                    bullet.posY >= enemy.posY &&
                    bullet.posX <= enemy.posX + enemy.width &&
                    bullet.posY <= enemy.posY + enemy.height
                ) {
                    this.collisionCounter++

                    this.enemies.splice(idxEnemies, 1)
                    this.player.bullets.splice(idxBullet, 1)
                    return this.score += 10

                }
            })
        })
    },


    isAttack() {

        return this.enemyAttacks.some((elm) => {

            if (this.player.posX + this.player.width >= elm.posX &&
                this.player.posY + this.player.height >= elm.posY &&
                this.player.posX <= elm.posX + elm.width && !this.player.invincible ) {

                this.removeLife()
                this.player.invincible = true
                setTimeout(() => {
                    this.player.invincible = false
                }, 400);
                return true
            }

        })
    },

    clearEnemyAttacks() {
        this.enemyAttacks = this.enemyAttacks.filter(att => att.posX >= 0)

    },

    isPower() {

        if (this.player.posX + this.player.width >= this.power.posX &&
            this.player.posY + this.player.height >= this.power.posY &&
            this.player.posX <= this.power.posX + this.power.width &&
            this.player.posY <= this.power.posY + this.power.height) {
            this.player.life++ 
            this.power = undefined
            return this.score += 100
        }
    },

    drawLifes() {
        const lifeImage = new Image()
        lifeImage.src = './img/life.png'
        for (let i = 1; i <= this.player.life; i++) {
            this.ctx.drawImage(lifeImage, i * 55, 30, 50, 50)
            
        }
    },

    removeLife() {
        return this.player.life -= 1
    },

    gameOver() {
        if(this.player.life <= 0) {
            this.ctx.drawImage(this.gameOverP, 0, 0, this.width, this.height)
            clearInterval(this.interval)
        }
    },

    drawScore() {
        let text ='SCORE: ' + this.score
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'purple'
        this.ctx.fillText(text, this.width - 200, 50)
    },



    isFinish() {
        console.log(this.score, 'score')
        if (this.score >= 200) {
            this.finish = new Finish(this.ctx, this.width, this.player.posYZero, this.player.height)
        }
    },

    winnerCup() {
        if(this.finish !== undefined){
            if (this.player.posX + this.player.width >= this.finish.posX &&
                this.player.posY + this.player.height >= this.finish.posY &&
                this.player.posX <= this.finish.posX + this.finish.width &&
                this.player.posY <= this.finish.posY + this.finish.height) {
                this.ctx.drawImage(this.winCup, 0, 0, this.width, this.height)
                this.gameOver()
                
            }
        }
        
    }
}