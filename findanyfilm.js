/// <reference path="typings/node/node.d.ts"/>
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var querystring = require('querystring');
var moment = require('moment');

var fafKey = process.env.FAF_KEY || '864422500';
var fafEndpoint = process.env.FAF_ENDPOINT || 'http://api.findanyfilm.com/';

var getCinemas = exports.getCinemas = function (postcode) {
	var qs = querystring.stringify(
		{
			apikey: fafKey,
			maxdistance: 50,
			postcode: postcode,
			maxresults: 3
		});
	var path = 'cinema_by_film.php?';
	function ClientError(e) {
		return e.code >= 400 && e.code < 500;
	}

	return request(fafEndpoint + path + qs).then(function (contents) {
		if (contents[0].statusCode === 200) {
			return JSON.parse(contents[0].body);
		} else {
			return;
		}
	}).catch(ClientError, function (e) {
		//A client error like 400 Bad Request happened
	});
}


var getFilms = exports.getFilms = function (cinemas) {
	var cinema_id= cinemas[0].cinema_id
	var qs = querystring.stringify(
		{
			apikey: fafKey,
			date: moment().format("YYYY-MM-DD"),
			time: moment().hour() + 1,
			cinema_id: cinema_id
		});
	var path = 'cinema_by_film.php?';
	function ClientError(e) {
		return e.code >= 400 && e.code < 500;
	}
	
	console.log(fafEndpoint + path + qs)
	return request(fafEndpoint + path + qs).then(function (contents) {
		if (contents[0].statusCode === 200) {
			return JSON.parse(contents[0].body);
		} else {
			return;
		}
	}).catch(ClientError, function (e) {
		//A client error like 400 Bad Request happened
	});
}


var getFilmsByLoc = exports.getFilmsByLoc = function (postcode) {

	var qs = querystring.stringify(
		{
			apikey: fafKey,
			date: moment().format("YYYY-MM-DD"),
			time: moment().hour() + 1,
			maxdistance: 5,
			postcode: postcode
		});
	var path = 'films_by_location.php?';
	function ClientError(e) {
		return e.code >= 400 && e.code < 500;
	}
	
	console.log(fafEndpoint + path + qs)
	return request(fafEndpoint + path + qs).then(function (contents) {
		if (contents[0].statusCode === 200) {
			return JSON.parse(contents[0].body);
		} else {
			return;
		}
	}).catch(ClientError, function (e) {
		//A client error like 400 Bad Request happened
	});
}

var getFilmInfo = exports.getFilmInfo = function (faf_id) {
	
	var qs = querystring.stringify(
		{
			apikey: fafKey,
			faf_id: faf_id
		});
	var path = 'film_metadata.php?';
	function ClientError(e) {
		return e.code >= 400 && e.code < 500;
	}
	
	console.log(fafEndpoint + path + qs)
	return request(fafEndpoint + path + qs).then(function (contents) {
		if (contents[0].statusCode === 200) {
			return JSON.parse(contents[0].body);
		} else {
			return;
		}
	}).catch(ClientError, function (e) {
		//A client error like 400 Bad Request happened
	});
}

module.exports = exports;
