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
        this.pieces = [];
        let ids = PuzzleGridConfig.map(field => field.id); // extract id alone
        PuzzleGridConfig.forEach(field => {
            // Arrange the grid randomly
            const random = Math.floor(Math.random() * ids.length); // generate random no from 0 to 8 - ids.length = 9
            const id = ids[random];
            ids = ids.filter(item => item !== id);


            const piece = new PuzzlePiece(id, field);
            piece.on("dragend", () => this.onPieceDragEnd(piece));
            this.container.addChild(piece.sprite);
            this.pieces.push(piece);
        });
    }

    onPieceDragEnd(piece) {
        const pieceToReplace = this.pieces.find(item =>
             item !== piece &&
             // Piece center to the right of left side
             piece.sprite.x >= item.left &&
             // Piece center to the right of left side
             piece.sprite.x <= item.right &&
             // Piece center below the  top side
             piece.sprite.y <= item.bottom &&
             // Piece center above the bottom side
             piece.sprite.y >= item.top 
                
        );

        if(pieceToReplace) {
            const replaceField = pieceToReplace.field;
            pieceToReplace.setField(piece.field);
            piece.setField(replaceField);
 
        } else {
            piece.reset();
        }

    }
}