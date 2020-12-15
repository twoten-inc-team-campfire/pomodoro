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
    constructor(startTime, endTime, type = TIMER_SESSION_TYPE.POMODORO, task = null) {
        if (!this.isValidConstructorInput(startTime, endTime, type)) {
            throw new Error('Invalid constructor of TimerSession');
        }

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
        this.task = task;
    }

    /**
     * getDuration
     * @desc Get the duration that the TimerSession lasted.
     * @returns {number} The duration of the TimerSession in milliseconds
     * @public
     */
    getDuration() {
        return (this.endTime - this.startTime);
    }

    /**
     * isValidConstructorInput
     * @desc Verify if the constructor inputs are in proper types
     * @param {Date} startTime - The time the work session started
     * @param {Date} endTime - The time the work session ended
     * @param {TIMER_SESSION_TYPE} type - The type of session, a TIMER_SESSION_TYPE enum
     * @returns {boolean} true if the inputs are in proper types, otherwise false
     * @private
     */
    isValidConstructorInput(startTime, endTime, type) {
        return startTime instanceof Date
            && endTime instanceof Date
            && typeof type == 'number'
            && Object.values(TIMER_SESSION_TYPE).includes(type);
    }

    /**
     * copy
     * @desc Returns a copy of the given TimerSession.
     * @returns {TimerSession} The copy of the current TimerSession.
     */
    copy() {
        return new TimerSession(
            new Date(this.startTime),
            new Date(this.endTime),
            this.type,
            this.task
        );
    }

    /**
     * hydrate
     * @desc Hydrates an instantiation of TimerSession from a generic object
     * @param {Date} obj.startTime
     * @param {Date} obj.endTime
     * @param {number} obj.type
     * @param {string} obj.task
     * @returns {TimerSession}
     */
    static hydrate(obj) {
        return new TimerSession(
            new Date(obj.startTime),
            new Date(obj.endTime),
            obj.type,
            obj.task
        );
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