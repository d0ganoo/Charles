function Tools(){
}

Tools.prototype.sortArray = function (arr, prop, ascend) {
	const sortAlpha = (x, y) => x.localeCompare(y);
	const sortNum = (x, y) => x - y;

	return arr.sort((a, b) => {
		const [finalA, finalB] = ascend ? [a[prop], b[prop]] : [b[prop], a[prop]];
		const compareFunction = (isNaN(parseFloat(finalA)) || isNaN(parseFloat(finalB))) ? sortAlpha : sortNum;

		return compareFunction(finalA, finalB);
	});
};

Tools.prototype.filterArray = function (arr, input) {
	const str = input.toUpperCase();

	return arr.filter(profil =>
		profil.lastname.toUpperCase().includes(str) || profil.firstname.toUpperCase().includes(str)
	);
};

Tools.prototype.limitArray = function (arr, limit, sign) {
	return arr.filter(profil =>
		(profil.balance - limit) * sign < 0
	);
};

module.exports = Tools;
