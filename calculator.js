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


/* Calculator constants */
STATE_PARSING_OP1 = 0;
STATE_PARSING_OP2 = 1;
STATE_EQUALS_PRESSED = 2;
STATE_ERROR = 3;

class Calculator {
/* Class that handles the internal calculations and ties together
 * the individual calculator components */

    constructor(digitDisplay, keypad) {
        const self = this;

        this.display = digitDisplay;
        this.keypad = keypad;

        /* "plug in" to the keypad */
        this.keypad.subscribe(this.parseKey);

        self.state = STATE_PARSING_OP1;

        this.operand1 = 0; // some number
        this.operand2 = 0; // another number
        this.operator; // single char, representing operation +-/*

        // set up display area
        // We only assign children here - style should be addressed via css
        this._outerContainer = document.createElement("div");
        this._outerContainer.classList.add("calculator");

        this._outerContainer.appendChild(this.display.getDiv());
        this._outerContainer.appendChild(this.keypad.getDiv());

        switch (self.state) {
            case STATE_PARSING_OP1:
            case STATE_EQUALS_PRESSED:
                self.display.representNumber(self.operand1);
                break;
            case STATE_PARSING_OP2:
                self.display.representNumber(self.operand2);
                break;
            case STATE_ERROR:
                self.display.representWord("Err");
                break;
        }
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
                STATE_EQUALS_PRESSED === self.state
                || STATE_ERROR === self.state
            ) {
                this.operand1 = 0;
                self.state = STATE_PARSING_OP1;
            }

            if (STATE_PARSING_OP1 === self.state) {
                this.operand1 = (this.operand1 * 10) + digit;
            }
            else if (STATE_PARSING_OP2 === self.state) {
                this.operand2 = (this.operand2 * 10) + digit;
            }

        }
        else if (operators.includes(keyPressed)) {
            /* pressed an operator */

            if (STATE_PARSING_OP2 === self.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
            }
            this.operator = keyPressed;
            this.operand2 = 0;
            self.state = STATE_PARSING_OP2;
        }
        else if ('=' === keyPressed) {
            if (STATE_PARSING_OP2 === self.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
                this.operand2 = 0;
            }

            /* Note (to self) - must have self.state to deal with the scenario
             * where a user enters a number directly after hitting enter,
             * beginning a new operand1 (rather than tacking onto existing)
             */

            if (this.operand1 >= this.display.minNumber && this.operand2 <= this.display.maxNumber) {
                self.state = STATE_EQUALS_PRESSED;
            }
            else {  // display does not support value
                self.state = STATE_ERROR;
            }
        }

        switch (self.state) {
            case STATE_PARSING_OP1:
            case STATE_EQUALS_PRESSED:
                self.display.representNumber(self.operand1);
                break;
            case STATE_PARSING_OP2:
                self.display.representNumber(self.operand2);
                break;
            case STATE_ERROR:
                self.display.representWord("Err");
                break;
        }
    }

}

