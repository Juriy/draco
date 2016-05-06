'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class Dummy extends GameObject {
	constructor() {
		super();
		this.setAnchor(0.5, 0.5);
	}

	update(fc) {
	}

	_renderSelf(fc) {
		let ctx = fc.graphContext;

		ctx.fillStyle = '#222';
		ctx.beginPath();
		ctx.arc(this._width / 2, this._height / 2, this._width / 2,
			0, Math.PI*2, true);
		ctx.fill();

		debugDraw(this, fc);
	}
}

let scene = engine.getScene();
let dummy = new Dummy();
dummy.setPos(100, 100);
dummy.setSize(50, 50);

let childDummy = new Dummy();
childDummy.setSize(30, 30);
dummy.setPos(150, 150);
dummy.addChild(childDummy);

scene.addChild(dummy);

let parentMoves = true;
let numJumps = 0;
let moveCoef = 1;

setInterval(() => {
	parentMoves = !parentMoves;
	numJumps++;
	if (numJumps > 5) {
		numJumps = 0;
		moveCoef *= -1;
	}
}, 350);



scene.update = function(fc) {
	fc.dirtyRects.markAllDirty();

	if (parentMoves) {
		dummy.move(2*moveCoef, 0);
	} else {
		childDummy.move(0, 2*moveCoef);
	}

};


engine.start();