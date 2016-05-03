'use strict';

import InputHandlerBase from './InputHandlerBase';

/**
 * The implementation of the InputHandler for the desktop
 * browser based on the mouse events.
 */
export default class MouseInputHandler extends InputHandlerBase {

	constructor(element) {
		super(element);

		// We need additional property to track if the
		// mouse is down.
		this._mouseDown = false;

		// Bound functions
		this._onDownDomEvent = this._onDownDomEvent.bind(this);
		this._onUpDomEvent = this._onUpDomEvent.bind(this);
		this._onMoveDomEvent = this._onMoveDomEvent.bind(this);
		this._onMouseOut = this._onMouseOut.bind(this);
		this._onHoverDomEvent = this._onHoverDomEvent.bind(this);

		this._coords = {x: -1, y: -1};
		this.attachTo(element);
	}

	isDown() {
		return this._mouseDown;
	}

	getCoordinates() {
		return this._coords;
	}

	/**
	 * Attach the listeners to the mouseXXX DOM events
	 */
	_attachDomListeners() {
		let el = this._element;

		el.addEventListener('mousedown', this._onDownDomEvent, false);
		el.addEventListener('mouseup', this._onUpDomEvent, false);
		el.addEventListener('mousemove', this._onMoveDomEvent, false);
		el.addEventListener('mouseout', this._onMouseOut, false);
	}

	/**
	 * Attach the listeners to the mouseXXX DOM events
	 */
	_detachDomListeners() {
		let el = this._element;

		el.removeEventListener('mousedown', this._onDownDomEvent, false);
		el.removeEventListener('mouseup', this._onUpDomEvent, false);
		el.removeEventListener('mousemove', this._onMoveDomEvent, false);
		el.removeEventListener('mouseout', this._onMouseOut, false);
	}

	/**
	 * This method (and the next one) is overridden,
	 * because we have to track the state of the mouse.
	 * This could also be done in the separate listener.
	 */
	_onDownDomEvent(e) {
		this._mouseDown = true;
		super._onDownDomEvent(e);
	}

	_onUpDomEvent(e) {
		this._mouseDown = false;
		InputHandlerBase.prototype._onUpDomEvent.call(this, e);
	}

	/**
	 * We process the move event only if the mouse button is
	 * pressed, otherwise the DOM event is ignored.
	 */
	_onMoveDomEvent(e) {
		if (this._mouseDown) {
			super._onMoveDomEvent(e);
		} else {
			this._onHoverDomEvent(e);
		}
	}

	/**
	 * Hover is for pointer-enabled interfaces. Should rename
	 * move -> drag
	 * hover -> move
	 *
	 * TODO: support deltas in hover
	 */
	_onHoverDomEvent(e) {
		let coords = this._coords = this._getInputCoordinates(e);

		this.emit('hover', {
			x: coords.x, y: coords.y,
			/* deltaX: deltaX, deltaY: deltaY, */ domEvent: e
		});
		this._stopEventIfRequired(e);
	}

	_onMouseOut() {
		this._mouseDown = false;
	}
}
