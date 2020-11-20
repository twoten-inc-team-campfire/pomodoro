import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ClockFace from './ClockFace'

test("Timer should show the min and sec as passed in", () => {
	render(<ClockFace min={5} sec={3}/>)
	const clockFace = screen.getByText('05:03');
	expect(clockFace).toBeInTheDocument();
})