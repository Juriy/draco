'use strict';

import GameObject from '../../GameObject';

export default class TileMapOrtho extends GameObject {

	constructor(mapData, image, tileSize, viewportWidth, viewportHeight) {
		super();
		this._mapData = mapData;
		this._image = image;
		this._tileSize = tileSize;
		this._viewportWidth = viewportWidth;
		this._viewportHeight = viewportHeight;

		// Coordinates of the map
		this._x = 0;
		this._y = 0;

		// Offscreen buffer
		this._offCanvas = document.createElement('canvas');
		this._offContext = this._offCanvas.getContext('2d');
		this._offBounds = {x: 0, y: 0, w: 0, h: 0};
		this._offDirty = true;

		this._resetOffScreenCanvas();

		// The number of tiles in one row of the image
		this._tilesPerRow = image.width / tileSize;
	}

	/* Draws the whole map */
	draw(fc) {
		let ctx = fc.graphContext;

		if (this._offDirty) {
			this._redrawOffscreen();
		}

		let offCanvasX = -Math.floor(this._x) - this._offBounds.x * this._tileSize;
		let offCanvasY = -Math.floor(this._y) - this._offBounds.y * this._tileSize;
		let offCanvasW = Math.min(this._offCanvas.width - offCanvasX, this._viewportWidth);
		let offCanvasH = Math.min(this._offCanvas.height - offCanvasY, this._viewportHeight);

		ctx.drawImage(this._offCanvas, offCanvasX, offCanvasY, offCanvasW, offCanvasH,
			0, 0, offCanvasW, offCanvasH);
	}

	move(deltaX, deltaY) {
		this._x += deltaX;
		this._y += deltaY;
		this._updateOffscreenBounds();
	}

	setViewportSize(width, height) {
		this._viewportWidth = width;
		this._viewportHeight = height;
		this._resetOffScreenCanvas();
	}

	_resetOffScreenCanvas() {
		this._updateOffscreenBounds();
		this._offCanvas.width = this._offBounds.w * this._tileSize;
		this._offCanvas.height = this._offBounds.h * this._tileSize;
		this._offDirty = true;
	}

	_redrawOffscreen() {
		let ctx = this._offContext;

		ctx.clearRect(0, 0, this._offCanvas.width, this._offCanvas.height);

		let startX = Math.max(this._offBounds.x, 0);
		let endX = Math.min(startX + this._offBounds.w - 1, this._mapData[0].length - 1);

		let startY = Math.max(this._offBounds.y, 0);
		let endY = Math.min(startY + this._offBounds.h - 1, this._mapData.length - 1);

		for (let cellY = startY; cellY <= endY; cellY++) {
			for (let cellX = startX; cellX <= endX; cellX++) {
				let tileId = this._mapData[cellY][cellX];

				this._drawTileAt(ctx, tileId, cellX, cellY);
			}
		}
		this._offDirty = false;
	}

	_drawTileAt(ctx, tileId, cellX, cellY) {

		// Position of the tile inside of a tile sheet
		let srcX = (tileId % this._tilesPerRow) * this._tileSize;
		let srcY = Math.floor(tileId / this._tilesPerRow) * this._tileSize;

		// size of the tile
		let size = this._tileSize;

		// position of the tile on the offscreen buffer
		let destX = (cellX - this._offBounds.x) * size;
		let destY = (cellY - this._offBounds.y) * size;

		ctx.drawImage(this._image, srcX, srcY, size, size, destX, destY, size, size);
	}

	_updateOffscreenBounds() {
		let oldBounds = this._offBounds;

		let newBounds = {
			x: Math.floor(-this._x / this._tileSize),
			y: Math.floor(-this._y / this._tileSize),
			w: Math.ceil(this._viewportWidth / this._tileSize) + 1,
			h: Math.ceil(this._viewportHeight / this._tileSize) + 1
		};

		if (!(oldBounds.x === newBounds.x &&
			oldBounds.y === newBounds.y &&
			oldBounds.w === newBounds.w &&
			oldBounds.h === newBounds.h)) {

			this._offBounds = newBounds;
			this._offDirty = true;
		}
	}
}
