export class Profil {
	constructor(tmp) {
		this.lastname = tmp.lastname;
		this.firstname = tmp.firstname;
		this.balance = tmp.balance;
		this.age = tmp.age;
		this.email = tmp.email;
		this.address = tmp.address;
		this.company = tmp.company;
		this.picture = tmp.picture;
		this.id = tmp.id;
	}

	getRowHTML() {
		return `<tr id="${this.id}">
					<td><img src="${this.picture}"></td>
					<td>${this.lastname}</td>
					<td>${this.firstname}</td>
					<td>${this.balance}</td>
				</tr>`;
	}

	getModalHTML() {
		return `Nom: ${this.lastname}<br/>
				Prenom: ${this.firstname}<br/>
				Balance	${this.balance}<br/>
				Age: ${this.age}<br/>
				Email: ${this.email}<br/>
				Adresse: ${this.address}<br/>
				Societé: ${this.company}`;
	}

	getValue(key) {
		return this[key];
	}
}
