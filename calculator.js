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

    constructor(digitDisplay, keypad) {

        this.display = digitDisplay;
        this.keypad = keypad;
        this.state = STATE_PARSING_OP1;

        this.operand1 = 0; // some number
        this.operand2 = ; // another number
        this.operator; // single char, representing operation +-/*
    }

    parseKey(keyPressed) {

        let digit = digits.indexOf(keyPressed);
        if (digit >= 0 && digit <= 9) {
            /* pressed a number */

            if (Calculator.STATE_EQUALS_PRESSED === this.state)   {
                this.operand1 = 0;
                this.state = STATE_PARSING_OP1;
            }

            if (Calculator.STATE_PARSING_OP1 === this.state) {
                this.operand1 = (this.operand1 * 10) + digit;
                this.display.representNumber(this.operand1);
            }
            else if (Calculator.STATE_PARSING_OP2 === this.state) {
                this.operand2 = (this.operand2 * 10) + digit;
                this.display.representNumber(this.operand2);
            }

        }
        else if (operators.includes(keyPressed)) {
            /* pressed an operator */

            switch (this.state) {
                case Calculator.STATE_PARSING_OP1:
                case Calculator.STATE_EQUALS_PRESSED:
                    this.operator = keyPressed;
                    this.state = Calculator.STATE_PARSING_OP2;
                    break;
                case Calculator.STATE_PARSING_OP2:
                    this.operand1 = calculate(this.operand1, this.operator, this.operand2);
                    this.operator = keyPressed;
                    break;
                default:
                    throw new Error("How did you get here?");
            }
            this.operand2 = 0;
            this.display.representNumber(this.operand2);
        }
        else if ('=' === keyPressed) {
            if (Calculator.STATE_PARSING_OP2 === this.state) {
                this.operand1 = calculate(this.operand1, this.operator, this.operand2);
                this.operand2 = 0;
            }
            this.display.representNumber(this.operand1);
            this.state = STATE_EQUALS_PRESSED;
            /* Note (to self) - must have this state to deal with the scenario
             * where a user enters a number directly after hitting enter
             * beginning a new operand1 (rather than tacking onto existing)
             */
        }
    }


}
