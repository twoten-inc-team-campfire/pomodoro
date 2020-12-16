import { Store } from 'idb-keyval';
import { 
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    saveUserSettingsWithStore,
    loadUserSettingsWithStore,
    clearHistoryWithStore,
 } from './BasicDataService';
import { TIMER_SESSION_TYPE } from '../classes/TimerSession';

let timerSessionStore = new Store('IndexedDB', 'TimerSessionStore');
let userSettingsStore = new Store('IndexedDB2', 'UserSettingsStore');

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
 * saveUserSettings
 * @desc Save the user settings in the default userSettingsStore.
 * @param {UserSettings} settings - The user settings to be saved.
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveUserSettings(settings) {
    return (saveUserSettingsWithStore(settings, userSettingsStore)
        .catch((error) => {
            throw new Error("Failed to save user settings!");
        })
    )
}

/**
 * loadUserSettings
 * @desc Load the user settings from the default userSettingsStore.
 * @returns {Promise<UserSettings>} Promise fulfilled by the saved user settings.
 *                    If rejected when no previous settings saved, it contains an error.
 * @public
 */
function loadUserSettings() {
    return loadUserSettingsWithStore(userSettingsStore);
}

/**
 * clearAllHistory
 * @desc Clear all timer sessions and user settings in database.
 * @returns {Promise} If rejected, it contains an error.
 * @public
 */
function clearAllHistory() {
    return Promise.all(
        [
            clearHistoryWithStore(timerSessionStore),
            clearHistoryWithStore(userSettingsStore)
        ]);
}

export {
    saveTimerSession,
    loadTimerSessionListByDate,
    saveUserSettings,
    loadUserSettings,
    clearAllHistory,
}