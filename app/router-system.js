AFRAME.registerSystem('router', {
	schema: {
		navController: {type: 'selector'},
		routerEl: {type: 'selector', default: 'a-router'}
	},
	init: function () {
		if(window.location.hash === ""){
			window.location.hash = 'explore';
		}

		window.addEventListener("hashchange", this.emitOnHashChange.bind(this), false);
		document.addEventListener('readystatechange', this.handleInitialLoad.bind(this));
	},
	update: function(){},
	remove: function(){},
	tick: function(time, timeDelta){},
	pause: function(){},
	play: function(){},
	updateSchema: function(data){},

	handleInitialLoad: function(event){
		if(document.readyState === 'interactive'){
			var url = event.target.URL;
			if(/#/.test(url)){
				var hash = url.match(/#.*/)[0].replace('#','');
				this.data.routerEl.emit('initialPage', {page: hash});
				this.data.navController.emit('initialPage', {page: this.resolveSubPages(hash)});
			} else {

				this.data.routerEl.emit('initialPage', {page: 'explore'});
				this.data.navController.emit('initialPage', {page: this.resolveSubPages('explore')});
			}

		}
	},

	emitOnHashChange: function(event){
		var hash = event.newURL.match(/#.*/)[0].replace('#','');
		this.data.currentPage = hash;
		this.data.routerEl.emit('navigate', {page: hash});
	},

	resolveSubPages: function(hash){
		var located = false;
		var pageMapping = {
			profile: ['login', 'signup', 'profile']
		};
		for(var prop in pageMapping){
			if(pageMapping[prop].includes(hash)){
				located = true;
				return prop;
			}
		}
		if(!located){
			return hash; // actually should return 404 but... for later
		}
	}
});