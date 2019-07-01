import dateAdd from './dateAdd.js';

function dateFromDifferenceString(difference) {
	if (typeof difference !== 'string') {
		throw new TypeError("differance must be of type 'string': '" + typeof difference + "' given.");
 	}

	var date = new Date();
	var interval = difference.split(' ')[1];
	var units = difference.split(' ')[0];
	date = dateAdd(date, interval, units);
	return date;
}

export default dateFromDifferenceString;
