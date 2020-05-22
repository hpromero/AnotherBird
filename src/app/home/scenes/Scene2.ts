import * as Phaser from 'phaser';

export class Scene2 extends Phaser.Scene{
    bird: Phaser.Physics.Arcade.Sprite;
    arrowLeft: Phaser.GameObjects.Image;
    arrowRight: Phaser.GameObjects.Image;
    balloonGreen: any;
    balloonBlue: any;
    balloonRed: any;
    balloons: any;
    updates: integer = 0;

    constructor(){
        super('scene2');
    }


    preload(){
        this.load.spritesheet('bird','assets/images/birdsprite.png',
        {frameWidth:35, frameHeight:33});
        this.load.image('arrowLeft','assets/images/arrow-left.png');
        this.load.image('arrowRight','assets/images/arrow-right.png');
        this.load.image('balloonGreen','assets/images/balloon-green.png');
        this.load.image('balloonBlue','assets/images/balloon-blue.png');
        this.load.image('balloonRed','assets/images/balloon-red.png');

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
        this.balloons= this.physics.add.group();

        //this.physics.add.overlap(this.bird, this.balloonBlue, this.collectStar, null, this);
        


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
            this.bird.setVelocityX(-150);
            this.bird.anims.play('fly-left',true);
        }, this);
        this.arrowLeft.on('pointerup', function(){
            this.bird.setVelocityX(0);
            this.bird.anims.play('stop-left',true);
        }, this);

        this.arrowRight.on('pointerdown', function(){
            this.bird.setVelocityX(150);
            this.bird.anims.play('fly-right',true);
        }, this);
        this.arrowRight.on('pointerup', function(){
            this.bird.setVelocityX(0);
            this.bird.anims.play('stop-right',true);
        }, this);






        this.bird.anims.play('stop-left',true);

        
        

    }

    
    update(){
        this.updates++;
        let shooter = Phaser.Math.Between(3,6)*10;
        if (this.updates >= 3600) {this.updates = 0};
        

        if (this.updates % (5*shooter) == 0){
            this.balloonGreen.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonGreen');
            this.balloonGreen.setVelocityY(-50);
        }

        if (this.updates % (15*shooter) == 0){
            this.balloonBlue.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonBlue');
            this.balloonBlue.setVelocityY(-100);
            console.log();
        }

        if (this.updates % (25*shooter) == 0){
            this.balloonRed.create(Phaser.Math.Between(30,innerWidth-30), innerHeight, 'balloonRed');
            this.balloonRed.setVelocityY(-150);
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

     //   console.log(this.balloonBlue.countActive());

    }

}