var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photosets.removePhoto', function () {

	it('requires "photoset_id"', function () {

		assert.throws(function () {
			flickr.photosets.removePhoto({
				photo_id: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "photoset_id"';
		});

	});

	it('requires "photo_id"', function () {

		assert.throws(function () {
			flickr.photosets.removePhoto({
				photoset_id: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "photo_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photosets.removePhoto({
			photoset_id: '_',
			photo_id: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photosets.removePhoto');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.photoset_id, '_');
		assert.equal(req.qs.photo_id, '_');
	});

});
