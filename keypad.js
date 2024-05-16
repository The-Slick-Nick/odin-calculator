/* keypad.js
 *
 * File for handling button-based calculator button inputs
 */

class KeypadButton {

    /**
     * :param: {string} key
     * :param: {function} callback
     */
    constructor(key, callback) {
        this.callback = callback;
        this.key = key;

        this.buttonElem = document.createElement("button");
        this.buttonElem.classList.add("keypad-button");
        this.buttonElem.textContent = key;

        this.buttonElem.addEventListener(
            "click", (event) => { this.callback(this.key); }
        );
    }

    getButton() {
        /* Return the DOM button element this class represents */
        return this.buttonElem;
    }
}


const all_keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/']

class Keypad {

    /* Class representing ... & wrapping KeypadButtons */
    constructor() {

        this._outerContainer = document.createElement("div");
        this._outerContainer.classList.add("keypad");

        this.subscribers = [];

        all_keys.forEach((keyChar) => {
            /* subscribe to each keypad button, forwarding output to this.emit */
            let newButton = new KeypadButton(
                keyChar, (key) => {
                    this.subscribers.forEach((subscriber) => {
                        subscriber(key);
                    });
                });
            this._outerContainer.appendChild(newButton.getButton());
        });

    }

    getDiv() {
        /* Return the DOM div element that this class represents */
        return this._outerContainer;
    }
/*
    emit(key) {
        this.subscribers.forEach((subscriber) => {
            subscriber(key);
        });
    }
*/
    subscribe(callback) {
        /* callback should be a function that accepts some "key" argument, expecting
        * a single character
        */
        this.subscribers.push(callback);
        console.log("Now we have subscribed");
    }
}
