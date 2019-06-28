import toJson from './toJson.js';

function writeToLS(path) {
	if (typeof(Storage) === "undefined") {
		console.error('Client does not support local storage');
		return false;
	}

	return localStorage.setItem("__jimcares", toJson());
}

export default writeToLS;
