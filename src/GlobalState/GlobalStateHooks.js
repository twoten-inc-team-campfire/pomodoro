import { useContext } from 'react';
import { GlobalStateContext } from './GlobalState';
import { TimerActions } from './TimerReducerAndActions';
import { SettingsActions } from './SettingReducerandActions';

const useTimerGlobalState = () => {
	const [state, dispatch] = useContext(GlobalStateContext);
	const { timer } = state;
	return { 
		timer,
		dispatch,
		TimerActions
	}
}

const useSettingsGlobalState = () => {
	const [state, dispatch] = useContext(GlobalStateContext);
	const { settings } = state;
	return {
		settings,
		dispatch,
		SettingsActions
	}
}

export { useTimerGlobalState, useSettingsGlobalState };