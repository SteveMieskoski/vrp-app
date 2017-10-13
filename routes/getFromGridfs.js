var mongoose = require("mongoose");
var Grid = require("gridfs-stream");
var url = require('url');


var db = mongoose.connection;

module.exports = getFromGrid;

function getFromGrid(req, res) {
	var pathname;
	Grid.mongo = mongoose.mongo;

	var pathurl = url.parse(req.url);
	console.log(pathurl);
	if (/thumb_/.test(req.params.filename)) {
		pathname = req.params.filename.replace("thumb_", "");
	} else {
		pathname = req.params.filename;
	}

	var gfs = Grid(db.db);
	var fileName = pathname;

	gfs.exist({filename: fileName}, function (err, found) {
		if (err) {
			res.send(err)
		}
		if (found) {
			var readstream = gfs.createReadStream({
				filename: fileName
			});
			readstream.pipe(res);
		}

	});
}