import driver from '../helpers/driver.js';
import getPathProps from '../helpers/getPathProps.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function flush(path) {
	let memory = driver();
	let exclusions = ["created_at", "updated_at"]
	for (let i in memory.roots) {
		delete memory.roots[i]
	}
}

export default flush;
