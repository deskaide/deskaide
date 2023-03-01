import logger from 'electron-log';
import path from 'path';
import { app } from 'electron';

logger.transports.file.resolvePathFn = () =>
  path.join(
    import.meta.env.DEV ? app.getAppPath() : app.getPath('appData'),
    'logs/deskaide.log'
  );

export const log = logger;
