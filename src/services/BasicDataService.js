/**
 * @file The services and methods to save and load data from IndexedDB.
 */

import { Store, get, set, clear } from 'idb-keyval';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { UserSettings } from '../classes/settings/UserSettings';

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
 * @desc Load ordered timer sessions of a specific range of dates from the given store.
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
            let timerSessions = resList.map(obj => TimerSession.hydrate(obj));
            timerSessions.sort((t1, t2) => t1.startTime - t2.startTime);
            return timerSessions;
        })
        .catch((err) => {
            throw new Error(`Failed to load timer sessions: ${err}`);
        });
}

/**
 * saveUserSettingsWithStore
 * @desc Save the user settings in the given store.
 * @param {UserSettings} settings - The user settings to be saved.
 * @param {Store} store - The store where user settings will be saved.
 * @returns {Promise}  If rejected, it contains an error.
 * @public
 */
function saveUserSettingsWithStore(settings, store) {
    if (!isValidUserSettings(settings)) {
        return Promise.reject(new Error("Invalid input: Not UserSettings!"));
    }
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    return set("userSettings", settings, store)
        .catch(() => {
            throw new Error("Failed to save user settings!");
        });
}

/**
 * loadUserSettingsWithStore
 * @desc Load the user settings from the given store.
 * @param {Store} store - The store where user settings will be loaded.
 * @returns {Promise<UserSettings>} Promise fulfilled by the saved user settings.
 *                    If rejected when no previous settings saved, it contains an error.
 * @public
 */
function loadUserSettingsWithStore(store) {
    if (!isValidStore(store)) {
        return Promise.reject(new Error("Invalid input: Not Store!"));
    }

    return get("userSettings", store)
        .then(val => {
            if (val === undefined) {
                throw new Error("No user settings saved!");
            }
            return val;
        })
        .catch(() => {
            throw new Error("Failed to load user settings!");
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
 * isValidUserSettings
 * @desc Verify if the input is an instance of UserSettings
 * @param {UserSettings} settings - The user settings to be verified
 * @returns {boolean} true if it is an instance of UserSettings, otherwise false
 * @private
 */
function isValidUserSettings(settings) {
    return settings instanceof UserSettings;
}

export {
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    saveUserSettingsWithStore,
    loadUserSettingsWithStore,
    clearHistoryWithStore,
}