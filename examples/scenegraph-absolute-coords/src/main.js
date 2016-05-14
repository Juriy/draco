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
// dummy.setRot(Math.PI/4);
// dummy.setScale(1.1);


let childDummy = new Dummy();
childDummy.setSize(100, 30);
childDummy.setAnchor(0.5, 0.5);
childDummy.setPos(40, 0);
//
childDummy.move(10, 10);
childDummy.setRot(0.2);
//childDummy.setScale(1.5);

dummy.addChild(childDummy);

scene.addChild(dummy);



scene.update = function(fc) {
	fc.dirtyRects.markAllDirty();
};

engine.start();

let marker = new Dummy();
mimicWithMarker(childDummy);

function mimicWithMarker(obj) {

	marker.setSize(30, 30);

	// debugger;
	// let tranlation = obj.getAbsoluteTranslation();
	// let rot = obj.getAbsoluteRotation();
	// let scale = obj.getAbsoluteScale();

	// console.log(tranlation);
	// console.log(rot);
	// console.log(scale);

	// marker.move(tranlation[0], tranlation[1]);
	// marker.setRot(rot);
	// marker.setScale(scale);

	marker.setPos(80, 100);
	marker.setRot(1);

	let t1 = obj.getAbsoluteTranslation();
	let t2 = marker.getAbsoluteTranslation();
	let t3 = [t2[0] - t1[0], t2[1] - t1[1]];

	let r1 = obj.getAbsoluteRotation();
	let r2 = marker.getAbsoluteRotation();
	let r3 = r2 - r1;

	scene.addChild(marker);

	scene.removeChild(marker);
	obj.addChild(marker);
	marker.setPos(t3[0], t3[1]);
	marker.setRot(r3);

}
