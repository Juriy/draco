'use strict';

import GameObject from './GameObject';

export default class GameScene extends GameObject {
	constructor() {
		super();
		this._gameContext = null;
		this._clearColor = '#6296A6';
		this._ignoreDirtyRectangles = true;
	}

	init(gameContext) {
		this._gameContext = gameContext;
	}

	update(fc) {
		super.update(fc);
		if (this._ignoreDirtyRectangles) {
			fc.dirtyRects.markAllDirty();
		}
	}

	draw(fc) {
		let ctx = fc.graphContext;

		ctx.save();
		if (this._clearColor) {
			ctx.fillStyle = this._clearColor;
			ctx.fillRect(0, 0, fc.width, fc.height);
		}
		super.draw(fc);
		ctx.restore();
	}

	addChild(child) {
		super.addChild(child);
	}

	registerObject(obj) {

	}

	deregisterObject(obj) {

	}

	getResource(name) {
		return this._gameContext.resourceManager.get(name);
	}

	setClearColor(clearColor) {
		this._clearColor = clearColor;
	}

	setIgnoreDirtyRectanges(flag) {
		this._ignoreDirtyRectangles = flag;
	}
}
