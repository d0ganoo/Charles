import {getData} from './recupdata';
import {Profil} from './Profil';

const fields = document.getElementsByClassName('sorted');
const fieldInput = document.getElementById('filter');
const fieldURL = document.getElementById('url');

export class App {
	constructor(url) {
		getData(url).then(profils => {
			this.tab = profils.map((el) => new Profil(el));
			this.filteredTab = this.tab;
			this.updateView(this.tab);
		});
		this.sortedColumn = true;

		[...fields].map(field => field.addEventListener("click", () => this.sort(field.textContent.toLowerCase())));
		fieldInput.addEventListener("input", () => this.filter(this.tab));
		fieldURL.addEventListener("input", () => this.changeURL());
		console.log("App construcor called.");
	}

	showModalBox(profilDetails) {
		document.getElementById('modal').innerHTML = profilDetails.getModalHTML();
	}

	updateView(profils) {
		let str = "";
		for (let i = 0; i < profils.length; i++) {
			str = str + profils[i].getRowHTML();
		}
		document.getElementsByTagName('tbody')[0].innerHTML = str;
		let tabProfils = document.querySelectorAll('tbody tr');
		for (let i = 0; i < tabProfils.length; i++) {
			tabProfils[i].addEventListener("click", () => {
				for (let j = 0; j < profils.length; j++) {
					if (profils[j].id == tabProfils[i].id) {
						this.showModalBox(profils[i]);
					}
				}
			});
		}
	}

	sort(name) {
		if (this.sortedColumn) {
			if (isNaN(parseFloat(this.filteredTab[0][name]))) {
				this.filteredTab.sort((a, b) => a[name].localeCompare(b[name]));
			} else {
				this.filteredTab.sort((a, b) => a[name] - b[name]);
			}
			this.sortedColumn = false;
		} else {
			if (isNaN(parseFloat(this.filteredTab[0][name]))) {
				this.filteredTab.sort((a, b) => b[name].localeCompare(a[name]));
			} else {
				this.filteredTab.sort((a, b) => b[name] - a[name]);
			}
			this.sortedColumn = true;
		}
		this.updateView(this.filteredTab);
	}

	filter(tab) {
		this.filteredTab = [];
		const str = fieldInput.value.toUpperCase();
		this.filteredTab = tab.filter(profil =>
			profil.lastname.toUpperCase().includes(str) || profil.firstname.toUpperCase().includes(str)
		);
		this.updateView(this.filteredTab);
	}

	changeURL() {
		fetch(fieldURL.value).then(profils => {
			this.tab = profils.map((el) => new Profil(el));
			this.filteredTab = this.tab;
			this.updateView(this.tab);
		}, err => document.getElementsByTagName('tbody')[0].innerHTML = '');
	}
};
