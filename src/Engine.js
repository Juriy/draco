'use strict';

import Keyboard from './input/Keyboard';
import TouchInputHandler from './input/TouchInputHandler';
import MouseInputHandler from './input/MouseInputHandler';
import DirtyRectangleManager from './DirtyRectangleManager';
import ImageManager from './ImageManager';
import {isTouchDevice} from './utils';

export default class Engine {

	constructor(id, vpWidth, vpHeight) {
		this._canvas = document.getElementById(id);
		this._ctx = this._canvas.getContext('2d');
		this._scenes = {};
		this._currentScene = null;
		this._lastTick = Date.now();
		this._input = isTouchDevice() ? TouchInputHandler : MouseInputHandler;
		this._keyboard = new Keyboard(this._canvas);

		this._dirtyRects = new DirtyRectangleManager();
		this._dirtyRects.setViewport(vpWidth, vpHeight);
		this._resourceManager = new ImageManager();
		this._tick = this._tick.bind(this);

		this._gameContext = {
			resourceManager: this._resourceManager,
			width: this._canvas.width,
			height: this._canvas.height
		};
	}

	loadResources(resourceData, onDone) {
		this._resourceManager.load(resourceData, onDone, function onProgress() {
		});
	}

	getResource(name) {
		return this._resourceManager.get(name);
	}

	scene(id, scene) {
		if (scene === undefined) {
			this._useScene(id);
		} else {
			scene.init(this._gameContext);
			this._scenes[id] = scene;
			if (!this._currentScene) {
				this._useScene(id);
			}
		}
	}

	start() {
		this._lastTick = Date.now();
		this._tick();
	}

	_tick() {
		requestAnimationFrame(this._tick);

		// delta time
		let dt = Date.now() - this._lastTick;

		this._lastTick = Date.now();

		// frame context
		let fc = {
			dt: dt,
			input: this._input,
			keyboard: this._keyboard,
			graphContext: this._ctx,
			width: this._canvas.width,
			height: this._canvas.height,
			dirtyRects: this._dirtyRects
		};

		if (!this._currentScene) {
			return;
		}

		this._update(fc);

		if (!this._dirtyRects.isClean()) {
			this._draw(fc);
		}

		this._keyboard.resetPressed();
	}

	_update(fc) {
		this._currentScene.update(fc);
	}

	_draw(fc) {
		let rect = this._dirtyRects.getDirtyRect();

		this._ctx.save();
		this._ctx.beginPath();
		this._ctx.rect(rect.x, rect.y, rect.width, rect.height);
		this._ctx.clip();
		this._currentScene.draw(fc);
		this._dirtyRects.clear();
		this._ctx.restore();
	}

	_useScene(id) {
		this._currentScene = this._scenes[id];
		this._dirtyRects.markAllDirty();
	}
}
