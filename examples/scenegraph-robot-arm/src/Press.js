'use strict';

class Press extends draco.GameObject {

	constructor() {
		super();
		this.setAnchor(0.5, 0.5);
		this.setSize(450, 40);
	}

	_renderSelf(fc) {
		let ctx = fc.graphContext;
		ctx.fillStyle = '#222';
		ctx.fillRect(0, this._height/2 - 8, this._width, 16);
		ctx.fillRect(this._width - 20, 0, 20, this._height);
	}
}