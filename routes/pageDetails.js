
module.exports = pageDetails;

function pageDetails(page, user) {
	var content;
	switch (page) {
		case 'nav':
			content = {
				exclude: ['page'], details: [
					{
						id: "explore",
						"data-page": "explore",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-explore.png",
						class: "clickable",
						width: 0.5,
						height: 0.5,
						position: {x: -2.4, y: -2, z: -3.8}
					},
					{
						id: "help",
						"data-page": "help",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-help.png",
						class: "clickable",
						width: 0.5,
						height: 0.5,
						position: {x: 0.8, y: -2, z: -3.8}
					},
					{
						id: "search",
						"data-page": "search",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-search.png",
						class: "clickable",
						width: 0.5,
						height: 0.5,
						position: {x: -1.6, y: -2, z: -3.8}
					},
					{
						id: "profile",
						"data-page": "profile",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-Profile.png",
						class: "clickable",
						width: 0.5,
						height: 0.5,
						position: {x: -0.8, y: -2, z: -3.8}
					},
					{
						id: "profile-expanded",
						"data-page": "profile-expanded",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-myPassport.png",
						class: "clickable",
						width: 0.5,
						height: 0.5,
						position: {x: 0, y: -2, z: -3.80}
					},
					{
						id: "hide-menu",
						"data-page": "hide-menu",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-hide-menu.png",
						class: "clickable",
						width: 0.5,
						height: 0.5,
						position: {x: 1.6, y: -2, z: -3.80}
					},
					{
						id: 'selectedhighlighter',
						element: "a-ring",
						"radius-outer": 0.3,
						"radius-inner": 0.25,
						color: 'teal',

					}
				]
			};
			break;
		case 'explore':
			content = {
				exclude: ['cat'], details: [
					{
						"data-cat": "art",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-art.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: -1.6, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "mural",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-mural.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: -0.8, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "building",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-building.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: 0, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "cities",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-city.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: 0.8, y: -1.3, z: -4.1}
					},
					{
						"data-cat": "video",
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/thumb-video.png",
						class: "clickable",
						width: 0.75,
						height: 0.75,
						position: {x: 1.6, y: -1.3, z: -4.1}
					},
					{
						id: 'catHighlighter',
						element: "a-ring",
						"radius-outer": 0.425,
						"radius-inner": 0.375,
						color: 'teal',

					}
				]
			};
			break;
		case 'help':
			// z-axis is being controlled via the root element (see nav.js)
			content = {
				exclude: [],
				details: [
					{
						element: "a-image",
						side: 'front',
						src: "https://raw.githubusercontent.com/SteveMieskoski/vrp-app_assets/master/icons/HelpMenu.png",
						class: "clickable",
						width: 10,
						height: 2,
						position: {x: -0.2, y: -0.5, z: 0}
					},
/*					{
						id: "userLogout",
						element: "a-image",
						side: 'front',
						src: "assets/ui/login_signup_Btn.png",
						class: "clickable",
						position: {x: 0, y: -2.2, z: 0}
					},
					{
						element: "a-text",
						value: "Hide Menus and Icons",
						position: {x: 2.2, y: -1.7, z: 0},
						text: {height: 3}
					},
					{
						id: "hideMenus",
						element: "a-image",
						side: 'front',
						src: "assets/ui/ic_visibility_off_black_48dp_2x.png",
						class: "clickable",
						position: {x: 3.5, y: -2.2, z: 0}
					}*/]
			};
			break;
		case 'search':
			content = {
				exclude: ['item'], details: [
					{
						item: "input",
						element: "a-input",
						class: "clickable",
						placeholder: "Discover a location now.",
						width: 1,
						position: {x: -1.2, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						item: "text",
						element: "a-text",
						side: 'front',
						value: "Discover",
						position: {x: -1.176, y: -0.801, z: -2.944},
						text: {height: 3}
					},
					{
						item: "button",
						element: "a-button",
						class: "clickable",
						value: "search",
						name: "stuff",
						color: "white",
						position: {x: 0.337, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					}
				]
			};
			break;
		case 'login':
			content = {
				exclude: [],
				details: [{
					element: "a-input",
					id: "username",
					class: "clickable",
					placeholder: "Username",
					color: "black",
					width: 1,
					position: {x: -1.2, y: -0.75, z: -2.944},
					scale: {x: 1.5, y: 1.5, z: 1.5}
				},
					{
						element: "a-input",
						id: "password",
						class: "clickable",
						placeholder: "Password",
						type: "password",
						width: 1,
						position: {x: -1.2, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						element: "a-text",
						id: "",
						value: "Login",
						position: {x: -1.176, y: -0.45, z: -2.944},
						text: {height: 3}
					},
					{
						element: "a-button",
						id: "submit",
						class: "clickable",
						value: "Login",
						name: "stuff",
						color: "white",
						position: {x: 0.337, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					{
						element: "a-button",
						id: "signupBtn",
						class: "clickable",
						value: "Sign Up",
						name: "stuff",
						color: "white",
						position: {x: 1.18, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					{
						element: "a-text",
						value: " or Sign up, now.",
						position: {x: -0.53, y: -0.49, z: -2.944},
						text: {height: 1},
						scale: {x: 0.5, y: 0.5, z: 0.5}
					}]
			};
			break;
		case 'signup':
			content = {
				exclude: [], details: [
					{
						id: "textLabel",
						element: 'a-text',
						value: 'Sign Up',
						text: {height: 3},
						position: {x: -1.176, y: -0.45, z: -2.944}
					},
					{
						id: "usernameSignup",
						element: "a-input",
						class: "clickable",
						placeholder: "Username",
						color: "black",
						width: 0.6,
						position: {x: -1.2, y: -0.75, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						id: "passOneSignup",
						element: "a-input",
						class: "clickable",
						placeholder: "Password",
						type: "password",
						color: 'black',
						width: 0.6,
						position: {x: -1.2, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						id: "passTwoSignup",
						element: "a-input",
						class: "clickable",
						placeholder: "Password",
						type: "password",
						color: 'black',
						width: 0.6,
						position: {x: -0.230, y: -1.07, z: -2.944},
						scale: {x: 1.5, y: 1.5, z: 1.5}
					},
					{
						id: "submit",
						element: "a-button",
						class: "clickable",
						value: "Submit",
						name: "stuff",
						color: "white",
						position: {x: 0.736, y: -1.075, z: -2.944},
						scale: {x: 0.8, y: 0.8, z: 0.8}
					},
					{
						id: "textLink",
						element: "a-text",
						class: "clickable",
						value: " or Login.",
						position: {x: -0.37, y: -0.49, z: -2.944},
						text: {height: 1},
						scale: {x: 0.5, y: 0.5, z: 0.5}
					},
				]
			};
			break;
		case 'profile-expanded':
			content = {};
			break;
		default:
			break;
	}

	content.user = user;
	return content;
}





