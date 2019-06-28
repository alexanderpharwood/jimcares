import accessor from '../helpers/accessor.js';
import getPathProps from '../helpers/getPathProps.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function clear(path) {
	let memory = accessor();
	let exclusions = ["created_at", "updated_at"]
	for (let i in memory) {
		if (exclusions.indexOf(i) === -1) {
			delete memory[i]
		}
	}
}

export default clear;
