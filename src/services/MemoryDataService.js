import TIMER_SESSION_TYPE from '../classes/TimerSession'
import { DataServiceInterface } from './DataServiceInterface'
/**
 * MemoryDataService
 * @desc The services and methods to simply save data to and retrieve data from memory.
 */
export class MemoryDataService extends DataServiceInterface {

    /**
     * Create a MemoryDataService.
     * @constructs
     */
    constructor() {
        super();

        /** @member {Object} 
         * @desc The mapping from date to a list of timer sessions of that date */
        this.timerSessionsDict = {};
        /** @member {Object} MemoryDataService#pomodoroSettingsDict
         * @desc The mapping from the tag to PomodoroSettings */
        this.pomodoroSettingsDict = {};
        /** @member {UISettings} MemoryDataService#uiSettings
         * @desc The UISettings */
        this.uiSettings = undefined;
    }

    /**
     * saveTimerSession
     * @desc Save the timer session.
     * @param {TimerSession} session - The session to be saved
     * @public
     */
    saveTimerSession(session) {
        var date = new Date(session.startTime.toDateString());
        var timestamp = date.getTime(); // time in the granularity of date
        var sessionList = this.timerSessionsDict[timestamp] || [];
        sessionList.push(session);
        this.timerSessionsDict[timestamp] = sessionList;
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
        var typeSet = new Set(type);
        var retList = []
        var startTime = startDate.getTime(), endTime = endDate.getTime();
        for (var timestamp = startTime;
            timestamp <= endTime;
            timestamp += 1000 * 3600 * 24) {

            var sessionList = this.timerSessionsDict[timestamp] || [];
            for (var session of sessionList) {
                if (typeSet.has(session.type)) {
                    retList.push(session);
                }
            }
        }
        return retList;
    }

    /**
     * savePomodoroSettings
     * @desc Save the pomodoro settings.
     * @param {string} tag - The tag of the pomodoro settings to be saved
     * @param {PomodoroSettings} settings - The pomodoro settings to be saved
     * @public
     */
    savePomodoroSettings(tag, settings) {
        this.pomodoroSettingsDict[tag] = settings;
    }

    /**
     * loadAllPomodoroSettings
     * @desc Load all pomodoro settings 
     * @returns {Object} The mapping from tag to the PomodoroSettings
     * @public
     */
    loadAllPomodoroSettings() {
        return this.pomodoroSettingsDict;
    }

    /**
     * saveUISettings
     * @desc Save the UI settings.
     * @param {UISettings} settings - The UI settings to be saved
     * @public
     */
    saveUISettings(settings) {
        this.uiSettings = settings;
    }

    /**
     * loadUISettings
     * @desc Load the UI settings 
     * @returns {UISettings} The saved UI settings
     * @public
     */
    loadUISettings() {
        if (this.uiSettings == undefined) {
            throw new Error("No UI settings saved!");
        }
        return this.uiSettings;
    }
}