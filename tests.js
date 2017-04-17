var ifFalse = require('./index');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;

describe('ifFalse()', function() {
	var falseCallback, trueCallback, falsePromise, truePromise, fakeTimer;

	before(function() {
		falseCallback = sinon.stub().returns('true');
		trueCallback = sinon.stub().returns('false');
	})

	describe('if parameter passed is value', function() {
		it('if condition is false, will return value passed on valueToReturnIfFalse parameter', function() {
			
			var falseCondition = 1 > 100;
			var valueToReturnIfFalse = 'false';
			var valueToReturnIfTrue = 'true';
			var expectedReturnValue = 'false';

			var result = ifFalse(falseCondition, valueToReturnIfFalse, valueToReturnIfTrue);

			expect(result).to.equal(expectedReturnValue);
		})

		it('if condition is true, will return value passed on valueToReturnIfTrue parameter', function() {
			
			var falseCondition = 100 > 1;
			var valueToReturnIfFalse = 'false';
			var valueToReturnIfTrue = 'true';
			var expectedReturnValue = 'true';

			var result = ifFalse(falseCondition, valueToReturnIfFalse, valueToReturnIfTrue);

			expect(result).to.equal(expectedReturnValue);
		})
	})
	
	describe('if parameter passed is function', function() {
		
		afterEach(function() {
			falseCallback.reset();
			trueCallback.reset();

			falseCallback = sinon.stub().returns('true');
			trueCallback = sinon.stub().returns('false');
		})

		it('if condition is false, will invoke function passed on valueToReturnIfFalse parameter', function() {
			
			var falseCondition = 1 > 100;
			var expectedReturnValue = 'true';

			var result = ifFalse(falseCondition, falseCallback, trueCallback);
			
			expect(falseCallback.called).to.be.true;
			expect(trueCallback.called).to.not.be.true;
			expect(result).to.equal(expectedReturnValue);
		})

		it('if condition is true, will invoke function passed on valueToReturnIfTrue parameter', function() {
			
			var falseCondition = 100 > 1;
			var expectedReturnValue = 'false';

			var result = ifFalse(falseCondition, falseCallback, trueCallback);

			expect(trueCallback.called).to.be.true;
			expect(falseCallback.called).to.not.be.true;
			expect(result).to.equal(expectedReturnValue);
		})
	})

	describe('if parameter passed is promise', function() {

		before(function() {
			fakeTimer = sinon.useFakeTimers();
		})

		describe('if condition is false', function() {
			
			describe('when promise resolved', function() {
				
				before(function() {
					falsePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve('false')
						}, 3000)
					})

					truePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve('true')
						}, 3000)
					})
				})

				after(function() {
					fakeTimer.restore();
				})

				it('will return promise passed on valueToReturnIfFalse', function() {
					
					var falseCondition = 100 < 1;
					var expectedReturnValue = 'false';

					var promise = ifFalse(falseCondition, falsePromise, truePromise);

					fakeTimer.tick(3000);

					return assert.isFulfilled(promise, expectedReturnValue);
				})
			})

			describe('when promise rejected', function() {
				
				before(function() {
					falsePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							reject('false')
						}, 3000)
					})

					truePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve('true')
						}, 3000)
					})
				})

				after(function() {
					fakeTimer.restore();
				})

				it('will return promise passed on valueToReturnIfFalse', function() {
					
					var falseCondition = 100 > 1;
					var expectedReturnValue = 'false';

					var promise = ifFalse(falseCondition, falsePromise, truePromise);
					
					fakeTimer.tick(3000);
					
					assert.isRejected(promise, expectedReturnValue)
				})
			})
		})

		describe('if condition is true', function() {

			describe('when promise resolved', function() {

				before(function() {
					falsePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve('false')
						}, 3000)
					})

					truePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve('true')
						}, 3000)
					})
				})

				after(function() {
					fakeTimer.restore();
				})

				it('will return promise passed on valueToReturnIfTrue', function() {
					
					var trueCondition = 100 > 1;
					var expectedReturnValue = 'true';

					var promise = ifFalse(trueCondition, falsePromise, truePromise);

					fakeTimer.tick(3000);

					assert.isFulfilled(promise, expectedReturnValue);
				})

			})

			describe('when promise rejected', function() {

				before(function() {
					falsePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve('false')
						}, 3000)
					})

					truePromise = new Promise(function(resolve, reject) {
						setTimeout(function() {
							reject('true')
						}, 3000)
					})
				})

				after(function() {
					fakeTimer.restore();
				})

				it('will return promise passed on valueToReturnIfTrue', function() {
					
					var trueCondition = 100 > 1;
					var expectedReturnValue = 'true';

					var promise = ifFalse(trueCondition, falsePromise, truePromise);

					fakeTimer.tick(3000);

					assert.isRejected(promise, expectedReturnValue);
				})

			})
		})
	})
})
