import has from './api/has.js';
import size from './api/size.js';
import trash from './api/trash.js';
import clear from './api/clear.js';
import count from './api/count.js';
import equals from './api/equals.js';
import toJson from './api/toJson.js';
import forget from './api/forget.js';
import getRoot from './api/getRoot.js';
import destroy from './api/destroy.js';
import getValue from './api/getValue.js';
import remember from './api/remember.js';
import writeToLS from './api/writeToLS.js';
import initialise from './api/initialise.js';

class Jim {

	static init() {
		return initialise();
	}

	/**
	 * Determine whether jim has the given path.
	 *
	 * @param string path
	 * @return bool
	 */
	static has(path) {
		return has(path);
	}

	/**
	 * Save a value at the given path.
	 *
	 * @param string path
	 * @param mixed value
	 * @return bool
	 */
	static remember(path, value) {
		return remember(path, value);
	}

	/**
	 * Get the value from the given path.
	 *
	 * @param string path
	 * @return mixed
	 */
	static get(path) {
		return getValue(path);
	}

	/**
	 * Get the root from the given path.
	 *
	 * @param string path
	 * @return object
	 */
	static root(path) {
		return getRoot(path);
	}

	/**
	 * Write the cache to local storage.
	 *
	 * @todo optional path to store only a singe root.
	 * @return bool
	 */
	static writeToLS() {
		return writeToLS();
	}

	/**
	 * Soft delete the root at the given root.
	 *
	 * @param string path
	 * @return bool
	 */
	static trash(path) {
		return trash(path);
	}

	/**
	 * Check if the given path has been soft deleted.
	 *
	 * @param string path
	 * @return bool
	 */
	static isTrashed(path) {
		return trash(path);
	}

	/**
	 * Hard delete the root at the given path.
	 *
	 * @param string path
	 * @return bool
	 */
	static forget(path) {
		return forget(path);
	}

	/**
	 * Clear all roots from the cache.
	 *
	 * @return void
	 */
	static clear() {
		clear()
	}

	/**
	 * Destroy the entire cache.
	 *
	 * @return void
	 */
	static destroy() {
		destroy();
	}

	/**
	 * Export the entire cache to json, or the given path.
	 *
	 * @todo optional parameter to return the json string for a given path.
	 * @return string
	 */
	static toJson() {
		return toJson();
	}

	/**
	 * Get the size of the entire cache in bytes.
	 *
	 * @todo optional size of a given path if one is provided.
	 * @return string
	 */
	static size() {
		return size();
	}

	/**
	 * Get the count of roots in the cache.
	 *
	 * @return string
	 */
	static count() {
		return count();
	}

	/**
	 * Determine if the given value matched the value at the given path in cache.
	 *
	 * @param path string
	 * @param match mixed
	 * @return bool
	 */
	static equals(path, match) {
		return equals(path, match);
	}
}

export default Jim;
