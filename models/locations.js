/*
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation

	// define schema
	// NOTE : This object must conform *precisely* to the geoJSON specification
	// you cannot embed a geoJSON doc inside a model or anything like that- IT
	// MUST BE VANILLA
	var LocationObject = new Schema({
		loc: {
			type: {type: String},
			coordinates: []
		}
	});
	// define the index
	LocationObject.index({loc: '2dsphere'});

module.exports = mongoose.model('Location', LocationObject);
*/
