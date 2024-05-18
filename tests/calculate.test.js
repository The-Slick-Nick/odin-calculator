const calculate = require("../calculator.js");


// Addition
test("Adds integers", () => {
    expect(calculate(1, '+', 2)).toEqual(3);
});

test("Adds floats", () => {
    expect(calculate(1.5, '+', 2.4)).toEqual(3.9);
});

test("Negatives subtract", () => {
    expect(calculate(4, '+', -2)).toEqual(2);
});

test("Strings convert", () => {
    expect(calculate('1', '+', '2')).toEqual(3);
});


// Subtraction
test("Subtracts integers", () => {
    expect(calculate(5, '-', 2)).toEqual(3);
});

test("Subtracts floats", () => {
    expect(calculate(4.6, '-', 2.4)).toBeCloseTo(2.2);
});

test("Negatives add", () => {
    expect(calculate(4, '-', -1)).toEqual(5);
});


// Multiplication
test("Multiplies integers", () => {
    expect(calculate(2, '*', 9)).toEqual(18);
});

test("Multiplies floats", () => {
    expect(calculate(1.5, '*', 0.5)).toBeCloseTo(0.75);
});

test("Negatives flip", () => {
    expect(calculate(2, '*', -4)).toEqual(-8);
});

test("Multiply double negatives", () => {
    expect(calculate(-8,'*', -2)).toEqual(16);
});


// Division
test("Divides integers", () => {
    expect(calculate(6, '/', 2)).toEqual(3);
});

test("Divides floats", () => {
    expect(calculate(4.5, '/', 1.5)).toBeCloseTo(3.0);
});

test("Divide negatives flip", () => {
    expect(calculate(-6, '/', -2)).toEqual(3);
});

test("Divide by 0", () => {
    expect(calculate(4, '/', 0)).toEqual(Infinity);
});


