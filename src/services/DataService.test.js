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
import { PomodoroSettings } from '../classes/settings/PomodoroSettings';
import { UISettings } from '../classes/settings/UISettings';

jest.mock('idb-keyval');

describe("test saveTimerSession()", () => {
    test('operation success', () => {
        // expected store construction
        let minuteDate1 = new Date('2020-1-1 10:51:05'), minuteDate2 = new Date('2020-1-4 10:51:05');
        let dateDate1 = new Date('2020-1-1'), dateDate2 = new Date('2020-1-4');
        let timestamp1 = dateDate1.getTime(), timestamp2 = dateDate2.getTime();
        let session1 = new TimerSession(minuteDate1, minuteDate1, TIMER_SESSION_TYPE.POMODORO),
            session2 = new TimerSession(minuteDate1, minuteDate1, TIMER_SESSION_TYPE.SHORT_REST),
            session3 = new TimerSession(minuteDate2, minuteDate2, TIMER_SESSION_TYPE.LONG_REST);
    
        let expectedStore = {};
        expectedStore[timestamp1] = {
            [TIMER_SESSION_TYPE.POMODORO]: [session1],
            [TIMER_SESSION_TYPE.SHORT_REST]: [session2],
        };
        expectedStore[timestamp2] = {
            [TIMER_SESSION_TYPE.LONG_REST]: [session3],
        };
    
        let actualStore = {};
        get.mockImplementation(t => Promise.resolve(actualStore[t]));
        set.mockImplementation((t, d) => {
            actualStore[t] = d;
            return Promise.resolve(actualStore);
        });
    
        return saveTimerSession(session1)
            .then(() => saveTimerSession(session2))
            .then(() => saveTimerSession(session3))
            .then(s => expect(s).toEqual(expectedStore));
    });
    
    test('throw error if idb get() has error', () => {
        let minuteDate = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(minuteDate, minuteDate);
        get.mockRejectedValue(new Error());
    
        return expect(saveTimerSession(session))
            .rejects
            .toThrow();
    });
    
    test('throw error if idb set() has error', () => {
        let minuteDate = new Date('2020-1-1 10:51:05');
        let session = new TimerSession(minuteDate, minuteDate);
        get.mockResolvedValue({});
        set.mockRejectedValue(new Error());
    
        return expect(saveTimerSession(session))
            .rejects
            .toThrow();
    });    
});

describe("test loadTimerSessionListByDate()", () => {
    test('operation success with empty result', () => {
        let dateDate = new Date('2020-1-1');
        let expectedStore = {};
        get.mockImplementation(t => Promise.resolve(expectedStore[t]));
    
        return expect(loadTimerSessionListByDate(dateDate, dateDate))
            .resolves
            .toEqual([]);
    });
    
    test('operation success with a result list', () => {
        // expected store construction
        let minuteDate1 = new Date('2020-1-1 10:51:05'), minuteDate2 = new Date('2020-1-4 10:51:05');
        let dateDate1 = new Date('2020-1-1'), dateDate2 = new Date('2020-1-4');
        let timestamp1 = dateDate1.getTime(), timestamp2 = dateDate2.getTime();
        let session1 = new TimerSession(minuteDate1, minuteDate1, TIMER_SESSION_TYPE.POMODORO),
            session2 = new TimerSession(minuteDate1, minuteDate1, TIMER_SESSION_TYPE.SHORT_REST),
            session3 = new TimerSession(minuteDate2, minuteDate2, TIMER_SESSION_TYPE.LONG_REST);
    
        let store = {};
        store[timestamp1] = {
            [TIMER_SESSION_TYPE.POMODORO]: [session1],
            [TIMER_SESSION_TYPE.SHORT_REST]: [session2],
        };
        store[timestamp2] = {
            [TIMER_SESSION_TYPE.LONG_REST]: [session3],
        };
    
        get.mockImplementation(t => Promise.resolve(store[t]));
        let expectedList = [session1, session3];
    
        return expect(loadTimerSessionListByDate(
            dateDate1,
            dateDate2,
            [
                TIMER_SESSION_TYPE.POMODORO,
                TIMER_SESSION_TYPE.LONG_REST
            ]))
            .resolves
            .toEqual(expectedList);
    });
    
    test('throw error if idb get() has error', () => {
        let dateDate = new Date('2020-1-1');
        get.mockRejectedValue(new Error());
    
        return expect(loadTimerSessionListByDate(dateDate, dateDate))
            .rejects
            .toThrow();
    });    
});

describe("test savePomodoroSettings()", () => {
    test('operation success', () => {
        let expectedStore = {
            'settings1': 1,
            'settings2': 2,
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
    
    test('throw error if idb set() has error', () => {
        let settings = new PomodoroSettings();
        set.mockRejectedValue(new Error());
    
        return expect(savePomodoroSettings('settings', settings))
            .rejects
            .toThrow();
    });    
});

describe("test loadAllPomodoroSettings()", () => {
    test('operation success', () => {
        let store = {
            'settings1': 1,
            'settings2': 2,
        }
        keys.mockResolvedValue(Object.keys(store));
        get.mockResolvedValueOnce(store['settings1'])
            .mockResolvedValueOnce(store['settings2']);
    
        return expect(loadAllPomodoroSettings(store))
            .resolves
            .toEqual(store);
    });
    
    test('throw error if idb keys() has error', () => {
        keys.mockRejectedValue(new Error());
    
        return expect(loadAllPomodoroSettings())
            .rejects
            .toThrow();
    });
    
    test('throw error if idb get() has error', () => {
        keys.mockResolvedValue([1, 2, 3]);
        get.mockRejectedValue(new Error());
    
        return expect(loadAllPomodoroSettings())
            .rejects
            .toThrow();
    });    
});

describe("test saveUISettings()", () => {
    test('operation success', () => {
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

    test('throw error if idb set() has error', () => {
        let settings = new UISettings();
        set.mockRejectedValue(new Error());

        return expect(saveUISettings(settings))
            .rejects
            .toThrow();
    });
});

describe("test loadUISettings()", () => {
    test('operation success', () => {
        let uiSettings = new UISettings();
        get.mockResolvedValue(uiSettings);

        return expect(loadUISettings())
            .resolves
            .toEqual(uiSettings);
    });

    test('throw error if no previously saved settings', () => {
        get.mockResolvedValue(undefined);

        return expect(loadUISettings())
            .rejects
            .toThrow();
    });

    test('throw error if idb get() has error', () => {
        get.mockRejectedValue(new Error());

        return expect(loadUISettings())
            .rejects
            .toThrow();
    });
});

describe("test clearAllHistory()", () => {
    test('operation success', () => {
        clear.mockResolvedValue(true);

        return expect(clearAllHistory())
            .resolves
            .toEqual([true, true, true]);
    });

    test('throw error if idb clear() has error', () => {
        clear.mockRejectedValue(new Error());

        return expect(clearAllHistory())
            .rejects
            .toThrow();
    });
});
