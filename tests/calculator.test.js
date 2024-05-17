const Calculator = require("../calculator.js");

class DummyDisplay {
    constructor() {
        this.val = null;
        this.minNumber = 0;
        this.maxNumber = 1000;
    }

    representNumber(number) {
        /* mock this method - save the value instead of displaying */
        this.val = number;
    }

    


}

test("test1", () => {
    let 
    let calc = new Calculator(
