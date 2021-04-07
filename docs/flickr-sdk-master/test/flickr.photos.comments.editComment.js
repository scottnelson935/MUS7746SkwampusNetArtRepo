var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.photos.comments.editComment', function () {

	it('requires "comment_id"', function () {

		assert.throws(function () {
			flickr.photos.comments.editComment({
				comment_text: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "comment_id"';
		});

	});

	it('requires "comment_text"', function () {

		assert.throws(function () {
			flickr.photos.comments.editComment({
				comment_id: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "comment_text"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.photos.comments.editComment({
			comment_id: '_',
			comment_text: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.photos.comments.editComment');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.comment_id, '_');
		assert.equal(req.qs.comment_text, '_');
	});

});
