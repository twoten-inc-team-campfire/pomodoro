/**
 * @file The services and methods to save and load data from IndexedDB.
 */

import { Store, get, set, clear, keys } from 'idb-keyval';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { PomodoroSettings } from '../classes/settings/PomodoroSettings';
import { UISettings } from '../classes/settings/UISettings';

let timerSessionStore = new Store('IndexedDB', 'TimerSessionStore');
let pomodoroSettingsStore = new Store('IndexedDB', 'PomodoroSettingsStore');
let uiSettingsStore = new Store('IndexedDB', 'UISettingsStore');

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

    // mapping: timestamp -> {type: [session array]}
    let date = new Date(session.startTime.toDateString());
    let timestamp = date.getTime(); // time in the granularity of date
    return get(timestamp, timerSessionStore)
        .then(dict => {
            dict = dict || {};
            let list = dict[session.type] || [];
            list.push(session);
            dict[session.type] = list;
            return dict;
        })
        .then(dict => {
            return set(timestamp, dict, timerSessionStore);
        })
        .catch(() => {
            throw new Error("Failed to save timer session!");
        });
}

/**
 * loadTimerSessionListByDate
 * @desc Load timer sessions of a specific range of dates.
 * @param {Date} startDate - The start date of the query. Must be in the granularity of date.
 * @param {Date} endDate - The end date of the query. Must be in the granularity of date.
 * @param {Array} [types=[TIMER_SESSION_TYPE.POMODORO, TIMER_SESSION_TYPE.SHORT_REST ,TIMER_SESSION_TYPE.LONG_REST]] - The list of timer session types to query
 * @returns {Promise<TimerSession[]>} Promise fulfilled by the array of the TimerSession.
 *                                    If rejected, it contains an error.
 * @public
 */
function loadTimerSessionListByDate(startDate, endDate,
    types = [TIMER_SESSION_TYPE.POMODORO,
    TIMER_SESSION_TYPE.SHORT_REST,
    TIMER_SESSION_TYPE.LONG_REST]) {
    if (!isValidLoadTimerSessionInput(startDate, endDate, types)) {
        return Promise.reject(new Error('Invalid input for loading timer sessions!'));
    }

    let promises = [];
    let startTime = startDate.getTime(), endTime = endDate.getTime();
    for (var timestamp = startTime;
        timestamp <= endTime;
        timestamp += 1000 * 3600 * 24) {
        promises.push(get(timestamp, timerSessionStore));
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
 * savePomodoroSettings
 * @desc Save the pomodoro settings.
 * @param {string} tag - The tag of the pomodoro settings to be saved
 * @param {PomodoroSettings} settings - The pomodoro settings to be saved
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function savePomodoroSettings(tag, settings) {
    if (!isValidPomodoroSettings(settings)) {
        return Promise.reject(new Error('Invalid input: Not PomodoroSettings!'));
    }
    return set(tag, settings, pomodoroSettingsStore)
        .catch(() => {
            throw new Error("Failed to save pomodoro settings!");
        });
}

/**
 * loadAllPomodoroSettings
 * @desc Load all pomodoro settings 
 * @returns {Promise<object>} Promise fulfilled by the mapping object from tag to the PomodoroSettings.
 *                    If rejected, it contains an error.
 * @public
 */
function loadAllPomodoroSettings() {
    let promises = [];
    let tags = [];
    let pomodoroSettingsDict = {};
    return keys(pomodoroSettingsStore)
        .then(ks => {
            tags = ks;
            for (let k of ks) {
                promises.push(get(k, pomodoroSettingsStore));
            }
            return Promise.all(promises);
        })
        .then(values => {
            for (let i in values) {
                let k = tags[i];
                let v = values[i];
                pomodoroSettingsDict[k] = v;
            }
            return pomodoroSettingsDict;
        })
        .catch(() => {
            throw new Error("Failed to load all pomodoro settings!");
        });

}

/**
 * saveUISettings
 * @desc Save the UI settings.
 * @param {UISettings} settings - The UI settings to be saved
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveUISettings(settings) {
    if (!isValidUISettings(settings)) {
        return Promise.reject(new Error("Invalid input: Not UISettings!"));
    }

    return set("uiSettings", settings, uiSettingsStore)
        .catch(() => {
            throw new Error("Failed to save UI settings!");
        });
}

/**
 * loadUISettings
 * @desc Load the UI settings 
 * @returns {Promise<UISettings>} Promise fulfilled by the saved UI settings.
 *                    If rejected when no previous settings saved, it contains an error.
 * @public
 */
function loadUISettings() {
    let uiSettings;
    return get("uiSettings", uiSettingsStore)
        .then(val => {
            if (val === undefined) {
                throw new Error("No UI settings saved!");
            }
            return val;
        })
        .catch(() => {
            throw new Error("Failed to load UI settings!");
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
            clear(pomodoroSettingsStore),
            clear(uiSettingsStore)
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
 * isValidPomodoroSettings
 * @desc Verify if the input is an instance of PomodoroSettings
 * @param {PomodoroSettings} settings - The pomodoro settings to be verified
 * @returns {boolean} true if it is an instance of PomodoroSettings, otherwise false
 * @private
 */
function isValidPomodoroSettings(settings) {
    return settings instanceof PomodoroSettings;
}

/**
 * isValidUISettings
 * @desc Verify if the input is an instance of UISettings
 * @param {UISettings} settings - The UI settings to be verified
 * @returns {boolean} true if it is an instance of UISettings, otherwise false
 * @private
 */
function isValidUISettings(settings) {
    return settings instanceof UISettings;
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