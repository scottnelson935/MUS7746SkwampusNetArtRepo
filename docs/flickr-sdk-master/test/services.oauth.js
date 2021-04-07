var Subject = require('../services/oauth');
var OAuth = require('../lib/oauth');
var assert = require('assert');
var sinon = require('sinon');
var nock = require('nock');

describe('services/oauth', function () {
	var subject;
	var sandbox;

	beforeEach(function () {
		subject = new Subject('consumer key', 'consumer secret');
		sandbox = sinon.sandbox.create();
		sandbox.stub(OAuth.prototype, 'timestamp').returns(499166400);
		sandbox.stub(OAuth.prototype, 'nonce').returns('p2m2bnHdXVIsQH0FUv0oN9XrJU57ak7dSSpHU36mn4k=');
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('does not require "new"', function () {
		assert(Subject('consumer key', 'consumer secret') instanceof Subject);
	});

	it('throws if required parameters are not provided', function () {
		assert.throws(function () {
			new Subject(); // eslint-disable-line no-new
		}, function (err) {
			return err.message === 'Missing required argument "consumerKey"';
		});

		assert.throws(function () {
			new Subject('consumer key'); // eslint-disable-line no-new
		}, function (err) {
			return err.message === 'Missing required argument "consumerSecret"';
		});

		assert.doesNotThrow(function () {
			new Subject('consumer key', 'consumer secret'); // eslint-disable-line no-new
		});
	});

	describe('#request', function () {

		it('makes the correct API call', function () {
			var api = nock('https://www.flickr.com')
				.get('/services/oauth/request_token')
				.query({
					oauth_nonce: 'p2m2bnHdXVIsQH0FUv0oN9XrJU57ak7dSSpHU36mn4k=',
					oauth_timestamp: 499166400,
					oauth_consumer_key: subject.consumerKey,
					oauth_signature_method: 'HMAC-SHA1',
					oauth_version: '1.0',
					oauth_callback: 'https://www.example.com/callback',
					oauth_signature: 'JC6IWgvysQg30vh3Xk6TjARQWps='
				})
				.reply(200, 'oauth_callback_confirmed=true&oauth_token=foo&oauth_token_secret=bar');

			return subject.request('https://www.example.com/callback').then(function (res) {
				assert(api.isDone());
				assert.equal(res.statusCode, 200);
				assert.equal(res.body.oauth_callback_confirmed, 'true');
				assert.equal(res.body.oauth_token, 'foo');
				assert.equal(res.body.oauth_token_secret, 'bar');
			});

		});

	});

	describe('#authorizeUrl', function () {

		it('returns the authorize url for a token', function () {
			assert.equal(
				subject.authorizeUrl('token'),
				'https://www.flickr.com/services/oauth/authorize?perms=read&oauth_token=token'
			);
		});

		it('can specify "read" perms', function () {
			assert.equal(
				subject.authorizeUrl('token', 'read'),
				'https://www.flickr.com/services/oauth/authorize?perms=read&oauth_token=token'
			);
		});

		it('can specify "write" perms', function () {
			assert.equal(
				subject.authorizeUrl('token', 'write'),
				'https://www.flickr.com/services/oauth/authorize?perms=write&oauth_token=token'
			);
		});

		it('can specify "delete" perms', function () {
			assert.equal(
				subject.authorizeUrl('token', 'delete'),
				'https://www.flickr.com/services/oauth/authorize?perms=delete&oauth_token=token'
			);
		});

		it('throws if an invalid perm is passed', function () {
			assert.throws(function () {
				subject.authorizeUrl('token', 'fnord');
			}, function (err) {
				return err.message === 'Unknown oauth perms "fnord"';
			});
		});

	});

	describe('#verify', function () {

		it('makes the correct API call', function () {
			var api = nock('https://www.flickr.com')
				.get('/services/oauth/access_token')
				.query({
					oauth_token: 'token',
					oauth_verifier: 'verfier',
					oauth_nonce: 'p2m2bnHdXVIsQH0FUv0oN9XrJU57ak7dSSpHU36mn4k=',
					oauth_timestamp: 499166400,
					oauth_consumer_key: subject.consumerKey,
					oauth_signature_method: 'HMAC-SHA1',
					oauth_version: '1.0',
					oauth_signature: '7+3k1AWzUyxOoNO4rymh0Txz5FA='
				})
				.reply(200, 'fullname=Jamal%20Fanaian&oauth_token=foo&oauth_token_secret=bar&user_nsid=21207597%40N07&username=jamalfanaian');

			return subject.verify('token', 'verfier', 'tokenSecret').then(function (res) {
				assert(api.isDone());
				assert.equal(res.statusCode, 200);
				assert.equal(res.body.fullname, 'Jamal Fanaian');
				assert.equal(res.body.oauth_token, 'foo');
				assert.equal(res.body.oauth_token_secret, 'bar');
				assert.equal(res.body.user_nsid, '21207597@N07');
				assert.equal(res.body.username, 'jamalfanaian');
			});
		});

	});

	describe('#plugin', function () {

		it('returns a function', function () {
			assert.equal(typeof subject.plugin('foo', 'bar'), 'function');
		});

	});

	describe('.createPlugin', function () {

		it('returns a function', function () {
			assert.equal(typeof Subject.createPlugin('key', 'secret', 'foo', 'bar'), 'function');
		});

	});

});
