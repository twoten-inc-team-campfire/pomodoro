import { Store, get, set, clear, keys } from 'idb-keyval';
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