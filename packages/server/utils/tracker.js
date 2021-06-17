import activeWindow from 'active-win';
import { differenceInSeconds } from 'date-fns';
import ioHook from 'iohook';

import DB from '../config/db';
import prefixes from '../config/prefixes';

export default function track(isTrackingOn = false) {
  const appInfo = {
    title: '',
  };

  let prevAppInfo = {};

  if (isTrackingOn) {
    ioHook.on('mouseclick', (event) => {
      (async () => {
        const now = new Date().toISOString();
        const windowInfo = (await activeWindow()) || {};

        if (!appInfo.title) {
          appInfo.title = windowInfo.title;
          appInfo.owner = windowInfo.owner ? windowInfo.owner.name : 'Misc';
          appInfo.startedAt = now;
        }

        if (appInfo.title && appInfo.title !== windowInfo.title) {
          prevAppInfo = {
            ...appInfo,
            endedAt: now,
            duration: differenceInSeconds(
              new Date(now),
              new Date(appInfo.startedAt)
            ),
          };

          await DB.upsert({
            ...prevAppInfo,
            type: 'APP_USAGE_DOC_PREFIX',
          });

          appInfo.title = windowInfo.title;
          appInfo.owner = windowInfo.owner ? windowInfo.owner.name : 'Misc';
          appInfo.startedAt = now;
        }
      })();
    });

    ioHook.start();
  } else {
    ioHook.stop();
  }
}
