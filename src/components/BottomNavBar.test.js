import React from 'react'
import { renderHelper } from '../utils/TestHelper'
import { act, render, fireEvent, screen } from '@testing-library/react'
import BottomNavBar from './BottomNavBar'

jest.mock('idb-keyval');

test("Buttom Nav Bar should show 3 buttons: Timer, Settings, and Summary", () => {
	
	renderHelper(<BottomNavBar/>);
	
	const timerButton = screen.queryByLabelText('timer-button')
	const settingsButton = screen.queryByLabelText('settings-button');
	const statsButton = screen.queryByLabelText('statistics-button');

	expect(timerButton).toBeInTheDocument();
	expect(settingsButton).toBeInTheDocument();
	expect(statsButton).toBeInTheDocument();
})
