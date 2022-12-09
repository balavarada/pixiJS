import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";

export class App {
    run() {
        this.app = new PIXI.Application({resizeTo: window});
        //create canvas
        document.body.appendChild(this.app.view);

        //load sprites
        this.loader = new Loader(this.app.loader);
        this.loader.preload().then(() => this.start());
    }

    start() {
        // console.log("The game started !!");
        this.app.ticker.add(() => {
            TWEEN.update();
        });
        
        this.scene = new MainScene();
        this.app.stage.addChild(this.scene.container);
    }
}