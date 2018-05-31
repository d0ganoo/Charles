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

describe("Filtered arrays", function() {
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

  it("should not be larger than the original", function() {
	 filtered = tools.filterArray(arrayToFilter, String.fromCharCode(65 + Math.floor(Math.random() * 25)));
    expect(filtered.length).not.toBeGreaterThan(arrayToFilter.length);
  });
});

describe("Limited arrays", function() {
	var Tools = require('../src/Tools');
	let arrayToLimit = [];
	let limitedUp = [];
	let limitedDown = [];
	let limit = 0;

	beforeEach(function() {
	  tools = new Tools();
		while (arrayToLimit.length < 10) {
			arrayToLimit.push({
				balance: Math.floor(Math.random() * 100)
			});
		}
	});

  it("should be empty if all elements are off limit", function() {
	 limitedUp = tools.limitArray(arrayToLimit, -200, 1);
	 limitedDown = tools.limitArray(arrayToLimit, 200, -1);
	 expect(limitedUp.length).toBe(0);
    expect(limitedDown.length).toBe(0);
  });

  it("should be complementary", function() {
		limit = Math.floor(Math.random() * 50);
	 limitedUp = tools.limitArray(arrayToLimit, limit, 1);
	 limitedDown = tools.limitArray(arrayToLimit, limit, -1);
    expect(limitedUp.length + limitedDown.length).toBe(arrayToLimit.length);
  });
});
