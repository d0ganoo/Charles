import {getData} from './recupdata';
import {Profil} from './Profil';

var Tools = require('./Tools');
const tools = new Tools();
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
		this.sortedColumn = "";

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
		const str = this.filteredTab.reduce((acc, profil) => acc + profil.getRowHTML(), "");

		document.getElementsByTagName('tbody')[0].innerHTML = str;

		this.filteredTab.map((profil) =>
			document.getElementById(profil.id).addEventListener("click", () => {
				this.showModalBox(profil);
			})
		);
	}

	sort(name) {
		this.filteredTab = tools.sortArray(this.filteredTab, name, this.sortedColumn !== name);
		this.sortedColumn = this.sortedColumn === name ? "" : name;
		this.updateView();
	}

	filter() {
		this.filteredTab = tools.filterArray(this.tab, fieldInput.value);
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
