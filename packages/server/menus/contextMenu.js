function createContextMenuTemplate(app, mainWindow) {
  return [
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
}

export default createContextMenuTemplate;
