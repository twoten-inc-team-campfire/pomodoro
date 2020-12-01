import { PomodoroSettings } from './PomodoroSettings';

describe('test constructor of PomodoroSettings', () => {
    test('successful instantiation of default constructor', () => {
        const settings = new PomodoroSettings();

        expect(settings.pomodoroLength).toEqual(settings.pomodoroLength);
        expect(settings.shortBreakLength).toEqual(settings.shortBreakLength);
        expect(settings.longBreakLength).toEqual(settings.longBreakLength);
        expect(settings.numPomodorosInCycle).toEqual(settings.numPomodorosInCycle);
        expect(settings.autoStartBreaks).toEqual(settings.autoStartBreaks);
        expect(settings.autoStartPomodoros).toEqual(settings.autoStartPomodoros);
    })

    test('invalid number input for constructor', () => {
        expect(() => new PomodoroSettings('10', 10, 10, 10, true, true)).toThrow();
    })

    test('invalid boolean input for constructor', () => {
        expect(() => new PomodoroSettings(10, 10, 10, 10, 'true', true)).toThrow();
    })

});
