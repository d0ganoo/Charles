import {getData} from './recupdata';

const fields = document.getElementsByClassName('sorted');
const fieldInput = document.getElementById('filter');
const fieldURL = document.getElementById('url');

export class App {
	constructor(url) {
		getData(url).then(profils => {
			this.tab = profils;
			this.filteredTab = profils;
			this.updateView(profils);
		});
		this.url = url;
		this.sortedColumn = true;

		[...fields].map(field => field.addEventListener("click", () => this.sort(field.textContent.toLowerCase())));
		fieldInput.addEventListener("input", () => this.filter(this.tab));
		fieldURL.addEventListener("input", () => this.changeURL());
		console.log("App construcor called.");
	}

	showModalBox(profilDetails) {
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

	updateView(profils) {
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

	sort(name) {
		if(this.sortedColumn === true){
			isNaN(parseFloat(this.filteredTab[0][name])) === false ?
		 		this.filteredTab.sort((a, b) => a[name] - b[name]) :
				this.filteredTab.sort((a, b) => a[name].localeCompare(b[name]));
			this.sortedColumn = false;
		}
		else {
			isNaN(parseFloat(this.filteredTab[0][name])) === false ?
				this.filteredTab.sort((a, b) => b[name] - a[name]):
				this.filteredTab.sort((a, b) => b[name].localeCompare(a[name]));
			this.sortedColumn = true;
		}
		this.updateView(this.filteredTab);
	}

	filter(tab) {
		this.filteredTab = [];
		const str = fieldInput.value.toUpperCase();
		this.filteredTab = tab.filter(profil =>
			profil.lastname.toUpperCase().includes(str)|| profil.firstname.toUpperCase().includes(str)
		);
		this.updateView(this.filteredTab);
	}


};
