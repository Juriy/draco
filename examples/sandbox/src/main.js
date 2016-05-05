'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

/**
 * Palette:
 * ECEDEE
 * BDD1D8
 * 6295A6
 * 2D7188
 * 045671
 *
 * Red:
 * D97542
 * B53D00
 *
 * Order of applying transforms:
 * First scale, then rotate, then translate
 *
 * http://gamedev.stackexchange.com/questions/29260/transform-matrix-multiplication-order
 */


class TransformDummy extends GameObject {

	constructor() {
		super();
		this._x = 100;
		this._y = 100;
		this._width = 70;
		this._height = 30;

		this._anchorX = 0.3;
		this._anchorY = 0.5;

		this._scale = 1.5;

		this._rot = Math.PI/3;
	}

	update() {
		this._scale += 0.01;
		this._rot += 0.01;
	}

	_renderSelf(fc) {
		debugDraw(this, fc);
	}
}




let scene = engine.getScene();

let dum = new TransformDummy();

scene.addChild(dum);

engine.start();