import { PomodoroManager, initState, forward } from './PomodoroManager'
import {TIMER_SESSION_TYPE} from "../classes/TimerSession";

test('test the pomodoro session state forward-switching function', () => {
    let state = initState;

    let expected = {
        type: TIMER_SESSION_TYPE.POMODORO,
        count: 0,
        sessionIngterval: 4
    }
    expect(state).toMatchObject(expected);
    
    for (var i = 1; i < state.sessionIngterval; i++) {
        expected.count += 1;
        expected.type = TIMER_SESSION_TYPE.SHORT_REST;
        state = forward(state);
        expect(state).toMatchObject(expected);
        
        expected.type = TIMER_SESSION_TYPE.POMODORO;
        state = forward(state);
        expect(state).toMatchObject(expected);
    }
    
    expected.count = 0;
    expected.type = TIMER_SESSION_TYPE.LONG_REST;
    state = forward(state);
    expect(state).toMatchObject(expected);

    state = forward(state);
    expect(state).toMatchObject(initState);
})