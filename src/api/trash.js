import getRoot from './getRoot.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function trash(path) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string': '" + typeof path + "' given.");
 	}
	
	let root = getRoot(path);
	if (typeof root === 'undefined') {
		return false;
	}
	root.deleted_at = new Date();
	setUpdatedAt();
	return true;
}

export default trash;
