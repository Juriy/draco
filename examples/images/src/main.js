'use strict';

let {Engine, GameObject, GameScene} = draco;
let {Sprite} = draco.ui;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class MyScene extends GameScene {

	constructor() {
		super();
	}

	init(gc) {
		super.init(gc);

		let rm = gc.resourceManager;
		let p1 = new Sprite(rm.get('player-1'));
		let p2 = new Sprite(rm.get('player-2'));

		p1.setPos(50, 50);
		p2.setPos(100, 50);

		this.addChild(p1);
		this.addChild(p2);
	}
}

engine.loadResources({
	'player-1': 'res/player-1.png',
	'player-2': 'res/player-2.png'
}).then(() => {
	engine.addScene('main', new MyScene());
	engine.runScene('main');
	engine.start();
}).catch((e) => {
	console.log('Error', e);
});

