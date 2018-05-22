
import {getData, qs} from './recupdata';

let tab = [];
const fieldLastname = document.getElementById('lastname');
const fieldFirstname = document.getElementById('firstname');
const fieldBalance = document.getElementById('balance');
const fieldInput = document.getElementsByTagName('input')[0];


function showModalBox(profilDetails){
	console.log(profilDetails);
}

function showDetails (id) {
	for (let i = 0; i < tab.length; i++) {
		if (tab[i].id == id) {
			showModalBox(tab[i]);
		}
	}
}

function updateView(profils){
	let str = "";
	for (let i = 0; i < profils.length; i++) {
	str = `${str}<tr id="${profils[i].id}"><td><img src="${profils[i].picture}"></td>
			<td>${profils[i].lastname}</td>
			<td>${profils[i].firstname}</td>
			<td>${profils[i].balance}</td></tr>`
	}
	document.getElementsByTagName('tbody')[0].innerHTML = str;
	let tabProfils = document.querySelectorAll('tbody tr');
	for (let i = 0; i < tabProfils.length; i++) {
		tabProfils[i].addEventListener("click", () => {
			for (let j = 0; j < tab.length; j++) {
				if (tab[j].id == tabProfils[i].id) {
					showModalBox(tab[i]);
				}
			}
		});
	}
}

getData().then(profils=> {
	tab = profils;
	updateView(profils);
});

function sortNum(name) {
	let newTab = [];
	let maxmin = tab[0][name];
	let index = 0;
	let sign = 1;

	document.getElementById(name).classList.toggle("sorted");
	if (document.getElementById(name).classList.contains("sorted")) {
		sign = -1;
	}
	while(tab.length > 0) {
		maxmin = tab[0][name];
		for (let i = 0; i < tab.length; i++) {
			if ((parseFloat(tab[i][name]) - parseFloat(maxmin)) * sign >= 0) {
				maxmin = tab[i][name];
				index = i;
			}
		}
		newTab.push(tab[index]);
		tab.splice(index, 1);
	}
	tab = newTab;
	updateView(tab);
}

function sortAlpha(name) {
	let newTab = [];
	let maxmin = tab[0][name];
	let index = 0;
	let sign = 1;

	document.getElementById(name).classList.toggle("sorted");
	if (document.getElementById(name).classList.contains("sorted")) {
		sign = -1;
	}
	while(tab.length > 0) {
		maxmin = tab[0][name];
		for (let i = 0; i < tab.length; i++) {
			if (maxmin.localeCompare(tab[i][name]) * sign >= 0) {
				maxmin = tab[i][name]; 
				index = i;
			}
		}
		newTab.push(tab[index]);
		tab.splice(index, 1);
	}
	tab = newTab;
	updateView(tab);
}

function filter() {
	let newTab = [];

	for (let i = 0; i < tab.length; i++) {
		if (tab[i].lastname.toUpperCase().includes(fieldInput.value.toUpperCase()) || tab[i].firstname.toUpperCase().includes(fieldInput.value.toUpperCase())) {
			newTab.push(tab[i]);
		}
	}
	updateView(newTab);
}

fieldLastname.addEventListener("click", () => sortAlpha("lastname"));
fieldFirstname.addEventListener("click", () => sortAlpha("firstname"));
fieldBalance.addEventListener("click", () => sortNum("balance"));
fieldInput.addEventListener("input", () => filter());