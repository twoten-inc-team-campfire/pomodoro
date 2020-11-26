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
import { TimerSession } from '../classes/TimerSession';
import { PomodoroSettings } from '../classes/settings/PomodoroSettings';
import { UISettings } from '../classes/settings/UISettings';

jest.mock('idb-keyval');

test('test test', () => {
    get.mockImplementation(v => Promise.resolve(v + 1));
    return get(1).then(v => {
        expect(v).toBe(2);
    });
});

test('test saveTimerSession, success', () => {
    let minuteDate = new Date('2020-1-1 10:51:05');
    let session = new TimerSession(minuteDate, minuteDate);
    let dateDate = new Date('2020-1-1');
    let timestamp = dateDate.getTime();
});

test('test saveTimerSession, get error', () => {
    let minuteDate = new Date('2020-1-1 10:51:05');
    let session = new TimerSession(minuteDate, minuteDate);
    get.mockRejectedValue(new Error());

    return expect(saveTimerSession(session))
        .rejects
        .toThrow();
});

test('test saveTimerSession, set error', () => {
    let minuteDate = new Date('2020-1-1 10:51:05');
    let session = new TimerSession(minuteDate, minuteDate);
    get.mockResolvedValue({});
    set.mockRejectedValue(new Error());

    return expect(saveTimerSession(session))
        .rejects
        .toThrow();
});

test('test sth', () => {

});

test('test sth', () => {

});

test('test savePomodoroSettings, success', () => {
    let expected = {
        'settings1': 1,
        'settings2': 2,
    }
    let actual = {};
    set.mockImplementation((k, v) => {
        actual[k] = v;
        return Promise.resolve(actual);
    });

    return savePomodoroSettings('settings1', expected['settings1'])
        .then(s => savePomodoroSettings('settings2', expected['settings2']))
        .then(s => expect(s).toEqual(expected))
});

test('test savePomodoroSettings, error', () => {
    let settings = new PomodoroSettings();
    set.mockRejectedValue(new Error());
    
    return expect(savePomodoroSettings('settings', settings))
        .rejects
        .toThrow();
});

test('test loadAllPomodoroSettings, success', () => {
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

test('test loadAllPomodoroSettings, keys error', () => {
    keys.mockRejectedValue(new Error());

    return expect(loadAllPomodoroSettings())
        .rejects
        .toThrow();
});

test('test loadAllPomodoroSettings, get error', () => {
    keys.mockResolvedValue([1, 2, 3]);
    get.mockRejectedValue(new Error());

    return expect(loadAllPomodoroSettings())
        .rejects
        .toThrow();
});

test('test saveUISettings, success', () => {
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

test('test saveUISettings, error', () => {
    let settings = new UISettings();
    set.mockRejectedValue(new Error());

    return expect(saveUISettings(settings))
        .rejects
        .toThrow();
});

test('test loadUISettings, success', () => {
    let uiSettings = new UISettings();
    get.mockResolvedValue(uiSettings);

    return expect(loadUISettings())
        .resolves
        .toEqual(uiSettings);
});

test('test loadUISettings, no saved settings', () => {
    get.mockResolvedValue(undefined);

    return expect(loadUISettings())
        .rejects
        .toThrow();
});

test('test loadUISettings, error', () => {
    get.mockRejectedValue(new Error());

    return expect(loadUISettings())
        .rejects
        .toThrow();
});

test('test clearAllHistory, success', () => {
    clear.mockResolvedValue(true);
    
    return expect(clearAllHistory())
        .resolves
        .toEqual([true, true, true]);
});

test('test clearAllHistory, error', () => {
    clear.mockRejectedValue(new Error());

    return expect(clearAllHistory())
        .rejects
        .toThrow();
});