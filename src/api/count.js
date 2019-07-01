import driver from '../helpers/driver.js';

function count(path) {
	let memory = driver();
	return Object.keys(memory.roots).length;
}

export default count;
