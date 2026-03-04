const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..", "..");

const IPC_CHANNELS = Object.freeze({
  LIST_PRINTERS: "printers:list",
  PRINT: "pos:print",
});

const WINDOW_BOUNDS = Object.freeze({
  width: 1000,
  height: 700,
});

const RECEIPT_WIDTH_PRESETS = Object.freeze({
  "44mm": "166px",
  "57mm": "215px",
  "58mm": "219px",
  "76mm": "287px",
  "78mm": "295px",
  "80mm": "302px",
});

const RECEIPT_CONTENT_WIDTH_PRESETS = Object.freeze({
  "44mm": "150px",
  "57mm": "199px",
  "58mm": "203px",
  "76mm": "271px",
  "78mm": "279px",
  "80mm": "286px",
});

const ALLOWED_PAGE_WIDTHS = new Set(Object.keys(RECEIPT_WIDTH_PRESETS));

const APP_PATHS = Object.freeze({
  preload: path.join(__dirname, "..", "preload.js"),
  indexHtml: path.join(__dirname, "..", "index.html"),
  sampleImage: path.join(ROOT_DIR, "assets", "img_test.png"),
});

module.exports = {
  ALLOWED_PAGE_WIDTHS,
  APP_PATHS,
  IPC_CHANNELS,
  RECEIPT_CONTENT_WIDTH_PRESETS,
  RECEIPT_WIDTH_PRESETS,
  WINDOW_BOUNDS,
};
