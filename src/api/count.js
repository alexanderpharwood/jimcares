import driver from '../helpers/driver.js';

function count() {
	let memory = driver();
	return Object.keys(memory.roots).length;
}

export default count;
