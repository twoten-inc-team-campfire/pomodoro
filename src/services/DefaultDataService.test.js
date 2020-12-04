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

            });
    });
});
