const { APP_PATHS } = require("./constants");

const BASE_PRINT_DATA = Object.freeze([
  {
    type: "text",
    value: "ELECTRON STORE",
    style: {
      textAlign: "center",
      fontWeight: "700",
      fontSize: "16px",
      fontFamily: "monospace",
      margin: "0 0 2px 0",
      letterSpacing: "0.4px",
    },
  },
  {
    type: "text",
    value: "PRINTER TEST RECEIPT",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 3px 0",
      letterSpacing: "0.2px",
    },
  },
  {
    type: "text",
    value: "123 Demo Street, Suite 5",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0",
    },
  },
  {
    type: "text",
    value: "TAX ID 00-0000000",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "text",
    value: "------------------------------",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "image",
    path: APP_PATHS.sampleImage,
    position: "center",
    width: "120px",
    height: "42px",
  },
  {
    type: "text",
    value: "Charset: . , ; : ( ) - + = ! # % \" '",
    style: {
      fontSize: "9px",
      fontFamily: "monospace",
      textAlign: "center",
      margin: "3px 0 1px 0",
    },
  },
  {
    type: "text",
    value: "Unicode test: á é í ó ú ñ ü ç Ä Ö",
    style: {
      fontSize: "9px",
      fontFamily: "monospace",
      textAlign: "center",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "text",
    value:
      "Sans-serif sample: The quick brown fox jumps over the lazy dog 12345.",
    style: {
      fontSize: "10px",
      fontFamily: "Arial, sans-serif",
      textAlign: "left",
      margin: "0 0 2px 0",
    },
  },
  {
    type: "text",
    value: "Serif sample: Sphinx of black quartz, judge my vow.",
    style: {
      fontSize: "10px",
      fontFamily: "Georgia, serif",
      textAlign: "left",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "text",
    value: "Right aligned sample text for width test",
    style: {
      fontSize: "9px",
      fontFamily: "Arial, sans-serif",
      textAlign: "right",
      width: "100%",
      whiteSpace: "normal",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "text",
    value: "------------------------------",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 2px 0",
    },
  },
  {
    type: "text",
    value: "QTY ITEM                PRICE",
    style: { fontSize: "9px", fontFamily: "monospace", margin: "0 0 2px 0" },
  },
  {
    type: "text",
    value: "1   Thermal Paper       4.90",
    style: { fontSize: "9px", fontFamily: "monospace", margin: "0" },
  },
  {
    type: "text",
    value: "1   USB Cable           2.40",
    style: { fontSize: "9px", fontFamily: "monospace", margin: "0" },
  },
  {
    type: "text",
    value: "1   Device Setup        8.00",
    style: { fontSize: "9px", fontFamily: "monospace", margin: "0 0 2px 0" },
  },
  {
    type: "text",
    value: "------------------------------",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0",
    },
  },
  {
    type: "text",
    value: "TOTAL                 15.30",
    style: {
      fontSize: "10px",
      fontWeight: "700",
      fontFamily: "monospace",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "qrCode",
    value: "https://github.com/fssonca",
    height: 80,
    width: 80,
    position: "center",
    style: { margin: "2px 0 4px 0" },
  },
  {
    type: "barCode",
    value: "HB4587896",
    height: 20,
    width: 1,
    displayValue: true,
    fontsize: 10,
    position: "center",
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "0 0 3px 0",
    },
  },
  {
    type: "text",
    value: "------------------------------",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 2px 0",
    },
  },
  {
    type: "text",
    value: "0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9",
    style: {
      textAlign: "left",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 2px 0",
    },
  },

  {
    type: "text",
    value: "------------------------------",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0 0 2px 0",
    },
  },
  {
    type: "text",
    value: "THANK YOU. COME AGAIN.",
    style: {
      textAlign: "center",
      fontSize: "9px",
      fontFamily: "monospace",
      margin: "0",
    },
  },
]);

function formatTimestamp(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

function buildPrintPayload() {
  return [
    ...BASE_PRINT_DATA,
    {
      type: "text",
      value: formatTimestamp(),
      style: {
        textAlign: "center",
        fontSize: "9px",
        fontFamily: "monospace",
        margin: "2px 0 0 0",
      },
    },
  ];
}

module.exports = { buildPrintPayload };
