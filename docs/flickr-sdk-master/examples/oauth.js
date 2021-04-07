var Flickr = require('..');
var https = require('https');
var path = require('path');
var fs = require('fs');
var parse = require('url').parse;

/**
 * This example demonstrates the full OAuth flow described here:
 * https://www.flickr.com/services/api/auth.oauth.html
 */

// first, sign up for an application to get a consumer key and secret.
// users will authorize your app to make calls to the api on their behalf.
// https://www.flickr.com/services/apps/create/apply/?

var oauth = new Flickr.OAuth(
	process.env.FLICKR_CONSUMER_KEY,
	process.env.FLICKR_CONSUMER_SECRET
);

// your application will need some sort of database to store request
// tokens and oauth tokens for the user. you should use an actual
// database instead of in-memory maps.

var db = {
	users: new Map(),
	oauth: new Map()
};

// obtain a request token from the Flickr API. the user will then be
// redirected to flickr to authorize your application. if they do,
// they will be redirected back to your application with a request
// token verifier, which you will exchange for the real oauth token.

function getRequestToken(req, res) {
	oauth.request('https://localhost:3000/oauth/callback').then(function (_res) {
		var requestToken = _res.body.oauth_token;
		var requestTokenSecret = _res.body.oauth_token_secret;

		// store the request token and secret in the database
		db.oauth.set(requestToken, requestTokenSecret);

		// redirect the user to flickr and ask them to authorize your app.
		// perms default to "read", but you may specify "write" or "delete".
		res.statusCode = 302;
		res.setHeader('location', oauth.authorizeUrl(requestToken, 'write'));
		res.end();

	}).catch(function (err) {
		res.statusCode = 400;
		res.end(err.message);
	});
}

// congratulations! the user has authorized your app. now you need to
// verify and exchange the request token for the user's oauth token
// and secret. at this point, we no longer need our request token
// and secret so we can get rid of them, and we can store the user's
// oauth token and secret in our database to make authenticated api calls.

function verifyRequestToken(req, res, query) {
	var requestToken = query.oauth_token;
	var oauthVerifier = query.oauth_verifier;

	// retrieve the request secret from the database
	var requestTokenSecret = db.oauth.get(requestToken);

	oauth.verify(requestToken, oauthVerifier, requestTokenSecret).then(function (_res) {
		var userNsid = _res.body.user_nsid;
		var oauthToken = _res.body.oauth_token;
		var oauthTokenSecret = _res.body.oauth_token_secret;
		var flickr;

		// store the oauth token and secret in the database
		db.users.set(userNsid, {
			oauthToken: oauthToken,
			oauthTokenSecret: oauthTokenSecret
		});

		// we no longer need the request token and secret so we can delete them
		db.oauth.delete(requestToken);

		// log our oauth token and secret for debugging
		console.log('oauth token:', oauthToken);
		console.log('oauth token secret:', oauthTokenSecret);

		// create a new Flickr API client using the oauth plugin
		flickr = new Flickr(oauth.plugin(
			oauthToken,
			oauthTokenSecret
		));

		// make an API call on behalf of the user
		flickr.test.login().pipe(res);

	}).catch(function (err) {
		res.statusCode = 400;
		res.end(err.message);
	});
}

// create a simple server to handle incoming requests.

function getcert(filename) {
	try {
		return fs.readFileSync(path.join(__dirname, filename));
	} catch (err) {
		err.message = `${err.message}

    OAuth callback URLs **must be https**, so this example's server needs an SSL cert to run.
    Generate a self-signed cert by running \`make\` in this directory:

    $ cd ${__dirname} && make
`;
		throw err;
	}
}

// eslint-disable-next-line vars-on-top
var options = {
	key: getcert('key.pem'),
	cert: getcert('cert.pem')
};

https.createServer(options, function (req, res) {
	var url = parse(req.url, true);

	switch (url.pathname) {
	case '/':
		return getRequestToken(req, res);
	case '/oauth/callback':
		return verifyRequestToken(req, res, url.query);
	default:
		res.statusCode = 404;
		res.end();
	}
}).listen(3000, function () {
	console.log('Open your browser to https://localhost:3000');
});
