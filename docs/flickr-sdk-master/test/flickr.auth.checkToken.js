var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.auth.checkToken', function () {

	it('requires "auth_token"', function () {

		assert.throws(function () {
			flickr.auth.checkToken({});
		}, function (err) {
			return err.message === 'Missing required argument "auth_token"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.auth.checkToken({
			auth_token: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.auth.checkToken');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.auth_token, '_');
	});

});
