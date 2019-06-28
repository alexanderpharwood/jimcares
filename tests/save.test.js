import init from '../src/api/initialise.js';

import save from '../src/api/save.js';

describe('save', function () {
	init();
	it('should return true', function () {
		chai.expect(save('save test', 'test')).to.equal(true);
	});
});
