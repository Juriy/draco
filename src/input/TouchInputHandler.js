'use strict';

/**
 * The implementation of the InputHandler for the touch interfaces.
 * Based on the touch events.
 */

import InputHandlerBase from './InputHandlerBase';

export default class TouchInputHandler extends InputHandlerBase {

	constructor(element) {
		super(element);
		this._isDown = false;
		this._lastInteractionCoordinates = {
			x: 0,
			y: 0
		};
		this._onDownDomEvent = this._onDownDomEvent.bind(this);
		this._onUpDomEvent = this._onUpDomEvent.bind(this);
		this._onMoveDomEvent = this._onMoveDomEvent.bind(this);
		this.attachTo(element);
	}

	isDown() {
		return this._isDown;
	}

	getCoordinates() {
		return this._lastInteractionCoordinates;
	}

	_attachDomListeners() {
		let el = this._element;

		el.addEventListener('touchstart', this._onDownDomEvent, false);
		el.addEventListener('touchend', this._onUpDomEvent, false);
		el.addEventListener('touchcancel', this._onUpDomEvent, false);
		el.addEventListener('touchmove', this._onMoveDomEvent, false);
	}

	_detachDomListeners() {
		let el = this._element;

		el.removeEventListener('touchstart', this._onDownDomEvent, false);
		el.removeEventListener('touchend', this._onUpDomEvent, false);
		el.removeEventListener('touchcancel', this._onUpDomEvent, false);
		el.removeEventListener('touchmove', this._onMoveDomEvent, false);
	}

	_onDownDomEvent(e) {
		this._lastInteractionCoordinates = this._getInputCoordinates(e);
		this._isDown = true;
		super._onDownDomEvent(e);
	}

	_onUpDomEvent(e) {
		this.emit('up', {
			x: this._lastInteractionCoordinates.x,
			y: this._lastInteractionCoordinates.y,
			moved: this._moving,
			domEvent: e
		});
		this._stopEventIfRequired(e);
		this._isDown = false;
		this._moving = false;
	}

	_onMoveDomEvent(e) {
		this._lastInteractionCoordinates = this._getInputCoordinates(e);
		super._onMoveDomEvent(e);
	}
}
