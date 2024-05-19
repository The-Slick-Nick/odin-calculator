const {
    numSignificantNondecimalDigits,
    integerFloatRepresentation
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
    expect(numSignificantNondecimalDigits(0.12)).toEqual(1);
});



/* integerFloatRepresentation */
test("Single digit", () => {
    let [integer, decimalPlaces] = integerFloatRepresentation(12.3, 10);
    expect(integer).toEqual(123);
    expect(decimalPlaces).toEqual(1);
});

test("No decimal", () => {
    let [integer, decimalPlaces] = integerFloatRepresentation(3, 10);
    expect(integer).toEqual(3);
    expect(decimalPlaces).toEqual(0);
});

test("Trailing zeroes", () => {
    let [integer, decimalPlaces] = integerFloatRepresentation(100, 10);
    expect(integer).toEqual(100);
    expect(decimalPlaces).toEqual(0);
});

test("Truncate to limit", () => {

    let [integer, decimalPlaces] = integerFloatRepresentation(123.456789, 5);
    expect(integer).toEqual(12345);
    expect(decimalPlaces).toEqual(2);
});

test("Only decimal portion", () => {

    let [integer, decimalPlaces] = integerFloatRepresentation(0.123, 10);
    expect(integer).toEqual(123);
    expect(decimalPlaces).toEqual(3);
});

test("Negative number", () => {
    // ignore the negative portion
    let [integer, decimalPlaces] = integerFloatRepresentation(-12.34, 10);
    expect(integer).toEqual(-1234);
    expect(decimalPlaces).toEqual(2);
});

test("Leading zero with truncating decimals", () => {
    let [integer, decimalPlaces] = integerFloatRepresentation(0.12345, 3);
    expect(integer).toEqual(12);
    expect(decimalPlaces).toEqual(2);
});

test("Negative leading zero with truncating decimals", () => {
    let [integer, decimalPlaces] = integerFloatRepresentation(-0.12345, 4);
    // both the - sign and the leading 0 require a full digit slot
    expect(integer).toEqual(-12);
    expect(decimalPlaces).toEqual(2);
});

test("Negative leading zero without truncating decimals", () => {
    let [integer, decimalPlaces] = integerFloatRepresentation(-0.028571, 8);
    expect(integer).toEqual(-28571);
    expect(decimalPlaces).toEqual(6);
});
