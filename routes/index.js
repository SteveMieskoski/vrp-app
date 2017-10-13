var express = require('express');
var path = require('path');

var pathHelper = require('../pathHelper');
var router = express.Router();
var CuratedContent = require('../models/curated');

var pageDetails = require('./pageDetails');
var curated = require('./curated');

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		//res.redirect("/login");
		return next();
	}
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log("authenticated");
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		console.log("login coming!!!!!!!!!!!!!!!!!!!");
		res.redirect("/login");
	}
}

var options = {
	root: path.join(pathHelper._root + "/public/"),
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

router.get('/', (req, res) => {
	res.sendFile("login.html", options)
});



router.get("/login-success", (req, res) => {
	res.json({ok: true})
});

router.get("/login-failure", (req, res) => {
	res.json({ok: false})
});

router.get("/register-success", (req, res) => {
	res.json({ok: true})
});


router.get('/compDetails/:comp', (req, res) => {
	var content = pageDetails(req.params.comp, req.user);
	res.json(content);
});

router.get('/geoSearch/Categories/:cat', (req, res) => {
	var response = curated(req.params.cat);
	res.json(response);
});


router.post('/geoSearch', (req, res) => {
	var newThing = new CuratedContent({
		address: req.body.address,
		lat: req.body.lat,
		lng: req.body.lng,
		category: req.body.cat,
		src: req.body.src
	})
		.save()
		.then((response) => {
			console.log(response);
			res.json({ok: true});
		});
});


/*
router.get('/', checkAuthenticated, (req, res) => {
	res.sendFile("index.html", options)
});*/


module.exports = router;