var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.places.placesForTags', function () {

	it('requires "place_type_id"', function () {

		assert.throws(function () {
			flickr.places.placesForTags({});
		}, function (err) {
			return err.message === 'Missing required argument "place_type_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.places.placesForTags({
			place_type_id: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.places.placesForTags');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.place_type_id, '_');
	});

});
