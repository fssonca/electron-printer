const { BrowserWindow } = require("electron");
const { APP_PATHS, WINDOW_BOUNDS } = require("./constants");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    ...WINDOW_BOUNDS,
    webPreferences: {
      preload: APP_PATHS.preload,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.loadFile(APP_PATHS.indexHtml);
  return mainWindow;
}

module.exports = { createMainWindow };
