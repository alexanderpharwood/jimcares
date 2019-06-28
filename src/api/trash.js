import getRoot from './getRoot.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function trash(path) {
	let node = getRoot(path);
	if (typeof node === 'undefined') {
		return false;
	}
	node.deleted_at = new Date();
	setUpdatedAt();
	return true;
}

export default trash;
