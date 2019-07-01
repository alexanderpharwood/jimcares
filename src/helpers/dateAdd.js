/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 *
 * @param date  Date to start with
 * @param interval  One of: year, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
function dateAdd(date, interval, units) {
	var ret = new Date(date); //don't change original date
	var checkRollover = function() {
		if (ret.getDate() !== date.getDate()) {
			ret.setDate(0);
		}
	}

	switch(interval.toLowerCase()) {
		case 'year':
		case 'years':
			ret.setFullYear(ret.getFullYear() + units);
			checkRollover();
			break;
		case 'month':
		case 'months':
			ret.setMonth(ret.getMonth() + units);
			checkRollover();
			break;
		case 'week':
		case 'weeks':
			ret.setDate(ret.getDate() + 7*units);
			break;
		case 'day':
		case 'days':
			ret.setDate(ret.getDate() + units);
			break;
		case 'hour':
		case 'hours':
			ret.setTime(ret.getTime() + units*3600000);
			break;
		case 'minute':
		case 'minutes':
			ret.setTime(ret.getTime() + units*60000);
			break;
		case 'second':
		case 'seconds':
			ret.setTime(ret.getTime() + units*1000);
			break;
		default       :
			ret = undefined;
			break;
	}

	return ret;
}

export default dateAdd;
