<<<<<<< HEAD
import { Store } from 'idb-keyval';
import {
    saveTimerSession,
    loadTimerSessionListByDate,
    saveUserSettings,
    loadUserSettings,
=======
import {
    saveTimerSession,
    loadTimerSessionListByDate,
    savePomodoroSettings,
    loadAllPomodoroSettings,
    saveUISettings,
    loadUISettings,
>>>>>>> add basic services (can be used for integration tests) and default services
    clearAllHistory,
} from './DefaultDataService';
import {
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
<<<<<<< HEAD
    saveUserSettingsWithStore,
    loadUserSettingsWithStore,
    clearHistoryWithStore,
} from './BasicDataService';

jest.mock('./BasicDataService');
jest.mock('idb-keyval');

describe("saveTimerSession()", () => {
    test('should call saveTimerSessionWithStore() with a Store object in the inputs', () => {
        saveTimerSessionWithStore.mockResolvedValue(true);

        return saveTimerSession()
            .then(val => {
                expect(val).toBe(true);
                for (let call of saveTimerSessionWithStore.mock.calls) {
                    expect(call[1]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("loadTimerSessionListByDate()", () => {
    test('should call loadTimerSessionListByDateWithStore() with a Store object in the inputs', () => {
        loadTimerSessionListByDateWithStore.mockResolvedValue(true);

        return loadTimerSessionListByDate()
            .then(val => {
                expect(val).toBe(true);
                for (let call of loadTimerSessionListByDateWithStore.mock.calls) {
                    expect(call[2]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("saveUserSettings()", () => {
    test('should call saveUserSettingsWithStore() with a Store object in the inputs', () => {
        saveUserSettingsWithStore.mockResolvedValue(true);

        return saveUserSettings()
            .then(val => {
                expect(val).toBe(true);
                for (let call of saveUserSettingsWithStore.mock.calls) {
                    expect(call[1]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("loadUserSettings()", () => {
    test('should call loadUserSettingsWithStore() with a Store object in the inputs', () => {
        loadUserSettingsWithStore.mockResolvedValue(true);

        return loadUserSettings()
            .then(val => {
                expect(val).toBe(true);
                for (let call of loadUserSettingsWithStore.mock.calls) {
                    expect(call[0]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("clearAllHistory()", () => {
    test('should call clearHistoryWithStore() with all inputs as Store objects', () => {
        clearHistoryWithStore.mockResolvedValue(true);

        return clearAllHistory()
            .then(vals => {
                expect(vals).toEqual([true, true]);
                for (let call of clearHistoryWithStore.mock.calls) {
                    expect(call[0]).toBeInstanceOf(Store);
                }
=======
    savePomodoroSettingsWithStore,
    loadAllPomodoroSettingsWithStore,
    saveUISettingsWithStore,
    loadUISettingsWithStore,
    clearHistoryWithStore,
}from './BasicDataService';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { PomodoroSettings } from '../classes/settings/PomodoroSettings';
import { UISettings } from '../classes/settings/UISettings';

jest.mock('./DataService');

describe("clear history", () => {
    
    describe("clearAllHistory()", () => {
        test('should clear all storage of timer sessions, ' +
            'pomodoro settings and UI settings', () => {
                return clearAllHistory()
                .then(() => {
                    console.log(clearHistoryWithStore.mock.calls);
                    expect(clearHistoryWithStore.mock.calls);
                });
                // return expect()
                //     .resolves
                //     .toEqual([true, true, true]);
                // clearAllHistory(() => )

>>>>>>> add basic services (can be used for integration tests) and default services
            });
    });
});
