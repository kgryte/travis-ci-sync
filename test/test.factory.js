'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof factory, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		factory( null, noop );
	}
	function bar() {
		factory( {'token':1234}, noop );
	}
});

tape( 'function throws if not provided a token', function test( t ) {
	t.throws( foo, Error, 'requires a token' );
	t.end();

	function foo() {
		factory( {'hostname':'api.travis-ci.org'}, noop );
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( opts, value );
		};
	}
});

tape( 'function returns a function', function test( t ) {
	t.equal( typeof factory( getOpts(), noop ), 'function', 'returns a function' );
	t.end();
});

tape( 'function returns a function which returns an error to a provided callback if an error is encountered when making a request', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'travis-ci-post': {
			'factory': post
		}
	});

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function post( opts, clbk ) {
		return function post() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk({
					'status': 403,
					'message': 'Forbidden'
				});
			}
		};
	}

	function done( error ) {
		t.equal( error.status, 403, 'equal status' );
		t.equal( error.message, 'Forbidden', 'equal message' );
		t.end();
	}
});

tape( 'function returns a function which returns response data to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'travis-ci-post': {
			'factory': post
		}
	});

	expected = results;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function post( opts, clbk ) {
		return function post() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results );
			}
		};
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});
