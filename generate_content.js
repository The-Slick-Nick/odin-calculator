/* generate_content.js
 * 
 * This file/script is meant to run any/all DOM-generating javascript
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testDisplay = new DigitDisplay(3);
document.querySelector("body").appendChild(testDisplay.getDiv());

async function demoDisplay() {
    for (let num = 0; num <= 100; num++) {
        await sleep(10);
        testDisplay.representNumber(num);
    }
    testDisplay.representWord("Err");
} 


demoDisplay();
// testDisplay.representNumber(999);
