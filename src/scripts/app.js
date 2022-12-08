import * as PIXI from "pixi.js";

export class App {
    run() {
        this.app = new PIXI.Application();
        console.log(this.app);
    }
}