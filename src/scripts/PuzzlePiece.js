import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PuzzlePiece {
    constructor(id, field) {
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);

        // adding interaction
        this.field = field;
        this.reset();
        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on("pointerdown", this.onTouchStart, this);
        this.sprite.on("pointermove", this.onTouchMove, this);
        this.sprite.on("pointerout", this.onTouchEnd, this);
    }

    onTouchStart(event) {
        //save position of the cursor
        this.touchPosition = {x: event.data.global.x, y: event.data.global.y};
        this.dragging = true;
        this.sprite.zIndex = 1;
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
        this.reset();
        this.sprite.zIndex = 0;
    }

    reset() {
        this.sprite.x = this.field.x;
        this.sprite.y = this.field.y;
    }

}