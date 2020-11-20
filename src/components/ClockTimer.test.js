import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Timer from './ClockTimer'

test("Timer should show the min and sec as passed in", () => {
	render(<Timer min={5} sec={3}/>)
	const TimerText = screen.getByTestId('timer-min-sec-text');
	expect(TimerText).toBeInTheDocument();
})