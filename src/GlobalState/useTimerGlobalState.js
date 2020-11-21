import { useContext } from 'react';
import { GlobalStateContext } from './GlobalState';
import { TimerActions } from './TimerReducerAndActions';

const useTimerGlobalState = () => {
	const [state, dispatch] = useContext(GlobalStateContext);
	const { timer } = state;
	return { 
		timer,
		dispatch,
		TimerActions
	}
}

export default useTimerGlobalState;