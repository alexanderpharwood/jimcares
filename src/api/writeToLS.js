import toJson from './toJson.js';

function writeToLS(path) {
	if (typeof(Storage) === "undefined") {
		throw new Error('Client does not support local storage');
	}

	return localStorage.setItem("__jimcares", toJson());
}

export default writeToLS;
