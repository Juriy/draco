import chai from 'chai';
import * as draco from '../lib/draco.js';

const assert = chai.assert;

describe('Engine', () => {
	it('should work', () => {
		assert.equal(typeof draco, 'object', 'Should be true');
	})
});