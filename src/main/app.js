const { app, BrowserWindow, ipcMain } = require("electron");
const { registerIpcHandlers } = require("./ipc");
const { createMainWindow } = require("./window");

let bootstrapped = false;

function bootstrap() {
  if (bootstrapped) return;
  bootstrapped = true;

  app.whenReady().then(() => {
    registerIpcHandlers(ipcMain);
    createMainWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}

bootstrap();
