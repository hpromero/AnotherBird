import * as Phaser from 'phaser';

export class Scene3 extends Phaser.Scene{

    constructor(){
        super('scene3');
    }


    preload(){

    }


    create(){
        this.add.text(50,50,'This is de scene3');
    }

    
    update(){

    }

}