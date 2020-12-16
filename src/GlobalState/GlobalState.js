import React, { useEffect, useReducer } from 'react';
import { timerReducer, initTimer } from './TimerReducerAndActions'
import { settingsReducer, SettingsActions } from './SettingReducerandActions'
import { UserSettings } from '../classes/settings/UserSettings';
import { loadUserSettings } from '../services/DefaultDataService.js'

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

	
	useEffect(() => {
		/**
		 * getSavedSettings
		 * @desc Performs an asynchronous load of the saved user settings from the
		 * database. Settings may not have been saved from the Database, if so we catch
		 * the error and leave the initial settings alone.
		 */
		async function getSavedSettings() {
			try { 
				// try to load settings from DB
				let savedSettings = await loadUserSettings();
				dispatch(SettingsActions.REPLACE_ALL_SETTINGS(savedSettings));

			} catch (err) {
				// Expect Error if settings have never been saved to the DB
			}
		}
		
		// Actually call the async function
		getSavedSettings();

		// Second parameter of useEffect is an empty array 
		// -> tells the useEffect hook to only run on first render
	}, [])


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