var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.setDates', function () {

	it('requires "photo_id"', function () {

		assert.throws(function () {
			flickr.photos.setDates({});
		}, function (err) {
			return err.message === 'Missing required argument "photo_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.setDates({
			photo_id: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.setDates');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.photo_id, '_');
	});

});
