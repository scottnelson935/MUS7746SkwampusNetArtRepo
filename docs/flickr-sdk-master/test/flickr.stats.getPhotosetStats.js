var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.stats.getPhotosetStats', function () {

	it('requires "date"', function () {

		assert.throws(function () {
			flickr.stats.getPhotosetStats({
				photoset_id: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "date"';
		});

	});

	it('requires "photoset_id"', function () {

		assert.throws(function () {
			flickr.stats.getPhotosetStats({
				date: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "photoset_id"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.stats.getPhotosetStats({
			date: '_',
			photoset_id: '_'
		});

		assert.equal(req.method, 'GET');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.stats.getPhotosetStats');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.date, '_');
		assert.equal(req.qs.photoset_id, '_');
	});

});
