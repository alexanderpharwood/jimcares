import getValue from './getValue.js';

function equals(path, match) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string': '" + typeof path + "' given.");
	}
	
	return getValue(path) === match;
}

export default equals;
