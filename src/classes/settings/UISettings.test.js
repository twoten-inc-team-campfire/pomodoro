import { UISettings } from './UISettings';

describe('test constructor of UISettings', () => {
    test('successful instantiation of default constructor', () => {
        const settings = new UISettings();

        expect(settings.displayPauseButton).toEqual(settings.displayPauseButton);
        expect(settings.displayCancelButton).toEqual(settings.displayCancelButton);
        expect(settings.displayFastForwardButton).toEqual(settings.displayFastForwardButton);
        expect(settings.displayTaskSelector).toEqual(settings.displayTaskSelector);
    })

    test('invalid boolean input for constructor', () => {
        expect(() => new UISettings(10, true, true, true)).toThrow();
    })

});
