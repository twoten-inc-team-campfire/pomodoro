/**
 * Contains settings pertaining to the behavior and properties of the pomodoro cycle.
 */
export class PomodoroSettings {
    /**
     * Create a new PomodoroSettings object.
     * @param {number} pomodoroLength - Length of the pomodoro cycle in milliseconds.
     * @param {number} shortBreakLength - Length of the short break in milliseconds.
     * @param {number} longBreakLength - Length of the long break in milliseconds.
     * @param {number} numPomodorosInCycle - The number of pomodoros in a complete cycle (before a long break)
     * @param {boolean} autoStartBreaks - Start breaks without user input immediately after finishing a pomodoro
     * @param {boolean} autoStartPomodoros - Start pomodoros without user input immediately after finishing a break.
     */
    constructor(pomodoroLength= 25 * 60 * 1000, shortBreakLength= 5 * 60 * 1000,
                longBreakLength= 15 * 60 * 1000, numPomodorosInCycle = 4,
                autoStartBreaks= false, autoStartPomodoros= false) {
        this.pomodoroLength = pomodoroLength;
        this.shortBreakLength = shortBreakLength;
        this.longBreakLength = longBreakLength;
        this.numPomodorosInCycle = numPomodorosInCycle;
        this.autoStartBreaks = autoStartBreaks;
        this.autoStartPomodoros = autoStartPomodoros;
    }
}