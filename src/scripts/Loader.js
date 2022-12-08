import { LoaderConfig } from "./LoaderConfig";

export class Loader {
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
                    console.log("Resources loaded !!", resources);
                    resolve();
                });
            }
        )
       
    }
}