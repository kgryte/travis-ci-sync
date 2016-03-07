'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var copy = require( 'utils-copy' );
var request = require( 'travis-ci-post' ).factory();
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for syncing a Travis CI account with Github.
*
* @param {Object} options - function options
* @param {String} [options.token] - access token
* @param {String} [options.hostname] - endpoint hostname
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for syncing an account
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	return request.factory( opts, done );
	/**
	* FUNCTION: done( error, results )
	*	Callback invoked after completing request.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object} results - response results
	* @returns {Void}
	*/
	function done( error, results ) {
		if ( error ) {
			return clbk( error );
		}
		clbk( null, results );
	} // end FUNCTION done()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
