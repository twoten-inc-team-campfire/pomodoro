import React, { useReducer } from 'react';
import { timerReducer, initTimer } from './TimerReducerAndActions'

const GlobalStateContext = React.createContext([{}, () => {}]);
/* this is the provider of the global state to our app
*. it is used in App.js to wrap our entire app together so that
*. every part of the app will have access the global state
*/
//initial state of the timer
const initGlobalState = { 
	timer: initTimer
}
const globalStateReducer = (state, action) => {
	switch (action.target) {
		case 'Timer':
			const newTimer = timerReducer(state.timer, action)
			return {...state, timer: newTimer};
		default:
			return state;
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


export { GlobalStateContext, GlobalStateProvider };