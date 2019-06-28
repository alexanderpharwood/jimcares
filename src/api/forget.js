import accessor from '../helpers/accessor.js';
import getPathProps from '../helpers/getPathProps.js';
import setUpdatedAt from '../helpers/setUpdatedAt.js';

function forget(path) {
	let memory = accessor();
	let pathProps = getPathProps(path);
	setUpdatedAt();
	return delete memory[path];
}

export default forget;
