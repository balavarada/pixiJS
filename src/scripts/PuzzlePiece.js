import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
var mirrorGrid = [];
var sprites = [];
export class PuzzlePiece extends PIXI.utils.EventEmitter {
    constructor(id, field) {
        super();
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
        this.sprite.id = id;
        this.sprite.x = field.x;
        this.sprite.y = field.y;
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);
        mirrorGrid.push({id:id, x:field.x,  y:field.y});
        sprites.push(this.sprite);
        // adding interaction
        this.field = field;
        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on("pointerdown", this.onTouchStart, this);
        this.sprite.on("pointermove", this.onTouchMove, this);
        this.sprite.on("pointerup", this.onTouchEnd, this);
    }

    onTouchStart(event) {
        //save position of the cursor
        this.touchPosition = {x: event.data.global.x, y: event.data.global.y};
        this.dragging = true;
        this.sprite.zIndex = 2;
        Globals.resources.click.sound.play();
    }

    onTouchMove(event) {
        //Assign the new postion for the sprite
        if(!this.dragging) {
            return; // do void if in dragging
        }

        // 1. Get the current position of the cursor
        const currentPosition = {x: event.data.global.x, y: event.data.global.y};

        // 2. Calculate the offset
        const offsetX = currentPosition.x - this.touchPosition.x;
        const offsetY = currentPosition.y - this.touchPosition.y;

        // 3. Apply the offset to sprite
        this.sprite.x = this.field.x + offsetX;
        this.sprite.y = this.field.y + offsetY;

    }

    onTouchEnd() {
        this.dragging = false;
        this.emit("dragend");
        Globals.resources.click.sound.play();
    }

    reset() {
        // tween animations
        const tween = new TWEEN.Tween(this.sprite);
        tween.to({x: this.field.x, y:this.field.y}, 300);
        tween.onStart(() => { 
            this.sprite.zIndex = 1;
        });
        tween.onUpdate(() => {});
        tween.onComplete(() => {
            this.sprite.zIndex = 0;
            this.checkCompleted();
        });
        tween.easing(TWEEN.Easing.Quartic.Out);

        tween.start();

        this.sprite.x = this.field.x;
        this.sprite.y = this.field.y;
        
    }

    get left() {
        return this.sprite.x - this.sprite.width / 2;
    }

    get right() {
        return this.sprite.x + this.sprite.width / 2;
    }

    get top() {
        return this.sprite.y - this.sprite.height / 2;
    }

    get bottom() {
        return this.sprite.y + this.sprite.height / 2;
    }

    setField(field) {
        this.field = field;
        this.reset();
    }

    checkCompleted() {       
        let x =1000; //animation speed 
        for (let i = 0, l = mirrorGrid.length; i < l; ++i) {
            if (mirrorGrid[i].id === this.sprite.id) {
                mirrorGrid[i].x = this.sprite.x;
                mirrorGrid[i].y = this.sprite.y;
                // console.log(mirrorGrid);
              break;
            }
        }
        mirrorGrid.sort((a,b) => a.id - b.id); //Sort array so identical to PuzzleGridConfig
        const a = JSON.stringify(mirrorGrid);
        const b = JSON.stringify(PuzzleGridConfig);
        // game completed state
        if(a == b) {
            //reduce all space b/w the sprites
            ;
            for (let j = 0, l = sprites.length; j < l; ++j) {
                sprites[j].interactive = false;
                const tween = new TWEEN.Tween(sprites[j]);
                tween.easing(TWEEN.Easing.Circular.Out);
                switch(sprites[j].id) {
                    case 1:
                        tween.to({x: -150, y:-150}, x);
                        // sprites[j].x = -150;
                        // sprites[j].y = -150;
                    break;
                    case 2:
                        tween.to({x: 0, y:-150}, x);
                        // sprites[j].y = -150;
                    break;
                    case 3:
                        tween.to({x: 150, y:-150}, x);
                        // sprites[j].x = 150;
                        // sprites[j].y = -150;
                    break;
                    case 4:
                        tween.to({x: -150, y:0}, x);
                        // sprites[j].x = -150;
                    break;
                    case 6:
                        tween.to({x: 150, y:0}, x);
                        // sprites[j].x = 150;
                    break;
                    case 7:
                        tween.to({x: -150, y:150}, x);
                        sprites[j].x = -150;
                        sprites[j].y = 150;
                    break;
                    case 8:
                        tween.to({x: 0, y:150}, x);
                        // sprites[j].y = 150;
                    break;
                    case 9:
                        tween.to({x: 150, y:150}, x);
                        // sprites[j].x = 150;
                        // sprites[j].y = 150;
                    break;
                }
                tween.start();
            }
        }
    }
}