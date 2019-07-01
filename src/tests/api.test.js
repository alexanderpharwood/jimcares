import Jim from '../Jim.js';

describe('Jim.init', function () {
	it('should return true if Jim initialises successfully', function () {
		chai.expect(Jim.init()).to.equal(true);
		Jim.destroy();
	});
});

describe('Jim.has', function () {
	it('should return true when the path is present in cache', function () {
		Jim.init()
		const path = 'HAS_TEST';
		const value = 'This is the value of the get test.';
		Jim.remember(path, value);
		chai.expect(Jim.has(path)).to.equal(true);
		Jim.destroy();
	});
	it('should return true when the path is present in cache inside a nested object', function () {
		Jim.init()
		let path = 'HAS_NESTED_TEST';
		let value = {
			"foo": {
				"bar": "val" 
			}
		};
		Jim.remember(path, value);
		chai.expect(Jim.has('HAS_NESTED_TEST' + '/foo/bar')).to.equal(true);
		Jim.destroy();
	});
	it('should return false when the path is not present in cache', function () {
		Jim.init()
		chai.expect(Jim.has('NO_SUCH_PATH')).to.equal(false);
		Jim.destroy();
	});
	it('should return false when the path is present in cache inside a nested object', function () {
		Jim.init()
		let path = 'HAS_NOT_NESTED_TEST';
		let value = "NOTHING NESTED HERE";
		Jim.remember(path, value);
		chai.expect(Jim.has('HAS_NOT_NESTED_TEST' + '/foo/bar')).to.equal(false);
		Jim.destroy();
	});
	
});

describe('Jim.remember', function () {
	it('should return true if the value is remembered', function () {
		Jim.init()
		chai.expect(Jim.remember('REMEMBER_TEST', 'This is the value of the remember test.')).to.equal(true);
		Jim.destroy();
	});
});

describe('Jim.get', function () {
	it('should return the value of the path in cache', function () {
		Jim.init()
		const path = 'GET_TEST';
		const value = 'This is the value of the get test.';
		Jim.remember(path, value);
		chai.expect(Jim.get(path)).to.equal(value);
		Jim.destroy();
	});
	it('should return the value of the nested property of an object at the path in cache', function () {
		Jim.init()
		let path = 'GET_TEST';
		let value = {
			"foo": {
				"bar": "val" 
			}
		};
		Jim.remember(path, value);
		chai.expect(Jim.get(path + '/foo/bar')).to.equal("val");
		Jim.destroy();
	});
});

describe('Jim.root', function () {
	it('should return the root of the path in cache', function () {
		Jim.init()
		const path = 'ROOT_TEST';
		const value = 'This is the value of the root test.';
		Jim.remember(path, value);

		chai.expect(Jim.root(path).value).to.equal(value);
		Jim.destroy();
	});
	it('should have "value", "created_at", "updated_at", and "deleted_at"', function () {
		Jim.init()
		const path = 'ROOT_TEST';
		const value = 'This is the value of the root test.';
		Jim.remember(path, value);
		chai.expect(Jim.root(path)).to.have.all.keys('value', 'created_at', 'updated_at', 'deleted_at', 'expires_at');
		Jim.destroy();
	});
});

//@todo test for writeToLs
describe('Jim.writeToLS', function () {
	it('should should write the entire cache to local storage', function () {
		Jim.init()
		const path = 'WRITETOLSTEST_TEST';
		const value = 'This is the value of the writeToLS test.';
		Jim.remember(path, value);
		Jim.writeToLS();

		let fromStorage = localStorage.getItem("__jimcares");

		chai.expect(fromStorage).to.equal(Jim.toJson());
		Jim.destroy();
	});
});

describe('Jim.trash', function () {
	it('should return timestamp for deleted_at', function () {
		Jim.init()
		const path = 'TRASH_TEST';
		const value = 'This is the value of the trash test.';
		Jim.remember(path, value);
		Jim.trash(path);

		chai.expect(typeof Jim.root(path).deleted_at).to.equal('object');
		Jim.destroy();
	});
});

describe('Jim.isTrashed', function () {
	it('should return true if the root has been trashed', function () {
		Jim.init()
		const path = 'ISTRASHED_TEST';
		const value = 'This is the value of the isTrashed test.';
		Jim.remember(path, value);
		Jim.trash(path);

		chai.expect(Jim.isTrashed(path)).to.equal(true);
		Jim.destroy();
	});
});

describe('Jim.forget', function () {
	it('should return undefined for the forgetten path', function () {
		Jim.init()
		const path = 'REMOVE_TEST';
		const value = 'This is the value of the forget test.';
		Jim.remember(path, value);

		chai.expect(Jim.forget(path)).to.equal(true);
		chai.expect(typeof Jim.get(path)).to.equal('undefined');
		Jim.destroy();
	});
});

describe('Jim.toJson', function () {
	it('should return the stringified json value for the entire cache', function () {
		Jim.init()
		const path = 'TOJSON_TEST';
		const value = 'This is the value of the toJson test.';
		Jim.remember(path, value);
		let jsonString = JSON.stringify(window.__jimcares)

		chai.expect(Jim.toJson(path)).to.equal(jsonString);
		Jim.destroy();
	});
});

describe('Jim.size', function () {
	it('should return the size of the entire cache', function () {
		Jim.init()
		const path = 'SIZE_TEST';
		const value = 'This is the value of the size test.';
		Jim.remember(path, value);

		chai.expect(typeof Jim.size()).to.equal('number');
		Jim.destroy();
	});
	it('should return the size of a given path', function () {
		Jim.init()
		const path = 'SIZE_TEST';
		const value = 'This is the value of the size test.';
		Jim.remember(path, value);

		chai.expect(typeof Jim.size()).to.equal('number');
		Jim.destroy();
	});
});

describe('Jim.count', function () {
	it('should return the number of roots in the entire cache', function () {
		Jim.init()
		const path = 'COUNT_TEST';
		const value = 'This is the value of the size test.';

		//Remove all current roots
		Jim.flush();

		Jim.remember(path, value);

		chai.expect(Jim.count()).to.equal(1);
		Jim.destroy();
	});
});

describe('Jim.equals', function () {
	it('should determine whether the value of the path matches the given comparison', function () {
		Jim.init()
		const path = 'EQUALS_TEST';
		const value = 'This is the value of the equals test.';
		Jim.remember(path, value);

		chai.expect(Jim.equals(path, value)).to.equal(true);
		Jim.destroy();
	});
});

describe('Jim.flush', function () {
	it('should flush all roots from the cache', function () {
		Jim.init()
		const path = 'FLUSH_TEST';
		const value = 'This is the value of the flush test.';
		Jim.remember(path, value);
		Jim.flush();

		chai.expect(Jim.count()).to.equal(0);
		Jim.destroy();
	});
});

describe('Jim.destroy', function () {
	it('should remove __jimcares from the window', function () {
		Jim.init();
		const path = 'DESTROY_TEST';
		const value = 'This is the value of the destroy test.';
		Jim.remember(path, value);
		Jim.destroy();

		chai.expect(typeof window.__jimcares).to.equal('undefined');
	});
});

//Becasue of the timeout, this has to be run last.
describe('window.__jimcares.expirationWorker', function () {
	this.timeout(7000);
	it('should check every five seconds for expired roots', function (done) {
		Jim.init()
		Jim.remember('path', 'value', '3 seconds');
		setTimeout(function(){
			chai.expect(Jim.count()).to.equal(0);
			Jim.destroy();
			done();
		}, 6000);
	});
});
