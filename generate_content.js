/* generate_content.js
 * 
 * This file/script is meant to run any/all DOM-generating javascript
 */
const NUM_DIGITS_IN_DISPLAY = 8;

const audioDoms = [
    document.querySelector("#audio1"),
    document.querySelector("#audio2"),
    document.querySelector("#audio3")
];


const display = new DigitDisplay(NUM_DIGITS_IN_DISPLAY);
const keypad = new Keypad(...audioDoms);
const calculator = new Calculator(display, keypad);

window.addEventListener("keyup", (event) => keypad.checkKeyupEvent(event));
window.addEventListener("keydown", (event) => keypad.checkKeydownEvent(event));

document.querySelector("body").appendChild(calculator.getDiv());

document.documentElement.style.setProperty("--num-digits", NUM_DIGITS_IN_DISPLAY);

