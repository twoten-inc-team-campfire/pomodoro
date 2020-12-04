import { Store } from 'idb-keyval';
import { 
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    savePomodoroSettingsWithStore,
    loadAllPomodoroSettingsWithStore,
    saveUISettingsWithStore,
    loadUISettingsWithStore,
    clearHistoryWithStore,
 } from './BasicDataService';
import { TIMER_SESSION_TYPE } from '../classes/TimerSession';

let timerSessionStore = new Store('IndexedDB', 'TimerSessionStore');
let pomodoroSettingsStore = new Store('IndexedDB', 'PomodoroSettingsStore');
let uiSettingsStore = new Store('IndexedDB', 'UISettingsStore');

/**
 * saveTimerSession
 * @desc Save the timer session in default timerSessionStore.
 * @param {TimerSession} session - The session to be saved
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveTimerSession(session) {
    return saveTimerSessionWithStore(session, timerSessionStore);
}

/**
 * loadTimerSessionListByDate
 * @desc Load timer sessions of a specific range of dates from the default timerSessionStore.
 * @param {Date} startDate - The start date of the query.
 * @param {Date} endDate - The end date of the query.
 * @param {Array} [types=[TIMER_SESSION_TYPE.POMODORO, TIMER_SESSION_TYPE.SHORT_REST ,TIMER_SESSION_TYPE.LONG_REST]] - The list of timer session types to query
 * @returns {Promise<TimerSession[]>} Promise fulfilled by the array of the TimerSession.
 *                                    If rejected, it contains an error.
 * @public
 */
function loadTimerSessionListByDate(startDate, endDate, types = Object.values(TIMER_SESSION_TYPE)) {
    return loadTimerSessionListByDateWithStore(startDate, endDate, timerSessionStore, types);
}

/**
 * savePomodoroSettings
 * @desc Save the pomodoro settings in the default pomodoroSettingsStore.
 * @param {string} tag - The tag of the pomodoro settings to be saved
 * @param {PomodoroSettings} settings - The pomodoro settings to be saved
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function savePomodoroSettings(tag, settings) {
    return savePomodoroSettingsWithStore(tag, settings, pomodoroSettingsStore);
}

/**
 * loadAllPomodoroSettings
 * @desc Load all pomodoro settings from the default pomodoroSettingsStore.
 * @returns {Promise<object>} Promise fulfilled by the mapping object from tag to the PomodoroSettings.
 *                    If rejected, it contains an error.
 * @public
 */
function loadAllPomodoroSettings() {
    return loadAllPomodoroSettingsWithStore(pomodoroSettingsStore);
}

/**
 * saveUISettings
 * @desc Save the UI settings in the default uiSettingsStore.
 * @param {UISettings} settings - The UI settings to be saved.
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveUISettings(settings) {
    return saveUISettingsWithStore(settings, uiSettingsStore);
}

/**
 * loadUISettings
 * @desc Load the UI settings from the default uiSettingsStore.
 * @returns {Promise<UISettings>} Promise fulfilled by the saved UI settings.
 *                    If rejected when no previous settings saved, it contains an error.
 * @public
 */
function loadUISettings() {
    return loadUISettingsWithStore(uiSettingsStore);
}

/**
 * clearAllHistory
 * @desc Clear all timer sessions, Pomodoro settings, and UI settings in database.
 * @returns {Promise} If rejected, it contains an error.
 * @public
 */
function clearAllHistory() {
    return Promise.all(
        [
            clearHistoryWithStore(timerSessionStore),
            clearHistoryWithStore(pomodoroSettingsStore),
            clearHistoryWithStore(uiSettingsStore)
        ]);
}

export {
    saveTimerSession,
    loadTimerSessionListByDate,
    savePomodoroSettings,
    loadAllPomodoroSettings,
    saveUISettings,
    loadUISettings,
    clearAllHistory,
}