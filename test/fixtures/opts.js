'use strict';

function getOpts() {
	var opts = {
		'hostname': 'api.travis-ci.org',
		'token': 'abcdef123!',
		'useragent': 'beep-boop-bop'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
