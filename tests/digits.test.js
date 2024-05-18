const {
    numSignificantNondecimalDigits,
    numSignificantDecimalDigits
} = require("../digits.js"); 

/* Nondecimal Digits */
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


/* Decimal Digits */
test("Single decimal", () => {
    expect(numSignificantDecimalDigits(1.1)).toEqual(1);
});

test("No decimal", () => {
    expect(numSignificantDecimalDigits(14)).toEqual(0);
});

test("Multiple decimal", () => {
    expect(numSignificantDecimalDigits(1.2345)).toEqual(4);
});

test("Negative decimal", () => {
    expect(numSignificantDecimalDigits(-5.6789)).toEqual(4);
});

test("Zero nondecimal", () => {
    expect(numSignificantDecimalDigits(0.14)).toEqual(2);
});

test("Trailing zeroes", () => {
    expect(numSignificantDecimalDigits(1.234000)).toEqual(3);
});


