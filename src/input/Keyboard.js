'use strict';

import EventEmitter from '../EventEmitter';

export default class Keyboard extends EventEmitter {
	constructor(element) {
		super();

		this._element = null;
		this._stopDomEvents = true;
		this._keys = [];
		this._pressed = [];

		this._onKeyDown = this._onKeyDown.bind(this);
		this._onKeyUp = this._onKeyUp.bind(this);

		this.attachTo(element);
	}

	detach() {
		if (this._element) {
			this._detachDomListeners();
			this._element = null;
		}
	}

	attachTo(el) {
		if (this._element) {
			this._detachDomListeners();
		}

		this._element = el;
		if (el) {
			this._attachDomListeners();
		}
		el.focus();
	}

	getStopDomEvents() {
		return this._stopDomEvents;
	}

	setStopDomEvents(stopDomEvents) {
		this._stopDomEvents = stopDomEvents;
	}

	isDown(code) {
		return this._keys[code];
	}

	isPressed(code) {
		return this._pressed[code];
	}

	resetPressed() {
		this._pressed = [];
	}

	_stopEventIfRequired(e) {
		if (this._stopDomEvents) {
			e.stopPropagation();
			e.preventDefault();
		}
	}

	_onKeyDown(e) {
		this._pressed[e.keyCode] = !this.isDown(e.keyCode);
		this._keys[e.keyCode] = true;
		this._stopEventIfRequired(e);
	}

	_onKeyUp(e) {
		this._keys[e.keyCode] = false;
		this._pressed[e.keyCode] = false;
		this._stopEventIfRequired(e);
	}

	/**
	 * Attach the listeners to the mouseXXX DOM events
	 */
	_attachDomListeners() {
		let el = this._element;

		el.addEventListener('keydown', this._onKeyDown, false);
		el.addEventListener('keyup', this._onKeyUp, false);
	}

	/**
	 * Attach the listeners to the mouseXXX DOM events
	 */
	_detachDomListeners() {
		let el = this._element;

		el.removeEventListener('keydown', this._onKeyDown, false);
		el.removeEventListener('keyup', this._onKeyUp, false);
	}
}
