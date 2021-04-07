var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.reflection.getMethodInfo', function () {

	it('requires "method_name"', function () {

		assert.throws(function () {
			flickr.reflection.getMethodInfo({});
		}, function (err) {
			return err.message === 'Missing required argument "method_name"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.reflection.getMethodInfo({
			method_name: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.reflection.getMethodInfo');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.method_name, '_');
	});

});
