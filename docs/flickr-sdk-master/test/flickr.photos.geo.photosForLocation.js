var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.geo.photosForLocation', function () {

	it('requires "lat"', function () {

		assert.throws(function () {
			flickr.photos.geo.photosForLocation({
				lon: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "lat"';
		});

	});

	it('requires "lon"', function () {

		assert.throws(function () {
			flickr.photos.geo.photosForLocation({
				lat: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "lon"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.geo.photosForLocation({
			lat: '_',
			lon: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.geo.photosForLocation');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.lat, '_');
		assert.equal(req.qs.lon, '_');
	});

});
