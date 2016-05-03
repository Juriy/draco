'use strict';

export default class GameObject {
	constructor() {
		this._x = 0;
		this._y = 0;
		this._width = 0;
		this._height = 0;

		this._id = GameObject.uid++;
		this._name = 'object_' + this._id;

		this._anchorX = 0;
		this._anchorY = 0;

		this._rot = 0;

		this._scene = null;
		this._parent = null;
		this._children = [];
	}

	update(fc) {
		this._children.forEach(it => it.update(fc));
	}

	draw(fc) {
		this._children.forEach(it => it.draw(fc));
	}

	addChild(child) {
		this._children.push(child);
		child.setParent(this);
	}

	removeChild(child) {
		let idx = this._children.indexOf(child);

		if (idx > -1) {
			child.setParent(null);
			return this._children.splice(idx, 1);
		}
	}

	getChildren() {
		return this._children;
	}

	setParent(parent) {
		this._parent = parent;
	}

	setScene(scene) {
		this._scene = scene;
	}

	getScene() {
		return this._scene;
	}

	getParent() {
		return this._parent;
	}

	getId() {
		return this._id;
	}

	getName() {
		return this._name;
	}

	setName() {
		return this._name;
	}

	setPos(x, y) {
		this._x = x;
		this._y = y;
	}

	setSize(w, h) {
		this._width = w;
		this._height = h;
	}

	getWidth() {
		return this._width;
	}

	getHeight() {
		return this._height;
	}

	move(dx, dy) {
		this._x += dx;
		this._y += dy;
	}

	getPos() {
		return {
			x: this._x,
			y: this._y
		};
	}

	getTop() {
		return this._y;
	}

	getBottom() {
		return this._y + this._height;
	}

	getLeft() {
		return this._x;
	}

	getRight() {
		return this._x + this._width;
	}

	detach() {
		if (!this._parent) {
			return;
		}

		this._parent.removeChild(this);
	}
}
// should be static
GameObject.uid = 1;
