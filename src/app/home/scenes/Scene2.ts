import * as Phaser from 'phaser';

export class Scene2 extends Phaser.Scene{
    bird: Phaser.Physics.Arcade.Sprite;
    arrowLeft: Phaser.GameObjects.Image;
    arrowRight: Phaser.GameObjects.Image;
    balloonGreen: any;
    balloonBlue: any;
    balloonRed: any;
    balloonStar: any;
    updates: integer = 0;
    score: integer = 0;
    velocityExtra: integer = 1;
    scoreText: Phaser.GameObjects.Text;
    starSound: Phaser.Sound.BaseSound;
    balloonSound: Phaser.Sound.BaseSound;
    music: Phaser.Sound.BaseSound;
    musicConfig: any;
    timeOut = 120;
    timeText: Phaser.GameObjects.Text;
    gameOverText: Phaser.GameObjects.Text;

    constructor(){
        super('scene2');

        this.musicConfig = {
            loop: true
        };
    }


    preload(){
        this.load.spritesheet('bird','assets/images/birdsprite.png',
        {frameWidth:35, frameHeight:33});
        this.load.image('arrowLeft','assets/images/arrow-left.png');
        this.load.image('arrowRight','assets/images/arrow-right.png');
        this.load.image('balloonGreen','assets/images/balloon-green.png');
        this.load.image('balloonBlue','assets/images/balloon-blue.png');
        this.load.image('balloonRed','assets/images/balloon-red.png');
        this.load.image('balloonStar','assets/images/balloon-star.png');
        this.load.audio('starSound', 'assets/sounds/star.mp3');
        this.load.audio('balloonSound', 'assets/sounds/balloon.mp3');
        this.load.audio('music', 'assets/sounds/ost.mp3');
    }


    create(){
        //this.add.text(50,50,'This is de scene2');
        this.bird=this.physics.add.sprite(innerWidth/2,innerHeight/3,'bird');
        this.bird.setCollideWorldBounds(true);
        this.arrowLeft=this.add.image(30,innerHeight-30,'arrowLeft').setInteractive();
        this.arrowRight=this.add.image(innerWidth-30,innerHeight-30,'arrowRight').setInteractive();
        this.balloonGreen= this.physics.add.group();
        this.balloonBlue= this.physics.add.group();
        this.balloonRed= this.physics.add.group();
        this.balloonStar= this.physics.add.group();
        this.scoreText=this.add.text(16,16,'Score: 0',{ font: "bold 24px Arial", fill: "#fff"});
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.timeText=this.add.text(16,48,'Time:',{ font: "bold 20px Arial", fill: "#fff"});
        this.timeText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.balloonSound=this.sound.add('balloonSound');
        this.starSound=this.sound.add('starSound');
        this.music=this.sound.add('music');

        this.music.play(this.musicConfig);

        this.physics.add.overlap(this.bird, this.balloonGreen, this.collectBalloon, null, this);
        this.physics.add.overlap(this.bird, this.balloonBlue, this.collectBalloon, null, this);
        this.physics.add.overlap(this.bird, this.balloonRed, this.collectBalloon, null, this);
        this.physics.add.overlap(this.bird, this.balloonStar, this.collectBalloon, null , this);
        


        this.anims.create({
            key: 'fly-left',
            frames: this.anims.generateFrameNumbers('bird',{ start: 15, end: 28}),
            frameRate: 50,
            repeat: -1
        });
        this.anims.create({
            key: 'fly-right',
            frames: this.anims.generateFrameNumbers('bird',{ start: 0, end: 13}),
            frameRate: 50,
            repeat: -1
        });
        this.anims.create({
            key: 'stop-right',
            frames: this.anims.generateFrameNumbers('bird',{ start: 0, end: 13}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'stop-left',
            frames: this.anims.generateFrameNumbers('bird',{ start: 15, end: 28}),
            frameRate: 15,
            repeat: -1
        });



        


        this.arrowLeft.on('pointerdown', function(){
            this.bird.setVelocityX(-150*this.velocityExtra);
            this.bird.anims.play('fly-left',true);
        }, this);

        this.arrowLeft.on('pointerup', function(){
            this.bird.setVelocityX(0);
            this.bird.anims.play('stop-left',true);
        }, this);

        this.arrowRight.on('pointerdown', function(){
            this.bird.setVelocityX(150*this.velocityExtra);
            this.bird.anims.play('fly-right',true);
        }, this);

        this.arrowRight.on('pointerup', function(){
            this.bird.setVelocityX(0);
            this.bird.anims.play('stop-right',true);
        }, this);


        console.log(this.data.get('highScore1'));



        this.bird.anims.play('stop-left',true);

        
        

    }

    
    update(){
        this.updates++;
        let shooter = Phaser.Math.Between(2,6)*10;
        this.timeOut -= 0.016667;
        if (this.updates >= 3600) {this.updates = 0};
        
        

        if (this.updates % (4*shooter) == 0){
            this.balloonGreen.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonGreen');
            this.balloonGreen.setVelocityY(-50);
        }

        if (this.updates % (14*shooter) == 0){
            this.balloonBlue.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonBlue');
            this.balloonBlue.setVelocityY(-100);
            console.log();
        }

        if (this.updates % (25*shooter) == 0){
            this.balloonRed.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonRed');
            this.balloonRed.setVelocityY(-150);
        }
        
        if (this.updates % (55*shooter) == 0){
            this.balloonStar.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonStar');
            this.balloonStar.setVelocityY(-150);
        }
        



        this.balloonGreen.children.iterate(function(child){
            if (child.y <= -30){
                child.disableBody(true,true);
            }
        });
        this.balloonBlue.children.iterate(function(child){
            if (child.y <= -30){
                child.disableBody(true,true);
            }
        });this.balloonRed.children.iterate(function(child){
            if (child.y <= -30){
                child.disableBody(true,true);
            }
        });
        
        if (this.timeOut <=0){
            this.timeOut = 0;
            this.gameOver();
        }
            this.timeText.setText('Time: ' + Math.round(this.timeOut)+' ');
        
    }

    collectBalloon(bird, balloon){
        if (this.balloonGreen.contains(balloon)){
            this.score += 1;
            this.balloonSound.play();
        }else if(this.balloonBlue.contains(balloon)){
            this.score += 5;
            this.balloonSound.play();
        }else if(this.balloonRed.contains(balloon)){
            this.score += 10;
            this.balloonSound.play();
        }else if(this.balloonStar.contains(balloon)){
            this.velocityExtra = 2;
            bird.setTint('0xFFF200');
            bird.alpha = 0.7;
            bird.setVelocityX(bird.body.velocity.x*2);
            this.starSound.play();
            setTimeout(()=> {
                this.velocityExtra = 1;
                bird.setTint('0xffffff');
                bird.alpha = 1;
            },15000)
        }
        
        balloon.disableBody(true,true);
        this.scoreText.setText('Score: ' + this.score+' ');

       
    }

    gameOver(){
        this.physics.pause();
        this.gameOverText = this.add.text(innerWidth/2,innerHeight/2,'Game Over', { font: "bold 50px Arial", fill: "#fff"});
        this.gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.gameOverText.setOrigin(0.5);
        setTimeout(()=> {
            this.scene.start('scene3');
        },5000)
    }

    

}