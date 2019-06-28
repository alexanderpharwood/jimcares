import accessor from '../helpers/accessor.js';

function setUpdatedAt() {
	accessor().updated_at = new Date();
}

export default setUpdatedAt;
