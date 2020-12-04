import { Store } from 'idb-keyval';
import {
    saveTimerSession,
    loadTimerSessionListByDate,
    savePomodoroSettings,
    loadAllPomodoroSettings,
    saveUISettings,
    loadUISettings,
    clearAllHistory,
} from './DefaultDataService';
import {
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    savePomodoroSettingsWithStore,
    loadAllPomodoroSettingsWithStore,
    saveUISettingsWithStore,
    loadUISettingsWithStore,
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

describe("savePomodoroSettings()", () => {
    test('should call savePomodoroSettingsWithStore() with a Store object in the inputs', () => {
        savePomodoroSettingsWithStore.mockResolvedValue(true);

        return savePomodoroSettings()
            .then(val => {
                expect(val).toBe(true);
                for (let call of savePomodoroSettingsWithStore.mock.calls) {
                    expect(call[2]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("loadAllPomodoroSettings()", () => {
    test('should call loadAllPomodoroSettingsWithStore() with a Store object in the inputs', () => {
        loadAllPomodoroSettingsWithStore.mockResolvedValue(true);

        return loadAllPomodoroSettings()
            .then(val => {
                expect(val).toBe(true);
                for (let call of loadAllPomodoroSettingsWithStore.mock.calls) {
                    expect(call[0]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("saveUISettings()", () => {
    test('should call saveUISettingsWithStore() with a Store object in the inputs', () => {
        saveUISettingsWithStore.mockResolvedValue(true);

        return saveUISettings()
            .then(val => {
                expect(val).toBe(true);
                for (let call of saveUISettingsWithStore.mock.calls) {
                    expect(call[1]).toBeInstanceOf(Store);
                }
            });
    });
});

describe("loadUISettings()", () => {
    test('should call loadUISettingsWithStore() with a Store object in the inputs', () => {
        loadUISettingsWithStore.mockResolvedValue(true);

        return loadUISettings()
            .then(val => {
                expect(val).toBe(true);
                for (let call of loadUISettingsWithStore.mock.calls) {
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
                expect(vals).toEqual([true, true, true]);
                for (let call of clearHistoryWithStore.mock.calls) {
                    expect(call[0]).toBeInstanceOf(Store);
                }
            });
    });
});
