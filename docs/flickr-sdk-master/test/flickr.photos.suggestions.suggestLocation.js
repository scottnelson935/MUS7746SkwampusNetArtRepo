var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.suggestions.suggestLocation', function () {

	it('requires "photo_id"', function () {

		assert.throws(function () {
			flickr.photos.suggestions.suggestLocation({
				lat: '_',
				lon: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "photo_id"';
		});

	});

	it('requires "lat"', function () {

		assert.throws(function () {
			flickr.photos.suggestions.suggestLocation({
				photo_id: '_',
				lon: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "lat"';
		});

	});

	it('requires "lon"', function () {

		assert.throws(function () {
			flickr.photos.suggestions.suggestLocation({
				photo_id: '_',
				lat: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "lon"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.suggestions.suggestLocation({
			photo_id: '_',
			lat: '_',
			lon: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.suggestions.suggestLocation');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.photo_id, '_');
		assert.equal(req.qs.lat, '_');
		assert.equal(req.qs.lon, '_');
	});

});
