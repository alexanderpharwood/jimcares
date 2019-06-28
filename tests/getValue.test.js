import init from '../src/api/initialise.js';
import getValue from '../src/api/getValue.js';
import save from '../src/api/save.js';

describe('getValue', function () {
	init();
	const value = "This is a test.";
	const path = "getValue test";

	save(path, value);

	it('should return the given value', function () {
		console.log(getValue(path));
		chai.expect(getValue(path)).to.equal(value);
	});
});
