/**
 * Initialise Jimcares
 * @todo This method should accept options, such as a default expiration time. It should also set up the timeout for removing properties from the cache.
 * @return bool
 */
function init() {
	window.__jimcares = {
		"created_at": new Date(),
		"updated_at": new Date()
	};

	return true;
}

export default init;
