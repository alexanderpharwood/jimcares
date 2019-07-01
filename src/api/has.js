import getRoot from './getRoot.js';

function has(path) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string': '" + typeof path + "' given.");
	}
	
	return typeof getRoot(path) !== 'undefined';
}

export default has;
