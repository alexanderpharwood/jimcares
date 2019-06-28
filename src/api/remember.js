import accessor from '../helpers/accessor.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function remember(path, value) {
	if (typeof path === 'undefined') {
		throw new Error('path cannot be undefined');
	}

	let memory = accessor();
	let item = memory[path] = {};
	item.value = value;
	item.created_at = new Date();
	item.updated_at = new Date();
	item.deleted_at = null;
	setUpdatedAt();
	return true;
}

export default remember;
