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
		debugDraw(this, fc);
		drawAbsoluteBoundingBox(this, fc);
	};
}

let scene = engine.getScene();

let dummy = new Dummy();


dummy.setSize(100, 30);
dummy.setAnchor(0.5, 0.5);
dummy.setPos(100, 100);
dummy.setRot(0.5);
dummy.setScale(1.3);

let childDummy = new Dummy();
childDummy.setSize(100, 30);
childDummy.setAnchor(0.5, 0.5);
childDummy.setPos(120, 0);

childDummy.setScale(1, 1.5);
childDummy.move(10, 10);
childDummy.setRot(0.2);

dummy.addChild(childDummy);

scene.addChild(dummy);

scene.update = function(fc) {
	fc.dirtyRects.markAllDirty();
};

engine.start();