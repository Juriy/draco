'use strict';

import Rect from './Rect';

export default class DirtyRectangleManager {

	constructor(allDirtyThreshold = 0.5) {
		this._allDirtyThreshold = allDirtyThreshold;
		this._viewport = new Rect(0, 0, 100, 100);
		this._dirtyRect = null;
		this._allDirty = true;
		this.markAllDirty();
	}

	clear() {
		this._dirtyRect = null;
		this._allDirty = false;
	}

	markDirty(rect) {
		if (!(rect.width || rect.height) || this._allDirty) {
			return;
		}

		rect = this._viewport.intersection(rect);

		if (!rect) {
			return;
		}

		if (this._dirtyRect) {
			this._dirtyRect = this._dirtyRect.convexHull(rect);
			if (this._dirtyRect.width * this._dirtyRect.height >
				this._allDirtyThreshold * this._viewport.width * this._viewport.height) {
				this.markAllDirty();
			}
		} else {
			this._dirtyRect = this._viewport.intersection(rect);
		}
	}

	markAllDirty() {
		this._allDirty = true;
		this._dirtyRect = this._viewport.copy();
	}

	isClean() {
		return !(this._dirtyRect);
	}

	isAllDirty() {
		return this._allDirty;
	}

	getDirtyRect() {
		return this._dirtyRect;
	}

	setViewport(width, height) {
		if (this._viewport.width === width && this._viewport.height === height) {
			return;
		}
		this._viewport.width = width;
		this._viewport.height = height;
		this.markAllDirty();
	}
}
