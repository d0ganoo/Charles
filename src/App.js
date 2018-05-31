import {getData} from './recupdata';
import {Profil} from './Profil';

var Tools = require('./Tools');
const tools = new Tools();
const fields = document.getElementsByClassName('sortable');
const fieldInput = document.getElementById('filter');
const fieldURL = document.getElementById('url');
const fieldSelector = document.getElementById('selector');
const fieldLimit = document.getElementById('limit');
const buttonModal = document.getElementById('modal-button');

export class App {
	constructor(url) {
		this.changeURL(url);
		fieldURL.value = url;
		this.sortedColumn = "";
		[...fields].map(field => field.addEventListener("click", () => this.sort(field.textContent.toLowerCase())));
		fieldInput.addEventListener("input", () => this.filter());
		fieldURL.addEventListener("input", () => this.changeURL(fieldURL.value));
		fieldSelector.addEventListener("input", () => this.limit());
		fieldLimit.addEventListener("input", () => this.limit());
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

	limit() {
		let sign = fieldSelector.value !== "lt" ? -1 : 1

		if (fieldSelector.value === "all") {
			this.filteredTab = this.tab;
		} else {
			this.filteredTab = tools.limitArray(this.tab, fieldLimit.value, sign);
		}
		this.updateView();
	}

	changeURL(url) {
		getData(url).then(profils => {
			this.tab = profils.map((el) => new Profil(el));
			this.filteredTab = this.tab;
			this.updateView();
		}).catch(error => {
			this.tab = [];
			this.filteredTab = this.tab;
			this.updateView();
		});
	}
};
