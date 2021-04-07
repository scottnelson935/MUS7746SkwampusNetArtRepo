var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.removeTag', function () {

	it('requires "tag_id"', function () {

		assert.throws(function () {
			flickr.photos.removeTag({});
		}, function (err) {
			return err.message === 'Missing required argument "tag_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.removeTag({
			tag_id: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.removeTag');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.tag_id, '_');
	});

});
