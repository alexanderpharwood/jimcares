import driver from '../helpers/driver.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function flush() {
	let memory = driver();
	for (let i in memory.roots) {
		delete memory.roots[i]
	}
	setUpdatedAt();
}

export default flush;
