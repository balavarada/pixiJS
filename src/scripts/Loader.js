import { LoaderConfig } from "./LoaderConfig";
import { Globals } from "./Globals";

export class Loader {
    /**
     * 
     * @param {PIXI.Application.loader} loader 
     */
    constructor(loader) {
        this.loader = loader;
        this.resources = LoaderConfig;
    }

    preload() {
        return new Promise(
            resolve => {
                 // this.loader.add("bg", bg);
                for(let key in this.resources) {
                    this.loader.add(key, this.resources[key]);
                }
                this.loader.load((loader, resources) => {
                    Globals.resources = resources;
                    resolve();
                });
            }
        )
       
    }
}