var _ = require('lodash');


module.exports = function cleanPriorScene(item) {
	if (item.type === "Group") {
		_.forEach(item.children, (thing) => {
			cleanPriorScene(thing)
		})
	} else {
		if (item.type === 'Audio') {
			console.log('Audio: ', item);
			/*	if(item) console.log('(if item) Audio: ', item);
				if(item.disconnect) item.disconnect();*/
		} else if (item.type === 'Mesh') {
			console.log('Mesh Geometry: ', item.geometry);
			console.log('Mesh Material: ', item.material);
			console.log('Mesh Material Map: ', item.material.map);
			item.geometry.dispose();
			item.material.dispose();
			if(item.material.map){
				if(item.material.map.image){
					if(/\.mp4$/.test(item.material.map.image.src)){
						console.log('Mesh Material Map Video: ', item.material.map.image);
						item.material.map.image.muted = true;
						item.material.map.dispose();
						console.log('Mesh Material Map Video src: ', item.material.map.image.src);
						console.log('Mesh Material Map Video [post muting]: ', item.material.map.image);
					}
					console.log('Mesh Material Map Image: ', item.material.map.image.src);
					/*if(item.material.map.image === 'video'){
						console.log('Mesh Material Map Video: ', item.material.map.get('image'));
					}
					if(item.material.map.get('image') === 'img'){
						console.log('Mesh Material Map img: ', item.material.map.get('image'));
					}*/
				}

			}

		} else {
			console.log('Other Type: ', item);
		}

	}
};