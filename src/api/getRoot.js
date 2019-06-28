import accessor from '../helpers/accessor.js';
import getPathProps from '../helpers/getPathProps.js';

function getRoot(path) {
	let memory = accessor();
	let pathProps = getPathProps(path);

	if (pathProps.length === 0) {
		return memory[path].value;
	}

	return memory[pathProps[0]];
}

export default getRoot;
