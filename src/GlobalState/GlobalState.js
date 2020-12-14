import React, { useEffect, useReducer } from 'react';
import { timerReducer, initTimer } from './TimerReducerAndActions'
import { settingsReducer, SettingsActions } from './SettingReducerandActions'
import { UserSettings } from '../classes/settings/UserSettings';

const GlobalStateContext = React.createContext([{}, () => {}]);
/* this is the provider of the global state to our app
*. it is used in App.js to wrap our entire app together so that
*. every part of the app will have access the global state
*/
//initial state of the timer
const initGlobalState = { 
	timer: initTimer,
	settings: new UserSettings(),
}

const globalStateReducer = (state, action) => {
	switch (action.target) {
		case 'Timer':
			const newTimer = timerReducer(state.timer, action)
			return {...state, timer: newTimer}
		case 'Single-Setting':
			const updatedSettings = settingsReducer(state.settings, action)
			return {...state, settings: updatedSettings}
		case 'All-Settings':
			const replacementSettings = settingsReducer(state.settings, action)
			return {...state, settings: replacementSettings}
		default:
			return state
	}
}

const GlobalStateProvider = (props) => {
	const [state, dispatch] = useReducer(globalStateReducer, initGlobalState);

	const loadUserSettings = props.loadUserSettings;
	/**
	 * getInitSettings
	 * @desc Load the initial user settings for the application. Function attempts
	 * to load settings from the Database first. Any settings that haven't previously
	 * been saved to the Database by a user event change will be set to the factory
	 * default.
	 * 
	 * @returns {} 
	 * 
	 */
	useEffect(() => {

		//
		async function getInitSettings() {

			console.log("Getting Initial Settings");
			try { 
				// try to load settings from DB
				let savedSettings = await loadUserSettings();
				console.log("Got settings to load from the DB");
				dispatch(SettingsActions.REPLACE_ALL_SETTINGS(savedSettings));

			} catch (err) {
				// Expect Error if settings have never been saved to the DB
				console.log("Previously no settings were saved")
			}
		}
		
		// Actually call the async function
		getInitSettings();

		// Second parameter of useEffect is an empty array 
		// -> tells the useEffect hook to only run on first render
	}, [loadUserSettings])


	return (
		<GlobalStateContext.Provider value={[state, dispatch]}>
			{props.children}
		</GlobalStateContext.Provider>
	);
}


export {
	initGlobalState,
	globalStateReducer,
	GlobalStateContext, 
	GlobalStateProvider 
};