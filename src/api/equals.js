import getValue from './getValue.js';

function equals(path, match) {
	return getValue(path) === match;
}

export default equals;
