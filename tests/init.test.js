import init from '../src/api/initialise.js';

describe('init', function () {
	it('should return the __jimcares object', function () {
		chai.expect(init()).to.equal(true);
	});
});
