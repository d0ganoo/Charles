export class Profil {
	constructor(profil) {
		this.lastname = profil.lastname;
		this.firstname = profil.firstname;
		this.balance = profil.balance;
		this.age = profil.age;
		this.email = profil.email;
		this.address = profil.address;
		this.company = profil.company;
		this.picture = profil.picture;
		this.id = profil.id;
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
}
