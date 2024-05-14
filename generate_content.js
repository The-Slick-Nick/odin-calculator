/* generate_content.js
 * 
 * This file/script is meant to run any/all DOM-generating javascript
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testDisplay = new DigitDiv();

document.querySelector("body").appendChild(testDisplay.getDiv());

async function demoDisplay() {
    for (let digit = 0; digit <= 9; digit++) {
        await sleep(750);
        testDisplay.representDigit(digit);
    }
} 

demoDisplay();
