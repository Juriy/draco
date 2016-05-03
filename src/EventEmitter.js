'use strict';

export default class EventEmitter {
	constructor() {
		this._listeners = {};
	}

	addListener(type, listener) {
		if (typeof listener !== 'function') {
			throw Error('Listener must be a function');
		}

		if (!this._listeners[type]) {
			this._listeners[type] = [];
		}

		this._listeners[type].push(listener);
	}

	removeListener(type, listener) {
		if (typeof listener !== 'function') {
			throw Error('Listener must be a function');
		}

		if (!this._listeners[type]) {
			return;
		}

		let position = this._listeners[type].indexOf(listener);

		if (position !== -1) {
			this._listeners[type].splice(position, 1);
		}
	}

	removeAllListeners(type) {
		if (type) {
			this._listeners[type] = [];
		} else {
			this._listeners = {};
		}
	}

	emit(type, event) {
		if (!(this._listeners[type] && this._listeners[type].length)) {
			return;
		}

		for (let i = 0; i < this._listeners[type].length; i++) {
			this._listeners[type][i].call(this, event);
		}
	}
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener;
