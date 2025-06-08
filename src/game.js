import { MainMenuScene } from "./MainMenuScene.js";
import { MapScene } from "./MapScene.js";
import { LevelScene } from "./LevelScene.js";
import { LoseScene } from "./Lose.js";
import { WinScene } from "./Win.js";
import { PreloadScene } from "./PreloadScene.js";



const config = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        mode: Phaser.Scale.FIT,
        min: {
            width: 384,
            height: 192
        },
        max: {
            width: 768, 
            height: 384  
        },
        zoom: 2
    },
    pixelArt: true,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 300 }, 
            debug: false
        },
    
    },
    scene: [ PreloadScene, MainMenuScene, MapScene, LevelScene, LoseScene, WinScene ],
    title: "Donkey Kong",
    version: "1.0.0"
};

new Phaser.Game(config);