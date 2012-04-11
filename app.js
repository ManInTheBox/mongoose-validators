
var mongoose = require('mongoose');
var validators = require('./index');
var util = require('util');

var s = new mongoose.Schema({
	ime: {
		type: String,
		min: 2,
	},
	prezime: {
		type: String,
		length: 3
	}
});

var s = mongoose.model('s', s);

var x = new s({
	ime: 'a'
	, prezime: 's'
});

x.save(function (e) {
	console.log(e);
});