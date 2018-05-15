
import {getData, qs} from './recupdata';

let tab = [];
const fieldLastname = document.getElementById('lastname');
const fieldFirstname = document.getElementById('firstname');
const fieldBalance = document.getElementById('balance');


getData().then(profils=> {
	let str = "";

	tab = profils;
	for (var i = 0; i < profils.length; i++) {
		str = `${str}<tr><td><img src="${profils[i].picture}"></td>
				<td>${profils[i].lastname}</td>
				<td>${profils[i].firstname}</td>
				<td>${profils[i].balance}</td></tr>`
	}
	document.getElementsByTagName('tbody')[0].innerHTML = str;
});

function sort(name) {
	console.log("tester");
	let newTab = [];
	console.log(tab[0][name]);
	let max = tab[0][name];
	let index = 0;

	while(tab.length > 0) {
		console.log("while");
		max = tab[0][name];
		for (let i = 0; i < tab.length; i++){
			if (max.localeCompare(tab[i][name]) >= 0) {
				max = tab[i][name];
				index = i;
			}
		}
		newTab.push(tab[index]);
		tab.splice(index, 1);
	}
	tab = newTab;
	console.log(tab);
}

fieldLastname.addEventListener("click", () => {sort("lastname")});