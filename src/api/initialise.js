import dateAdd from '../helpers/dateAdd.js';
import driver from '../helpers/driver.js';
import forget from '../api/forget.js';
import getRoot from '../api/getRoot.js';


/**
 * Initialise Jimcares
 *
 * @param object settings
 * @return bool
 */
function init(settings) {

	//Default settings
	let defaultExpiration = '24 hours';

	if (typeof settings !== 'undefined') {
		if (typeof settings.defaultExpiration !== 'undefined') {
			let defaultExpiration = settings.defaultExpiration;
		}
	}

	window.__jimcares = {
		created_at: new Date(),
		updated_at: new Date(),
		roots: {},
		defaultExpiration: defaultExpiration,
	};

	let expirationWorker = function(){
		return setInterval(function(){
			for (let i in window.__jimcares.roots) {
				if (getRoot(i).expires_at.getTime() < (new Date()).getTime()) {
				 	forget(i);
				}
			}
		}, 5000)
	};

	window.__jimcares.expirationWorker = expirationWorker();

	return true;
}

export default init;
