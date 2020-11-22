/**
 * TimerSession
 * @desc A period of time that the PomodoroManager was active. Used for calculating statistics about user's productivity.
 */
export class TimerSession {

    /**
     * Create a TimerSession.
     * @constructs
     * @param {Date} startTime - The time the work session started
     * @param {Date} endTime - The time the work session ended
     * @param {TIMER_SESSION_TYPE} type - The type of session, a TIMER_SESSION_TYPE enum
     * @param {string} task - The title of the task as a string
     */
    constructor(startTime, endTime, type=TIMER_SESSION_TYPE.POMODORO, task=null) {
        /** @member {Date} TimerSession#startTime
         * @desc The time the work session started */
        this.startTime = startTime;
        /** @member {Date} TimerSession#endTime
         * @desc The time the work session ended*/
        this.endTime = endTime;
        /** @member {TIMER_SESSION_TYPE} TimerSession#type
         * @desc The type of session, a TIMER_SESSION_TYPE enum */
        this.type = type;
        /** @member {string} TimerSession#task
         * @desc The title of the task as a string */
        this.task = task
    }

    /**
     * getDuration
     * @desc Get the duration that the TimerSession lasted.
     * @returns {number} The duration of the TimerSession.
     * @public
     */
    getDuration() {
        return (this.endTime - this.startTime)
    }
}

/**
 * Enum for the type of timer session held.
 * @enum {number}
 * @readonly
 * @public
 */
export const TIMER_SESSION_TYPE = {
    /** @property {number} POMODORO - A pomodoro session, also known as a "work" or "focus" session. */
    POMODORO: 1,
    /** @property {number} SHORT_REST - A short rest */
    SHORT_REST: 2,
    /** @property {number} LONG_REST - A long rest */
    LONG_REST: 3
}
