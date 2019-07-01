import driver from '../helpers/driver.js';

function toJson(path) {
	return JSON.stringify(driver());
}

export default toJson;
