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
		this._scaleX = 1;
		this._scaleY = 1;

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

		ctx.scale(this._scaleX, this._scaleY);
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

	rotateBy(rads) {
		this._rot += rads;
	}

	getRot() {
		return this._rot;
	}

	setScale(scaleX, scaleY) {
		if (scaleY === undefined) {
			scaleY = scaleX;
		}
		this._scaleX = scaleX;
		this._scaleY = scaleY;
	}

	scaleBy(factor) {
		this._scale *= factor;
	}

	getScale() {
		return {
			x: this._scaleX,
			y: this._scaleY
		};
	}

	getScaleX() {
		return this._scaleX;
	}

	getScaleY() {
		return this._scaleY;
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

	getAbsoluteChildrenBoundingBox() {
		let minX = Number.MAX_VALUE;
		let maxX = Number.MIN_VALUE;
		let minY = Number.MAX_VALUE;
		let maxY = Number.MIN_VALUE;

		let points = this.getAbsoluteBoundingBox();

		this._children.forEach((child) => {
			let box = child.getAbsoluteChildrenBoundingBox();

			points.push({x: box.x, y: box.y});
			points.push({x: box.x + box.width, y: box.y});
			points.push({x: box.x + box.width, y: box.y + box.height});
			points.push({x: box.x, y: box.y + box.height});
		});

		points.forEach((p) => {
			if (p.x < minX) {
				minX = p.x;
			}

			if (p.x > maxX) {
				maxX = p.x;
			}

			if (p.y < minY) {
				minY = p.y;
			}

			if (p.y > maxY) {
				maxY = p.y;
			}
		});

		return new Rect(minX, minY, maxX - minX, maxY - minY);
	}

	getRelativeMatrix() {
		let mat = mat2d.create();
		let absAnchorX = this._anchorX * this._width;
		let absAnchorY = this._anchorY * this._height;

		mat2d.translate(mat, mat, vec2.fromValues(this._x, this._y));

		mat2d.translate(mat, mat, vec2.fromValues(absAnchorX, absAnchorY));

		mat2d.rotate(mat, mat, this._rot);
		mat2d.scale(mat, mat, vec2.fromValues(this._scaleX, this._scaleY));

		mat2d.translate(mat, mat,
			vec2.fromValues(-absAnchorX, -absAnchorY));

		return mat;
	}

	getAbsoluteMatrix() {
		let parent = this.getParent();
		let mat = this.getRelativeMatrix();

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

	getAbsoluteTranslation() {
		let mat = this.getAbsoluteMatrix();

		return [mat[4], mat[5]];
	}

	getAbsoluteRotation() {
		let mat = this.getAbsoluteMatrix();

		return -Math.atan2(-mat[1], mat[0]);
	}

	getAbsoluteScale() {
		let mat = this.getAbsoluteMatrix();
		let sx = Math.sqrt(mat[0] * mat[0] + mat[1] * mat[1]);

		if (mat[0] < 0) {
			sx *= -1;
		}

		let sy = Math.sqrt(mat[3] * mat[3] + mat[4] * mat[4]);

		if (mat[4] < 0) {
			sy *= -1;
		}

		return [sx, sy];
	}
}
// should be static
GameObject.uid = 1;
