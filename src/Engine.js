'use strict';

import Keyboard from './input/Keyboard';
import TouchInputHandler from './input/TouchInputHandler';
import MouseInputHandler from './input/MouseInputHandler';
import DirtyRectangleManager from './DirtyRectangleManager';
import ResourceManager from './ResourceManager';
import GameScene from './GameScene';
import {isTouchDevice} from './utils';

export default class Engine {

	constructor(idOrElement, vpWidth, vpHeight) {
		let canvas = this._canvas = this._getCanvasElement(idOrElement);

		if (vpWidth === undefined || vpHeight === undefined) {
			vpWidth = canvas.width;
			vpHeight = canvas.height;
		}

		this._ctx = canvas.getContext('2d');
		this._scenes = {};
		this._currentScene = null;
		this._lastTick = Date.now();
		this._input = isTouchDevice() ? TouchInputHandler : MouseInputHandler;
		this._keyboard = new Keyboard(canvas);

		this._dirtyRects = new DirtyRectangleManager();
		this._dirtyRects.setViewport(vpWidth, vpHeight);
		this._resourceManager = new ResourceManager();
		this._tick = this._tick.bind(this);

		this._gameContext = {
			resourceManager: this._resourceManager,
			width: canvas.width,
			height: canvas.height
		};

		this._initDefaultScene();
	}

	loadResources(resourceData) {
		return this._resourceManager.load(resourceData);
	}

	getResource(name) {
		return this._resourceManager.get(name);
	}

	getScene() {
		return this._currentScene;
	}

	runScene(id) {
		if (!this._scenes.hasOwnProperty(id)) {
			throw Error(`Could not find scene [${id}] to run`);
		}
		this._currentScene = this._scenes[id];
		this._dirtyRects.markAllDirty();
	}

	addScene(id, scene) {
		scene.init(this._gameContext);
		this._scenes[id] = scene;
		if (!this._currentScene) {
			this.runScene(id);
		}
	}

	scene(id, scene) {
		if (scene === undefined) {
			this.runScene(id);
		} else {
			this.addScene(id, scene);
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

	_initDefaultScene() {
		this.addScene('default', new GameScene());
	}

	_getCanvasElement(idOrElement) {
		if (typeof idOrElement === 'string') {
			return document.getElementById(idOrElement);
		}

		if (idOrElement instanceof HTMLCanvasElement) {
			return idOrElement;
		}

		throw Error('Could not find <canvas> element to attach to Enine');
	}
}
