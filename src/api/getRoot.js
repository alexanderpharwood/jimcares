import driver from '../helpers/driver.js';
import getPathProps from '../helpers/getPathProps.js';

function getRoot(path) {
	let memory = driver();
	let pathProps = getPathProps(path);

	if (pathProps.length === 0) {
		return memory.roots[path].value;
	}

	return memory.roots[pathProps[0]];
}

export default getRoot;
