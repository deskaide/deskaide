const createMainMenuTemplate = (app, mainWindow) => [
  {
    label: 'Deskstat',
    submenu: [
      { label: 'Pomodoro' },
      { label: 'Settings' },
      {
        label: 'Close',
        accelerator: 'CommandOrControl+Q',
        click() {
          app.isQuiting = true;
          app.quit();
        },
      },
    ],
  },
];

const createContextMenuTemplate = (app, mainWindow) => [
  {
    label: 'Restore',
    click() {
      mainWindow.show();
    },
  },
  {
    label: 'Close',
    accelerator: 'CommandOrControl+Q',
    click() {
      app.isQuiting = true;
      app.quit();
    },
  },
];

module.exports = { createMainMenuTemplate, createContextMenuTemplate };
