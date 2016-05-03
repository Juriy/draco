'use strict';

export default class TileSheet {
	constructor(image, w, h) {
		this._image = image;
		this._w = w;
		this._h = h;
		this._row = Math.floor(image.width / w);
	}

	drawTile(ctx, index, x, y) {
		if (index < 0) {
			return;
		}

		let tx = (index % this._row) * this._w;
		let ty = Math.floor(index / this._row) * this._h;

		ctx.drawImage(this._image, tx, ty, this._w, this._h, x, y, this._w, this._h);
	};
}
