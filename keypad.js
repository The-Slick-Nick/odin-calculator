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
        this._callback = callback;
        this._key = key;

        this.buttonElem = document.createElement("button");
        this.buttonElem.classList.add("keypad-button");
        this.buttonElem.textContent = key;

        this.buttonElem.addEventListener( "click", (event) => {
            this.buttonRelease();
            this.buttonFire();
        });

        this.buttonElem.addEventListener("mousedown", (event) => {
            this.buttonPress();
        });

        this.buttonElem.addEventListener("mouseup", (event) => {
            this.buttonRelease();
        });

        this.buttonElem.addEventListener("mouseout", (event) => {
            this.buttonRelease();
        });
    }

    buttonPress() {
        this.buttonElem.classList.add("keypad-button-pressed");
    }

    buttonRelease() {
        this.buttonElem.classList.remove("keypad-button-pressed");
    }

    buttonFire() {
        this._callback(this._key);
    }

    getKeyChar() {
        return this._key;
    }

    getButton() {
        /* Return the DOM button element this class represents */
        return this.buttonElem;
    }
}


const all_keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'C']

class Keypad {

    /* Class representing ... & wrapping KeypadButtons
     * 
     * Keypresses from KeypadButton objects bubble up to the emit() method,
     * which sends a keypress signal (as a string, mostly single character) to 
     * any subscriber callbacks.
     *
     * Note that each individual button handles its own click events, but
     * keyboard events are handled by the Keypad first, then passed to
     * the appropriate button to emit its signal.
     * This back and forth seems excessive, but is done in order to ensure
     * keypresses are always listened to and can have the visual button feedback
     * on the screen.
     * */

    constructor() {

        this._outerContainer = document.createElement("div");
        this._outerContainer.classList.add("keypad");

        this.subscribers = [];

        this._keys = {};

        /* [C] [/]|[*] [-]
         * [7] [8]|[9] [+]
         * [4] [5]|[6] [+-]
         * [1] [2]|[3] [ ]
         * [  0  ]|[.] [=]
         * -------|-------
         * S1     |     S2
         *
         * note: we have to split this up weird - some buttons are two
         * tall and some are two-wide. We split it up into two 5x2 sections,
         * where the left one is split into rows, and the right is split into
         * columns
         */


        // define five rows
        let blueprint1 = [
            ["C", "/"],
            ["7", "8"],
            ["4", "5"],
            ["1", "2"],
            ["0"]
        ]

        // define two columns
        let blueprint2 = [
            ["*", "9", "6", "3", "."],
            ["-", "+", "+/-", "="]
        ];

        // keys that are "large" on their primary dimension
        // all others are "small"
        let largeKeys = ["0", "="];

        let rowSection = document.createElement("div");
        rowSection.classList.add("keypad-section-rows");

        blueprint1.forEach((keyRow) => {
            let newRow = document.createElement("div");
            newRow.classList.add("keypad-button-row");

            keyRow.forEach((keyChar) => {
                let newButton = new KeypadButton(keyChar, (k) => this.emit(k));
                if (largeKeys.includes(keyChar)) {
                    newButton.getButton().classList.add("wide-button");
                }
                else {
                    newButton.getButton().classList.add("small-button");
                }
                newRow.appendChild(newButton.getButton());
                this._keys[keyChar] = newButton;

            });
            rowSection.appendChild(newRow);
        });
        this._outerContainer.appendChild(rowSection);


        let columnSection = document.createElement("div");
        columnSection.classList.add("keypad-section-columns");

        blueprint2.forEach((keyCol) => {
            let newCol = document.createElement("div");
            newCol.classList.add("keypad-button-column");

            keyCol.forEach((keyChar) => {
                let newButton = new KeypadButton(keyChar, (k) => this.emit(k));
                if (largeKeys.includes(keyChar)) {
                    newButton.getButton().classList.add("tall-button");
                }
                else {
                    newButton.getButton().classList.add("small-button");
                }
                newCol.appendChild(newButton.getButton());
                this._keys[keyChar] = newButton;

            });
            columnSection.appendChild(newCol);
        });

        // Some key mapping/remapping - if I need more I'll do something more structured later
        this._keys["Enter"] = this._keys["="];


        this._outerContainer.appendChild(columnSection);
    }

    checkKeydownEvent(keydownEvent) {
        if (keydownEvent.key in this._keys) {
            this._keys[keydownEvent.key].buttonPress();
        }
    }

    checkKeyupEvent(keyupEvent) {
        if (keyupEvent.key in this._keys) {
            this._keys[keyupEvent.key].buttonRelease();
            this._keys[keyupEvent.key].buttonFire();
        }
    }

    getDiv() {
        /* Return the DOM div element that this class represents */
        return this._outerContainer;
    }

    emit(key) {
        /* Emit a keypress code to all subscriber callbacks */
        this.subscribers.forEach((subscriber) => {
            subscriber(key);
        });
    }

    subscribe(callback) {
        /* Add a callback to the subscriber list
         *
         * The callback should accept a single "char" argument
         */
        this.subscribers.push(callback);
        console.log("Now we have subscribed");
    }
}

