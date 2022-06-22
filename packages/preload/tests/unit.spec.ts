import { afterEach, expect, test, vi } from 'vitest';

const exposeInMainWorldMock = vi.fn();
vi.mock('electron', () => ({
  contextBridge: { exposeInMainWorld: exposeInMainWorldMock },
}));

afterEach(() => {
  vi.clearAllMocks();
});

test('info', async () => {
  await import('../src/info');
  expect(exposeInMainWorldMock).toBeCalledTimes(1);
  expect(exposeInMainWorldMock).lastCalledWith('info', {
    name: 'Deskaide',
    versions: {
      app: '1.0.0',
      ...process.versions,
    },
  });
});

test('notification', async () => {
  await import('../src/notification');
  expect(exposeInMainWorldMock).toBeCalledTimes(1);
  expect(exposeInMainWorldMock.mock.calls[0][0]).toBe('notification');
  expect(exposeInMainWorldMock.mock.calls[0][1]).toHaveProperty('send');
});
