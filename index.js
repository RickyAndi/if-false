module.exports = function ifFalse(condition, toReturnIfFalse, toReturnIfTrue) {
	if(!condition) {
		if((typeof toReturnIfFalse) == 'function') {
			return toReturnIfFalse();
		}

		return toReturnIfFalse;
	}

	if((typeof toReturnIfTrue) == 'function') {
		return toReturnIfTrue();
	}

	return toReturnIfTrue;
}