# Electron Printer Test

Electron app for testing standard and thermal printer output.

Built with:
- [Electron](https://www.electronjs.org/)
- [electron-pos-printer](https://github.com/Hubertformin/electron-pos-printer)

## Features

- Lists installed printers from the host OS
- Prints a receipt-style sample payload (text, image, QR code, barcode)
- Supports thermal width presets:
  - `57mm (215px)`
  - `58mm (219px)`
  - `76mm (287px)`
  - `78mm (295px)`
  - `80mm (302px)`
- Fallback preview mode when no printer is selected/available


## Run Locally

Requirements:
- Node.js + npm

```bash
git clone https://github.com/fssonca/electron-printer
cd electron-printer
npm install
npm start
```

## How to Test Without a Physical Printer

If your environment has no configured printers:

1. Open the app.
2. Select a width preset.
3. Click `Print Test`.
4. A print preview window opens.
5. Press `Cmd+P` (macOS) or `Ctrl+P` (Windows/Linux), then choose `Save as PDF`.

## Notes by Platform

- **macOS:** If CUPS has no destinations, preview/PDF mode still works for validation.
- **Linux:** Ensure CUPS is running and the user has print permissions for real printer tests.
- **Windows:** Ensure Print Spooler is running and drivers are installed for real printer tests.

## Credits

- [Hubert Formin](https://github.com/Hubertformin) and contributors of `electron-pos-printer`
