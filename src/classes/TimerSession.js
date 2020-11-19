import { TimerSessionBuilder } from "./TimerSessionBuilder";

/**
 * TimerSession
 * @desc A period of time that the PomodoroManager was active. Used for calculating statistics about user's productivity.
 */
export class TimerSession {

    /**
     * Create a TimerSession.
     * @constructs
     * @param {TimerSessionBuilder} - The builder for the TimerSession
     */
    constructor(builder) {
        /** @member {Date} TimerSession#startTime
         * @desc The time the work session started */
        this.startTime = builder.startTime;
        /** @member {Date} TimerSession#endTime
         * @desc The time the work session ended*/
        this.endTime = builder.endTime;
        /** @member {TIMER_SESSION_TYPE} TimerSession#type
         * @desc The type of session, a TIMER_SESSION_TYPE enum */
        this.type = builder.type;
        /** @member {string} TimerSession#task
         * @desc The title of the task as a string */
        this.task = builder.task;
    }

    /**
     * setStartTime
     * @desc Set the start time of the session
     * @param {Date} startTime - The time the work session started
     * @public
     */
    setStartTIme(startTime) {
        this.startTime = startTime;
    }

    /**
     * setEndTime
     * @desc Set the end time of the session
     * @param {Date} endTime - The time the work session ended
     * @public
     */
    setEndTime(endTime) {
        this.endTime = endTime;
    }

    /**
     * setType
     * @desc Set the type of the session.
     * @param {TIMER_SESSION_TYPE} type - The type of session, a TIMER_SESSION_TYPE enum
     * @public
     */
    setType(type) {
        this.type = type;
    }

    /**
     * setTask
     * @desc Set the title of the task.
     * @param {string} task - The title of the task as a string 
     * @public
     */
    setTask(task) {
        this.task = task;
    }

    /**
     * getStartTime
     * @desc Get the start time of the session
     * @returns {Date} The start time of the session
     * @public
     */
    getStartTime() {
        return this.startTime;
    }

    /**
     * getEndTime
     * @desc Get the start time of the session
     * @returns {Date} The end time of the session
     * @public
     */
    getEndTime() {
        return this.endTime;
    }

    /**
     * getType
     * @desc Get the type of the session.
     * @returns {TIMER_SESSION_TYPE} The type of the session.
     * @public
     */
    getType() {
        return this.type;
    }

    /**
     * getTask
     * @desc Get the title of the task.
     * @returns {string} The title of the task assigned.
     * @public
     */
    getTask() {
        return this.task;
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

// This is an example unit test for when we get unit tests working.
function testDuration() {
    let currentTime = Date.now();
    let offset = 25 * 60 * 1000
    let startTime = new Date(currentTime);
    let endTime = new Date(currentTime + offset);
    let timerSession = new TimerSession(startTime, endTime)
    return timerSession.getDuration() === offset
}