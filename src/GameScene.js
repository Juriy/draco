'use strict';

import GameObject from './GameObject';

export default class GameScene extends GameObject {
	constructor() {
		super();
		this._gameContext = null;
	}

	init(gameContext) {
		this._gameContext = gameContext;
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
}
