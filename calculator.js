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
            return operand1 / operand2;
        default:
            throw new Error(`Invalid operator ${operator}`);
    }
}


/* Calculator constants */
STATE_PARSING_OP1 = 0;
STATE_PARSING_OP2 = 1;
STATE_EQUALS_PRESSED = 2;
STATE_OPERATOR_PRESSED = 3;
STATE_ERROR = 4;

class Calculator {
/* Class that handles the internal calculations and ties together
 * the individual calculator components */

    constructor(digitDisplay, keypad) {

        this.display = digitDisplay;
        this.keypad = keypad;

        /* decimal point parsing considerations */
        this.parsingDecimal = false;
        this.appendFactor = 0  // 10 ^ x

        /* "plug in" to the keypad */
        this.keypad.subscribe((key) => this.parseKey(key));

        this.state = STATE_PARSING_OP1;

        this.operand1 = 0; // some number
        this.operand2 = 0; // another number
        this.operator; // single char, representing operation +-/*

        // set up display area
        // We only assign children here - style should be addressed via css
        this._outerContainer = document.createElement("div");
        this._outerContainer.classList.add("calculator");

        this._outerContainer.appendChild(this.display.getDiv());
        this._outerContainer.appendChild(this.keypad.getDiv());
        this.chooseDisplay();
    }

    getDiv() {
        /* Return a reference to the DOM element representing this class */
        return this._outerContainer;
    }

    parseKey(keyPressed) {
        /* Do calculator things based on what key was pressed */

        let digit = digits.indexOf(keyPressed);
        if (digit >= 0 && digit <= 9) {
            /* pressed a number */

            if (
                STATE_EQUALS_PRESSED === this.state
                || STATE_ERROR === this.state
            ) {
                this.operand1 = 0;
                this.state = STATE_PARSING_OP1;
                this.parsingDecimal = false;
                this.appendFactor = 0;
            }
            else if (STATE_OPERATOR_PRESSED === this.state) {
                this.state = STATE_PARSING_OP2;
                this.parsingDecimal = false;
                this.appendFactor = 0;
            }


            if (STATE_PARSING_OP1 === this.state) {
                if (this.parsingDecimal) {
                    this.operand1 += digit * (10 ** this.appendFactor);
                    this.appendFactor--;
                }
                else {
                    this.operand1 = (this.operand1 * 10) + digit;
                }
            }
            else if (STATE_PARSING_OP2 === this.state) {
                if (this.parsingDecimal) {
                    this.operand2 += digit * (10 ** this.appendFactor);
                    this.appendFactor--;
                }
                else {
                    this.operand2 = (this.operand2 * 10) + digit;
                }
            }

        }
        else if (operators.includes(keyPressed)) {
            /* pressed an operator */

            if (STATE_PARSING_OP2 === this.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
            }
            this.operator = keyPressed;
            this.operand2 = 0;
            this.state = STATE_OPERATOR_PRESSED;
        }
        else if ('=' === keyPressed) {
            if (STATE_PARSING_OP2 === this.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
                this.operand2 = 0;
            }
            this.state = STATE_EQUALS_PRESSED;
            /* Note (to this) - must have this state to deal with the scenario
             * where a user enters a number directly after hitting enter,
             * beginning a new operand1 (rather than tacking onto existing)
             */
        }
        else if ('C' === keyPressed) {
            this.operand1 = 0;
            this.state = STATE_PARSING_OP1;
            this.parsingDecimal = false;
            this.appendFactor = 0;
        }
        // maybe I'm beginning to need a switch here instead...
        else if ('+/-' === keyPressed) {
            if (STATE_PARSING_OP1 === this.state || STATE_EQUALS_PRESSED === this.state) {
                this.operand1 *= -1;
            }
            else if (STATE_PARSING_OP2 === this.state) {
                this.operand2 *= -1;
            }
        }
        else if ('.' === keyPressed && !this.parsingDecimal) {
            if (STATE_PARSING_OP1 === this.state || STATE_PARSING_OP2 === this.state) {
                this.parsingDecimal = true;
                this.appendFactor = -1;
            }
        }

        if (
               this.operand1 < this.display.minNumber || this.operand1 > this.display.maxNumber
            || this.operand2 < this.display.minNumber || this.operand2 > this.display.maxNumber
        ) {
            this.state = STATE_ERROR;
        }

        this.chooseDisplay();
    }

    chooseDisplay() {
        /* choose what to display based on current state */
        switch (this.state) {
            case STATE_PARSING_OP1:
            case STATE_EQUALS_PRESSED:
            case STATE_OPERATOR_PRESSED:
                this.display.representNumber(this.operand1);
                break;
            case STATE_PARSING_OP2:
                this.display.representNumber(this.operand2);
                break;
            case STATE_ERROR:
                this.display.representWord("Err");
                break;
        }
    }
}

// this makes the unit tests work
try {
    module.exports = calculate;
} catch {}

