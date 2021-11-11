import React from 'react';

import { render, screen } from '../test-utils';
import { SidebarMenu } from '../../src/components';

describe('SidebarMenu', () => {
  test('renders SidebarMenu component', () => {
    render(<SidebarMenu />);

    expect(screen.getByLabelText(/welcome screen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/links/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pomodoro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/settings/i)).toBeInTheDocument();
  });
});
