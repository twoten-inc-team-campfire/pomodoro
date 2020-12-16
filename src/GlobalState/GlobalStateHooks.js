import { useContext } from 'react';
import { GlobalStateContext } from './GlobalState';
import { TimerActions } from './TimerReducerAndActions';
import { SettingsActions } from './SettingReducerandActions';
import { ManagerActions } from './PomodoroManagerReducerAndActions';

const useTimerGlobalState = () => {
	const [state, dispatch] = useContext(GlobalStateContext);
	const { timer } = state;
	const dispatchTimer = dispatch;
	return { 
		timer,
		dispatchTimer,
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

const useManagerGlobalState = () => {
	const [state, dispatch] = useContext(GlobalStateContext);
	const { manager } = state;
	const dispatchManager = dispatch;
	return {
		manager,
		dispatchManager,
		ManagerActions
	}
}

export { useTimerGlobalState, useSettingsGlobalState, useManagerGlobalState };