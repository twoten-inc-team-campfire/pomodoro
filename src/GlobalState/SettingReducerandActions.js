import { saveUserSettings, loadUserSettings } from "../services/DataService";
import { UserSettings } from "../classes/settings/UserSettings"


const SettingsActionType = {
    HANDLE: 'handle'
}

/**
 * getInitSettings
 * @desc Load the initial user settings for the application. Function attempts
 * to load settings from the Database first. Any settings that haven't previously
 * been saved to the Database by a user event change will be set to the factory
 * default.
 * 
 * @returns {UserSettings} 
 * 
 * @public
 */
async function getInitSettings() {

    console.log("Getting Initial Settings");
    try { // try to load settings from DB
        
        let savedSettings = await loadUserSettings();
        console.log("Got settings from DB")
        console.log(savedSettings)
        return savedSettings;

    } catch (err) {
        // Expect Error if settings have never been saved to the DB
        let factoryDefaultSettings = new UserSettings();
        console.log("Got factory settings")
        console.log(factoryDefaultSettings)
        return factoryDefaultSettings;
    }
}

//Reducer takes an action and update the state: these are the actions.
const SettingsActions = {
    HANDLE_CHANGE: (name, value) => ({
        target: 'Settings',
        type: SettingsActionType.HANDLE,
        setting: name,
        value: value
    }),
};

/* timer reducer to work with useReducer Hooks in react
 *
 * Arguments:
 *    @state: the current state of the app (like above, it contains the min and sec)
 *    @action: the "description" about what you want to do with the state
 * 
 * What this function does:
 *        It looks into the "action", understand what the action want us to do with the state, 
 *        and implements the logic for that action
 *
 * Return Value:
 *.       return a new state. In this case, it's an object that contains "min" and "sec"
 */
const settingsReducer = (state, action) => {
    if (action.type === 'handle') {
        return handleSettingChange(state, action);
    }
}


const handleSettingChange = (state, action) => {
    return ({...state, [action.setting]: action.value });
}


export { settingsReducer, getInitSettings, SettingsActions }