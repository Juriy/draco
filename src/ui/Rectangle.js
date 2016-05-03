'use strict';

import GameObject from '../GameObject';

export default class Rectangle extends GameObject {

	draw(fc) {
		let gc = fc.graphContext;

		gc.fillStyle = 'green';
		gc.fillRect(this._x, this._y, 10, 10);
	}
}
