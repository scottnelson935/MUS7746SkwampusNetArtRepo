var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.favorites.getPublicList', function () {

	it('requires "user_id"', function () {

		assert.throws(function () {
			flickr.favorites.getPublicList({});
		}, function (err) {
			return err.message === 'Missing required argument "user_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.favorites.getPublicList({
			user_id: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.favorites.getPublicList');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.user_id, '_');
	});

});
