import driver from '../helpers/driver.js';
import getPathProps from '../helpers/getPathProps.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function forget(path) {
	if (typeof path !== 'string') {
		throw new TypeError("path must be of type 'string': '" + typeof path + "' given.");
	}
	
	let memory = driver();
	let pathProps = getPathProps(path);
	setUpdatedAt();
	return delete memory.roots[path];
}

export default forget;
