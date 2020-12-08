import { PomodoroManager, initState, forward } from './PomodoroManager'
import { fireEvent, screen, waitFor, act } from '@testing-library/react'
import { renderHelper } from '../utils/TestHelper'
import { TIMER_SESSION_TYPE, TimerSession } from "../classes/TimerSession"

beforeEach(() => {
	//because we used "setInterval" and "clear Interval", need to use a fake one in testing
	jest.useFakeTimers()
})

afterEach(() => {
	//clears the fake timer
	jest.runOnlyPendingTimers()
	jest.useRealTimers()
});

test('test the pomodoro session state forward-switching function to check if the state would switch correctly', () => {
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

test('Test the initial timer screen', () => {
    const custom_timer_state = { 
		timer: { 
			min: 25, 
			sec: 0 
		} 
	}
	renderHelper(<PomodoroManager/>, custom_timer_state);

    const time = screen.getByRole('heading', {name: "time-remaining"});
	const startButton = screen.queryByLabelText('start-button');
	expect(time.innerHTML).toEqual("25:00");
    expect(startButton).toBeInTheDocument();
})

test('Test the functionality of generating the TimerSession with the pause button', () => {
    const custom_timer_state = { 
		timer: { 
			min: 25, 
			sec: 0 
		} 
	}
    const callback = jest.fn((t) => {
        expect(t.getDuration()).toEqual(50000);
        expect(t.type).toEqual(TIMER_SESSION_TYPE.POMODORO);
    })

    jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
    let date = 1487076708000;
    Date.now = jest.fn(() => date);
    renderHelper(<PomodoroManager onNewTimerSession={callback}/>, custom_timer_state)

    const startButton = screen.queryByLabelText('start-button');

    fireEvent.click(startButton);
    const pauseButton = screen.queryByLabelText('pause-button');
    Date.now = jest.fn(() => date + 50000);
    
    act(() => 
		jest.advanceTimersByTime(50000)
    )

    fireEvent.click(pauseButton);

    expect(callback).toHaveBeenCalled();
})

test('Test the functionality of generating the TimerSession with the cancel button', () => {
    const custom_timer_state = { 
		timer: { 
			min: 25, 
			sec: 0 
		} 
	}
    const callback = jest.fn((t) => {
        expect(t.getDuration()).toEqual(50000);
        expect(t.type).toEqual(TIMER_SESSION_TYPE.POMODORO);
    })

    jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
    let date = 1487076708000;
    Date.now = jest.fn(() => date);
    renderHelper(<PomodoroManager onNewTimerSession={callback}/>, custom_timer_state)

    const startButton = screen.queryByLabelText('start-button');

    fireEvent.click(startButton);
    const cancelButton = screen.queryByLabelText('cancel-button');
    Date.now = jest.fn(() => date + 50000);
    
    act(() => 
		jest.advanceTimersByTime(50000)
    )

    fireEvent.click(cancelButton);

    expect(callback).toHaveBeenCalled();
})

test('Test if a TimerSession will be generated upon the finish of a session', () => {
    const custom_timer_state = { 
		timer: { 
			min: 25, 
			sec: 0 
		} 
    }
    const callback = jest.fn((t) => {
        expect(t.getDuration()).toEqual(1501000);
        expect(t.type).toEqual(TIMER_SESSION_TYPE.POMODORO);
    })
	renderHelper(<PomodoroManager onNewTimerSession={callback}/>, custom_timer_state);

    const time = screen.getByRole('heading', {name: "time-remaining"});
    const startButton = screen.queryByLabelText('start-button');
    let date = 1487076708000;
    Date.now = jest.fn(() => date);
    
    fireEvent.click(startButton);
    
    let i;
    for (i = 0; i < 1501; i++) {
        date += 1000;
        Date.now = jest.fn(() => date);
        act(() => 
            jest.advanceTimersByTime(1000)
        )
    }
    
    expect(time.innerHTML).toEqual("00:00");
    expect(callback).toHaveBeenCalled();
})