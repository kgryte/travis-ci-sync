'use strict';

var sync = require( './../lib' );

var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

sync( opts, clbk );

function clbk( error, results ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}
