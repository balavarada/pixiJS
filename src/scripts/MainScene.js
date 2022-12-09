import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { PuzzleGrid } from "./PuzzleGrid";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container;
        this.createBckground();
        this.createPuzzleGrid();
        Globals.resources.music.sound.play({
            loop:true,
            volume:0.08
        });
    }

    createBckground() {
        console.log(this.Globals);
        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
        
        // available methods
        // this.bg.scale(2, 1); // 200% bigger  takes one / two params
        // this.bg.anchor(0.5, 0); // position on the point of x & y in screen takes one / two params
        this.bg.alpha = 1; //opacity
        this.bg.visible = true; // visibility
        this.bg.tint = 0xffffff; // this is white color - check 0xff0000 for red tint color
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
        
    }

    createPuzzleGrid() {
        const grid = new PuzzleGrid();
        this.container.addChild(grid.container);

    }
}