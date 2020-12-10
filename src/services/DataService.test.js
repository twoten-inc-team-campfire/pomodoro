import { get, set, clear, keys } from 'idb-keyval';
import {
    saveTimerSession,
    loadTimerSessionListByDate,
    savePomodoroSettings,
    loadAllPomodoroSettings,
    saveUISettings,
    loadUISettings,
    clearAllHistory,
} from './DataService';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { UserSettings } from '../classes/settings/UserSettings';
import { UISettings } from '../classes/settings/UISettings';

jest.mock('idb-keyval');

describe("saveTimerSession()", () => {
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

        return saveTimerSession(session1)
            .then(() => saveTimerSession(session2))
            .then(() => saveTimerSession(session3))
            .then(store => expect(store).toEqual(expectedStore));
    });

    test('should throw an error if input is not an instance of TimerSession', () => {
        let session = 'TimerSession';
        return expect(saveTimerSession(session))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        let date = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(date, date);
        get.mockRejectedValue(new Error());

        return expect(saveTimerSession(session))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let date = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(date, date);
        get.mockResolvedValue({});
        set.mockRejectedValue(new Error());

        return expect(saveTimerSession(session))
            .rejects
            .toThrow();
    });
});

describe("loadTimerSessionListByDate()", () => {
    test('should load an empty result list when the input is valid but results don\'t exist', () => {
        let date = new Date('2020-2-27 10:51:05');
        let expectedStore = {};
        get.mockImplementation(str => Promise.resolve(expectedStore[str]));

        return expect(loadTimerSessionListByDate(date, date))
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

        return expect(loadTimerSessionListByDate(
            date1,
            date4,
            [
                TIMER_SESSION_TYPE.POMODORO,
                TIMER_SESSION_TYPE.LONG_REST
            ]))
            .resolves
            .toEqual(expectedList);
    });

    test('should throw an error if input time is not an instance of Date', () => {
        let date = '2020-1-1';
        return expect(loadTimerSessionListByDate(date, date))
            .rejects
            .toThrow();
    });

    test('should throw an error if input types is not an Array', () => {
        let date = new Date('2020-1-1');

        return expect(loadTimerSessionListByDate(date, date, 1))
            .rejects
            .toThrow();
    });

    test('should throw an error if input types are not TIMER_SESSION_TYPE', () => {
        let date = new Date('2020-1-1');

        return expect(loadTimerSessionListByDate(date, date, [4, 5]))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        let dateDate = new Date('2020-1-1');
        get.mockRejectedValue(new Error());

        return expect(loadTimerSessionListByDate(dateDate, dateDate))
            .rejects
            .toThrow();
    });
});

describe("savePomodoroSettings()", () => {
    test('should save the PomodoroSettings object when given the valid settings', () => {
        let expectedStore = {
            'settings1': new UserSettings(1500000),
            'settings2': new UserSettings(3000000),
        }
        let actualStore = {};
        set.mockImplementation((k, v) => {
            actualStore[k] = v;
            return Promise.resolve(actualStore);
        });

        return savePomodoroSettings('settings1', expectedStore['settings1'])
            .then(s => savePomodoroSettings('settings2', expectedStore['settings2']))
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
        return expect(savePomodoroSettings(settings))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let settings = new UserSettings();
        set.mockRejectedValue(new Error());

        return expect(savePomodoroSettings('settings', settings))
            .rejects
            .toThrow();
    });
});

describe("loadAllPomodoroSettings()", () => {
    test('should load all PomodoroSettings', () => {
        let store = {
            'settings1': new UserSettings(1500000),
            'settings2': new UserSettings(3000000),
        }
        keys.mockResolvedValue(Object.keys(store));
        get.mockResolvedValueOnce(store['settings1'])
            .mockResolvedValueOnce(store['settings2']);

        return expect(loadAllPomodoroSettings(store))
            .resolves
            .toEqual(store);
    });

    test('should throw an error if idb keys() has error', () => {
        keys.mockRejectedValue(new Error());

        return expect(loadAllPomodoroSettings())
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        keys.mockResolvedValue([1, 2, 3]);
        get.mockRejectedValue(new Error());

        return expect(loadAllPomodoroSettings())
            .rejects
            .toThrow();
    });
});

describe("saveUISettings()", () => {
    test('should save the UISettings object when given the valid settings', () => {
        let settings = new UISettings();
        let dict = { "uiSettings": settings };
        set.mockImplementation((k = "uiSettings", v) => {
            let item = {};
            item[k] = v;
            return Promise.resolve(item);
        });

        return expect(saveUISettings(settings))
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
        return expect(saveUISettings(settings))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let settings = new UISettings();
        set.mockRejectedValue(new Error());

        return expect(saveUISettings(settings))
            .rejects
            .toThrow();
    });
});

describe("loadUISettings()", () => {
    test('should load the saved UISettings if there is one saved', () => {
        let uiSettings = new UISettings();
        get.mockResolvedValue(uiSettings);

        return expect(loadUISettings())
            .resolves
            .toEqual(uiSettings);
    });

    test('should throw an error if no previously saved settings', () => {
        get.mockResolvedValue(undefined);

        return expect(loadUISettings())
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        get.mockRejectedValue(new Error());

        return expect(loadUISettings())
            .rejects
            .toThrow();
    });
});

jest.mock('idb-keyval');

describe("clearAllHistory()", () => {
    test('should clear all storage of timer sessions, ' +
        'pomodoro settings and UI settings', () => {
            clear.mockResolvedValue(true);

            return expect(clearAllHistory())
                .resolves
                .toEqual([true, true, true]);
        });

    test('should throw an error if idb clear() has error', () => {
        clear.mockRejectedValue(new Error());

        return expect(clearAllHistory())
            .rejects
            .toThrow();
    });
});
