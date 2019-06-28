import accessor from '../helpers/accessor.js';
import getPathProps from '../helpers/getPathProps.js';

function getValue(path) {
	let memory = accessor();
	let pathProps = getPathProps(path);

	if (pathProps.length === 0) {
		return memory[path].value;
	}

	if (typeof memory[pathProps[0]] === 'undefined') {
		return undefined;
	}

	var node = memory[pathProps[0]].value;
	pathProps.shift();
	for (let index in pathProps) {
		node = node[pathProps[index]];
	}

	return node;
}

export default getValue;
