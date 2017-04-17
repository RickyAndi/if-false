# ifFalse

## description

- a simple function to make if false statement more readable (in my opinion .. :D)

## example

### you can simply provide simple value

```javascript
	
	var ifFalse = require('if-false');
	
	var condition = 100 > 1;
	var valueToReturnIfConditionIsFalse = 'false';
	var valueToReturnIfConditionIsTrue = 'true';

	var value = ifFalse(condition, valueToReturnIFConditionIsFalse, valueToReturnIfConditionIsTrue);

	console.log(value) // will return 'false'

	// if condition is true

	console.log(value) // will return 'true'

```

### you can provide function, either named or anonymous function

```javascript
	
	var ifFalse = require('if-false');
	
	var condition = 100 > 1;

	var value = ifFalse(condition, function() {
		return 'false';
	}, function() {
		return 'true';
	});

	console.log(value) // will return 'false'

	// if condition is true

	console.log(value) // will return 'true'

```

```javascript
	
	var ifFalse = require('if-false');
	
	var condition = 100 > 1;
	
	var falseFunction = function() {
		return 'false';
	}

	var trueFunction = function() {
		return 'true';
	}

	var value = ifFalse(condition, falseFunction, trueFunction);

	console.log(value) // will return 'false'

	// if condition is true

	console.log(value) // will return 'true'

```

### you can provide promise

```javascript
	
	var ifFalse = require('if-false');
	
	var condition = 100 > 1;
	
	var falsePromise = new Promise(function(resolve, reject) {
		resolve('false')
	})

	var truePromise = new Promise(function(resolve, reject) {
		resolve('true');
	})

	var promise = ifFalse(condition, falsePromise, truePromise);
	
	promise.then(function(result) {
		console.log(result) // will return 'false'
		
		// if condition is true

		console.log(result) // will return 'true'
	})
```
## Test

- to test, clone this repo, and

```
	npm install

	npm test
```

