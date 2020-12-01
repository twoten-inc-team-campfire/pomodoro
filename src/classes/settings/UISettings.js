/**
 * UISettings
 * @desc Contains settings pertaining to the appearance of the app.
 */
export class UISettings {

    /**
     * Create a new UISettings object.
     * @constructs
     * @param {boolean} displayPauseButton - Whether to display the pause button on the home screen.
     * @param {boolean} displayCancelButton - Whether to display the cancel button on the home screen.
     * @param {boolean} displayFastForwardButton - Whether to display the fast forward button on the home screen.
     * @param {boolean} displayTaskSelector - Whether to display the task selector field on the home screen.
     */
    constructor(displayPauseButton = true,
        displayCancelButton = true,
        displayFastForwardButton = true,
        displayTaskSelector = true) {
        if (!this.isValidConstructorInput(
            displayPauseButton,
            displayCancelButton,
            displayFastForwardButton,
            displayTaskSelector
        )) {
            throw new Error('Invalid constructor of UISettings');
        }

        /**
         * @member {boolean} UISettings#displayPauseButton
         * @desc Whether to display the pause button on the home screen.
         */
        this.displayPauseButton = displayPauseButton
        /**
         * @member {boolean} UISettings#displayCancelButton
         * @desc Whether to display the cancel button on the home screen.
         */
        this.displayCancelButton = displayCancelButton
        /**
         * @member {boolean} UISettings#displayFastForwardButton
         * @desc Whether to display the fast forward button on the home screen.
         */
        this.displayFastForwardButton = displayFastForwardButton
        /**
         * @member {boolean} UISettings#displayTaskSelector
         * @desc Whether to display the task selector field on the home screen.
         */
        this.displayTaskSelector = displayTaskSelector
    }

    /**
     * isValidConstructorInput
     * @desc Verify if the constructor inputs are in proper types
     * @param {boolean} displayPauseButton - Whether to display the pause button on the home screen.
     * @param {boolean} displayCancelButton - Whether to display the cancel button on the home screen.
     * @param {boolean} displayFastForwardButton - Whether to display the fast forward button on the home screen.
     * @param {boolean} displayTaskSelector - Whether to display the task selector field on the home screen.
     * @returns {boolean} true if the inputs are in proper types, otherwise false
     * @private
     */
    isValidConstructorInput(
        displayPauseButton,
        displayCancelButton,
        displayFastForwardButton,
        displayTaskSelector
    ) {
        return typeof displayPauseButton == 'boolean'
            && typeof displayCancelButton == 'boolean'
            && typeof displayFastForwardButton == 'boolean'
            && typeof displayTaskSelector == 'boolean'
    }
}