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


const all_keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'C']

class Keypad {

    /* Class representing ... & wrapping KeypadButtons */
    constructor() {

        this._outerContainer = document.createElement("div");
        this._outerContainer.classList.add("keypad");

        this.subscribers = [];


        /* [C] [/]|[*] [-]
         * [7] [8]|[9] [ ]
         * [4] [5]|[6] [+]
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


        // define 5 rows
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
            ["-", "+", "="]
        ];

        // keys that are "large" on their primary dimension
        // all others are "small"
        let largeKeys = ["0", "+", "="];

        let rowSection = document.createElement("div");
        rowSection.classList.add("keypad-section-rows");

        blueprint1.forEach((keyRow) => {
            let newRow = document.createElement("div");
            newRow.classList.add("keypad-button-row");

            keyRow.forEach((keyChar) => {
                let newButton = new KeypadButton(keyChar, (k) => this.emit(k));
                if (largeKeys.includes(keyChar)) {
                    newButton.getButton().classList.add("large-button");
                }
                else {
                    newButton.getButton().classList.add("small-button");
                }
                newRow.appendChild(newButton.getButton());
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
                    newButton.getButton().classList.add("large-button");
                }
                else {
                    newButton.getButton().classList.add("small-button");
                }
                newCol.appendChild(newButton.getButton());
            });
            columnSection.appendChild(newCol);
        });
        this._outerContainer.appendChild(columnSection);

        /* all_keys.forEach((keyChar) => {
            let newButton = new KeypadButton(
                keyChar,
                (key) => this.emit(key)
            );
            this._outerContainer.appendChild(newButton.getButton());
        }); */

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

