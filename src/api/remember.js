import driver from '../helpers/driver.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';
import dateFromDifferenceString from '../helpers/dateFromDifferenceString.js';


function remember(path, value, expires_at) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string'");
 	}

	let memory = driver();
	let item = memory.roots[path] = {};
	expires_at = typeof expires_at === 'undefined' ?
		window.__jimcares.defaultExpiration :
		expires_at;

	item.value = value;
	item.created_at = new Date();
	item.updated_at = new Date();
	item.deleted_at = null;
	item.expires_at = dateFromDifferenceString(expires_at);
	setUpdatedAt();
	return true;
}

export default remember;
