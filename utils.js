var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var querystring = require('querystring');

var getPostcode = exports.getPostcode = function (lat, lon) {
	var apiEndPoint = 'http://api.postcodes.io/postcodes?';

	var qs = querystring.stringify({ lat: lat, lon: lon });
	function ClientError(e) {
		return e.code >= 400 && e.code < 500;
	}

	return request(apiEndPoint + qs).then(function (contents) {
		if (contents[0].statusCode === 200) {
			return JSON.parse(contents[0].body).result[0].postcode;
		} else {
			return;
		}
	}).catch(ClientError, function (e) {
		//A client error like 400 Bad Request happened
	});
};

module.exports = exports;
