import React from 'react';

import { render, screen } from '../test-utils';
import { Home } from '../../src/pages';

describe('Home', () => {
  test('renders Home page', () => {
    render(<Home />);

    expect(screen.getByLabelText(/welcome screen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/links/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pomodoro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/settings/i)).toBeInTheDocument();

    expect(screen.getAllByText(/deskaide/i)).toHaveLength(2);
    expect(screen.getByText(/An aide to your desk life!/i)).toBeInTheDocument();
    expect(screen.getByText(/An aide to your desk life!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Deskaide is a desktop application to assist a user make their desk life efficient\./i
      )
    ).toBeInTheDocument();
  });
});
