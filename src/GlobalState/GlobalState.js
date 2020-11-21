import React, { useState, useContext, useReducer } from 'react';
import { timerReducer, initTimer } from './TimerReducer'

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
	console.log("calling dispatchr with action:", action)
	switch (action.target) {
		case 'Timer':
			console.log("It's calling timer Action:", action)
			const newTimer = timerReducer(state.timer, action)
			return {...state, timer: newTimer}
			break;
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


export { GlobalStateContext, GlobalStateProvider };