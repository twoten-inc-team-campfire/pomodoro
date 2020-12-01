import { PomodoroSettings } from './PomodoroSettings';

describe('PomodoroSettings constructor', () => {
    test('should be successfull instantiation with default inputs', () => {
        const settings = new PomodoroSettings();

        expect(settings.pomodoroLength).toEqual(settings.pomodoroLength);
        expect(settings.shortBreakLength).toEqual(settings.shortBreakLength);
        expect(settings.longBreakLength).toEqual(settings.longBreakLength);
        expect(settings.numPomodorosInCycle).toEqual(settings.numPomodorosInCycle);
        expect(settings.autoStartBreaks).toEqual(settings.autoStartBreaks);
        expect(settings.autoStartPomodoros).toEqual(settings.autoStartPomodoros);
    })

    test('should throw an error if invalid number input', () => {
        expect(() => new PomodoroSettings('10', 10, 10, 10, true, true)).toThrow();
    })

    test('should throw an error if invalid boolean input', () => {
        expect(() => new PomodoroSettings(10, 10, 10, 10, 'true', true)).toThrow();
    })

});