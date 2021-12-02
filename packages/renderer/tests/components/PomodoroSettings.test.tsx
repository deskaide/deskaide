import React from 'react';

import { render } from '../test-utils';
import { fireEvent, waitFor } from '@testing-library/dom';

import PomodoroSettings from '../../src/components/PomodoroSettings';

describe('PomodoroSettings', () => {
  test('renders PomodoroSettings component', async () => {
    const { getByTestId, getByText, findByTestId } = render(
      <PomodoroSettings />
    );

    const focusInput = getByTestId('input-focusTime');
    const shortBreakInput = getByTestId('input-shortBreakTime');
    const remindBeforeInput = getByTestId('input-remindBefore');
    const saveButton = getByText('Save');

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
      fireEvent.click(saveButton);
    });

    const focusTimeError = await findByTestId(`input-error-focusTime`);
    const shortBreakTimeError = await findByTestId(
      `input-error-shortBreakTime`
    );
    const remindBeforeError = await findByTestId(`input-error-remindBefore`);

    expect(focusTimeError.innerHTML).toBe(
      'Must be greater or equal 20 minutes'
    );
    expect(shortBreakTimeError.innerHTML).toBe(
      'Must be less or equal 10 minutes'
    );
    expect(remindBeforeError.innerHTML).toBe(
      'Must be greater or equal 15 seconds'
    );
  });
});
