import React from 'react';
import { waitFor, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils';
import PomodoroSettings from '../../src/components/PomodoroSettings';

describe('PomodoroSettings', () => {
  test('renders PomodoroSettings component', async () => {
    render(<PomodoroSettings />);

    const focusInput = screen.getByRole('slider', { name: /focusTime/i });
    const shortBreakInput = screen.getByRole('slider', {
      name: /shortBreakTime/i,
    });
    const remindBeforeInput = screen.getByRole('slider', {
      name: /remindBefore/i,
    });
    const saveButton = screen.getByRole('button', { name: /Save/i });

    await waitFor(() => {
      fireEvent.change(focusInput, {
        target: { value: 15, valueAsNumber: 15 },
      });
    });

    await waitFor(() => {
      fireEvent.change(shortBreakInput, {
        target: { value: 15, valueAsNumber: 15 },
      });
    });

    await waitFor(() => {
      fireEvent.change(remindBeforeInput, {
        target: { value: 10, valueAsNumber: 10 },
      });
    });

    await waitFor(() => {
      userEvent.click(saveButton);
    });

    await screen.findByText(`Must be greater or equal 20 minutes`);
    await screen.findByText('Must be less or equal 10 minutes');
    await screen.findByText('Must be greater or equal 15 seconds');
  });
});
