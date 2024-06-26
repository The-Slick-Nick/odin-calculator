/* digits.js
 * This file to contain functions/classes/etc. whatever I need
 * to deal with a digit representing interface
 */

const TOP_HORIZONTAL_BIT = 1 << 0;
const TOP_LEFT_VERTICAL_BIT = 1 << 1;
const TOP_RIGHT_VERTICAL_BIT = 1 << 2;
const MIDDLE_HORIZONTAL_BIT = 1 << 3;
const BOTTOM_LEFT_VERTICAL_BIT = 1 << 4;
const BOTTOM_RIGHT_VERTICAL_BIT = 1 << 5;
const BOTTOM_HORIZONTAL_BIT = 1 << 6;

/* bit representation of numeric values */
const digitMasks = [

    // 0
    0
    | TOP_HORIZONTAL_BIT
    | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    // | MIDDLE_HORIZONTAL_BIT
    | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 1
    0
    // | TOP_HORIZONTAL_BIT
    // | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    // | MIDDLE_HORIZONTAL_BIT
    // | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    // | BOTTOM_HORIZONTAL_BIT
    | 0,
    

    // 2
    0
    | TOP_HORIZONTAL_BIT
    // | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    | BOTTOM_LEFT_VERTICAL_BIT
    // | BOTTOM_RIGHT_VERTICAL_BIT
    | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 3
    0
    | TOP_HORIZONTAL_BIT
    // | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    // | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 4
    0
    // | TOP_HORIZONTAL_BIT
    | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    // | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    // | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 5
    0
    | TOP_HORIZONTAL_BIT
    | TOP_LEFT_VERTICAL_BIT
    // | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    // | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 6
    0
    | TOP_HORIZONTAL_BIT
    | TOP_LEFT_VERTICAL_BIT
    // | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 7
    0
    | TOP_HORIZONTAL_BIT
    // | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    // | MIDDLE_HORIZONTAL_BIT
    // | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    // | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 8
    0
    | TOP_HORIZONTAL_BIT
    | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    | BOTTOM_HORIZONTAL_BIT
    | 0,

    // 9
    0
    | TOP_HORIZONTAL_BIT
    | TOP_LEFT_VERTICAL_BIT
    | TOP_RIGHT_VERTICAL_BIT
    | MIDDLE_HORIZONTAL_BIT
    // | BOTTOM_LEFT_VERTICAL_BIT
    | BOTTOM_RIGHT_VERTICAL_BIT
    // | BOTTOM_HORIZONTAL_BIT
    | 0
]

const charMasks = {
    '0': digitMasks[0],
    '1': digitMasks[1],
    '2': digitMasks[2],
    '3': digitMasks[3],
    '4': digitMasks[4],
    '5': digitMasks[5],
    '6': digitMasks[6],
    '7': digitMasks[7],
    '8': digitMasks[8],
    '9': digitMasks[9],
    'E': 0
        | TOP_HORIZONTAL_BIT
        | TOP_LEFT_VERTICAL_BIT
        // | TOP_RIGHT_VERTICAL_BIT
        | MIDDLE_HORIZONTAL_BIT
        | BOTTOM_LEFT_VERTICAL_BIT
        // | BOTTOM_RIGHT_VERTICAL_BIT
        | BOTTOM_HORIZONTAL_BIT
        | 0,
    'r': 0
        // | TOP_HORIZONTAL_BIT
        // | TOP_LEFT_VERTICAL_BIT
        // | TOP_RIGHT_VERTICAL_BIT
        | MIDDLE_HORIZONTAL_BIT
        | BOTTOM_LEFT_VERTICAL_BIT
        // | BOTTOM_RIGHT_VERTICAL_BIT
        // | BOTTOM_HORIZONTAL_BIT
        | 0,

    '-': 0
        // | TOP_HORIZONTAL_BIT
        // | TOP_LEFT_VERTICAL_BIT
        // | TOP_RIGHT_VERTICAL_BIT
        | MIDDLE_HORIZONTAL_BIT
        // | BOTTOM_LEFT_VERTICAL_BIT
        // | BOTTOM_RIGHT_VERTICAL_BIT
        // | BOTTOM_HORIZONTAL_BIT
        | 0
}


function numSignificantNondecimalDigits(num) {
    /* Identify the number of digits required to
     * represent the number of integer digits in a number
     * (left of the decimal point)
     */

    if (num < 0) {
        num *= -1;
    }

    let numDigits = 0;

    do {
        num = Math.floor(num / 10);
        numDigits++;
    } while (num > 0);

    return numDigits;
}

