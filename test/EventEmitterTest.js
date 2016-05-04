import chai from 'chai';
import sinon from 'sinon';
import {EventEmitter} from '../lib/draco.js';

const assert = chai.assert;
const spy = sinon.spy;

describe('EventEmitter', () => {

	let emitter;

	before(() => {
		emitter = new EventEmitter();
	});

	it('should register and notify listeners', () => {
		let cb = spy();
		emitter.on('action', cb);
		emitter.emit('action');
		assert(cb.calledOnce, 'should call listener');
	});

	it('should accept multiple listeners', () => {
		let listeners = [spy(), spy()];
		listeners.forEach((it) => emitter.on('action', it));
		emitter.emit('action');

		listeners.forEach((it) => {
			assert(it.calledOnce, 'should call listener');
		});
	});
});