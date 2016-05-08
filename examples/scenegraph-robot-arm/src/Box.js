'use strict';

class Box extends draco.GameObject {

	constructor() {
		super();
		// this.setAnchor(0.5, 0.5);
	}

	_renderSelf(fc) {
		let ctx = fc.graphContext;
		ctx.fillStyle = '#B53D00';
		ctx.fillRect(0, 0, this._width, this._height);
	}
}