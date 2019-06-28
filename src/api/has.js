import getValue from './getValue.js';

function has(path) {
	return typeof getValue(path) !== 'undefined';
}

export default has;
