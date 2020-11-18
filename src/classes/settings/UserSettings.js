import {PomodoroSettings} from "./PomodoroSettings";
import {UISettings} from "./UISettings";

/**
 * UserSettings
 * @desc Contains user's current settings for the application. Container for other settings objects.
 */
export class UserSettings {
    /**
     * Create a UserSettings object.
     * @constructs
     * @param {PomodoroSettings} pomodoro - The settings for the pomodoro timer
     * @param {UISettings} ui - The settings for the UI
     */
    constructor(pomodoro= PomodoroSettings.defaults(),
                ui= UISettings.defaults()) {
        /**
         * @member {PomodoroSettings} UserSettings#pomodoro
         * @desc The settings for the pomodoro timer
         */
        this.pomodoro = pomodoro
        /**
         * @member {UISettings} UserSettings#ui
         * @desc The settings for the UI
         */
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