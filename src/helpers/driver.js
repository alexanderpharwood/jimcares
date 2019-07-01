function driver(){
	if (typeof window.__jimcares === 'undefined') {
		throw new Error('Jim is not initialised yet. Call Jim.init({options}) first');
	}

	return window.__jimcares;
}

export default driver;
