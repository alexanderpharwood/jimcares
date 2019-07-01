import getRoot from './getRoot.js';
import getValue from './getValue.js';

function has(path) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string': '" + typeof path + "' given.");
	}
	
	let rootExists = typeof getRoot(path) !== 'undefined';
	let valueExists = typeof getValue(path) !== 'undefined';
	
	return rootExists || valueExists;
}

export default has;
