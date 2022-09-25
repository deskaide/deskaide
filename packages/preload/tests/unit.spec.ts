import { expect, test } from 'vitest';

import { info, notification } from '../src';

test('info', async () => {
  expect(info).toStrictEqual({
    name: 'Deskaide',
    versions: {
      app: '1.0.0',
      ...process.versions,
    },
  });
});

test('notification', async () => {
  expect(notification).toHaveProperty('send');
});
