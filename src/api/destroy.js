function destroy(path) {
	clearInterval(window.__jimcares.expirationWorker);
	return delete window.__jimcares;
}

export default destroy;
