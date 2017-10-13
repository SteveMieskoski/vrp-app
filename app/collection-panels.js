/* global AFRAME */
var axios = require("axios");
var _ = require('lodash');

//var hideMenus = require('./hideMenus');
/**
 * Component that displays navigation elements for the explore page
 */
AFRAME.registerComponent('collection-panels', {
	schema: {
		collection: {type: 'string', default: 'mural'},
		initial: {type: 'boolean'}
	},

	init: function () {
		this.video = null;
		var data = this.data;
		var el = this.el;
		this.builPanels(data);

	},

	remove: function () {
		document.querySelector('a-sky').setAttribute('visible', 'true');
		var vid = document.querySelector('a-videosphere');
		if (vid) {
			vid.parentNode.removeChild(vid);
		}
	},

	updateSchema: function (data) {
		console.log('updateSchema data: ', data);
		if (!data.initial) {
			this.tearDownDisplay();
			this.builPanels(data);
		}

	},
	tearDownDisplay: function () {
		var current = document.querySelectorAll('a-image.row-pic');
		console.log('tear down display prior content: ', current);
		if (current) {
			for (var i = 0; i < current.length; i++) {
				current[i].setAttribute('data-marked', 'removal');
				current[i].addEventListener('animation__leave-complete', () => {
					console.log('remove animation complete');
				});
				current[i].emit("removal");
			}
		} else {
			throw new Error('wtf');
		}
	},

	CleanTornDown: function () {
		var current = document.querySelectorAll('a-image[data-marked=removal]');
		if (current) {
			for (var j = 0; j < current.length; j++) {
				current[j].parentNode.removeChild(current[j]);
			}
		} else {
			throw new Error('wtf');
		}

	},
	builPanels: function (data) {
		var width = 1;
		var height = 0.5;
		var rotation = "-10 0 0";
		var classes = "clickable row-pic";

		axios.get(window.location.origin + '/geoSearch/Categories/' + data.collection)
			.then(response => {
				if (_.has(response, 'user')) {
					this.user = response.data.user;
				}
				if (data.collection !== 'video') {
					document.querySelector('a-sky').setAttribute('visible', 'true');
					var vid = document.querySelector('a-videosphere');
					if (vid) {
						vid.parentNode.removeChild(vid);
					}
				}
				var img = response.data;
				var row = 0;
				var root = document.querySelector('a-entity#content-root');
				for (var i = 0; i < img.length; i++) {
					var finalPosition;
					switch (i % 5) {
						case 0:
							row++;
							finalPosition = {x: 0, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 1:
							finalPosition = {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 2:
							finalPosition = {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 3:
							finalPosition = {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 4:
							finalPosition = {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
							break;
					}
					var pic = document.createElement('a-image');

					if (/art_/.test(img[i].src)) {
						pic.setAttribute('data-imagesrc', img[i].src.replace("thumbnail_", ""));
					} else if (data.collection === 'video') {
						pic.setAttribute('data-imagesrc', img[i].uri);
					} else {
						pic.setAttribute('data-imagesrc', img[i].src.replace("thumbnail_", "").replace(".png", ".jpg"));
					}
					pic.setAttribute('id', i);
					pic.setAttribute('data-image-category', data.collection);
					pic.setAttribute('src', img[i].src);
					pic.setAttribute('width', width);
					pic.setAttribute('height', height);
					pic.setAttribute('rotation', rotation);
					pic.setAttribute('side', 'front');
					pic.setAttribute('class', classes);
					if (data.collection === 'video') {
						pic.addEventListener('click', function (event) {
							var sky = document.querySelector('a-sky');
							sky.setAttribute('visible', 'false');
							this.el.emit('video-show', {panel: event.target});
							console.log(event);


						}.bind(this));
					} else {
						$(pic).on('click', function () {
							var sky = document.querySelector('a-sky');
							this.emit('image-save', {shown: $(this).attr('src')});
							sky.emit('set-image-fade');
							var actual = $(this).attr('data-imagesrc');
							console.log(actual);
							setTimeout(function () {
								sky.setAttribute('material', 'src', actual);
							}.bind(this), 1500);

						});
					}


					pic.addEventListener('image-save', function (event) {
						console.log(event);
						this.el.setAttribute('data-image-save', event.detail.shown);
						var router = document.querySelector('a-router');
						if (router) {
							if (this.user) {
								this.showSaveButton()
							}
						}
					}.bind(this));


					if (data.initial) pic.setAttribute('position', finalPosition);
					if (!data.initial) {
						pic.setAttribute('animation__enter', {
							property: "position",
							easing: "easeOutCubic",
							from: {x: 0, y: 0, z: -20},
							to: finalPosition,
							dur: 1500,
							startEvents: "loaded",
							dir: "normal"
						});
						pic.setAttribute('animation__leave', {
							property: "position",
							easing: "easeOutCubic",
							from: finalPosition,
							to: {x: 0, y: 0, z: -20},
							dur: 1500,
							startEvents: "removal",
							dir: "normal"
						});
					}


					this.el.appendChild(pic);
				}

				// prepare and show 3d video
				this.el.addEventListener('video-show', function (event) {
					event.stopImmediatePropagation();
					this.runVideo(event.detail.panel);
				}.bind(this));

				if (!data.initial) {
					setTimeout(() => {
						var current = document.querySelectorAll('a-image[data-marked=removal]');
						if (current) {
							for (var j = 0; j < current.length; j++) {
								//console.log(current[j]);
								current[j].parentNode.removeChild(current[j]);
							}
						} else {
							throw new Error('wtf');
						}
					}, 1000);
					console.log('current root entity: ', this.el);
				} else {
					document.querySelector('a-scene').flushToDOM(true);
				}

			})
			.catch(err => {
				console.log('http request error: ', err);
			})

	},

	showSaveButton: function () {
		//if (this.user) {
		if (!document.querySelector('a-image#saveButton')) {
			var saveBtn = document.createElement('a-image');
			saveBtn.setAttribute('id', 'saveButton');
			saveBtn.setAttribute('class', 'clickable');
			saveBtn.setAttribute('height', 0.5);
			saveBtn.setAttribute('width', 0.5);
			saveBtn.setAttribute('position', {x: 2.4, y: -2, z: -3.8});
			saveBtn.setAttribute('src', 'assets/ui/save_fav.png');
			//saveBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
			saveBtn.addEventListener('click', this.savePic.bind(this));
			this.el.appendChild(saveBtn);
		}
		//}

	},

	savePic: function () {
		var filename = this.el.getAttribute('data-image-save');
		var data = {filename: filename};
		console.log(data);
		axios.post(window.location.origin + '/saveCollectionImage', data)
			.then(response => {
				console.log(response);
				if (_.has(response, 'data.err')) {
					console.log('error during search or search save');
				}
				if (_.has(response, 'data.userError')) {
					this.errorMsg("Must Be Logged In to Save");
					console.log('not logged in');
				}
			})
			.catch(err => {
				console.log(err);
			})
	},

	runVideo: function (videoDetails) {
		var assets = document.querySelector('a-assets');
		if(!assets){
			assets = document.createElement('a-assets');
			this.el.sceneEl.appendChild(assets);
		}
		var src = videoDetails.getAttribute('data-imagesrc');
		var vidIdMatch = src.match(/(?:\/)([\w_\-]*)(?=\.\w*$)/);
		console.log(vidIdMatch);
		var vidId = vidIdMatch[1];
		var video = document.querySelector('video#' + vidId);
		if(!video){
			video = document.createElement('video');
			video.setAttribute('id', vidId);
			video.setAttribute('src', src);
			video.setAttribute('loop', 'false');
			video.setAttribute('autoplay', '');
			assets.appendChild(video);
		}

		var vid = document.querySelector('a-videosphere');
		if (!vid) {
			vid = document.createElement('a-videosphere');
			vid.setAttribute('src', '#'+ vidId);
			this.el.sceneEl.appendChild(vid);
		} else {
			var priorVid = vid.getAttribute('src');
			var priorVideo = document.querySelector(priorVid);
			console.log(priorVideo);
			if(!priorVideo.paused){
				priorVideo.pause();
			}
			var nextVideo = document.querySelector('#' + vidId);
			if(nextVideo){
				console.log(nextVideo);
				if(nextVideo.paused){
					nextVideo.play();
				}
			}

			vid.setAttribute('src', '#'+ vidId);
		}
		this.hideMenus(null, 'assets/ui/ic_visibility_white_48dp_2x.png', vidId);


	},

	hideMenus: function (event, altImage, currentVid) {
		var show = document.querySelector('a-entity#showAgain');
		if(!show){
			console.log('submit click');
			var routerattr = document.querySelector('a-scene').getAttribute('router');
			//console.log(routerattr);
			//var nav = routerattr.navController;
			var nav = document.querySelector('a-entity#nav-attach');
			nav.setAttribute('visible', 'false');

			var menu = document.querySelector('a-router');
			//var menu = routerattr.routerEl;
			menu.setAttribute('visible', 'false');

			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.showIcons');
			//console.log(cursor.components);

			var showContainer = document.createElement('a-entity');
			showContainer.setAttribute('id', 'showAgain');
			showContainer.setAttribute('position', '0 -2.5 -3.08');

			var showText = document.createElement('a-text');
			showText.setAttribute('value', 'Show Menus and Icons');
			showText.setAttribute('position', '-1 -1 0');
			showText.setAttribute('text', 'height: 3;');


			var showItems = document.createElement('a-image');
			var showIcon = altImage || 'assets/ui/ic_visibility_black_48dp_2x.png';
			showItems.setAttribute('src', showIcon);
			showItems.setAttribute('class', 'showIcons');
			showItems.setAttribute('position', '0 -0.5 0');
			showItems.addEventListener('click', function (evt) {
				//console.log(evt);
				var show = document.querySelector('a-entity#showAgain');
				//var show = evt.target.parentNode;
				console.log('show again: ', show);
				// hack to hide in video case where it is not getting cleared correctly.  then is removed via the navigation hack;
				show.setAttribute('visible', 'false');
				//this.clearScene(show.object3D);
				show.parentNode.removeChild(show);

				var cursor = document.querySelector('[raycaster]');
				cursor.setAttribute('raycaster', 'objects', '.clickable');

				//var nav = document.querySelector('a-entity#nav-attach');
				var nav = routerattr.navController;
				nav.setAttribute('visible', 'true');

				//var menu = document.querySelector('a-router');
				var menu = routerattr.routerEl;
				menu.setAttribute('visible', 'true');

			});

			if(currentVid){
				var playingVid = document.querySelector('video#' + currentVid);
				playingVid.addEventListener('ended', function (evt) {
					//console.log(evt);
					var show = document.querySelector('a-entity#showAgain');
					//var show = evt.target.parentNode;
					console.log('show again: ', show);
					// hack to hide in video case where it is not getting cleared correctly.  then is removed via the navigation hack;
					show.setAttribute('visible', 'false');
					//this.clearScene(show.object3D);
					show.parentNode.removeChild(show);

					var cursor = document.querySelector('[raycaster]');
					cursor.setAttribute('raycaster', 'objects', '.clickable');

					//var nav = document.querySelector('a-entity#nav-attach');
					var nav = routerattr.navController;
					nav.setAttribute('visible', 'true');

					//var menu = document.querySelector('a-router');
					var menu = routerattr.routerEl;
					menu.setAttribute('visible', 'true');

				});

				var pauseText  = document.createElement('a-text');
				pauseText.setAttribute('value', 'Pause');
				pauseText.setAttribute('id', 'playOrPauseText');
				pauseText.setAttribute('position', '-0.30 -2.75 0');
				pauseText.setAttribute('rotation', '-45 0 0');
				pauseText.setAttribute('text', 'height: 3;');

				var pauseVid = document.createElement('a-image');
				pauseVid.setAttribute('id', 'playOrPause');
				pauseVid.setAttribute('src', 'assets/ui/ic_pause_circle_outline_white_48dp_1x.png');
				pauseVid.setAttribute('class', 'showIcons');
				pauseVid.setAttribute('position', '0 -2 0');
				pauseVid.addEventListener('click', function (evt) {
					//console.log(evt);
					var playPauseBtn = document.querySelector('a-image#playOrPause');
					var playPauseTxt = document.querySelector('a-text#playOrPauseText');
					var toPause = document.querySelector('video#' + currentVid);
					if(toPause.paused){
						playPauseBtn.setAttribute('src', 'assets/ui/ic_pause_circle_outline_white_48dp_1x.png' );
						playPauseTxt.setAttribute('value', 'Pause');
						toPause.play();
					} else {
						playPauseBtn.setAttribute('src', 'assets/ui/ic_play_circle_outline_white_48dp_1x.png' );
						playPauseTxt.setAttribute('value', 'Play');
						playPauseTxt.setAttribute('position', '-0.25 -2.75 0');
						toPause.pause();
					}
				});
				showContainer.appendChild(pauseVid);
				showContainer.appendChild(pauseText);
			}
			showContainer.appendChild(showText);
			showContainer.appendChild(showItems);
			this.el.sceneEl.appendChild(showContainer);
		}
	}


});
