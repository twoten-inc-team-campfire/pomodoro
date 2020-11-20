import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TimerButtons from './TimerButtons'

test("TimerButtons Group should show a start button at first, and no pause or cancel buttons", () => {
	render(<TimerButtons/>)
	
	const startButton = screen.queryByTestId('start-button')
	const pauseButton = screen.queryByTestId('pause-button');
	const cancelButton = screen.queryByTestId('cancel-button');

	expect(startButton).toBeInTheDocument();
	expect(pauseButton).toBe(null);
	expect(cancelButton).toBe(null);
})

test("When start button is clicked, \
	TimerButtons Group should show pause or cancel buttons, no start button", () => {
	render(<TimerButtons/>)
	
	let startButton = screen.queryByTestId('start-button')

	fireEvent.click(startButton);
	startButton = screen.queryByTestId('start-button')
	const pauseButton = screen.queryByTestId('pause-button');
	const cancelButton = screen.queryByTestId('cancel-button');

	expect(startButton).toBe(null);
	expect(pauseButton).toBeInTheDocument();
	expect(cancelButton).toBeInTheDocument();
})