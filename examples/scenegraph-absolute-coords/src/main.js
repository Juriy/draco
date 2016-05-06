'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class Dummy extends GameObject {
	constructor() {
		super();
		this.setAnchor(0.5, 0.5);
	}

	_renderSelf(fc) {
		let ctx = fc.graphContext;

		ctx.fillStyle = '#222';
		debugDraw(this, fc);
	}
}

let scene = engine.getScene();

let dummy = new Dummy();

dummy._renderSelf = function(fc) {
	let ctx = fc.graphContext;
	debugDraw(this, fc);

	ctx.save();
	ctx.strokeStyle = 'red';
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	let box = this.getAbsoluteBoundingBox();
	ctx.beginPath();

	ctx.moveTo(box[0].x, box[0].y);
	ctx.lineTo(box[1].x, box[1].y);
	ctx.lineTo(box[2].x, box[2].y);
	ctx.lineTo(box[3].x, box[3].y);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
};

dummy.setSize(100, 30);
dummy.setAnchor(0.5, 0.5);
dummy.setPos(100, 100);

let childDummy = new Dummy();
childDummy.setSize(100, 30);
childDummy.setAnchor(0.5, 0.5);
childDummy.setPos(120, 0);
childDummy._renderSelf = dummy._renderSelf;
dummy.addChild(childDummy);

scene.addChild(dummy);

scene.update = function(fc) {
	fc.dirtyRects.markAllDirty();
};

engine.start();