// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var SearchSchema = new Schema({
	// Just a string
	address: {
		type: String
	},
	fsPicturePath: {
		type: String
	},
	hits: {
		type: Number
	},
	coords: {
		type: String
	},
	lat: {
		type: String
	},
	lng: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Search = mongoose.model("Search", SearchSchema);
// Export the Note model
module.exports = Search;