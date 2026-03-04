const { contextBridge, ipcRenderer } = require("electron");

const IPC_CHANNELS = Object.freeze({
  LIST_PRINTERS: "printers:list",
  PRINT: "pos:print",
});

const api = Object.freeze({
  listPrinters: () => ipcRenderer.invoke(IPC_CHANNELS.LIST_PRINTERS),
  print: ({ printerName, width }) =>
    ipcRenderer.invoke(IPC_CHANNELS.PRINT, { printerName, width }),
  versions: Object.freeze({
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron,
  }),
});

contextBridge.exposeInMainWorld("electronPrinter", api);
