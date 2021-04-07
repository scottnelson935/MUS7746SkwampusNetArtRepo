var flickr = require('..')(function auth() { /* noop */ });
var assert = require('assert');

describe('flickr.groups.discuss.topics.add', function () {

	it('requires "group_id"', function () {

		assert.throws(function () {
			flickr.groups.discuss.topics.add({
				subject: '_',
				message: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "group_id"';
		});

	});

	it('requires "subject"', function () {

		assert.throws(function () {
			flickr.groups.discuss.topics.add({
				group_id: '_',
				message: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "subject"';
		});

	});

	it('requires "message"', function () {

		assert.throws(function () {
			flickr.groups.discuss.topics.add({
				group_id: '_',
				subject: '_'
			});
		}, function (err) {
			return err.message === 'Missing required argument "message"';
		});

	});

	it('returns a Request instance', function () {
		var req = flickr.groups.discuss.topics.add({
			group_id: '_',
			subject: '_',
			message: '_'
		});

		assert.equal(req.method, 'POST');
		assert.equal(req.url, 'https://api.flickr.com/services/rest');
		assert.equal(req.qs.format, 'json');
		assert.equal(req.qs.nojsoncallback, '1');
		assert.equal(req.qs.method, 'flickr.groups.discuss.topics.add');
		assert.equal(req.header['Content-Type'], 'text/plain');
		assert.equal(req.qs.group_id, '_');
		assert.equal(req.qs.subject, '_');
		assert.equal(req.qs.message, '_');
	});

});
