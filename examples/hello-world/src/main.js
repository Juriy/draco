'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class Rect extends GameObject {
	constructor() {
		super();
	}

	update(fc) {
		let dt = fc.dt;
		this.move(dt*0.2, 0);
		fc.dirtyRects.markAllDirty();
	}

	draw(fc) {
		let ctx = fc.graphContext;
		ctx.fillStyle = '#A67262';
		ctx.fillRect(this._x, this._y, this._width, this._height);
	}
}

let scene = engine.getScene();

let rect = new Rect();
rect.setPos(20, 20);
rect.setSize(50, 50);
scene.addChild(rect);

engine.start();