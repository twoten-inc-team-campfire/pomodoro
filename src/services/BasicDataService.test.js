import { Store, get, set, clear } from 'idb-keyval';
import {
    saveTimerSessionWithStore,
    loadTimerSessionListByDateWithStore,
    saveUserSettingsWithStore,
    loadUserSettingsWithStore,
    clearHistoryWithStore,
} from './BasicDataService';
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession';
import { UserSettings } from '../classes/settings/UserSettings';

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

describe("saveUserSettingsWithStore()", () => {
    test('should save the UserSettings object when given the valid settings', () => {
        let settings = new UserSettings();
        let dict = { "userSettings": settings };
        set.mockImplementation((k = "userSettings", v) => {
            let item = {};
            item[k] = v;
            return Promise.resolve(item);
        });

        return expect(saveUserSettingsWithStore(settings, testStore))
            .resolves
            .toEqual(dict);

    });

    test('should throw an error if the input is invalid (not UserSettings)', () => {
        return expect(saveUserSettingsWithStore('settings', testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb set() has error', () => {
        let settings = new UserSettings();
        set.mockRejectedValue(new Error());

        return expect(saveUserSettingsWithStore(settings, testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        let settings = new UserSettings();

        return expect(saveUserSettingsWithStore(settings, 'testStore'))
            .rejects
            .toThrow();
    });
});

describe("loadUserSettingsWithStore()", () => {
    test('should load the saved UserSettings if there is one saved', () => {
        let userSettings = new UserSettings();
        get.mockResolvedValue(userSettings);

        return expect(loadUserSettingsWithStore(testStore))
            .resolves
            .toEqual(userSettings);
    });

    test('should throw an error if no previously saved settings', () => {
        get.mockResolvedValue(undefined);

        return expect(loadUserSettingsWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if idb get() has error', () => {
        get.mockRejectedValue(new Error());

        return expect(loadUserSettingsWithStore(testStore))
            .rejects
            .toThrow();
    });

    test('should throw an error if not Store object', () => {
        return expect(loadUserSettingsWithStore('testStore'))
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
