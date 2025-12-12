import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Portfolio/i);
  expect(linkElement).toBeInTheDocument();
});
