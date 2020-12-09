import { Store } from 'idb-keyval';
import {
    saveTimerSession,
    loadTimerSessionListByDate,
    saveUserSettings,
    loadUserSettings,
    clearAllHistory,
} from './DefaultDataService';
import {
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
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
            });
    });
});
