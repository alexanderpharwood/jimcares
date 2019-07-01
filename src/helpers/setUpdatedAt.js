import driver from '../helpers/driver.js';

function setUpdatedAt() {
	driver().updated_at = new Date();
}

export default setUpdatedAt;
