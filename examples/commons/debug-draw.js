'use strict';

// Make a plugin ?

function debugDraw(obj, fc) {
	let ctx = fc.graphContext;
	ctx.save();
	ctx.globalAlpha = 0.5;
	debugDrawBoundingBox(obj, fc);
	debugDrawPivot(obj, fc);
	ctx.restore();
}

function debugDrawBoundingBox(obj, fc) {
	let ctx = fc.graphContext;

	ctx.fillStyle = 'red';
	ctx.strokeStyle = '#BDD1D8';
	ctx.lineWidth = 1;
	// ctx.fillRect(0, 0, this._width, this._height);
	ctx.strokeRect(0, 0, obj._width, obj._height);
}

function debugDrawPivot(obj, fc) {
	let ctx = fc.graphContext;
	let anchorX = obj._anchorX * obj._width;
	let anchorY = obj._anchorY * obj._height;

	ctx.fillStyle = 'green';
	ctx.strokeStyle = 'black';

	ctx.beginPath();
	ctx.arc(anchorX, anchorY, 5, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
}