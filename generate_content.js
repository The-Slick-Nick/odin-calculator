/* generate_content.js
 * 
 * This file/script is meant to run any/all DOM-generating javascript
 */
let NUM_DIGITS_IN_DISPLAY = 8;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const testDisplay = new DigitDisplay(NUM_DIGITS_IN_DISPLAY);
const testKeypad = new Keypad();
const testCalculator = new Calculator(testDisplay, testKeypad);

document.querySelector("body").appendChild(testCalculator.getDiv());

async function demoDisplay() {
    for (let num = 0; num <= 100; num++) {
        await sleep(10);
        testDisplay.representNumber(num);
    }
    testDisplay.representWord("Err");
} 

document.documentElement.style.setProperty("--num-digits", NUM_DIGITS_IN_DISPLAY);
