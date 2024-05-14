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
                let digCell = document.createElement("div");
                digCell.classList.add("digit-cell");
                digCell.classList.add(`col-${colNum}`);
                digCell.classList.add(
                    (colNum % 2 === 0) ? "width-low" : "width-high"
                );

                cellNum = (3 * rowNum) + colNum;
                if (cellNum % 2 !== 0) {
                    this.lightableCells.push(digCell);
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
                this.lightableCells[digitIdx].style.backgroundColor = "red";
            }
            else {
                this.lightableCells[digitIdx].style.backgroundColor = "white";
            }
        }
    }
}

// module.exports = DigitDiv;

