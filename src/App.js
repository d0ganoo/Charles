import {getData} from './recupdata';
import {Profil} from './Profil';

const fields = document.getElementsByClassName('sorted');
const fieldInput = document.getElementById('filter');
const fieldURL = document.getElementById('url');
const buttonModal = document.getElementById('modal-button');

export class App {
	constructor(url) {
		getData(url).then(profils => {
			this.tab = profils.map((el) => new Profil(el));
			this.filteredTab = this.tab;
			this.updateView();
		});
		fieldURL.value = url;
		this.sortedColumn = true;

		[...fields].map(field => field.addEventListener("click", () => this.sort(field.textContent.toLowerCase())));
		fieldInput.addEventListener("input", () => this.filter());
		fieldURL.addEventListener("input", () => this.changeURL());
		buttonModal.addEventListener("click", () => document.getElementById('modal').classList.add('hidden'));
	}

	showModalBox(profilDetails) {
		document.getElementById('profil').innerHTML = profilDetails.getModalHTML();
		document.getElementById('modal').classList.remove('hidden');
	}

	updateView() {
		let str = "";

		for (let i = 0; i < this.filteredTab.length; i++) {
			str = str + this.filteredTab[i].getRowHTML();
		}
		document.getElementsByTagName('tbody')[0].innerHTML = str;
		for (let i = 0; i < this.filteredTab.length; i++) {
			document.getElementById(this.filteredTab[i].id).addEventListener("click", () => {
				this.showModalBox(this.filteredTab[i]);
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
		this.updateView();
	}

	filter() {
		const str = fieldInput.value.toUpperCase();

		this.filteredTab = this.tab.filter(profil =>
			profil.lastname.toUpperCase().includes(str) || profil.firstname.toUpperCase().includes(str)
		);
		this.updateView();
	}

	changeURL() {
		fetch(fieldURL.value).then(profils => {
			this.tab = profils.map((el) => new Profil(el));
			this.filteredTab = this.tab;
			this.updateView();
		}, err => document.getElementsByTagName('tbody')[0].innerHTML = '');
	}
};
