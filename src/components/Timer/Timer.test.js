import React from 'react'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import Timer from './Timer'
beforeEach(() => {
	jest.useFakeTimers()
})
afterEach(() => {
	jest.runOnlyPendingTimers()
	jest.useRealTimers()
});

test("On first shown, it should have a initial timer showing \"25:00\" and \ a start button", () => {
	render(<Timer/>)
	const time = screen.getByRole('heading', {name: "time-remaining"});
	const startButton = screen.queryByLabelText('start-button');
	expect(time.innerHTML).toEqual("25:00");
	expect(startButton).toBeInTheDocument();
})

test("After start button is clicked and 3 seconds passed, the timer should not be \
	the same as it was before clicking", () => {
	let timerManager; 
	jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());

	timerManager = render(<Timer/>)
	const time = screen.getByRole('heading', {name: "time-remaining"});
	const timerContentBeforeClick = time.textContent;
	const startButton = screen.queryByLabelText('start-button');

	fireEvent.click(startButton);

	act(() => 
		jest.advanceTimersByTime(4000)
	)
	
	const timerContentAfterClick = time.textContent;
	
	expect(startButton).not.toBeInTheDocument();
	expect(timerContentAfterClick).not.toEqual(timerContentBeforeClick);
})