const {
    numSignificantNondecimalDigits,
    numSignificantDecimalDigits
} = require("../digits.js"); 

/* LEFT OF DECIMAL */
test("Single digit", () => {
    expect(numSignificantNondecimalDigits(1)).toEqual(1);
});

test("Multiple digits", () => {
    expect(numSignificantNondecimalDigits(1234)).toEqual(4);
});

test("Float", () => {
    expect(numSignificantNondecimalDigits(12.34)).toEqual(2);
});

test("Negative numbers", () => {
    expect(numSignificantNondecimalDigits(-45.67)).toEqual(2);
});

test("Zero", () => {
    expect(numSignificantNondecimalDigits(0)).toEqual(1);
});

test("0 < n < 1", () => {
    expect(numSignificantNondecimalDigits(0.12)).toEqual(0);
});

