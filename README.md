Sync
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Sync][travis-sync] a [Travis CI][travis-api] account with Github.


## Installation

``` bash
$ npm install travis-ci-sync
```


## Usage

``` javascript
var sync = require( 'travis-ci-sync' );
```

<a name="sync"></a>
#### sync( options, clbk )

[Syncs][travis-sync] a [Travis CI][travis-api] account with Github.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

sync( opts, clbk )

function clbk( error, results ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.dir( results );
	/* returns
		{
			"result": true
		}
	*/
}
```

The `function` accepts the following `options`:
*	__token__: Travis CI [access token][travis-token] (*required*).
*	__hostname__: endpoint hostname. Default: `'api.travis-ci.org'`.

To [authenticate][travis-token] with an endpoint, set the [`token`][travis-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

sync( opts, clbk );
```

By default, the `function` syncs Travis CI for open source. To sync a different [Travis CI API][travis-api] endpoint, set the `hostname` option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'hostname': 'api.travis-ci.com'
};

sync( opts, clbk );
```


#### sync.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'hostname': 'api.travis-ci.com'
};

var run = sync.factory( opts, clbk );

run();
run();
run();
// ...
```

The factory method accepts the same `options` as [`sync()`](#sync).


## Notes

*	If the module encounters an application-level `error` while __initially__ querying an endpoint (e.g., no network connection, malformed request, etc), that `error` is returned immediately to the provided `callback`.
*   If possible, avoid repeatedly triggering a [sync][travis-sync] in close succession, as each [sync][travis-sync] may entail multiple Github API requests, thus affecting a user's Github [rate limit][github-user-rate-limit].


---
## Examples

``` javascript
var sync = require( 'travis-ci-sync' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain an access [token][travis-token] and modify the `token` option accordingly.


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g travis-ci-sync
```


### Usage

``` bash
Usage: travissync [options]

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --hostname host      Hostname. Default: api.travis-ci.org.
       --token token        Travis CI access token.
```


### Notes

*	In addition to the [`token`][travis-token] option, the [token][travis-token] may be specified by a [`TRAVISCI_TOKEN`][travis-token] environment variable. The command-line option __always__ takes precedence.


### Examples

Setting the access [token][travis-token] using the command-line option:

``` bash
$ DEBUG=* travissync --token <token>
```

Setting the access [token][travis-token] using an environment variable:

``` bash
$ DEBUG=* TRAVISCI_TOKEN=<token> travissync
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/travissync --token <token>
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token>
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/travis-ci-sync.svg
[npm-url]: https://npmjs.org/package/travis-ci-sync

[build-image]: http://img.shields.io/travis/kgryte/travis-ci-sync/master.svg
[build-url]: https://travis-ci.org/kgryte/travis-ci-sync

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/travis-ci-sync/master.svg
[coverage-url]: https://codecov.io/github/kgryte/travis-ci-sync?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/travis-ci-sync.svg
[dependencies-url]: https://david-dm.org/kgryte/travis-ci-sync

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/travis-ci-sync.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/travis-ci-sync

[github-issues-image]: http://img.shields.io/github/issues/kgryte/travis-ci-sync.svg
[github-issues-url]: https://github.com/kgryte/travis-ci-sync/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[github-user-rate-limit]: https://github.com/kgryte/github-user-rate-limit

[travis-api]: https://docs.travis-ci.com/api
[travis-sync]: https://docs.travis-ci.com/api?http#users
[travis-token]: https://github.com/kgryte/travis-ci-access-token
