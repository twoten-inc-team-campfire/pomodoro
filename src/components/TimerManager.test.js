import React from 'react'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import TimerManager from './TimerManager'
beforeEach(() => {
	jest.useFakeTimers()
})
afterEach(() => {
	jest.runOnlyPendingTimers()
	jest.useRealTimers()
});

test("On first shown, it should have a initial timer showing \"00:10\" and \ a start button", () => {
	render(<TimerManager/>)
	const timer = screen.getByTestId('timer-min-sec-text')
	const startButton = screen.getByTestId('start-button')
	expect(timer).toBeInTheDocument();
	expect(startButton).toBeInTheDocument();
})

test("After start button is clicked and 3 seconds passed, the timer should not be \
	the same as it was before clicking", async () => {
	let timerManager; 

	timerManager = render(<TimerManager/>)
	const timer = screen.getByTestId('timer-min-sec-text')
	const timerContentBeforeClick = timer.textContent;
	const startButton = screen.getByTestId('start-button')

	fireEvent.click(startButton);

	act(() => 
		jest.advanceTimersByTime(4000)
	)
	screen.debug()
	expect(startButton).not.toBeInTheDocument();
	const timerContentAfterClick = timer.textContent;

	expect(timerContentAfterClick).not.toEqual(timerContentBeforeClick)
})