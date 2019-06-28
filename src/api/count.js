import accessor from '../helpers/accessor.js';

function count(path) {
	let exclusions = ["created_at", "updated_at"]
	let count = 0;
	let memory = accessor();
	return Object.keys(memory).length - exclusions.length;
}

export default count;
