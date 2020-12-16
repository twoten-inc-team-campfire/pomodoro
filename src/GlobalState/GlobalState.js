import React, { useReducer } from 'react';
import { timerReducer, initTimer } from './TimerReducerAndActions'
import { settingsReducer, initSettings } from './SettingReducerandActions'
import { managerReducer, initManager } from './PomodoroManagerReducerAndActions'

const GlobalStateContext = React.createContext([{}, () => {}]);
/* this is the provider of the global state to our app
*. it is used in App.js to wrap our entire app together so that
*. every part of the app will have access the global state
*/
//initial state of the timer
const initGlobalState = { 
	timer: initTimer,
	settings: initSettings,
	manager: initManager,
}
const globalStateReducer = (state, action) => {
	switch (action.target) {
		case 'Timer':
			const newTimer = timerReducer(state.timer, action)
			return {...state, timer: newTimer}
		case 'Settings':
			const newSettings = settingsReducer(state.settings, action)
			return {...state, settings: newSettings}
		case 'Manager':
			const newManager = managerReducer(state, action)
			return {...state, manager: newManager}
		default:
			return state
	}
}

const GlobalStateProvider = (props) => {
	const [state, dispatch] = useReducer(globalStateReducer, initGlobalState);

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