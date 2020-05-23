import * as Phaser from 'phaser';

export class Scene3 extends Phaser.Scene{
    highScore1;
    scoreText;

    constructor(){
        super('scene3');
    }


    preload(){

    }


    create(){

        let arrayScores = (localStorage.getItem('scores').split(','));


        this.highScore1=this.add.text(innerWidth/2,innerHeight/2-20,' '+arrayScores[0]+' ',{ font: "bold 50px Arial", fill: "#fff"});
        this.highScore1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.highScore1.setOrigin(0.5);

      for(let i=2; i <= 5; i++){
        this.scoreText=this.add.text(innerWidth/2,innerHeight/2+(i*40),i+': '+arrayScores[i-2]+' ',{ font: "bold 32px Arial", fill: "#fff"});
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.scoreText.setOrigin(0.5);
      }
     
    
            
      
    }

    
    update(){

    }

}