import accessor from '../helpers/accessor.js';

function toJson(path) {
	return JSON.stringify(accessor());
}

export default toJson;
