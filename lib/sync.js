'use strict';

// MODULES //

var factory = require( './factory.js' );


// SYNC //

/**
* FUNCTION: sync( opts, clbk )
*	Syncs a Travis CI account with Github.
*
* @param {Object} opts - function options
* @param {String} opts.token - access token
* @param {String} [opts.hostname] - endpoint hostname
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function sync( opts, clbk ) {
	factory( opts, clbk )();
} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;
