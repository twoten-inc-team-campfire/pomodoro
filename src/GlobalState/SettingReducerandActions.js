

/**
 * SettingsActions
 * @desc Object whose properties are used as predefined functions for updating
 * the settings portion of the Global Context. The target parameter in each 
 * action is used by the GlobalStateReducer as well as the settingsReducer to
 * funnel the action to the appropriate reducer. The other properties of each 
 * action are the data that the reducer utilizes to perform the transformation.
 */
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

/** 
 * settingsReducer 
 * @desc Within the Global Context State is the subcontext of Settings. This settings
 * reducer is responsible for transforming the settings portion of global context.
 * It takes the current state of settings and an action to transform the state.
 * 
 * @param {UserSettings} state - The current state of the settings (like above, it contains the min and sec)
 * @param {SettingsActions} action - The action specifies how the state should be 
 * transformed and provides the necessary data to do so.
 * 
 * @returns {UserSettings}
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