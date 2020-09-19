import * as Phaser from 'phaser';

export class Scene2 extends Phaser.Scene{
    bird: Phaser.Physics.Arcade.Sprite;
    arrowLeft: Phaser.GameObjects.Image;
    arrowRight: Phaser.GameObjects.Image;
    balloon: any;
    updates: integer;
    score: integer;
    velocityExtra: integer;
    scoreText: Phaser.GameObjects.Text;
    starSound: Phaser.Sound.BaseSound;
    balloonSound: Phaser.Sound.BaseSound;
    cursors: any;
    timeOut;
    timeText: Phaser.GameObjects.Text;
    gameOverText: Phaser.GameObjects.Text;
    highScoreText: Phaser.GameObjects.Text;
    arrayScores;
    gameRuning;
    balloonData;
    cursorPress: boolean;

    constructor(){
        super('scene2');
    }


    preload(){
        this.load.image('background','assets/images/sky.png');
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
    }


    create(){
        // SET INTIAL DATA
        this.gameRuning = true;
        this.timeOut = 120;
        this.updates = 0;
        this.score = 0;
        this.velocityExtra = 1;
        this.arrayScores = [];
        this.balloonData = [['balloonGreen',-50,4],
                            ['balloonBlue',-100,14],
                            ['balloonRed',-150,25],
                            ['balloonStar',-170,60]];


        // CRATE BACKGROUND
        let background = this.add.image(innerWidth/2,innerHeight/2,'background');
        if (background.width < innerWidth){
            background.setScale(innerWidth/background.width);
        }

        // CRATE ELEMENTS
        this.bird=this.physics.add.sprite(innerWidth/2,innerHeight/3,'bird');
        this.arrowLeft=this.add.image(30,innerHeight-30,'arrowLeft').setInteractive();
        this.arrowRight=this.add.image(innerWidth-30,innerHeight-30,'arrowRight').setInteractive();
        this.balloon= this.physics.add.group();
        this.scoreText=this.add.text(16,16,'Score: 0',{ font: "bold 24px Arial", fill: "#fff"});
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.timeText=this.add.text(16,48,'Time:',{ font: "bold 20px Arial", fill: "#fff"});
        this.timeText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.highScoreText=this.add.text(0,0,'High:',{ font: "bold 20px Arial", fill: "#fff"});
        this.highScoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.balloonSound=this.sound.add('balloonSound');
        this.starSound=this.sound.add('starSound');
        this.cursors = this.input.keyboard.createCursorKeys();

        
        
        //SET COLLINDERS AND OVERLAP
        this.bird.setCollideWorldBounds(true);
        this.physics.add.overlap(this.bird, this.balloon, this.collectBalloon, null, this);
        


        //SET ANIMES AND POINTERS
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

        this.setPointers(this.arrowLeft,'pointerdown','fly-left',-150*this.velocityExtra);
        this.setPointers(this.arrowLeft,'pointerup','stop-left',0);
        this.setPointers(this.arrowRight,'pointerdown','fly-right',150*this.velocityExtra);
        this.setPointers(this.arrowRight,'pointerup','stop-right',0);


        //START PLAY
        this.bird.anims.play('stop-left',true);
        this.setScoreText();
    }


    setPointers(image,type,accion,velocity){
        image.on(type, function(){
            this.bird.setVelocityX(velocity);
            this.bird.anims.play(accion,true);
        }, this);

    }


    
    update(){
        if (this.gameRuning){

            let newBalloon;
            this.updates++;
            let shooter = Phaser.Math.Between(2,6)*10;
            this.timeOut -= 0.016667;
            if (this.updates >= 3600) {this.updates = 0};

            //CREATE BALLOONS
            for (let i=0; i<4 ;i++){
                if (this.updates % (Number(this.balloonData[i][2])*shooter) == 0){
                newBalloon = this.balloon.create(Phaser.Math.Between(30,innerWidth-30), innerHeight+100, this.balloonData[i][0]);
                newBalloon.setVelocityY(Number(this.balloonData[i][1]));
                }
            }

            //DISABLE LOST BALLOONS
            this.balloon.children.iterate(function(child){
                if (child.y <= -30){
                    child.disableBody(true,true);
                }
            });
            
            //END GAME
            if (this.timeOut <=0){
                this.gameOver();
                this.timeOut = 0;
            }
                this.timeText.setText('Time: ' + Math.round(this.timeOut)+' ');
        }  

        //CURSORS KEYBOARD, JUST FOR TEST IN BROWSER
        if (this.cursors.left.isDown){
            this.bird.setVelocityX(-150*this.velocityExtra)
            this.bird.anims.play('fly-left',true);
            this.cursorPress = true;
        }else if(this.cursors.right.isDown){
            this.bird.setVelocityX(150*this.velocityExtra)
            this.bird.anims.play('fly-right',true);
            this.cursorPress = true;
        }else{
            if (this.cursorPress){
                this.bird.setVelocityX(0)
                this.bird.anims.play('stop-left',true);
                this.cursorPress = false;
            }
          
        }
    }

    collectBalloon(bird, balloon){
        if(balloon.body.velocity.y==(-170)){
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

        }else{
            this.score += balloon.body.velocity.y/(-25);
            this.balloonSound.play();
        }
        
        balloon.disableBody(true,true);
        this.scoreText.setText('Score: ' + this.score+' ');

    }

    gameOver(){
        this.gameRuning = false;
        this.saveScore();
        this.physics.pause();
        this.gameOverText = this.add.text(innerWidth/2,innerHeight/2,'Game Over', { font: "bold 50px Arial", fill: "#fff"});
        this.gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.gameOverText.setOrigin(0.5);
        setTimeout(()=> {
            this.scene.start('scene3');
        },5000)
    }

    saveScore(){
        this.arrayScores.push(this.score);
        this.arrayScores.sort(function(a, b){return b-a});
        localStorage.setItem('scores',
                            this.arrayScores[0]+','+
                            this.arrayScores[1]+','+
                            this.arrayScores[2]+','+
                            this.arrayScores[3]+','+
                            this.arrayScores[4]);
        
        localStorage.setItem('yourScore',String(this.score));
    }

    setScoreText(){
        if(localStorage.getItem('scores')==null){
            localStorage.setItem('scores','0,0,0,0,0');
        }

        let arrayStringScores = (localStorage.getItem('scores').split(','));
        arrayStringScores.forEach(element => {
            this.arrayScores.push(Number(element))
        });

        this.highScoreText.setText('High: '+this.arrayScores[0]);
        let textbound = this.highScoreText.getBounds();
        this.highScoreText.setPosition(innerWidth-textbound.width-16,16);
    }
    

}