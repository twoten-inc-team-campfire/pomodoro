import { TimerSession, TIMER_SESSION_TYPE } from "./TimerSession";

/**
 * TimerSessionBuilder
 * @desc The builder to build the TimerSession class. StartTime, endTime is required, task and type is optional.
 */
export class TimerSessionBuilder {

    /**
     * Create a TimerSessionBuilder.
     * @constructor
     * @property {Date} startTime - The time the work session started (Required)
     * @property {Date} endTime - The time the work session ended (Required)
     * @property {TIMER_SESSION_TYPE} type - The type of session, a TIMER_SESSION_TYPE enum (Optional, default = POMODORO)
     * @property {string} task - The title of the task as a string (Optional, default = null)
     */
    constructor() { 
        this.type = TIMER_SESSION_TYPE.POMODORO;
        this.task = null;
    }

    /**
     * withStartTime
     * @desc Set the startTime of the builder
     * @param {Date} startTime - The time the work session started
     * @returns {TimerSessionBuilder} The current builder after the setting
     * @public
     */
    withStartTime(startTime) {
        this.startTime = startTime;
        return this;
    }

    /**
     * withEndTime
     * @desc Set the endTime of the builder
     * @param {Date} startTime - The time the work session ended
     * @returns {TimerSessionBuilder} The current builder after the setting
     * @public
     */
    withEndTime(endTime) {
        this.endTime = endTime;
        return this;
    }

    /**
     * withType
     * @desc Set the type of session, a TIMER_SESSION_TYPE enum
     * @param {TIMER_SESSION_TYPE} type - The type of session, a TIMER_SESSION_TYPE enum
     * @returns {TimerSessionBuilder} The current builder after the setting
     * @public
     */
    withType(type) {
        this.type = type;
        return this;
    }

    /**
     * withTask
     * @desc Set the title of the task as a string
     * @param {string} task - The title of the task as a string
     * @returns {TimerSessionBuilder} The current builder after the setting
     * @public
     */
    withTask(task) {
        this.task = task;
        return this;
    }

    /**
     * build
     * @desc Build the TimerSession with the settings
     * @returns {TimerSession} The TimerSession with the settings
     * @public
     */
    build() {
        return new TimerSession(this);
    }
}