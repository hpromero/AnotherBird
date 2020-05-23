import * as Phaser from 'phaser';

export class Scene3 extends Phaser.Scene{
    textPosition = ["1ST:  ","2ND:  ","3RD:  ","4TH:  ","5TH:  "];
    text;

    constructor(){
        super('scene3');
    }


    preload(){
        this.load.image('background','assets/images/sky.png');
    }


    create(){
        let arrayScores = (localStorage.getItem('scores').split(','));
        let yourScore = localStorage.getItem('yourScore');

        
        let background = this.add.image(innerWidth/2,innerHeight/2,'background');
        if (background.width < innerWidth){
            background.setScale(innerWidth/background.width);
        }


        this.text=this.add.text(innerWidth/2,innerHeight/3-100,' HIGH SCORES ',{ font: "bold 50px Arial", fill: "#fff"});
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.text.setOrigin(0.5);

        for(let i=1; i <=5; i++){
            let style;
            if (arrayScores[i-1]==yourScore){
                style = { font: "bold 38px Arial", fill: "#d4af37"}
            }else{
                style = { font: "bold 30px Arial", fill: "#fff"}
            }

            this.text=this.add.text(innerWidth/2,innerHeight/3+(i*40),this.textPosition[i-1]+arrayScores[i-1]+' ',style);
            this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            this.text.setOrigin(0.5);
        }

        this.text=this.add.text(innerWidth/2,innerHeight/2+200,' Play again ',{ font: "bold 40px Arial", fill: "#fff"}).setInteractive();
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.text.setOrigin(0.5);
     
        this.text.on('pointerdown',() =>{
            this.scene.start('scene2');
        },this);
            
      
    }

    
    update(){

    }

}