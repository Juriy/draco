'use strict';

import GameObject from '../GameObject';
import Rect from '../Rect';

export default class Sprite extends GameObject {

	constructor(img) {
		super();
		this._img = img;
		this._width = img.width;
		this._height = img.height;
		this._isPressed = false;
		this._clicked = false;
	}

	setSize(widthOrFraction, height) {

		if (height === undefined) {
			let fraction = widthOrFraction;

			widthOrFraction = this._img.width * fraction;
			height = this._img.height * fraction;
		}
		this._width = widthOrFraction;
		this._height = height;
	}

	update(fc) {

	}

	draw(fc) {
		let ctx = fc.graphContext;

		ctx.save();
		ctx.drawImage(this._img, 0, 0,
			this._img.width, this._img.height, this._x, this._y,
			this._width, this._height);
		ctx.restore();
	}

	getBounds() {
		return new Rect(this._x, this._y, this._width, this._height);
	}
}
