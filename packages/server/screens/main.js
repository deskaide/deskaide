import electron from "electron";
import path from "path";
import isDev from "electron-is-dev";
import AutoLaunch from "auto-launch";

const {
  app,
  BrowserWindow,
  screen,
  Menu,
  Tray,
  ipcMain,
  globalShortcut,
  clipboard
} = electron;

const {
  createMainMenuTemplate,
  createContextMenuTemplate
} = require("../menus");

let mainWindow;
let breakTimeWindow;
let appIcon;

const startUrl = isDev
  ? "http://localhost:3000"
  : `file://${path.join(__dirname, "../../client/build/index.html")}`;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 1152,
    minHeight: 700,
    icon: path.join(__dirname, "../assets/icons/icon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  const mainMenuTemplate = createMainMenuTemplate(app, mainWindow);
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("close", event => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    } else {
      mainWindow = null;
    }
    return false;
  });
}

function createContextMenu() {
  const contextMenuTemplate = createContextMenuTemplate(app, mainWindow);
  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

  appIcon = new Tray(path.join(__dirname, "../assets/icons/icon.png"));
  appIcon.setToolTip("Deskstat");
  appIcon.setContextMenu(contextMenu);
  appIcon.on("click", () => {
    mainWindow.show();
  });
}

app.on("ready", async () => {
  // const settings = await getSettings();
  app.setAppUserModelId("pro.shahid.deskaide");
  createWindow();
  createContextMenu();
  // startPowerMonitoring();
  // await autoLaunchApp(settings.autoStart === "Y");
  globalShortcut.register("CommandOrControl+L", () => {
    const text = clipboard.readText();
    // mainWindow.webContents.send("CLIPBOARD_TEXT", text);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("before-quit", () => {
  app.isQuiting = true;
});
