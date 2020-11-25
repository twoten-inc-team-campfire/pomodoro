/**
 * @file The services and methods to save and load data from database IndexedDB.
 */

import { Store, get, set, clear, keys } from 'idb-keyval';

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
    let date = new Date(session.startTime.toDateString());
    let timestamp = date.getTime(); // time in the granularity of date
    return get(timestamp, timerSessionStore)
        .then(dict => {
            dict = dict || {};
            list = dict[session.type] || [];
            list.push(session);
            dict[session.type] = list;
            return dict;
        })
        .then(dict => {
            set(timestamp, dict, timerSessionStore);
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
 * @param {Array} types - The list of timer session types to query
 * @returns {Promise<TimerSession[]>} Promise fulfilled by the array of the TimerSession.
 *                                    If rejected, it contains an error.
 * @public
 */
function loadTimerSessionListByDate(startDate, endDate, types) {
    let promises = [];
    let startTime = startDate.getTime(), endTime = endDate.getTime();
    for (var timestamp = startTime;
        timestamp <= endTime;
        timestamp += 1000 * 3600 * 24) {
        promises.add(get(timestamp, timerSessionStore));
    }

    let resList = [];
    return Promise.all(promises)
        .then(dicts => {
            for (let dict of dicts) {
                if (dict === undefined) continue;
                for (let t of types) {
                    list = dict[t] || [];
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
    keys(pomodoroSettingsStore)
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
            if (uiSettings === undefined) {
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
        [clear(timerSessionStore),
        clear(pomodoroSettingsStore),
        clear(uiSettingsStore)])
        .catch(() => {
            throw new Error("Failed to clear history!");
        });
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