import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PuzzlePiece {
    constructor(id, field) {
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
        this.sprite.x = field.x;
        this.sprite.y = field.y;

        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);
    }

}