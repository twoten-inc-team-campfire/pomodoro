import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

import { saveUserSettings, loadUserSettings } from './services/DefaultDataService.js'
import { UserSettings } from './classes/settings/UserSettings'

jest.mock('./services/DefaultDataService')
jest.mock('idb-keyval');


test('renders pomodoro timer title', async () => {
	const promise = Promise.resolve(new UserSettings())
	loadUserSettings.mockResolvedValue(promise)
	act(() => {
		render(<App />);
	});
  	const headerElement = screen.getByRole('heading', { name: /pomodoro timer/i});
	expect(headerElement).toBeInTheDocument();
	await act(() => promise)
});


describe('The App', () => {
	test('should show the buttom nav bar', async () => {
		const promise = Promise.resolve(new UserSettings())
		loadUserSettings.mockResolvedValue(promise)
		act(() => {
			render(<App />);
		});
		const buttomNavBar = screen.queryByLabelText('buttom-nav-bar')
		expect(buttomNavBar).toBeInTheDocument();
		await act(() => promise) 
	})

	test('should show the timer (home page) on first load', async () => {
		const promise = Promise.resolve(new UserSettings())
		loadUserSettings.mockResolvedValue(promise)
		act(() => {
			render(<App />);
		});
		const buttomNavBar = screen.queryByLabelText('buttom-nav-bar')
		const Home = screen.queryByLabelText('home-page')

		expect(buttomNavBar).toBeInTheDocument();
		expect(buttomNavBar).toBeInTheDocument();
		await act(() => promise)
	})

	test('should show the settings page when settings button is clicked ', async () => {
		const promise = Promise.resolve(new UserSettings())
		loadUserSettings.mockResolvedValue(promise)
		act(() => {
			render(<App />);
		});
		const settingsButton = screen.queryByLabelText('settings-button');
		act(() => {
			userEvent.click(settingsButton);
		});
		const SettingsPage = screen.queryByLabelText('settings-page')
		const Home = screen.queryByLabelText('home-page')

		expect(SettingsPage).toBeInTheDocument();
		expect(Home).not.toBeInTheDocument();
		await act(() => promise)
	})
})