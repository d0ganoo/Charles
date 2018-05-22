
import {getData, qs} from './recupdata';

let tab = [];
let filteredTab = [];
let sortedColumn = '';
const fieldLastname = document.getElementById('lastname');
const fieldFirstname = document.getElementById('firstname');
const fieldBalance = document.getElementById('balance');
const fieldInput = document.getElementById('filter');
const fieldURL = document.getElementById('url');


function showModalBox(profilDetails){
	let str = `<span onclick="document.getElementById('modal').innerHTML =''">Fermer [X]</span><br>
			Nom: ${profilDetails.lastname}<br/>
			Prenom: ${profilDetails.firstname}<br/>
			Balance	${profilDetails.balance}<br/>
			Age: ${profilDetails.age}<br/>
			Email: ${profilDetails.email}<br/>
			Adresse: ${profilDetails.address}<br/>
			Societé: ${profilDetails.company}`;
	document.getElementById('modal').innerHTML = str;
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
			for (let j = 0; j < profils.length; j++) {
				if (profils[j].id == tabProfils[i].id) {
					showModalBox(profils[i]);
				}
			}
		});
	}
}


function sortNum(name) {
	let newTab = [];
	let maxmin = filteredTab[0][name];
	let index = 0;
	let sign = 1;

	if (sortedColumn === name) {
		sign = -1;
	} else {
		sortedColumn = name;
	}
	while(filteredTab.length > 0) {
		maxmin = filteredTab[0][name];
		for (let i = 0; i < filteredTab.length; i++) {
			if ((parseFloat(filteredTab[i][name]) - parseFloat(maxmin)) * sign >= 0) {
				maxmin = filteredTab[i][name];
				index = i;
			}
		}
		newTab.push(filteredTab[index]);
		filteredTab.splice(index, 1);
	}
	filteredTab = newTab;
	updateView(filteredTab);
}

function sortAlpha(name) {
	let newTab = [];
	let maxmin = filteredTab[0][name];
	let index = 0;
	let sign = 1;

	if (sortedColumn === name) {
		sign = -1;
	} else {
		sortedColumn = name;
	}
	while(filteredTab.length > 0) {
		maxmin = filteredTab[0][name];
		for (let i = 0; i < filteredTab.length; i++) {
			if (maxmin.localeCompare(filteredTab[i][name]) * sign >= 0) {
				maxmin = filteredTab[i][name]; 
				index = i;
			}
		}
		newTab.push(filteredTab[index]);
		filteredTab.splice(index, 1);
	}
	filteredTab = newTab;
	updateView(filteredTab);
}

function filter() {
	filteredTab = [];
	let profilsLastname = [];
	let profilsFirstname = [];
	let str = fieldInput.value.toUpperCase();

	for (let i = 0; i < tab.length; i++) {
		profilsLastname = tab[i].lastname.toUpperCase();
		profilsFirstname = tab[i].firstname.toUpperCase();
		if (profilsLastname.includes(str) || profilsFirstname.includes(str)) {
			filteredTab.push(tab[i]);
		}
	}
	updateView(filteredTab);
}

function changeURL() {
	fetch(fieldURL.value).then(profils=> {
			updateView(profils.json());
	}, err => document.getElementsByTagName('tbody')[0].innerHTML = '');
}

getData("https://demo0050088.mockable.io/simple/profils").then(profils=> {
	tab = profils;
	filteredTab = tab;
	updateView(profils);
});

fieldLastname.addEventListener("click", () => sortAlpha("lastname"));
fieldFirstname.addEventListener("click", () => sortAlpha("firstname"));
fieldBalance.addEventListener("click", () => sortNum("balance"));
fieldInput.addEventListener("input", () => filter());
fieldURL.addEventListener("input", () => changeURL());