import { Store, get, set, clear, keys } from 'idb-keyval';
import {
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    savePomodoroSettingsWithStore,
    loadAllPomodoroSettingsWithStore,
    saveUISettingsWithStore,
    loadUISettingsWithStore,
    clearHistoryWithStore,
} from './BasicDataService';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { PomodoroSettings } from '../classes/settings/PomodoroSettings';
import { UISettings } from '../classes/settings/UISettings';

jest.mock('idb-keyval');
let testStore = new Store('test-db', 'test-store');

describe("saveTimerSessionWithStore()", () => {
    test('should save the TimerSession object when given a valid session', () => {
        // expected store construction
        let date1 = new Date('2020-2-27 10:51:05'), date2 = new Date('2020-3-2 9:01:05');
        let dateString1 = date1.toDateString(), dateString2 = date2.toDateString();
        let session1 = new TimerSession(date1, date1, TIMER_SESSION_TYPE.POMODORO),
            session2 = new TimerSession(date1, date1, TIMER_SESSION_TYPE.SHORT_REST),
            session3 = new TimerSession(date2, date2, TIMER_SESSION_TYPE.LONG_REST);

        let expectedStore = {};
        expectedStore[dateString1] = {
            [TIMER_SESSION_TYPE.POMODORO]: [session1],
            [TIMER_SESSION_TYPE.SHORT_REST]: [session2],
        };
        expectedStore[dateString2] = {
            [TIMER_SESSION_TYPE.LONG_REST]: [session3],
        };

        let actualStore = {};
        get.mockImplementation(str => Promise.resolve(actualStore[str]));
        set.mockImplementation((str, dict) => {
            actualStore[str] = dict;
            return Promise.resolve(actualStore);
        });

        return saveTimerSessionWithStore(session1, testStore)
            .then(() => saveTimerSessionWithStore(session2, testStore))
            .then(() => saveTimerSessionWithStore(session3, testStore))
            .then(store => expect(store).toEqual(expectedStore));
    });

    test('should throw an error if input is not an instance of TimerSession', () => {
        let session = 'TimerSession';
        return expect(saveTimerSessionWithStore(session, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        let date = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(date, date);
        get.mockRejectedValue(new Error());

        return expect(saveTimerSessionWithStore(session, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let date = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(date, date);
        get.mockResolvedValue({});
        set.mockRejectedValue(new Error());

        return expect(saveTimerSessionWithStore(session, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        let date = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(date, date);

        return expect(saveTimerSessionWithStore(session, 'testStore'))
            .rejects
            .toThrow();
    });
});

describe("loadTimerSessionListByDateWithStore()", () => {
    test('should load an empty result list when the input is valid but results don\'t exist', () => {
        let date = new Date('2020-2-27 10:51:05');
        let expectedStore = {};
        get.mockImplementation(str => Promise.resolve(expectedStore[str]));

        return expect(loadTimerSessionListByDateWithStore(date, date, testStore))
            .resolves
            .toEqual([]);
    });

    test('should load a result list according to the valid query input', () => {
        // expected store construction
        let date1 = new Date('2020-2-27 10:51:05'),
            date2 = new Date('2020-2-29 10:51:05'),
            date3 = new Date('2020-3-1 10:51:05'),
            date4 = new Date('2020-3-2 9:01:05');
        let dateString1 = date1.toDateString(),
            dateString2 = date2.toDateString(),
            dateString3 = date3.toDateString();
        let session1 = new TimerSession(date1, date1, TIMER_SESSION_TYPE.POMODORO),
            session2 = new TimerSession(date2, date2, TIMER_SESSION_TYPE.SHORT_REST),
            session3 = new TimerSession(date3, date3, TIMER_SESSION_TYPE.LONG_REST);

        let store = {};
        store[dateString1] = {
            [TIMER_SESSION_TYPE.POMODORO]: [session1],
            [TIMER_SESSION_TYPE.SHORT_REST]: [session2],
        };
        store[dateString2] = {
            [TIMER_SESSION_TYPE.LONG_REST]: [session3],
        };
        store[dateString3] = {
            [TIMER_SESSION_TYPE.LONG_REST]: [session1],
        };

        get.mockImplementation(str => Promise.resolve(store[str]));
        let expectedList = [session1, session3, session1];

        return expect(loadTimerSessionListByDateWithStore(
            date1,
            date4,
            testStore,
            [
                TIMER_SESSION_TYPE.POMODORO,
                TIMER_SESSION_TYPE.LONG_REST
            ]))
            .resolves
            .toEqual(expectedList);
    });

    test('should throw an error if input time is not an instance of Date', () => {
        let date = '2020-1-1';
        return expect(loadTimerSessionListByDateWithStore(date, date, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if input types is not an Array', () => {
        let date = new Date('2020-1-1');

        return expect(loadTimerSessionListByDateWithStore(date, date, testStore, 1))
            .rejects
            .toThrow();
    });

    test('should throw an error if input types are not TIMER_SESSION_TYPE', () => {
        let date = new Date('2020-1-1');

        return expect(loadTimerSessionListByDateWithStore(date, date, testStore, [4, 5]))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        let dateDate = new Date('2020-1-1');
        get.mockRejectedValue(new Error());

        return expect(loadTimerSessionListByDateWithStore(dateDate, dateDate, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        let dateDate = new Date('2020-1-1');

        return expect(loadTimerSessionListByDateWithStore(dateDate, dateDate, 'testStore'))
            .rejects
            .toThrow();
    });
});

describe("savePomodoroSettingsWithStore()", () => {
    test('should save the PomodoroSettings object when given the valid settings', () => {
        let expectedStore = {
            'settings1': new PomodoroSettings(1500000),
            'settings2': new PomodoroSettings(3000000),
        }
        let actualStore = {};
        set.mockImplementation((k, v) => {
            actualStore[k] = v;
            return Promise.resolve(actualStore);
        });

        return savePomodoroSettingsWithStore('settings1', expectedStore['settings1'], testStore)
            .then(s => savePomodoroSettingsWithStore('settings2', expectedStore['settings2'], testStore))
            .then(s => expect(s).toEqual(expectedStore))
    });

    test('should throw an error if the input is invalid (not PomodoroSettings)', () => {
        let settings = {
            pomodoroLength: 1500000, // 25 * 60 * 1000
            shortBreakLength: 300000, // 5 * 60 * 1000
            longBreakLength: 900000, // 15 * 60 * 1000
            numPomodorosInCycle: 4,
            autoStartBreaks: false,
            autoStartPomodoros: false
        };
        return expect(savePomodoroSettingsWithStore(settings, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let settings = new PomodoroSettings();
        set.mockRejectedValue(new Error());

        return expect(savePomodoroSettingsWithStore('settings', settings, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        let settings = new PomodoroSettings();

        return expect(savePomodoroSettingsWithStore(settings, settings, 'testStore'))
            .rejects
            .toThrow();
    });
});

describe("loadAllPomodoroSettingsWithStore()", () => {
    test('should load all PomodoroSettings', () => {
        let store = {
            'settings1': new PomodoroSettings(1500000),
            'settings2': new PomodoroSettings(3000000),
        }
        keys.mockResolvedValue(Object.keys(store));
        get.mockResolvedValueOnce(store['settings1'])
            .mockResolvedValueOnce(store['settings2']);

        return expect(loadAllPomodoroSettingsWithStore(testStore))
            .resolves
            .toEqual(store);
    });

    test('should throw an error if idb keys() has error', () => {
        keys.mockRejectedValue(new Error());

        return expect(loadAllPomodoroSettingsWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        keys.mockResolvedValue([1, 2, 3]);
        get.mockRejectedValue(new Error());

        return expect(loadAllPomodoroSettingsWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        return expect(loadAllPomodoroSettingsWithStore('testStore'))
            .rejects
            .toThrow();
    });
});

describe("saveUISettingsWithStore()", () => {
    test('should save the UISettings object when given the valid settings', () => {
        let settings = new UISettings();
        let dict = { "uiSettings": settings };
        set.mockImplementation((k = "uiSettings", v) => {
            let item = {};
            item[k] = v;
            return Promise.resolve(item);
        });

        return expect(saveUISettingsWithStore(settings, testStore))
            .resolves
            .toEqual(dict);

    });

    test('should throw an error if the input is invalid (not UISettings)', () => {
        let settings = {
            displayPauseButton: true,
            displayCancelButton: true,
            displayFastForwardButton: true,
            displayTaskSelector: true
        };
        return expect(saveUISettingsWithStore(settings, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let settings = new UISettings();
        set.mockRejectedValue(new Error());

        return expect(saveUISettingsWithStore(settings, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        let settings = new UISettings();

        return expect(saveUISettingsWithStore(settings, 'testStore'))
            .rejects
            .toThrow();
    });
});

describe("loadUISettingsWithStore()", () => {
    test('should load the saved UISettings if there is one saved', () => {
        let uiSettings = new UISettings();
        get.mockResolvedValue(uiSettings);

        return expect(loadUISettingsWithStore(testStore))
            .resolves
            .toEqual(uiSettings);
    });

    test('should throw an error if no previously saved settings', () => {
        get.mockResolvedValue(undefined);

        return expect(loadUISettingsWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        get.mockRejectedValue(new Error());

        return expect(loadUISettingsWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        return expect(loadUISettingsWithStore('testStore'))
            .rejects
            .toThrow();
    });
});

describe("clearHistoryWithStore()", () => {
    test('should clear data in the given object store', () => {
            clear.mockResolvedValue(true);

            return expect(clearHistoryWithStore(testStore))
                .resolves
                .toEqual(true);
        });

    test('should throw an error if idb clear() has error', () => {
        clear.mockRejectedValue(new Error());

        return expect(clearHistoryWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        return expect(clearHistoryWithStore('testStore'))
            .rejects
            .toThrow();
    });
});
