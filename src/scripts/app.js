import * as PIXI from "pixi.js";

export class App {
    run() {
        this.app = new PIXI.Application({resizeTo: window});
        console.log(this.app);
        document.body.appendChild(this.app.view);
    }
}