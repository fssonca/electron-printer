const { PosPrinter } = require("electron-pos-printer");
const {
  ALLOWED_PAGE_WIDTHS,
  IPC_CHANNELS,
  RECEIPT_CONTENT_WIDTH_PRESETS,
  RECEIPT_WIDTH_PRESETS,
} = require("./constants");
const { buildPrintPayload } = require("./print-payload");

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function getPrinters(webContents) {
  if (typeof webContents.getPrintersAsync === "function") {
    return webContents.getPrintersAsync();
  }
  return webContents.getPrinters();
}

function validatePrintPayload(payload = {}) {
  const printerName = normalizeText(payload.printerName);
  const widthPreset = normalizeText(payload.width);

  if (!ALLOWED_PAGE_WIDTHS.has(widthPreset))
    throw new Error("Unsupported width");

  return {
    printerName,
    widthPreset,
    contentWidthPx: RECEIPT_CONTENT_WIDTH_PRESETS[widthPreset],
    widthPx: RECEIPT_WIDTH_PRESETS[widthPreset],
  };
}

function registerIpcHandlers(ipcMain) {
  ipcMain.handle(IPC_CHANNELS.LIST_PRINTERS, async (event) => {
    const printers = await getPrinters(event.sender);
    return printers.map((printer) => ({
      name: printer.name,
      displayName: printer.displayName || printer.name,
      isDefault: Boolean(printer.isDefault),
    }));
  });

  ipcMain.handle(IPC_CHANNELS.PRINT, async (_event, payload = {}) => {
    const { printerName, widthPreset, widthPx, contentWidthPx } =
      validatePrintPayload(payload);
    const hasPrinter = Boolean(printerName);
    const printOptions = {
      width: contentWidthPx,
      pageSize: widthPreset,
      margin: "0 0 0 0",
      copies: 1,
      timeOutPerLine: 400,
    };

    if (hasPrinter) {
      printOptions.preview = false;
      printOptions.silent = false;
      printOptions.printerName = printerName;
    } else {
      printOptions.preview = true;
      printOptions.silent = true;
    }

    try {
      await PosPrinter.print(buildPrintPayload(), printOptions);
      return { ok: true, mode: hasPrinter ? "printer" : "preview" };
    } catch (error) {
      throw new Error(
        `Print failed in main process. hasPrinter=${hasPrinter} preview=${printOptions.preview} silent=${printOptions.silent} printerName=${printOptions.printerName || "(none)"} | ${String(error?.message || error)}`,
      );
    }
  });
}

module.exports = { registerIpcHandlers };
