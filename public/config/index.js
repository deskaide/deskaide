const createMainMenuTemplate = (app, mainWindow) => [
  {
    label: 'Deskstat',
    submenu: [
      {
        label: 'Pomodoro',
        click() {
          mainWindow && mainWindow.webContents.send('GO_TO', 'pomodoro');
        },
      },
      {
        label: 'Notes',
        click() {
          mainWindow && mainWindow.webContents.send('GO_TO', 'notes');
        },
      },
      {
        label: 'Journals',
        click() {
          mainWindow && mainWindow.webContents.send('GO_TO', 'journals');
        },
      },
      {
        label: 'Links',
        click() {
          mainWindow && mainWindow.webContents.send('GO_TO', 'links');
        },
      },
      {
        label: 'Stats',
        click() {
          mainWindow && mainWindow.webContents.send('GO_TO', 'stats');
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
    ],
  },
  {
    label: 'Settings',
  },
  {
    label: 'About',
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

module.exports = {
  createMainMenuTemplate,
  createContextMenuTemplate,
};
