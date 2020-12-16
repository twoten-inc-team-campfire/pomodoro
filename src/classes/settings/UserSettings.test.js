import { UserSettings } from './UserSettings';

describe('UserSettings constructor', () => {
    test('should be successfull instantiation with default inputs', () => {
        const settings = new UserSettings();
        
        expect(settings.pomodoroLength).toEqual(settings.pomodoroLength);
        expect(settings.shortBreakLength).toEqual(settings.shortBreakLength);
        expect(settings.longBreakLength).toEqual(settings.longBreakLength);
        expect(settings.numPomodorosInCycle).toEqual(settings.numPomodorosInCycle);
        expect(settings.autoStartBreaks).toEqual(settings.autoStartBreaks);
        expect(settings.autoStartPomodoros).toEqual(settings.autoStartPomodoros);
        expect(settings.displayPauseButton).toEqual(settings.displayPauseButton);
        expect(settings.displayCancelButton).toEqual(settings.displayCancelButton);
        expect(settings.displayFastForwardButton).toEqual(settings.displayFastForwardButton);
        expect(settings.displayTaskSelector).toEqual(settings.displayTaskSelector);
    })

    test('should throw an error if invalid number input', () => {
        expect(() => new UserSettings('10', 10, 10, 10, true, true, true, true, true, true)).toThrow();
    })

    test('should throw an error if invalid boolean input', () => {
        expect(() => new UserSettings(10, 10, 10, 10, true, 'true', true, true, true, true)).toThrow();
        expect(() => new UserSettings(10, 10, 10, 10, true, 1300, true, true, true, true)).toThrow();
    })

});
