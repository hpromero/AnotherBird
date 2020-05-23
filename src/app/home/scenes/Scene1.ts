import * as Phaser from 'phaser';
import { ActionSheetController } from '@ionic/angular';
//import { Scene2 } from './Scene2';

export class Scene1 extends Phaser.Scene{
 //   logo: Phaser.GameObjects.Image;
    title;
    playText;
    music: Phaser.Sound.BaseSound;
    musicConfig: any;

    constructor(){
        super('scene1');
        this.musicConfig = {
            loop: true
        };
    }


    preload(){
        this.load.image('background','assets/images/sky.png');
        this.load.image('logo','assets/images/logo.png')
        this.load.audio('music', 'assets/sounds/ost.mp3');
    }


    create(){
        let background = this.add.image(innerWidth/2,innerHeight/2,'background');
        if (background.width < innerWidth){
            background.setScale(innerWidth/background.width);
        }

        this.music=this.sound.add('music');
        this.music.play(this.musicConfig);

      this.title = this.add.text(innerWidth/2,innerHeight/2-200,'Another bird', { font: "bold 50px Arial", fill: "#fff"});
      this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      this.title.setOrigin(0.5);
      this.add.image(innerWidth/2,innerHeight/2,'logo');
      this.playText=this.add.text(innerWidth/2,innerHeight/2+200,'Play game!',{ font: "bold 32px Arial", fill: "#fff"}).setInteractive();
      this.playText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      this.playText.setOrigin(0.5);

      this.playText.on('pointerdown',function(pointer){
          this.play();
      },this);
    }


    update(){

    }


    play() {
        this.scene.start('scene2');
    }

}