
import {getData} from './recupdata';

let tab = [];
let filteredTab = [];
let sortedColumn = true;
const fields = document.getElementsByClassName('sorted');
const fieldInput = document.getElementById('filter');
const fieldURL = document.getElementById('url');


function displayCounterProfils(nbProfils, nbTotalProfils){
	let str = `<tr>${nbProfils}/ ${nbTotalProfils}</tr>`;
	document.getElementsByTagName('tfoot')[0].innerHTML = str;
}

function counterProfils(profils){
	return function(){
		return profils.length;
	}
}

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

function updateView(profils, nbProfils, nbTotalProfils = counterProfils(profils)){
	let str = "";
	for (let i = 0; i < profils.length; i++) {
	str = `${str}<tr id="${profils[i].id}"><td><img src="${profils[i].picture}"></td>
			<td>${profils[i].lastname}</td>
			<td>${profils[i].firstname}</td>
			<td>${profils[i].balance}</td></tr>`
	}
	document.getElementsByTagName('tbody')[0].innerHTML = str;
	displayCounterProfils(nbProfils(), nbTotalProfils());
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

function sort(name){
	let sortedTab = [];

	if(sortedColumn === true){
		sortedTab = isNaN(parseFloat(filteredTab[0][name])) === false ?
	 		filteredTab.sort((a, b) => a[name] - b[name]) :
			sortedTab = filteredTab.sort((a, b) => a[name].localeCompare(b[name]));
		sortedColumn = false;
	}
	else {
		sortedTab = isNaN(parseFloat(filteredTab[0][name])) === false ?
			sortedTab = filteredTab.sort((a, b) => b[name] - a[name]):
			sortedTab = filteredTab.sort((a, b) => b[name].localeCompare(a[name]));
		sortedColumn = true;
	}
	let nbTotalProfils = counterProfils(sortedTab);
	updateView(sortedTab, nbTotalProfils);
}

// function filter(tab) {
// 	filteredTab = [];
// 	let profilsLastname = [];
// 	let profilsFirstname = [];
// 	const str = fieldInput.value.toUpperCase();

// 	for (let i = 0; i < tab.length; i++) {
// 		profilsLastname = tab[i].lastname.toUpperCase();
// 		profilsFirstname = tab[i].firstname.toUpperCase();
// 		if (profilsLastname.includes(str) || profilsFirstname.includes(str)) {
// 			filteredTab.push(tab[i]);
// 		}
// 	}
// 	updateView(filteredTab);
// }

function filter(tab){
	filteredTab = [];
	const str = fieldInput.value.toUpperCase();
	filteredTab = tab.filter(profil => profil.lastname.toUpperCase().includes(str) 
		|| profil.firstname.toUpperCase().includes(str));
	let nbProfils = counterProfils(filteredTab);
	let nbTotalProfils = counterProfils(tab);
	updateView(filteredTab, nbProfils, nbTotalProfils);
}


function changeURL() {
	fetch(fieldURL.value).then(profils=> {
			updateView(profils.json());
	}, err => document.getElementsByTagName('tbody')[0].innerHTML = '');
}

getData("https://demo0050088.mockable.io/simple/profils").then(profils=> {
	tab = profils;
	filteredTab = tab;
	let nbTotalProfils = counterProfils(tab);
	updateView(profils,nbTotalProfils);
});

[...fields].map(field => field.addEventListener("click", () => sort(field.textContent.toLowerCase())));
fieldInput.addEventListener("input", () => filter(tab));
fieldURL.addEventListener("input", () => changeURL());

