var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.getAllContexts', function () {

	it('requires "photo_id"', function () {

		assert.throws(function () {
			flickr.photos.getAllContexts({});
		}, function (err) {
			return err.message === 'Missing required argument "photo_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.getAllContexts({
			photo_id: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.getAllContexts');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.photo_id, '_');
	});

});
