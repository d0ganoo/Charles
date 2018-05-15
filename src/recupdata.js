
export function getData(){
	return fetch("https://demo0050088.mockable.io/simple/profils")
		.then(profils => profils.json(), err => console.error('failed to load profils', err));
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}