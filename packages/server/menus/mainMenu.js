function createMainMenuTemplate(app, mainWindow) {
  return [
    {
      label: "Deskstat",
      submenu: [
        {
          label: "Pomodoro",
          click() {
            return (
              mainWindow && mainWindow.webContents.send("GO_TO", "pomodoro")
            );
          }
        },
        {
          label: "Notes",
          click() {
            return mainWindow && mainWindow.webContents.send("GO_TO", "notes");
          }
        },
        {
          label: "Journals",
          click() {
            return (
              mainWindow && mainWindow.webContents.send("GO_TO", "journals")
            );
          }
        },
        {
          label: "Links",
          click() {
            return mainWindow && mainWindow.webContents.send("GO_TO", "links");
          }
        },
        {
          label: "Stats",
          click() {
            return mainWindow && mainWindow.webContents.send("GO_TO", "stats");
          }
        },
        {
          label: "Close",
          accelerator: "CommandOrControl+Q",
          click() {
            app.isQuiting = true;
            app.quit();
          }
        }
      ]
    },
    {
      label: "Settings",
      click() {
        return mainWindow && mainWindow.webContents.send("GO_TO", "settings");
      }
    },
    {
      label: "About",
      click() {
        return mainWindow && mainWindow.webContents.send("GO_TO", "about");
      }
    }
  ];
}

export default createMainMenuTemplate;
