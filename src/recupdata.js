
export function getData(url){
	return fetch(url)
		.then(profils => profils.json(), err => console.error('failed to load profils', err));
}
