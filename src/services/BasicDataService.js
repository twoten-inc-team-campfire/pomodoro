/**
 * @file The services and methods to save and load data from IndexedDB.
 */

import { Store, get, set, clear, keys } from 'idb-keyval';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { PomodoroSettings } from '../classes/settings/PomodoroSettings';
import { UISettings } from '../classes/settings/UISettings';

/**
 * saveTimerSessionWithStore
 * @desc Save the timer session in the give store.
 * @param {TimerSession} session - The session to be saved
 * @param {Store} store - The store where the session will be saved.
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveTimerSessionWithStore(session, store) {
    if (!isValidTimerSession(session)) {
        return Promise.reject(new Error('Invalid input: Not TimerSession!'));
    }
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    // mapping: date string -> {type: [session array]}
    let dateString = session.startTime.toDateString();
    return get(dateString, store)
        .then(dict => {
            dict = dict || {};
            let list = dict[session.type] || [];
            list.push(session);
            dict[session.type] = list;
            return dict;
        })
        .then(dict => {
            return set(dateString, dict, store);
        })
        .catch(() => {
            throw new Error("Failed to save timer session!");
        });
}

/**
 * loadTimerSessionListByDateWithStore
 * @desc Load timer sessions of a specific range of dates from the given store.
 * @param {Date} startDate - The start date of the query.
 * @param {Date} endDate - The end date of the query.
 * @param {Store} store - The store where timer sessions will be loaded. 
 * @param {Array} [types=[TIMER_SESSION_TYPE.POMODORO, TIMER_SESSION_TYPE.SHORT_REST ,TIMER_SESSION_TYPE.LONG_REST]] - The list of timer session types to query
 * @returns {Promise<TimerSession[]>} Promise fulfilled by the array of the TimerSession.
 *                                    If rejected, it contains an error.
 * @public
 */
function loadTimerSessionListByDateWithStore(startDate, endDate, store,
    types = Object.values(TIMER_SESSION_TYPE)) {
    if (!isValidLoadTimerSessionInput(startDate, endDate, store, types)) {
        return Promise.reject(new Error('Invalid input for loading timer sessions!'));
    }

    let promises = [];
    for (let currDate = new Date(startDate);
        currDate <= endDate;
        currDate.setDate(currDate.getDate() + 1)) {
        let dateString = currDate.toDateString();
        promises.push(get(dateString, store));
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
 * savePomodoroSettingsWithStore
 * @desc Save the pomodoro settings in the given store.
 * @param {string} tag - The tag of the pomodoro settings to be saved
 * @param {PomodoroSettings} settings - The pomodoro settings to be saved
 * @param {Store} store - The store where pomodoro settings will be saved.
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function savePomodoroSettingsWithStore(tag, settings, store) {
    if (!isValidPomodoroSettings(settings)) {
        return Promise.reject(new Error('Invalid input: Not PomodoroSettings!'));
    } if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    return set(tag, settings, store)
        .catch(() => {
            throw new Error("Failed to save pomodoro settings!");
        });
}

/**
 * loadAllPomodoroSettingsWithStore
 * @desc Load all pomodoro settings from the given store
 * @param {Store} store - The store where pomodoro settings will be loaded.
 * @returns {Promise<object>} Promise fulfilled by the mapping object from tag to the PomodoroSettings.
 *                    If rejected, it contains an error.
 * @public
 */
function loadAllPomodoroSettingsWithStore(store) {
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    let promises = [];
    let tags = [];
    let pomodoroSettingsDict = {};
    return keys(store)
        .then(ks => {
            tags = ks;
            for (let k of ks) {
                promises.push(get(k, store));
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
 * saveUISettingsWithStore
 * @desc Save the UI settings in the given store.
 * @param {UISettings} settings - The UI settings to be saved.
 * @param {Store} store - The store where UI settings will be saved.
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveUISettingsWithStore(settings, store) {
    if (!isValidUISettings(settings)) {
        return Promise.reject(new Error("Invalid input: Not UISettings!"));
    }
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    return set("uiSettings", settings, store)
        .catch(() => {
            throw new Error("Failed to save UI settings!");
        });
}

/**
 * loadUISettingsWithStore
 * @desc Load the UI settings from the given store.
 * @param {Store} store - The store where UI settings will be loaded.
 * @returns {Promise<UISettings>} Promise fulfilled by the saved UI settings.
 *                    If rejected when no previous settings saved, it contains an error.
 * @public
 */
function loadUISettingsWithStore(store) {
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    return get("uiSettings", store)
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
 * clearAllHistoryWithStore
 * @desc Clear data in the given object store in database IndexedDB.
 * @param {Store} store - The store where history will be cleared
 * @returns {Promise} If rejected, it contains an error.
 * @public
 */
function clearHistoryWithStore(store) {
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }
    return clear(store)
        .catch(() => {
            throw new Error("Failed to clear history!");
        });
}

/**
 * isValidStore
 * @desc Verify if the input is an instance of Store
 * @param {Store} store - The store to be verified
 * @returns {boolean} true if it is an instance of Store, otherwise false
 * @private
 */
function isValidStore(store) {
    return store instanceof Store;
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
 * @param {Date} startDate - The start date of the query.
 * @param {Date} endDate - The end date of the query.
 * @param {Store} store - The store to be verified
 * @param {Array} types - The list of timer session types to query
 * @returns {boolean} true the inputs are valid for loading the query, otherwise false
 * @private
 */
function isValidLoadTimerSessionInput(startDate, endDate, store, types) {
    if (!(types instanceof Array)) {
        return false;
    }
    for (let t of types) {
        if (!Object.values(TIMER_SESSION_TYPE).includes(t)) {
            return false;
        }
    }
    return startDate instanceof Date && endDate instanceof Date && store instanceof Store;
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
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    savePomodoroSettingsWithStore,
    loadAllPomodoroSettingsWithStore,
    saveUISettingsWithStore,
    loadUISettingsWithStore,
    clearHistoryWithStore,
}