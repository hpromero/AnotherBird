import * as Phaser from 'phaser';
import { ActionSheetController } from '@ionic/angular';
//import { Scene2 } from './Scene2';

export class Scene1 extends Phaser.Scene{
 //   logo: Phaser.GameObjects.Image;
    title;
    playText;

    constructor(){
        super('scene1');
    }


    preload(){
        this.load.image('logo','assets/images/logo.png')
    }


    create(){
      this.title = this.add.text(innerWidth/2,innerHeight/2-125,'Another bird', { font: "bold 50px Arial", fill: "#fff"});
      this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      this.title.setOrigin(0.5);
      this.add.image(innerWidth/2,innerHeight/2,'logo');
      this.playText=this.add.text(innerWidth/2,innerHeight/2+100,'Play game!',{ font: "bold 32px Arial", fill: "#fff"}).setInteractive();
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