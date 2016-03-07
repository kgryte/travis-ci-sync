'use strict';

// MODULES //

var tape = require( 'tape' );
var sync = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof sync, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof sync.factory, 'function', 'export includes a factory method' );
	t.end();
});
