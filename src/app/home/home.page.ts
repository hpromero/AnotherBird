import { Component } from '@angular/core';
import * as Phaser from 'phaser';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  game: Phaser.Game;
  config:Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      width: innerWidth,
      height: innerHeight,
      backgroundColor: '#59ABE3',
      physics: {
        default: 'arcade',
        arcade:{

        }
      },
      parent: 'game',
      scene: [Scene1,Scene2,Scene3]
    }
  }

  ngOnInit(){
    this.game = new Phaser.Game(this.config);
  }



}
