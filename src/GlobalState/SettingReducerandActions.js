

//Reducer takes an action and update the state: these are the actions.
const SettingsActions = {
    CHANGE_SINGLE_SETTING: (name, value) => ({
        target: 'Single-Setting',
        setting: name,
        value: value
    }),
    REPLACE_ALL_SETTINGS: (settings) => ({
        target: 'All-Settings',
        settings: settings
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
    switch (action.target) {
		case 'Single-Setting':
			return ({...state, [action.setting]: action.value });
		case 'All-Settings':
			return (action.settings)
		default:
			return state
	}
}

export { settingsReducer, SettingsActions }