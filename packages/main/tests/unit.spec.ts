import type { MockedClass, Mocked } from 'vitest';
import { beforeEach, expect, test, vi } from 'vitest';
import { restoreOrCreateMainWindow } from '../src/screens/main';

import type { ipcMain, screen } from 'electron';
import { BrowserWindow } from 'electron';

/**
 * Mock real electron BrowserWindow API
 */
vi.mock('electron', () => {
  // Use "as unknown as" because vi.fn() does not have static methods
  const bw = vi.fn() as unknown as MockedClass<typeof BrowserWindow>;
  const sc = vi.fn() as unknown as Mocked<typeof screen>;
  const im = vi.fn() as unknown as Mocked<typeof ipcMain>;

  bw.getAllWindows = vi.fn(() => bw.mock.instances);
  bw.prototype.loadURL = vi.fn((_: string, __?: Electron.LoadURLOptions) =>
    Promise.resolve()
  );
  // Use "any" because the on function is overloaded
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bw.prototype.on = vi.fn<any>();
  bw.prototype.destroy = vi.fn();
  bw.prototype.isDestroyed = vi.fn();
  bw.prototype.isMinimized = vi.fn();
  bw.prototype.isVisible = vi.fn();
  bw.prototype.focus = vi.fn();
  bw.prototype.show = vi.fn();
  bw.prototype.restore = vi.fn();

  const app: Pick<Electron.App, 'getAppPath'> = {
    getAppPath(): string {
      return '';
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sc.getPrimaryDisplay = vi.fn<any>(() => ({ workArea: {} }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  im.on = vi.fn<any>();

  return { BrowserWindow: bw, app, ipcMain: im, screen: sc };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test('Should create a new window', async () => {
  const { mock } = vi.mocked(BrowserWindow);
  expect(mock.instances).toHaveLength(0);

  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  expect(mock.instances[0].loadURL).toHaveBeenCalledOnce();
  expect(mock.instances[0].loadURL).toHaveBeenCalledWith(
    expect.stringMatching(/index\.html$/)
  );
});

test('Should restore an existing window', async () => {
  const { mock } = vi.mocked(BrowserWindow);

  // Create a window and minimize it.
  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  const appWindow = vi.mocked(mock.instances[0]);
  appWindow.isMinimized.mockReturnValueOnce(true);

  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  expect(appWindow.restore).toHaveBeenCalledOnce();
});

test('Should create a new window if the previous one was destroyed', async () => {
  const { mock } = vi.mocked(BrowserWindow);

  // Create a window and destroy it.
  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(1);
  const appWindow = vi.mocked(mock.instances[0]);
  appWindow.isDestroyed.mockReturnValueOnce(true);

  await restoreOrCreateMainWindow();
  expect(mock.instances).toHaveLength(2);
});
