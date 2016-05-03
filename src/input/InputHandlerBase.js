'use strict';

import EventEmitter from '../EventEmitter';

/**
 * The "abstract" base for MouseInputHandler and TouchInputHandler. This class is not
 * supposed to be instantiated directly. It provides the common base for touch and
 * mouse input handling.
 *
 * @param element the DOM element to work with - concrete input handlers will
 * register as event handlers of this element. In gamedev projects the
 * element is usually the main canvas
 */
export default class InputHandlerBase extends EventEmitter {

	constructor(element) {
		super();

		// The DOM element, descendants will set this in attach()
		this._element = null;
		this._moving = false;
		this._lastMoveCoordinates = null;
		this._moveThreshold = 10;
		this._stopDomEvents = false;
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
	}

	getMoveThreshold() {
		return this._moveThreshold;
	}

	setMoveThreshold(moveThreshold) {
		this._moveThreshold = moveThreshold;
	}

	getStopDomEvents() {
		return this._stopDomEvents;
	}

	setStopDomEvents(stopDomEvents) {
		this._stopDomEvents = stopDomEvents;
	}

	/**
	 * Listens to the "down" DOM events: mousedown and touchstart.
	 * @param e DOM Event
	 */
	_onDownDomEvent(e) {
		// We must save this coordinates to support the moveThreshold - this
		// may be the starting point of the movement, we can't simply
		let coords = this._lastMoveCoordinates = this._getInputCoordinates(e);

		// Emit "down" event - all coordinates together with the
		// original DOM event are passed to listeners
		this.emit('down', {x: coords.x, y: coords.y, domEvent: e});

		// Usually we want to stop original the DOM events
		// from further browser processing.
		this._stopEventIfRequired(e);
	}

	/**
	 * Listens to the "up" DOM events: mouseup and touchend. Touchend
	 * doesn't have any coordinates associated with it so this function
	 * will be overridden in TouchInputHandler
	 * @param e DOM Event
	 */
	_onUpDomEvent(e) {
		// Works exactly the same way as _onDownDomEvent
		let coords = this._getInputCoordinates(e);

		this.emit('up', {
			x: coords.x,
			y: coords.y,
			moved: this._moving,
			domEvent: e
		});

		this._stopEventIfRequired(e);

		// The interaction is ended. Reset the flag
		this._moving = false;
	}

	/**
	 * Listens to the "move" DOM events: mousemove and touchmove.
	 * This function keeps track of the distance travelled since the last
	 * "move" action, besides it ignores the movement and swallows the event
	 * if we are still within the _moveThreshold
	 * @param e DOM event
	 */
	_onMoveDomEvent(e) {
		let coords = this._getInputCoordinates(e);

		// Calculate deltas
		let deltaX = coords.x - this._lastMoveCoordinates.x;
		let deltaY = coords.y - this._lastMoveCoordinates.y;

		// Check threshold, if the distance from the initial
		// tap to the current position is more than the threshold
		// value - qualify it as a real movement
		let deltaMove = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		if (!this._moving && deltaMove > this._moveThreshold) {
			this._moving = true;
		}

		// If the current interaction is "moving" (we crossed the threshold already) then emit
		// the event, otherwise, just ignore the interaction.
		if (this._moving) {
			this.emit('move', {
				x: coords.x,
				y: coords.y,
				deltaX: deltaX,
				deltaY: deltaY,
				domEvent: e
			});
			this._lastMoveCoordinates = coords;
		}

		this._stopEventIfRequired(e);
	};

	_stopEventIfRequired(e) {
		if (this._stopDomEvents) {
			e.stopPropagation();
			e.preventDefault();
		}
	}

	_getInputCoordinates(e) {
		let element = this._element;
		let coords = e.targetTouches ? e.targetTouches[0] : e;

		let x = (coords.pageX || coords.clientX + document.body.scrollLeft) -
			element.offsetLeft;

		let y = (coords.pageY || coords.clientY + document.body.scrollTop) -
			element.offsetTop;

		// TODO: Change to destructuring
		return {
			x: x,
			y: y
		};
	}
}
