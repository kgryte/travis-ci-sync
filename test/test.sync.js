'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var sync = require( './../lib/sync.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof sync, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		sync( null, noop );
	}
	function bar() {
		sync( {'hostname':null}, noop );
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
			sync( opts, value );
		};
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when making a request', function test( t ) {
	var opts;
	var sync;

	sync = proxyquire( './../lib/sync.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	sync( opts, done );

	function factory( opts, clbk ) {
		return function sync() {
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

tape( 'functions returns response data to a provided callback', function test( t ) {
	var expected;
	var opts;
	var sync;

	sync = proxyquire( './../lib/sync.js', {
		'./factory.js': factory
	});

	expected = results;

	opts = getOpts();
	sync( opts, done );

	function factory( opts, clbk ) {
		return function sync() {
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
