/* calculator.js
 *
 * Main driver logic for calculations */

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];

function calculate(operand1, operator, operand2) {
    operand1 = +operand1;
    operand2 = +operand2;

    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return Math.round(operand1 / operand2);
        default:
            throw new Error(`Invalid operator ${operator}`);
    }
}

class Calculator {
/* Class that handles the internal calculations and ties together
 * the individual calculator components */

    STATE_PARSING_OP1 = 0;
    STATE_PARSING_OP2 = 1;
    STATE_EQUALS_PRESSED = 2;
    STATE_ERROR = 3;

    constructor(digitDisplay, keypad) {

        this.display = digitDisplay;
        this.keypad = keypad;
        this.state = STATE_PARSING_OP1;

        this.operand1 = 0; // some number
        this.operand2 = 0; // another number
        this.operator; // single char, representing operation +-/*

        // set up display area
        // We only assign children here - style should be addressed via css
        this.outerContainer = document.createElement("div");
        this.outerContainer.classList.add("calculator");
        this.outerContainer.appendChild(this.keypad.getDiv());
        this.outerContainer.appendChild(this.keypad.getDiv());

        this.chooseDisplay();
    }

    parseKey(keyPressed) {
        /* Do calculator things based on what key was pressed */

        let digit = digits.indexOf(keyPressed);
        if (digit >= 0 && digit <= 9) {
            /* pressed a number */

            if (
                Calculator.STATE_EQUALS_PRESSED === this.state
                || Calculator.STATE_ERROR === this.state
            ) {
                this.operand1 = 0;
                this.state = STATE_PARSING_OP1;
            }

            if (Calculator.STATE_PARSING_OP1 === this.state) {
                this.operand1 = (this.operand1 * 10) + digit;
            }
            else if (Calculator.STATE_PARSING_OP2 === this.state) {
                this.operand2 = (this.operand2 * 10) + digit;
            }

        }
        else if (operators.includes(keyPressed)) {
            /* pressed an operator */

            if (Calculator.STATE_PARSING_OP2 === this.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
            }
            this.operator = keyPressed;
            this.operand2 = 0;
            this.state = Calculator.STATE_PARSING_OP2;
        }
        else if ('=' === keyPressed) {
            if (Calculator.STATE_PARSING_OP2 === this.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
                this.operand2 = 0;
            }

            /* Note (to self) - must have this state to deal with the scenario
             * where a user enters a number directly after hitting enter,
             * beginning a new operand1 (rather than tacking onto existing)
             */

            if (this.operand1 >= this.display.minNumber && this.operand2 <= this.display.maxNumber) {
                this.state = STATE_EQUALS_PRESSED;
            }
            else {  // display does not support value
                this.state = STATE_ERROR;
            }
        }
        this.chooseDisplay();
    }

    chooseDisplay() {
        /* choose what to display based on state */
        switch (this.state) {
            case Calculator.STATE_PARSING_OP1:
            case Calculator.STATE_EQUALS_PRESSED:
                this.display.representNumber(this.operand1);
                break;
            case Calculator.STATE_PARSING_OP2:
                this.display.representNumber(this.operand2);
                break;
            case Calculator.STATE_ERROR:
                this.display.representWord("Err");
                break;
        }
    }


}


module.exports = calculate;
