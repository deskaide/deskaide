import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { afterEach, beforeEach, expect, test, describe } from 'vitest';

import { Box } from '../../src/components';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Box', () => {
  test('renders Box component', () => {
    act(() => {
      createRoot(container).render(
        <Box>
          <p>test</p>
        </Box>
      );
    });

    const p = container.querySelector('p') as HTMLParagraphElement;

    expect(p.textContent).toBe('test');
  });
});
