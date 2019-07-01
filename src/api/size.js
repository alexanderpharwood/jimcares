import driver from '../helpers/driver.js';
import sizeof from '../helpers/sizeof.js';

function size(path) {
	return sizeof(driver().roots);
}

export default size;