function integerFloatRepresentation(num, digitLimit) {
    /* Return the best representation of `num` within
     * digitlimit
     *
     * Returns a two-sized array in the form 
     * [ integerToRepresent, numDecimalPlaces ]
     *
     * Where integerToRepresent is the integer represention
     * of a number to print, and numDecimalPlaces is the
     * number of places (from the right) to place the decima.
     *
     * i.e. integerFloatRepresentation(12.34, 8) would yield
     * [1234, 2]
     */
    let isNegative = false;
    if (num < 0) {
        num *= -1;
        isNegative = true;
        digitLimit--;
    }

    let integralDigits = numSignificantNondecimalDigits(num);
    let maxDecimal = digitLimit - integralDigits;
    num = Math.trunc(num * (10 ** maxDecimal));

    let numDecimal = maxDecimal;

    // clip leading zeroes
    for (let i = 0; i < maxDecimal && num % 10 === 0; i++) {
        num /= 10;
        numDecimal--;
    }

    return [(isNegative ? -1 : 1) * num, numDecimal];
}

class DecimalDiv {
    /* A class that wraps & represents a decimal point 
     * for the digit display
     */

    constructor() {

        this._outerContainer = document.createElement("div");

        this._outerContainer.classList.add("decimal-box");

        this._decimalContainer = document.createElement("div");
        this._decimalContainer.classList.add("decimal-wrapper");

        this._decimalLeft = document.createElement("div");
        this._decimalRight = document.createElement("div");
        this._decimalLeft.classList.add("decimal-left");
        this._decimalRight.classList.add("decimal-right");

        this._outerContainer.appendChild(this._decimalContainer);
        this._decimalContainer.appendChild(this._decimalLeft);
        this._decimalContainer.appendChild(this._decimalRight);

        // outerContainer - flex columns
        // decimalContainer - auto-martin top to force to bottom
        // decimalLeft & decimalRight- use pointy-border trick to create a decimal point on 
    }

    getElem() {
        return this._outerContainer;
    }

    representDecimal() {
        /* Method naming convention chosen to match that of "DigitDiv", which came first */
        this._decimalLeft.classList.add("digit-lit");
        this._decimalRight.classList.add("digit-lit");
    }

    clear() {
        this._decimalLeft.classList.remove("digit-lit");
        this._decimalRight.classList.remove("digit-lit");
    }
}

class DigitDiv {
    /* A class that wraps & represents a digit display box */
    constructor() {
        /* Initialize digit div, generate divs and generate
         * an array of cells to light up to represent digits
         */

        this.outerContainer = document.createElement("div");
        this.lightableCells = [];

        this.outerContainer.classList.add("digit-box");

        for (let rowNum = 0; rowNum < 5; rowNum++) {
            let digRow = document.createElement("div");
            digRow.classList.add("digit-row");
            digRow.classList.add(`row-${rowNum}`);
            digRow.classList.add(
                (rowNum % 2 === 0) ? "height-low" : "height-high"
            );

            let cellNum;  // total cell count
            for (let colNum = 0; colNum < 3; colNum++) {
                cellNum = (3 * rowNum) + colNum;

                let digCell = document.createElement("div");
                digCell.classList.add("digit-cell");
                digCell.classList.add(`col-${colNum}`);

                // colNum odd => horizontal
                // colNum even => vertical
                digCell.classList.add((colNum % 2 === 0) ? "width-low" : "width-high");

                if (cellNum % 2 !== 0) {
                    /* container cell */

                    // vertical or horizontal?
                    if (colNum % 2 === 0) {
                        digCell.classList.add("lightable-cell-vertical");

                        let topEnd = document.createElement("div");
                        topEnd.classList.add("cell-end-top");

                        let middle = document.createElement("div");
                        middle.classList.add("cell-middle-vertical");

                        let bottomEnd = document.createElement("div");
                        bottomEnd.classList.add("cell-end-bottom");

                        digCell.appendChild(topEnd);
                        digCell.appendChild(middle);
                        digCell.appendChild(bottomEnd);

                        this.lightableCells.push([topEnd, middle, bottomEnd]);

                    }
                    else {
                        digCell.classList.add("lightable-cell-horizontal");

                        let leftEnd = document.createElement("div");
                        leftEnd.classList.add("cell-end-left");

                        let middle = document.createElement("div");
                        middle.classList.add("cell-middle-horizontal");
                        let rightEnd = document.createElement("div");
                        rightEnd.classList.add("cell-end-right");

                        digCell.appendChild(leftEnd);
                        digCell.appendChild(middle);
                        digCell.appendChild(rightEnd);

                        this.lightableCells.push([leftEnd, middle, rightEnd]);
                    }
                }

                digRow.appendChild(digCell);
            }
            this.outerContainer.appendChild(digRow);
        }
    }

    getDiv() {
        return this.outerContainer;
    }

    representDigit(digit) {
        if (digit < 0 || digit > 9) {
            throw new Error("Invalid digit");
        }

        for (let digitIdx = 0; digitIdx < 7; digitIdx++) {

            if (((1 << digitIdx) & digitMasks[digit]) > 0) {  // This bar should light up
                this.lightableCells[digitIdx].forEach((component) => {
                    component.classList.add("digit-lit");
                });
            }
            else {
                this.lightableCells[digitIdx].forEach((component) => {
                    component.classList.remove("digit-lit");
                });
            }
        }
    }

