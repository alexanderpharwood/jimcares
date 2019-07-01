import driver from '../helpers/driver.js';

function getRoot(path) {
	if (typeof path !== 'string') {
		throw new TypeError("differance must be of type 'string': '" + typeof path + "' given.");
 	}
	
	let memory = driver();
	return memory.roots[path];
}

export default getRoot;
