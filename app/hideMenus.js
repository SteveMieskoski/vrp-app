var clearScene = require('./clearScene');

module.exports = function hideMenus(event, altImage) {
	console.log('submit click');
	var routerattr = document.querySelector('a-scene').getAttribute('router');
	console.log(routerattr);
	var nav = routerattr.navController;
	//var nav = document.querySelector('a-entity#nav-attach');
	nav.setAttribute('visible', 'false');

	//var menu = document.querySelector('a-router');
	var menu = routerattr.routerEl;
	menu.setAttribute('visible', 'false');

	var cursor = document.querySelector('[raycaster]');
	cursor.setAttribute('raycaster', 'objects', '.showIcons');
	console.log(cursor.components);

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
		console.log(evt);
		var show = document.querySelector('a-entity#showAgain');
		//var show = evt.target.parentNode;
		console.log('show again: ', show);
		// hack to hide in video case where it is not getting cleared correctly.  then is removed via the navigation hack;
		show.setAttribute('visible', 'false');
		clearScene(show.object3D);
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
	showContainer.appendChild(showText);
	showContainer.appendChild(showItems);
	this.el.sceneEl.appendChild(showContainer);
};