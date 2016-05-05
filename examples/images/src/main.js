'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);


let scene = engine.getScene();

scene.addChild(dum);

engine.start();