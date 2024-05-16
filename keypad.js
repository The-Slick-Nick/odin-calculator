/* keypad.js
 *
 * File for handling button-based calculator button inputs
 */

class KeypadButton {

    /**
     * :param: {string} key
     */
    constructor(key, callback) {
        this.callback = callback;
        this.key = key;

        this.buttonElem = document.createElement("button");
        
        this.buttonElem.addEventListener(
            "click", (event) => { this.callback(this.key); }
        );
    }
}


class Keypad {
    /* Class representing ... & wrapping KeypadButtons */
    constructor() {

        this.outerContainer = document.createElement("div");
        this.subscribers = [];

        for (let buttonI = 0; buttonI <= 9; buttonI++) {
            /* subscribe to each keypad button, forwarding output to this.emit */
            let newButton = new KeypadButton(buttonI.toString(), this.emit);
        }
    }

    emit(key) {
        /* pass forward any keypresses */
        for (subscriber of this.subscribers) {
            subscriber(key);
        }
    }

    subscribe(callback) {
        /* callback should be a function that accepts some "key" argument, expecting
        * a single character
        */
        this.subscirbers.push(callback);
    }
}
