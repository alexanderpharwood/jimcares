import getRoot from './getRoot.js';

function isTrashed(path) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string': '" + typeof path + "' given.");
	}
	
	let root = getRoot(path);
	
	if (typeof root === 'undefined') {
		return false;
	}
	
	return root.deleted_at !== null;
}

export default isTrashed;
