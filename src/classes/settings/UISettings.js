/**
 * Contains settings pertaining to the appearance of the app.
 */
export class UISettings {

    /**
     * Create a new UISettings object.
     * @param {boolean} displayPauseButton - Whether to display the pause button on the home screen.
     * @param {boolean} displayCancelButton - Whether to display the cancel button on the home screen.
     * @param {boolean} displayFastForwardButton - Whether to display the fast forward button on the home screen.
     * @param {boolean} displayTaskSelector - Whether to display the task selector field on the home screen.
     */
    constructor(displayPauseButton = true,
                displayCancelButton = true,
                displayFastForwardButton = true,
                displayTaskSelector = true) {
        /**
         * @member {boolean} UISettings#displayPauseButton
         * @desc Whether to display the pause button on the home screen.
         */
        this.displayPauseButton = displayPauseButton
        this.displayCancelButton = displayCancelButton
        this.displayFastForwardButton = displayFastForwardButton
        this.displayTaskSelector = displayTaskSelector
    }
}