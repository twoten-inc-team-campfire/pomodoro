/**
 * PomodoroSettings
 * @desc Contains settings pertaining to the behavior and properties of the pomodoro cycle.
 */
export class PomodoroSettings {
    /**
     * Create a new PomodoroSettings object.
     * @constructs
     * @param {number} pomodoroLength - Length of the pomodoro cycle in milliseconds.
     * @param {number} shortBreakLength - Length of the short break in milliseconds.
     * @param {number} longBreakLength - Length of the long break in milliseconds.
     * @param {number} numPomodorosInCycle - The number of pomodoros in a complete cycle (before a long break)
     * @param {boolean} autoStartBreaks - Start breaks without user input immediately after finishing a pomodoro
     * @param {boolean} autoStartPomodoros - Start pomodoros without user input immediately after finishing a break.
     */
    constructor(pomodoroLength = 1500000, // 25 * 60 * 1000
        shortBreakLength = 300000, // 5 * 60 * 1000
        longBreakLength = 900000, // 15 * 60 * 1000
        numPomodorosInCycle = 4,
        autoStartBreaks = false,
        autoStartPomodoros = false) {

        if (!this.isValidConstructorInput(
            pomodoroLength,
            shortBreakLength,
            longBreakLength,
            numPomodorosInCycle,
            autoStartBreaks,
            autoStartPomodoros
        )) {
            throw new Error('Invalid constructor of PomodoroSettings');
        }

        /**
         * @member {number} PomodoroSettings#pomodoroLength
         * @desc Length of the pomodoro cycle in milliseconds.
         */
        this.pomodoroLength = pomodoroLength;
        /**
         * @member {number} PomodoroSettings#shortBreakLength
         * @desc Length of the short break in milliseconds.
         */
        this.shortBreakLength = shortBreakLength;
        /**
         * @member {number} PomodoroSettings#longBreakLength
         * @desc Length of the long break in milliseconds.
         */
        this.longBreakLength = longBreakLength;
        /**
         * @member {number} PomodoroSettings#numPomodorosInCycle
         * @desc The number of pomodoros in a complete cycle (before a long break)
         */
        this.numPomodorosInCycle = numPomodorosInCycle;
        /**
         * @member {boolean} PomodoroSettings#autoStartBreaks
         * @desc Start breaks without user input immediately after finishing a pomodoro.
         */
        this.autoStartBreaks = autoStartBreaks;
        /**
         * @member {boolean} PomodoroSettings#autoStartPomodoros
         * @desc Start pomodoros without user input immediately after finishing a break.
         */
        this.autoStartPomodoros = autoStartPomodoros;
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
     * @returns {boolean} true if the inputs are in proper types, otherwise false
     * @private
     */
    isValidConstructorInput(
        pomodoroLength,
        shortBreakLength,
        longBreakLength,
        numPomodorosInCycle,
        autoStartBreaks,
        autoStartPomodoros
    ) {
        return typeof pomodoroLength == 'number'
            && typeof shortBreakLength == 'number'
            && typeof longBreakLength == 'number'
            && typeof numPomodorosInCycle == 'number'
            && typeof autoStartBreaks == 'boolean'
            && typeof autoStartPomodoros == 'boolean'
    }
}