    representChar(char) {
        /* Represent the character at index idx of string text, if possible */

        if (!char in charMasks) {
            throw new Error(`No digit display representation for character ${char}`);
        }

        for (let digitIdx = 0; digitIdx < 7; digitIdx++) {
            if (((1 << digitIdx) & charMasks[char]) > 0) {
                this.lightableCells[digitIdx].forEach((component) => {
                    component.classList.add("digit-lit");
                });
            }
            else {
                this.lightableCells[digitIdx].forEach((component) => {
                    component.classList.remove("digit-lit");
                });
            }
        }
    }

    clear() {
        /* clear display, showing no digit whatsoever */

        this.lightableCells.forEach((container) => {
            container.forEach((component) => {
                component.classList.remove("digit-lit");
                });
        });
    }

}

class DigitDisplay {
    /* Represents a full-length digit display, managing individual DigitDiv objects
     * 
     * Can represent integers - floating point values are rounded to the nearest 
     * integer
     */

    /** 
     * Initialize a DigitDisplay object
     * @param numDigits {integer} - The number of digits to show on the display. Minimum of 3.
     */
    constructor(numDigits) {
        if (+numDigits <= 3) {
            throw new Error("DigitDisplay requires at least three digits");
        }

        this._numDigits = numDigits;
        this.maxNumber = (10 ** numDigits) - 1;
        this.minNumber = -1 * ((10 ** (numDigits - 1)) - 1);

        // low index - high digit. (left to right is high digit to low digit)
        this.digits = [];
        this.decimals = [];

        this.outerContainer = document.createElement("div");
        this.outerContainer.classList.add("digit-display");


        // note: I'm not normally a fan of directly setting the css here but perhaps it's best here?
        this.outerContainer.style.display = "flex";
        this.outerContainer.style["flex-flow"] = "row nowrap";


        for (let i = 0; i < numDigits; i++) {
            let newDecimal = new DecimalDiv();
            let newDigit = new DigitDiv();

            this.decimals.push(newDecimal);
            this.digits.push(newDigit);

            this.outerContainer.appendChild(newDecimal.getElem());
            this.outerContainer.appendChild(newDigit.getDiv());
        }
    }

    getDiv() {
        return this.outerContainer;
    }

    /**
     * Represent the provided number on the display
     * @param number {number} - Number to display
     */
    representNumber(number) {
        if (isNaN(+number)) {
            throw new Error(`Cannot represent ${number} as a number`);
        }

        number = +number;
        if (number < this.minNumber || number > this.maxNumber) {
            throw new Error(
                `This DigitDisplay can only represent ${this.minNumber} to ${this.maxNumber}. `
                + `Got ${number}`
            )
        }

        let [integerRep, numDecimalPlaces] = integerFloatRepresentation(
            number, this._numDigits
        );

        let isNegative = false;
        if (integerRep < 0) {
            integerRep *= -1;
            isNegative = true;
        }

        /* show the decimal point */
        this.decimals.forEach((decimalObj) => decimalObj.clear());
        if (numDecimalPlaces > 0) {
            this.decimals[this._numDigits - numDecimalPlaces].representDecimal();
        }

        /* show the number */
        let factor = 0;
        let digit;
        let digitDivIdx;
        for (digitDivIdx = this.digits.length - 1; digitDivIdx >= 0 && integerRep > 0; digitDivIdx--) {

            digit = (integerRep % (10 ** (factor + 1))) / (10 ** factor);
            this.digits[digitDivIdx].representDigit(digit);
            integerRep -= (10 ** factor) * digit;

            factor++;
        }

        /* show the padding zeroes after a decimal point */
        while (this.digits.length - digitDivIdx - 1 <= numDecimalPlaces) {
            this.digits[digitDivIdx].representDigit(0);
            digitDivIdx--;
        }

        /* show the negative sign */
        if (isNegative) {
            this.digits[digitDivIdx].representChar("-");
            digitDivIdx--;
        }

        /* clear remaining digits */
        for (; digitDivIdx >= 0; digitDivIdx--) {
            this.digits[digitDivIdx].clear();
        }
    }

    /**
     * Represent the provided text on the display
     * @param text {string} - Text to display. If it contains
     *     a character the display is incapable of displaying,
     *     an error is raised.
     */
    representWord(text) {
        text = String(text);

        if (text.length > this.digits.length) {
            throw new Error(
                `String representation of ${text} too long to display in `
                + `${this.digits.length} digits.`
            )
        }

        let textIdx = text.length - 1;
        for (let digitIdx = this.digits.length - 1; digitIdx >= 0; digitIdx--) {

            if (textIdx < 0) {
                this.digits[digitIdx].clear();
                continue;
            }
            this.digits[digitIdx].representChar(text[textIdx]);
            textIdx--;
        }
    }

    clear() {
        /* clear the entire display */
        for (digitDiv of this.digits) {
            digitDiv.clear();
        }
    }
}


try {
    module.exports = {
        numSignificantNondecimalDigits,
        integerFloatRepresentation
    }
} catch {}
