import { uIOhook, UiohookKey } from 'uiohook-napi';

try {
  uIOhook.on('keydown', (e) => {
    if (e.keycode === UiohookKey.Q) {
      console.log('Hello!');
    }

    if (e.keycode === UiohookKey.S) {
      console.log('Pressed S');
    }
  });

  uIOhook.start();
} catch (error) {
  console.log(error);
}
