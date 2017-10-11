AFRAME.registerSystem('router', {
	schema: {
		navController: {type: 'selector'},
		routerEl: {type: 'selector', default: 'a-router'}
	},
	init: function () {
		//console.log(simpleState);
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
		var router;
		if(document.readyState === 'interactive'){
			var url = event.target.URL;
			//console.log(url);
			if(/#/.test(url)){
				var hash = url.match(/#.*/)[0].replace('#','');
				//console.log(document.querySelector('a-entity#nav-attach'));
				this.data.routerEl.emit('initialPage', {page: hash});
				this.data.navController.emit('initialPage', {page: this.resolveSubPages(hash)});
				//this.navigate(hash);
			} else {
				this.data.routerEl.emit('initialPage', {page: 'search'});
				this.data.navController.emit('initialPage', {page: this.resolveSubPages('search')});
			}

		}
	},

	emitOnHashChange: function(event){
		//console.log('hash event', event);
		//console.log('hash portion', event.newURL.match(/#.*/)[0].replace('#',''));
		var hash = event.newURL.match(/#.*/)[0].replace('#','');
		this.data.currentPage = hash;
		this.data.routerEl.emit('navigate', {page: hash});
		//this.data.navController.emit('navigate', {page: this.resolveSubPages('login')});
		//this.navigate(hash);
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