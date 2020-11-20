import { render, screen } from '@testing-library/react';
import Timer from './Timer'

test('renders play button on load', () => {
  render(<Timer />);
  const buttonElement = screen.getByRole('button', {name: /play-button/i});
  expect(buttonElement).toBeInTheDocument();
});

