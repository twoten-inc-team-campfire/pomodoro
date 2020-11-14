import {PomodoroSettings} from "./PomodoroSettings";
import {UISettings} from "./UISettings";

/**
 * Contains user's current settings for the application. Container for other settings objects.
 */
export class UserSettings {
    /**
     * Create a UserSettings object.
     * @param {PomodoroSettings} pomodoro - The settings for the pomodoro timer
     * @param {UISettings} ui - The settings for the
     */
    constructor(pomodoro= PomodoroSettings.defaults(),
                ui= UISettings.defaults()) {
        this.pomodoro = pomodoro
        this.ui = ui
    }

    /**
     * Returns a UserSettings object with default settings
     * @returns {UserSettings}
     */
    static defaults() {
        return new UserSettings(
            PomodoroSettings.defaults(), // Default to pomodoro defaults
            UISettings.defaults() // Default to UI defaults
        )
    }
}