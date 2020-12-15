import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';


test('renders pomodoro timer title', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /pomodoro timer/i});
  expect(headerElement).toBeInTheDocument();
});


describe('The App', () => {
	test('should show the buttom nav bar', () => {
		render(<App/>)
		const buttomNavBar = screen.queryByLabelText('buttom-nav-bar')
		expect(buttomNavBar).toBeInTheDocument();
	})

	test('should show the timer (home page) on first load', () => {
		render(<App/>)
		const buttomNavBar = screen.queryByLabelText('buttom-nav-bar')
		const Home = screen.queryByLabelText('home-page')

		expect(buttomNavBar).toBeInTheDocument();
		expect(buttomNavBar).toBeInTheDocument();
	})

	test('should show the settings page when settings button is clicked ', () => {
		render(<App/>)
		const settingsButton = screen.queryByLabelText('settings-button');
		userEvent.click(settingsButton);

		const SettingsPage = screen.queryByLabelText('settings-page')
		const Home = screen.queryByLabelText('home-page')

		expect(SettingsPage).toBeInTheDocument();
		expect(Home).not.toBeInTheDocument();
	})
})