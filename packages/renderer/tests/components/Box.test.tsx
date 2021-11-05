import React from 'react';
import { render, screen } from '@testing-library/react';

import { Box } from '../../src/components';

describe('Box', () => {
  test('renders Box component', () => {
    render(
      <Box>
        <p>test</p>
      </Box>
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
