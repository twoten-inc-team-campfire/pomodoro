import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pomodoro timer title', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /pomodoro timer/i});
  expect(headerElement).toBeInTheDocument();
});
