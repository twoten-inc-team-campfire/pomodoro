import React, { useReducer } from 'react';
import { 
	GlobalStateContext,
	initGlobalState, 
	globalStateReducer, 
	GlobalStateProvider 
} from '../GlobalState/GlobalState';
import { render } from '@testing-library/react'

/*
Test Helper for jest render

The reason why we need a helper to test our components is because we have global states,
and the every part of our app is aware of it. If your component doesn't use the global state at all,
you will not need to use this helper. If you do, this function can help provide your component 
with a global state, and you can customize the global state as well.

Aguments:
	@arg1: the component to test
 	@custom_state: the part of the state you want to customize, default empty
 	@renderOptions: these are the options provided to the render function of react-testing-library, default empty

Return:
	whatever the render function returns

Usage:
	1. Pass in the component just as how you pass it to the react-testing-library's render funnction
	2. if you want, you can specify the initial global state. And you don't have to specify the
		entire initGlobalState, you can just specify the parts of it. The "Object.assign" will merge
		your custom state to the orginal state.
		For example, you want to change the init timer, and you don't want to affect anything else 
		such as the settings, theme...., you should call your render like this:
			const custom_timer_state = { timer:  {min: 5, sec: 10}};
			renderHelper(<MyComponent prop1={..}/>, custom_timer_state)
	3. If you want to pass in any renderOptions mentioned here
	 https://testing-library.com/docs/react-testing-library/api#render-options
		Then you pass it as the 3rd argument to the renderHelper
*/

const renderHelper = (Component, custom_state={}, renderOptions={}) => {
	//apply the custom_state to the init (default) state
	const customInitState = Object.assign(initGlobalState, custom_state);
	
	function Helper(props) {
		//define a helper component that renders the given component
		const [state, dispatch] = useReducer(globalStateReducer, customInitState);
		return (
			<GlobalStateContext.Provider value={[state, dispatch]}> 
				{Component}
			</GlobalStateContext.Provider>
		)
	}
	return render(<Helper/>, renderOptions);
}

export { renderHelper }