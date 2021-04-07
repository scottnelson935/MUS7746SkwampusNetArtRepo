var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.addTags', function () {

	it('requires "photo_id"', function () {

		assert.throws(function () {
			flickr.photos.addTags({
				tags: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "photo_id"';
		});

	});

	it('requires "tags"', function () {

		assert.throws(function () {
			flickr.photos.addTags({
				photo_id: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "tags"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.addTags({
			photo_id: '_',
			tags: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.addTags');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.photo_id, '_');
		assert.equal(req.qs.tags, '_');
	});

});
