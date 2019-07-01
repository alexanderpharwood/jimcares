import driver from '../helpers/driver.js';
import getPathProps from '../helpers/getPathProps.js';

function getValue(path) {
	if (typeof path !== 'string') {
		throw new TypeError("differance must be of type 'string': '" + typeof path + "' given.");
 	}
	
	let memory = driver();
	let pathProps = getPathProps(path);

	if (pathProps.length === 0) {
		return memory.roots[path].value;
	}

	if (typeof memory.roots[pathProps[0]] === 'undefined') {
		return undefined;
	}

	var node = memory.roots[pathProps[0]].value;
	pathProps.shift();
	for (let index in pathProps) {
		node = node[pathProps[index]];
	}

	return node;
}

export default getValue;
