import accessor from '../helpers/accessor.js';
import sizeof from '../helpers/sizeof.js';

function size(path) {
	return sizeof(accessor());
}

export default size;
