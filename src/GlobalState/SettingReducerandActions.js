

const SettingsActionType = {
    HANDLE: 'handle'
}
//initial state of the Settings
const initSettings = {
    autoBreak: true,
    autoFocus: true,
    focusLength: 25,
    shortBreakLength: 5,
    longBreakLength: 20,
    focusCycleCount: 4,
    pause: true,
    fastForward: true,
    cancel: true,
    taskSelection: true,
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


export { settingsReducer, initSettings, SettingsActions }