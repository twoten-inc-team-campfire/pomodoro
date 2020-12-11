import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TimerButtons from './TimerButtons'
import { renderHelper } from '../../utils/TestHelper'

test("At inital start, \
only the start button is visible and the cancel and pause buttons are hidden", () => {
	const initialSettings = {
		settings: {
			pause: true,
			cancel: true
		}
	};

	renderHelper(<TimerButtons/>, initialSettings);
	const startButton = screen.getByRole('button', {name: /start/i});

	// Verify that the start button is visible and the pause and cancel buttons are hidden
	const pauseButton = screen.queryByLabelText('pause-button');
	const cancelButton = screen.queryByLabelText('cancel-button');
	expect(startButton).toBeInTheDocument();
	expect(pauseButton).toBeNull();
	expect(cancelButton).toBeNull();
})

test("When the start button is clicked, \
the pause and cancel buttons are shown and the start button is hidden", () => {
		const initialSettings = {
			settings: {
				pause: true,
				cancel: true
			}
		};

	renderHelper(<TimerButtons/>, initialSettings);
	
	let startButton = screen.getByRole('button', {name: /start/i});

	userEvent.click(startButton);
	startButton = screen.queryByLabelText('start-button')

	// Verify that the start button is hidden and the pause and cancel buttons are visible
	const pauseButton = screen.getByRole('button', {name: /pause/i});
	const cancelButton = screen.getByRole('button', {name: /cancel/i});
	expect(startButton).toBeNull();
	expect(pauseButton).toBeInTheDocument();
	expect(cancelButton).toBeInTheDocument();
})

describe("Settings and Home Buttons", () => {

	test("Pause button is visible when settings.pause is true", () => {
		const initialSettings = {
			settings: {
				pause: true,
				cancel: true
			}
		};

		renderHelper(<TimerButtons/>, initialSettings);

		const startButton = screen.getByRole('button', {name: /start/i});
		userEvent.click(startButton);

		// Verify that the pause button is visible
		const pauseButton = screen.getByRole('button', {name: /pause/i});
		expect(pauseButton).toBeInTheDocument();
	})

	test("Pause button is hidden when settings.pause is false", () => {
		const initialSettings = {
			settings: {
				pause: false,
				cancel: true
			}
		};

		renderHelper(<TimerButtons/>, initialSettings);

		const startButton = screen.getByRole('button', {name: /start/i});
		userEvent.click(startButton);

		// Verify that the pause button is hidden
		const pauseButton = screen.queryByLabelText('pause-button');
		expect(pauseButton).toBeNull();
	})

	test("Cancel button is visible when settings.cancel is true", () => {
		const initialSettings = {
			settings: {
				pause: true,
				cancel: true
			}
		};

		renderHelper(<TimerButtons/>, initialSettings);

		const startButton = screen.getByRole('button', {name: /start/i});
		userEvent.click(startButton);

		// Verify that the cancel button is visible
		const cancelButton = screen.getByRole('button', {name: /cancel/i});
		expect(cancelButton).toBeInTheDocument();
	})

	test("Cancel button is hidden when settings.cancel is false", () => {
		const initialSettings = {
			settings: {
				pause: true,
				cancel: false
			}
		};

		renderHelper(<TimerButtons/>, initialSettings);

		const startButton = screen.getByRole('button', {name: /start/i});
		userEvent.click(startButton);

		// Verify that the cancel button is hidden
		const cancelButton = screen.queryByLabelText('cancel-button');
		expect(cancelButton).toBeNull();
	})

});
