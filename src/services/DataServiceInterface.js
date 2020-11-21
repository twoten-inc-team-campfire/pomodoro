import TIMER_SESSION_TYPE from '../classes/TimerSession'
/**
 * @interface DataServiceInterface
 * @desc Interface for the services and methods to persist (save/load) data.
 */
export class DataServiceInterface {

    /**
     * saveTimerSession
     * @desc Save the timer session.
     * @param {TimerSession} session - The session to be saved
     * @public
     */
    saveTimerSession(session) {
        throw new Error("Method not implemented");
    }

    /**
     * loadTimerSessionListByDate
     * @desc Load timer sessions of a specific range of dates.
     * @param {Date} startDate - The start date of the query. Must be in the granularity of date.
     * @param {Date} endDate - The end date of the query. Must be in the granularity of date.
     * @param {Array} type - The list of timer session types to query
     * @returns {Array} The list of the TimerSession
     * @public
     */
    loadTimerSessionListByDate(startDate, endDate, type) {
        throw new Error("Method not implemented");
    }

    /**
     * savePomodoroSettings
     * @desc Save the pomodoro settings.
     * @param {string} tag - The tag of the pomodoro settings to be saved
     * @param {PomodoroSettings} settings - The pomodoro settings to be saved
     * @public
     */
    savePomodoroSettings(tag, settings) {
        throw new Error("Method not implemented");
    }

    /**
     * loadAllPomodoroSettings
     * @desc Load all pomodoro settings 
     * @returns {Object} The mapping from tag to the PomodoroSettings
     * @public
     */
    loadAllPomodoroSettings() {
        throw new Error("Method not implemented");
    }

    /**
     * saveUISettings
     * @desc Save the UI settings.
     * @param {UISettings} settings - The UI settings to be saved
     * @public
     */
    saveUISettings(settings) {
        throw new Error("Method not implemented");
    }

    /**
     * loadUISettings
     * @desc Load the UI settings 
     * @returns {UISettings} The saved UI settings
     * @public
     */
    loadUISettings() {
        throw new Error("Method not implemented");
    }
}