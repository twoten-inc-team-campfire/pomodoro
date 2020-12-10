/**
 * @file The services and methods to save and load data from IndexedDB.
 */

import { Store, get, set, clear, keys } from 'idb-keyval';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { UserSettings } from '../classes/settings/UserSettings';


let timerSessionStore = new Store('IndexedDB', 'TimerSessionStore');
let userSettingsStore = new Store('IndexedDB', 'UserSettingsStore');

/**
 * saveTimerSession
 * @desc Save the timer session.
 * @param {TimerSession} session - The session to be saved
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveTimerSession(session) {
    if (!isValidTimerSession(session)) {
        return Promise.reject(new Error('Invalid input: Not TimerSession!'));
    }

    // mapping: date string -> {type: [session array]}
    let dateString = session.startTime.toDateString();
    return get(dateString, timerSessionStore)
        .then(dict => {
            dict = dict || {};
            let list = dict[session.type] || [];
            list.push(session);
            dict[session.type] = list;
            return dict;
        })
        .then(dict => {
            return set(dateString, dict, timerSessionStore);
        })
        .catch(() => {
            throw new Error("Failed to save timer session!");
        });
}

/**
 * loadTimerSessionListByDate
 * @desc Load timer sessions of a specific range of dates.
 * @param {Date} startDate - The start date of the query.
 * @param {Date} endDate - The end date of the query.
 * @param {Array} [types=[TIMER_SESSION_TYPE.POMODORO, TIMER_SESSION_TYPE.SHORT_REST ,TIMER_SESSION_TYPE.LONG_REST]] - The list of timer session types to query
 * @returns {Promise<TimerSession[]>} Promise fulfilled by the array of the TimerSession.
 *                                    If rejected, it contains an error.
 * @public
 */
function loadTimerSessionListByDate(startDate, endDate, types = Object.values(TIMER_SESSION_TYPE)) {
    if (!isValidLoadTimerSessionInput(startDate, endDate, types)) {
        return Promise.reject(new Error('Invalid input for loading timer sessions!'));
    }

    let promises = [];
    for (let currDate = new Date(startDate);
        currDate <= endDate;
        currDate.setDate(currDate.getDate() + 1)) {
        let dateString = currDate.toDateString();
        promises.push(get(dateString, timerSessionStore));
    }

    let resList = [];
    return Promise.all(promises)
        .then(dicts => {
            for (let dict of dicts) {
                if (dict === undefined) continue;
                for (let t of types) {
                    let list = dict[t] || [];
                    resList.push(...list);
                }
            }
            return resList;
        })
        .catch(() => {
            throw new Error("Failed to load timer sessions!");
        });
}

/**
 * saveUserSettings
 * @desc Save the instance of UserSettings to the database.
 * @param {UserSettings} settings - The User settings to be saved
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveUserSettings(settings) {
    if (!isValidUserSettings(settings)) {
        return Promise.reject(new Error("Invalid input: Invalid instance of UserSettings"));
    }

    return set("userSettings", settings, userSettingsStore)
        .catch(() => {
            throw new Error("Failed to save User settings!");
        });
}

/**
 * loadUserSettings
 * @desc Load the User settings from the database
 * @returns {Promise<UserSettings>} Promise fulfilled by the loaded User settings.
 *                    If rejected when no previous settings saved, it contains an error.
 * @public
 */
function loadUserSettings() {
    return get("userSettings", userSettingsStore)
        .then(val => {
            if (val === undefined) {
                throw new Error("No User settings saved!");
            }
            return val;
        })
        .catch(() => {
            throw new Error("Failed to load User settings!");
        });
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
            clear(timerSessionStore),
            clear(userSettingsStore)
        ])
        .catch(() => {
            throw new Error("Failed to clear history!");
        });
}


/**
 * isValidTimerSession
 * @desc Verify if the input is an instance of TimerSession
 * @param {TimerSession} session - The timer session to be verified
 * @returns {boolean} true if it is an instance of TimerSession, otherwise false
 * @private
 */
function isValidTimerSession(session) {
    return session instanceof TimerSession;
}

/**
 * isValidLoadTimerSessionInput
 * @desc Verify if the inputs are valid for loading the query
 * @param {Date} startDate - The start date of the query. Must be in the granularity of date.
 * @param {Date} endDate - The end date of the query. Must be in the granularity of date.
 * @param {Array} types - The list of timer session types to query
 * @returns {boolean} true the inputs are valid for loading the query, otherwise false
 * @private
 */
function isValidLoadTimerSessionInput(startDate, endDate, types) {
    if (!(types instanceof Array)) {
        return false;
    }
    for (let t of types) {
        if (!Object.values(TIMER_SESSION_TYPE).includes(t)) {
            return false;
        }
    }
    return startDate instanceof Date && endDate instanceof Date;
}

/**
 * isValidUserSettings
 * @desc Verify if the input is an instance of UserSettings
 * @param {UserSettings} settings - The User settings to be verified
 * @returns {boolean} true if it is an instance of UISettings, otherwise false
 * @private
 */
function isValidUserSettings(settings) {
    return settings instanceof UserSettings;
}

export {
    saveTimerSession,
    loadTimerSessionListByDate,
    saveUserSettings,
    loadUserSettings,
    clearAllHistory,
}