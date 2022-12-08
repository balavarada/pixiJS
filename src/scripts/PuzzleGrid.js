import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        this.container.sortableChildren = true;

        this.createPuzzlePieces();
    }

    createPuzzlePieces() {
        // this.pieces = [];
        let ids = PuzzleGridConfig.map(field => field.id);
        PuzzleGridConfig.forEach(field => {

            // Arrange the grid randomly

            const random = Math.floor( Math.random() * ids.length ); // generate random no from 0 to 8 - ids.length = 9
            const id = ids[random];
            ids = ids.filter(item => item !== id); 

            const piece = new PuzzlePiece(id, field);
            this.container.addChild(piece.sprite);
            // this.pieces.push(piece);
        })

    }
}