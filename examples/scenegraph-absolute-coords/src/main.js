'use strict';

let {Engine, GameObject} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class Dummy extends GameObject {
	constructor() {
		super();
		// this.setAnchor(0.5, 0.5);
	}

	_renderSelf(fc) {
		debugDraw(this, fc);
		// drawAbsoluteBoundingBox(this, fc);
		// drawAbsoluteChildrenBoundingBox(this, fc);
	};
}

let scene = engine.getScene();

let dummy = new Dummy();

dummy.setSize(30, 50);
dummy.setAnchor(0.5, 0.5);
dummy.setPos(30, 40);
dummy.setRot(Math.PI/4);
dummy.setScale(1.1);


let childDummy = new Dummy();
childDummy.setSize(100, 30);
childDummy.setAnchor(0.5, 0.5);
childDummy.setPos(120, 0);
//
childDummy.move(10, 10);
childDummy.setRot(0.2);
childDummy.setScale(1, 1.5);

dummy.addChild(childDummy);

scene.addChild(dummy);

mimicWithMarker(childDummy);

scene.update = function(fc) {
	fc.dirtyRects.markAllDirty();
};

engine.start();

function mimicWithMarker(obj) {
	let marker = new Dummy();
	marker.setSize(30, 30);

	let tranlation = obj.getAbsoluteTranslation();
	marker.move(tranlation[0], tranlation[1]);
	marker.setRot(obj.getAbsoluteRotation());
	marker.setScale(obj.getAbsoluteScale()[0]);
	scene.addChild(marker);
}
