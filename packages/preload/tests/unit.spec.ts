import { expect, test } from 'vitest';
import { version } from '../../../buildResources/meta.json';

import { info, notification } from '../src';

test('info', async () => {
  expect(info).toStrictEqual({
    name: 'Deskaide',
    versions: {
      app: version,
      ...process.versions,
    },
  });
});

test('notification', async () => {
  expect(notification).toHaveProperty('send');
});
