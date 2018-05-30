describe("Sorted arrays", function() {
	var Tools = require('../src/Tools');
	let arrayToSort = [];
	let sortedFalse = [];
	let sortedTrue = [];

	beforeEach(function() {
	  tools = new Tools();
		while (arrayToSort.length < 10) {
			arrayToSort.push({
				name: String.fromCharCode(65 + Math.floor(Math.random() * 25)),
				cost: Math.floor(Math.random() * 1000) / 100
			});
		}
		sortedFalse = tools.sortArray(arrayToSort, "name", false);
		sortedTrue = tools.sortArray(arrayToSort, "name", true);
	});

  it("should have the same length", function() {
    expect(arrayToSort.length).toBe(sortedTrue.length);
    expect(arrayToSort.length).toBe(sortedFalse.length);
  });

  it("should be the same after a sort", function() {
    expect(sortedTrue).toBe(tools.sortArray(sortedTrue, "name", true));
    expect(sortedFalse).toBe(tools.sortArray(sortedFalse, "name", false));
  });
});
describe("Filtered array", function() {
	var Tools = require('../src/Tools');
	let arrayToFilter = [];
	let filtered = [];


	beforeEach(function() {
	  tools = new Tools();
		while (arrayToFilter.length < 10) {
			arrayToFilter.push({
				firstname: String.fromCharCode(65 + Math.floor(Math.random() * 25)),
				lastname: String.fromCharCode(65 + Math.floor(Math.random() * 25))
			});
		}
	});

  it("should be empty if no element is found", function() {
	 filtered = tools.filterArray(arrayToFilter, "Lorem");
    expect(filtered.length).toBe(0);
  });

  it("should not be larger", function() {
	 filtered = tools.filterArray(arrayToFilter, String.fromCharCode(65 + Math.floor(Math.random() * 25)));
    expect(filtered.length).not.toBeGreaterThan(arrayToFilter.length);
  });
});
