'use strict';

import Rect from './Rect';

import {mat2d, vec2} from 'gl-matrix';

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

		this._relativeMatrix = mat2d.create();
		this._absoulteMatrix = mat2d.create();

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

		ctx.translate(this._x, this._y);

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
		this.move(x - this._x, y - this._y);
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

		this._relativeMatrix = mat2d.translate(
			this._relativeMatrix,
			this._relativeMatrix,
			vec2.fromValues(dx, dy)
		);
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
		let mat = this.getAbsoluteMatrix();

		let p1 = vec2.fromValues(0, 0);
		let p2 = vec2.fromValues(this._width, 0);
		let p3 = vec2.fromValues(this._width, this._height);
		let p4 = vec2.fromValues(0, this._height);

		vec2.transformMat2d(p1, p1, mat);
		vec2.transformMat2d(p2, p2, mat);
		vec2.transformMat2d(p3, p3, mat);
		vec2.transformMat2d(p4, p4, mat);

		return [
			{x: p1[0], y: p1[1]},
			{x: p2[0], y: p2[1]},
			{x: p3[0], y: p3[1]},
			{x: p4[0], y: p4[1]}
		];
	}

	getRelativeMatrix() {
		return this._relativeMatrix;
	}

	getAbsoluteMatrix() {
		let parent = this.getParent();
		let mat = this._relativeMatrix;

		if (parent === null) {
			return mat;
		}

		let parentAbsolute = parent.getAbsoluteMatrix();
		let result = mat2d.multiply(mat2d.create(), parentAbsolute, mat);

		return result;
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
