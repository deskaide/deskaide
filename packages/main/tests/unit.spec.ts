import type { Mocked, MockedClass } from 'vitest';
import { beforeEach, expect, test, vi } from 'vitest';
import { restoreOrCreateMainWindow } from '../src/screens';

import type { ipcMain, screen } from 'electron';
import { BrowserWindow } from 'electron';

/**
 * Mock real electron BrowserWindow API
 */
vi.mock('electron', () => {
  const bw = vi.fn() as unknown as MockedClass<typeof BrowserWindow>;
  const sc = vi.fn() as unknown as Mocked<typeof screen>;
  const im = vi.fn() as unknown as Mocked<typeof ipcMain>;

  bw.getAllWindows = vi.fn(() => bw.mock.instances);
  bw.prototype.loadURL = vi.fn();
  bw.prototype.on = vi.fn<any>();
  bw.prototype.destroy = vi.fn();
  bw.prototype.isDestroyed = vi.fn();
  bw.prototype.isMinimized = vi.fn();
  bw.prototype.focus = vi.fn();
  bw.prototype.restore = vi.fn();

  sc.getPrimaryDisplay = vi.fn<any>(() => ({ workArea: {} }));

  im.on = vi.fn<any>();

  return { BrowserWindow: bw, ipcMain: im, screen: sc };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test('Should create new window', async () => {
  const { mock } = vi.mocked(BrowserWindow);
  expect(mock.instances).toHaveLength(0);

  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  expect(mock.instances[0].loadURL).toHaveBeenCalledOnce();
  expect(mock.instances[0].loadURL).toHaveBeenCalledWith(
    expect.stringMatching(/index\.html$/)
  );
});

test('Should restore existing window', async () => {
  const { mock } = vi.mocked(BrowserWindow);

  // Create Window and minimize it
  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  const appWindow = vi.mocked(mock.instances[0]);
  appWindow.isMinimized.mockReturnValueOnce(true);

  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  expect(appWindow.restore).toHaveBeenCalledOnce();
});

test('Should create new window if previous was destroyed', async () => {
  const { mock } = vi.mocked(BrowserWindow);

  // Create Window and destroy it
  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  const appWindow = vi.mocked(mock.instances[0]);
  appWindow.isDestroyed.mockReturnValueOnce(true);

  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(2);
});
