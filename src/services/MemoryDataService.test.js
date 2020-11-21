import { MemoryDataService } from './MemoryDataService'
import { TimerSession, TIMER_SESSION_TYPE } from '../classes/TimerSession'
import { PomodoroSettings } from '../classes/settings/PomodoroSettings'
import { UISettings } from '../classes/settings/UISettings'

test("test MemoryDataService.saveTimerSession", () => {
    var service = new MemoryDataService();
    var date1 = new Date(new Date('2020-1-1 10:12:30')), date2 = new Date('2020-1-3 10:12:30');
    // transform in the granularity of date, remove hour, minute, second
    var dateTime1 = new Date(date1.toDateString()), dateTime2 = new Date(date2.toDateString());
    var timestamp1 = dateTime1.getTime(), timestamp2 = dateTime2.getTime();
    var sessionDict = {
        timestamp1: new TimerSession(date1, date1),
        timestamp2: new TimerSession(date2, date2),
    };
    for (var t in sessionDict) {
        service.saveTimerSession(sessionDict[t]);
    }

    expect(service.timerSessionsDict == sessionDict);
});

test("test MemoryDataService.loadTimerSessionListByDate, empty type input", () => {
    var service = new MemoryDataService();
    var date = new Date(new Date('2020-1-1 10:12:30'));
    var session = new TimerSession(date, date);
    service.saveTimerSession(session);

    var dateTime = new Date(date.toDateString());  // transform in the granularity of date, remove hour, minute, second
    expect(service.loadTimerSessionListByDate(dateTime, dateTime, []) == [])
});

test("test MemoryDataService.loadTimerSessionListByDate, invalid date input granularity", () => {
    var service = new MemoryDataService();
    var date = new Date(new Date('2020-1-1 10:12:30'));
    var session = new TimerSession(date, date);
    service.saveTimerSession(session);

    expect(service.loadTimerSessionListByDate(date, date, [TIMER_SESSION_TYPE.POMODORO]) == [])
});

test("test MemoryDataService.loadTimerSessionListByDate, valid date input granularity", () => {
    var service = new MemoryDataService();
    var date = new Date(new Date('2020-1-1 10:12:30'));
    var session = new TimerSession(date, date);
    service.saveTimerSession(session);

    var dateTime = new Date(date.toDateString());
    expect(service.loadTimerSessionListByDate(dateTime, dateTime, [TIMER_SESSION_TYPE.POMODORO]) == [session])
});

test("test MemoryDataService.loadTimerSessionListByDate", () => {
    var service = new MemoryDataService();
    var dates = [
        new Date('2020-1-1 10:12:30'),
        new Date('2020-1-3 10:12:30'),
        new Date('2020-1-5 10:12:30')
    ];
    var types = [
        TIMER_SESSION_TYPE.POMODORO,
        TIMER_SESSION_TYPE.SHORT_REST,
        TIMER_SESSION_TYPE.LONG_REST
    ];
    var sessions = [];
    for (var d of dates) {
        for (var t of types) {
            sessions.push(new TimerSession(d, d, t));
        }
    }

    var startDate = new Date('2020-1-1'),
        endDate = new Date('2020-1-3');
    var queryTypes = [TIMER_SESSION_TYPE.POMODORO];
    var queryRes = service.loadTimerSessionListByDate(startDate, endDate, queryTypes);

    expect(queryRes == [sessions[0], sessions[3]]);
});


test("test MemoryDataService.savePomodoroSettings", () => {
    var service = new MemoryDataService();
    var settingsDict = {
        "settings1": new PomodoroSettings(),
        "settings2": new PomodoroSettings(),
    };

    for (var tag in settingsDict) {
        service.savePomodoroSettings(tag, settingsDict[tag]);
    }

    expect(service.pomodoroSettingsDict == settingsDict);
});

test("test MemoryDataService.loadAllPomodoroSettings, empty entry", () => {
    var service = new MemoryDataService();
    var settingsDict = service.loadAllPomodoroSettings();

    expect(Object.keys(settingsDict).length == 0);
});

test("test MemoryDataService.loadAllPomodoroSettings", () => {
    var service = new MemoryDataService();
    var settingsDict = {
        "settings1": new PomodoroSettings(),
        "settings2": new PomodoroSettings(),
    };

    for (var tag in settingsDict) {
        service.savePomodoroSettings(tag, settingsDict[tag]);
    }

    expect(service.loadAllPomodoroSettings() == settingsDict);
});

test("test MemoryDataService.saveUISettings", () => {
    var service = new MemoryDataService();
    var uiSettings = new UISettings();
    service.saveUISettings(uiSettings);

    expect(service.uiSettings == uiSettings);
});

test("test MemoryDataService.loadUISettings with success", () => {
    var service = new MemoryDataService();
    var uiSettings = new UISettings();
    service.saveUISettings(uiSettings);

    expect(service.loadUISettings() == uiSettings);
});

test("test MemoryDataService.loadUISettings with error", () => {
    var service = new MemoryDataService();
    var uiSettings = new UISettings();
    service.saveUISettings(uiSettings);

    expect(service.loadUISettings).toThrowError();
});