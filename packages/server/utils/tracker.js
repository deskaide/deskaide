import activeWindow from 'active-win';
import ioHook from 'iohook';

export default function track(isTrackingOn = false) {
  const appInfo = {
    title: '',
  };

  let prevAppInfo = {};

  if (isTrackingOn) {
    ioHook.on('mouseclick', (event) => {
      (async () => {
        const now = new Date().toISOString();
        const windowInfo = await activeWindow();

        if (!appInfo.title) {
          appInfo.title = windowInfo.title;
          appInfo.owner = windowInfo.owner ? windowInfo.owner.name : 'Misc';
          appInfo.startedAt = now;
        }

        if (appInfo.title && appInfo.title !== windowInfo.title) {
          prevAppInfo = {
            ...appInfo,
            endedAt: now,
          };

          console.log('Prev Appinfo ------->s');
          console.log(prevAppInfo);
          console.log('Prev Appinfo ------->e');

          appInfo.title = windowInfo.title;
          appInfo.owner = windowInfo.owner ? windowInfo.owner.name : 'Misc';
          appInfo.startedAt = now;

          console.log('Appinfo ------->s');
          console.log(appInfo);
          console.log('Appinfo ------->e');
        }
      })();
    });

    ioHook.start();
  } else {
    ioHook.stop();
  }
}
