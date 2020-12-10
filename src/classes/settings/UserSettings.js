/**
 * UserSettings
 * @desc Class that composes all the user setting variables. User settings can
 * 1) pertain to the behavior and properties of the pomodoro cycles or 2) alter
 * the UI of the application.
 */
export class UserSettings {
    /**
     * Create a new UserSettings object using the default values established in
     * the configuration file.
     * @constructs
     * @param {number} pomodoroLength - Length of the pomodoro cycle in whole minutes.
     * @param {number} shortBreakLength - Length of the short break in whole minutes.
     * @param {number} longBreakLength - Length of the long break in whole minutes.
     * @param {number} numPomodorosInCycle - The number of pomodoros in a complete cycle (before a long break)
     * @param {boolean} autoStartBreaks - Start breaks without user input immediately after finishing a pomodoro
     * @param {boolean} autoStartPomodoros - Start pomodoros without user input immediately after finishing a break.
     * @param {boolean} displayPauseButton - Whether to display the pause button on the home screen.
     * @param {boolean} displayCancelButton - Whether to display the cancel button on the home screen.
     * @param {boolean} displayFastForwardButton - Whether to display the fast forward button on the home screen.
     * @param {boolean} displayTaskSelector - Whether to display the task selector field on the home screen.
     */
    constructor(pomodoroLength = 25,
        shortBreakLength = 5,
        longBreakLength = 20,
        numPomodorosInCycle = 4,
        autoStartBreaks = true,
        autoStartPomodoros = true,
        displayPauseButton = true,
        displayCancelButton = true,
        displayFastForwardButton = true,
        displayTaskSelector = true ) {

        if (!this.isValidConstructorInput(
            pomodoroLength,
            shortBreakLength,
            longBreakLength,
            numPomodorosInCycle,
            autoStartBreaks,
            autoStartPomodoros,
            displayPauseButton,
            displayCancelButton,
            displayFastForwardButton,
            displayTaskSelector
        )) {
            throw new Error('Invalid constructor of UserSettings');
        }

        /**
         * @member {number} UserSettings#pomodoroLength
         * @desc Length of the pomodoro cycle in milliseconds.
         */
        this.pomodoroLength = pomodoroLength;
        /**
         * @member {number} UserSettings#shortBreakLength
         * @desc Length of the short break in milliseconds.
         */
        this.shortBreakLength = shortBreakLength;
        /**
         * @member {number} UserSettings#longBreakLength
         * @desc Length of the long break in milliseconds.
         */
        this.longBreakLength = longBreakLength;
        /**
         * @member {number} UserSettings#numPomodorosInCycle
         * @desc The number of pomodoros in a complete cycle (before a long break)
         */
        this.numPomodorosInCycle = numPomodorosInCycle;
        /**
         * @member {boolean} UserSettings#autoStartBreaks
         * @desc Start breaks without user input immediately after finishing a pomodoro.
         */
        this.autoStartBreaks = autoStartBreaks;
        /**
         * @member {boolean} UserSettings#autoStartPomodoros
         * @desc Start pomodoros without user input immediately after finishing a break.
         */
        this.autoStartPomodoros = autoStartPomodoros;
        /**
         * @member {boolean} UserSettings#displayPauseButton
         * @desc Whether to display the pause button on the home screen.
         */
        this.displayPauseButton = displayPauseButton
        /**
         * @member {boolean} UserSettings#displayCancelButton
         * @desc Whether to display the cancel button on the home screen.
         */
        this.displayCancelButton = displayCancelButton
        /**
         * @member {boolean} UserSettings#displayFastForwardButton
         * @desc Whether to display the fast forward button on the home screen.
         */
        this.displayFastForwardButton = displayFastForwardButton
        /**
         * @member {boolean} UserSettings#displayTaskSelector
         * @desc Whether to display the task selector field on the home screen.
         */
        this.displayTaskSelector = displayTaskSelector
    }

    /**
     * isValidConstructorInput
     * @desc Verify if the constructor inputs are in proper types
     * @param {number} pomodoroLength - Length of the pomodoro cycle in milliseconds.
     * @param {number} shortBreakLength - Length of the short break in milliseconds.
     * @param {number} longBreakLength - Length of the long break in milliseconds.
     * @param {number} numPomodorosInCycle - The number of pomodoros in a complete cycle (before a long break)
     * @param {boolean} autoStartBreaks - Start breaks without user input immediately after finishing a pomodoro
     * @param {boolean} autoStartPomodoros - Start pomodoros without user input immediately after finishing a break.
     * @param {boolean} displayPauseButton - Whether to display the pause button on the home screen.
     * @param {boolean} displayCancelButton - Whether to display the cancel button on the home screen.
     * @param {boolean} displayFastForwardButton - Whether to display the fast forward button on the home screen.
     * @param {boolean} displayTaskSelector - Whether to display the task selector field on the home screen.
     * @returns {boolean} true if the inputs are in proper types, otherwise false
     * @private
     */
    isValidConstructorInput(
        pomodoroLength,
        shortBreakLength,
        longBreakLength,
        numPomodorosInCycle,
        autoStartBreaks,
        autoStartPomodoros,
        displayPauseButton,
        displayCancelButton,
        displayFastForwardButton,
        displayTaskSelector
    ) {
        return typeof pomodoroLength == 'number'
            && typeof shortBreakLength == 'number'
            && typeof longBreakLength == 'number'
            && typeof numPomodorosInCycle == 'number'
            && typeof autoStartBreaks == 'boolean'
            && typeof autoStartPomodoros == 'boolean'
            && typeof displayPauseButton == 'boolean'
            && typeof displayCancelButton == 'boolean'
            && typeof displayFastForwardButton == 'boolean'
            && typeof displayTaskSelector == 'boolean'
    }
}