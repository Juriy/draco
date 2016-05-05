'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class Dummy extends GameObject {
	constructor() {
		super();
		this._dx = 1;
		this._dy = 1;
		this._radius = 15;
		this.setPos(Math.random()*200 + 15, Math.random()*200 + 15);
	}

	beforeAddedToParent() {
		console.log('Going to add to parent');
	}

	update(fc) {
		let r = this._radius;

		this.move(fc.dt*0.2*this._dx, fc.dt*0.2*this._dy);
		if (this._x + r > fc.width || this._x < r) {
			this._dx *= -1;
		}

		if (this._y + r > fc.height || this._y < r) {
			this._dy *= -1;
		}
	}

	draw(fc) {
		let ctx = fc.graphContext;
		let r = this._radius;

		ctx.fillStyle = '#A67262';
		ctx.beginPath();
		ctx.arc(this._x, this._y, r, 0, Math.PI*2, true);
		ctx.fill();
	}
}

let scene = engine.getScene();
let dum = new Dummy();
scene.addChild(dum);

engine.start();