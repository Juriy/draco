'use strict';

let {Engine, GameObject, ImageManager, GameScene} = draco;
let {Sprite} = draco.ui;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);
let imgMan = new ImageManager();

class MyScene extends GameScene {

	constructor() {
		super();
	}

	init(gc) {
		super.init();

		let rm = this._gameContext._resourceManager;
		
	}
}

imgMan.load({
	'player-1': 'res/player-1.png',
	'player-2': 'res/player-2.png'
}).then(() => {
	let scene = engine.getScene();
	let p1 = new Sprite(imgMan.get('player-1'));
	p1.setPos(50, 50);

	let p2 = new Sprite(imgMan.get('player-2'));
	p2.setPos(100, 50);

	scene.addChild(p1);
	scene.addChild(p2);

	engine.start();
}).catch((e) => {
	console.log('Could not load image', e);
});

