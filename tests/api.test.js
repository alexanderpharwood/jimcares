import Jim from '../src/Jim.js';

describe('Jim.init', function () {
	it('should return true if Jim initialises successfully', function () {
		chai.expect(Jim.init()).to.equal(true);
	});
});

describe('Jim.has', function () {
	Jim.init()
	it('should return true when the path is present in cache', function () {
		const path = 'HAS_TEST';
		const value = 'This is the value of the get test.';
		Jim.remember(path, value);
		chai.expect(Jim.has(path)).to.equal(true);
	});
	it('should return false when the path is not present in cache', function () {
		chai.expect(Jim.has('NO_SUCH_PATH')).to.equal(false);
	});
});

describe('Jim.remember', function () {
	Jim.init()
	it('should return true if the value is remembered', function () {
		chai.expect(Jim.remember('REMEMBER_TEST', 'This is the value of the remember test.')).to.equal(true);
	});
});

describe('Jim.get', function () {
	Jim.init()
	it('should return the value of the path in cache', function () {
		const path = 'GET_TEST';
		const value = 'This is the value of the get test.';
		Jim.remember(path, value);
		chai.expect(Jim.get(path)).to.equal(value);
	});
});

describe('Jim.root', function () {
	Jim.init()
	it('should return the root of the path in cache', function () {
		const path = 'ROOT_TEST';
		const value = 'This is the value of the root test.';
		Jim.remember(path, value);

		chai.expect(Jim.root(path).value).to.equal(value);
	});
	it('should have "value", "created_at", "updated_at", and "deleted_at"', function () {
		const path = 'ROOT_TEST';
		const value = 'This is the value of the root test.';
		Jim.remember(path, value);
		chai.expect(Jim.root(path)).to.have.all.keys('value', 'created_at', 'updated_at', 'deleted_at');
	});
});

//@todo test for writeToLs
describe('Jim.writeToLS', function () {
	Jim.init()
	it('should should write the entire cache to local storage', function () {
		const path = 'WRITETOLSTEST_TEST';
		const value = 'This is the value of the writeToLS test.';
		Jim.remember(path, value);
		Jim.writeToLS();

		let fromStorage = localStorage.getItem("__jimcares");

		chai.expect(fromStorage).to.equal(Jim.toJson());
	});
});

describe('Jim.trash', function () {
	Jim.init()
	it('should return timestamp for deleted_at', function () {
		const path = 'TRASH_TEST';
		const value = 'This is the value of the trash test.';
		Jim.remember(path, value);
		Jim.trash(path);

		chai.expect(typeof Jim.root(path).deleted_at).to.equal('object');
	});
});

describe('Jim.forget', function () {
	Jim.init()
	it('should return undefined for the forgetten path', function () {
		const path = 'REMOVE_TEST';
		const value = 'This is the value of the forget test.';
		Jim.remember(path, value);

		chai.expect(Jim.forget(path)).to.equal(true);
		chai.expect(typeof Jim.get(path)).to.equal('undefined');
	});
});

describe('Jim.toJson', function () {
	Jim.init()
	it('should return the stringified json value for the entire cache', function () {
		const path = 'TOJSON_TEST';
		const value = 'This is the value of the toJson test.';
		Jim.remember(path, value);
		let jsonString = JSON.stringify(window.__jimcares)

		chai.expect(Jim.toJson(path)).to.equal(jsonString);
	});
});

describe('Jim.size', function () {
	Jim.init()
	it('should return the size of the entire cache', function () {
		const path = 'SIZE_TEST';
		const value = 'This is the value of the size test.';
		Jim.remember(path, value);

		chai.expect(typeof Jim.size()).to.equal('number');
	});
	it('should return the size of a given path', function () {
		const path = 'SIZE_TEST';
		const value = 'This is the value of the size test.';
		Jim.remember(path, value);

		chai.expect(typeof Jim.size()).to.equal('number');
	});
});

describe('Jim.count', function () {
	Jim.init()
	it('should return the number of roots in the entire cache', function () {
		const path = 'COUNT_TEST';
		const value = 'This is the value of the size test.';

		//Remove all current roots
		Jim.clear();

		Jim.remember(path, value);

		chai.expect(Jim.count()).to.equal(1);
	});
});

describe('Jim.equals', function () {
	Jim.init()
	it('should determine whether the value of the path matches the given comparison', function () {
		const path = 'EQUALS_TEST';
		const value = 'This is the value of the equals test.';
		Jim.remember(path, value);

		chai.expect(Jim.equals(path, value)).to.equal(true);
	});
});

describe('Jim.clear', function () {
	Jim.init()
	it('should clear all roots from the cache', function () {
		const path = 'CLEAR_TEST';
		const value = 'This is the value of the clear test.';
		Jim.remember(path, value);
		Jim.clear();

		chai.expect(Jim.count()).to.equal(0);
	});
});

describe('Jim.destroy', function () {
	Jim.init()
	it('should remove __jimcares from the window', function () {
		const path = 'DESTROY_TEST';
		const value = 'This is the value of the destroy test.';
		Jim.remember(path, value);
		Jim.destroy();

		chai.expect(typeof window.__jimcares).to.equal('undefined');
	});
});
