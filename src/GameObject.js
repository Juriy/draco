'use strict';

import Rect from './Rect';

import {mat3} from 'gl-matrix';

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
		this._scale = 1;

		this._relativeMatrix = mat3.create();
		this._absoulteMatrix = mat3.create();

		this._scene = null;
		this._parent = null;
		this._children = [];
	}

	update(fc) {
		this._children.forEach(it => it.update(fc));
	}

	draw(fc) {
		let ctx = fc.graphContext;

		ctx.save();
		this._applyTransforms(ctx);
		this._renderSelf(fc);
		this._children.forEach(it => it.draw(fc));
		ctx.restore();
	}

	_renderSelf(fc) {

	}

	_applyTransforms(ctx) {
		let anchorX = this._anchorX * this._width;
		let anchorY = this._anchorY * this._height;

		ctx.translate(this._x - anchorX, this._y - anchorY);

		ctx.translate(anchorX, anchorY);
		ctx.rotate(this._rot);

		ctx.scale(this._scale, this._scale);
		ctx.translate(-anchorX, -anchorY);
	}

	beforeAddedToParent() {

	}

	afterAddedToParent() {

	}

	beforeRemovedFromParent() {

	}

	afterRemovedFromParent() {

	}

	addChild(child) {
		if (!child instanceof GameObject) {
			throw Error('Child must be a GameObject');
		}

		child.beforeAddedToParent();
		this._children.push(child);
		child.setParent(this);
		child.afterAddedToParent();
	}

	removeChild(child) {
		let idx = this._children.indexOf(child);

		if (idx > -1) {
			child.beforeRemovedFromParent();
			child.setParent(null);
			let removedChild = this._children.splice(idx, 1);

			child.afterRemovedFromParent();
			return removedChild;
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

	setX(x) {
		this._x = x;
	}

	setY(y) {
		this._y = y;
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

	setRot(rot) {
		this._rot = rot;
	}

	getRot() {
		return this._rot;
	}

	setScale(scale) {
		this._scale = scale;
	}

	getScale() {
		return this._scale;
	}

	getAnchor() {
		return {
			x: this._anchorX,
			y: this._anchorY
		};
	}

	setAnchor(x, y) {
		this._anchorX = x;
		this._anchorY = y;
	}

	getBoundingBox() {
		return new Rect(this._x, this._y, this._width, this._height);
	}

	getAbsoluteBoundingBox() {

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
