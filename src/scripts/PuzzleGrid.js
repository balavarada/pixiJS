import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;

        this.createPuzzlePieces();
    }

    createPuzzlePieces() {
        // this.pieces = [];
        PuzzleGridConfig.forEach(field => {
            const piece = new PuzzlePiece(field.id, field);
            this.container.addChild(piece.sprite);
            // this.pieces.push(piece);
        })

    }
}