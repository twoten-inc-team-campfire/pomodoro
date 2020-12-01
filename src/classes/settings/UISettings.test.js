import { UISettings } from './UISettings';

describe('UISettings constructor', () => {
    test('should be successfull instantiation with default inputs', () => {
        const settings = new UISettings();

        expect(settings.displayPauseButton).toEqual(settings.displayPauseButton);
        expect(settings.displayCancelButton).toEqual(settings.displayCancelButton);
        expect(settings.displayFastForwardButton).toEqual(settings.displayFastForwardButton);
        expect(settings.displayTaskSelector).toEqual(settings.displayTaskSelector);
    })

    test('should throw an error if invalid boolean input', () => {
        expect(() => new UISettings(10, true, true, true)).toThrow();
    })

});