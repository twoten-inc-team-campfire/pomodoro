import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderHelper } from '../utils/TestHelper'
import BottomNavBar from './BottomNavBar'

test("Buttom Nav Bar should show 3 buttons: Timer, Settings, and Summary", () => {
	renderHelper(<BottomNavBar/>);
	const timerButton = screen.queryByLabelText('timer-button')
	const settingsButton = screen.queryByLabelText('settings-button');
	const summaryButton = screen.queryByLabelText('summary-button');

	expect(timerButton).toBeInTheDocument();
	expect(settingsButton).toBeInTheDocument();
	expect(summaryButton).toBeInTheDocument();
})
