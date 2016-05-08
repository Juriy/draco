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
childDummy.setScale(1.5);

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

	// debugger;
	let tranlation = obj.getAbsoluteTranslation();
	let rot = obj.getAbsoluteRotation();
	let scale = obj.getAbsoluteScale();

	let mat = mat2d.create();
	mat2d.translate(mat, mat,
		vec2.fromValues(
			tranlation[0],
			tranlation[1]));

	mat2d.rotate(mat, mat, rot);
	mat2d.scale(mat, mat,
		vec2.fromValues(
			scale[0], scale[0]
		));

	let origin = vec2.create();
	let anchor = vec2.create();

	vec2.transformMat2d(origin,
		vec2.fromValues(0, 0),
		mat);

	vec2.transformMat2d(anchor,
		vec2.fromValues(15, 15),
		mat);

	let dx = anchor[0] - origin[0];
	let dy = anchor[1] - origin[1];

	marker.setAnchor(0.5, 0.5);
	marker.move(tranlation[0] - dx, tranlation[1] - dy);
	marker.setRot(obj.getAbsoluteRotation());
	marker.setScale(obj.getAbsoluteScale()[0]);
	scene.addChild(marker);
}
