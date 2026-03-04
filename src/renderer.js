const appApi = window.electronPrinter;
const ui = {};

function setStatus(message, isError = false) {
  if (!ui.status) return;
  ui.status.textContent = message;
  ui.status.dataset.error = String(isError);
}

function formatError(error) {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  return String(error);
}

function setVersions() {
  if (!appApi?.versions) return;
  const { chrome, node, electron } = appApi.versions;

  const chromeVersion = document.getElementById("chrome-version");
  const nodeVersion = document.getElementById("node-version");
  const electronVersion = document.getElementById("electron-version");

  if (chromeVersion) chromeVersion.textContent = chrome;
  if (nodeVersion) nodeVersion.textContent = node;
  if (electronVersion) electronVersion.textContent = electron;
}

function setBusy(busy) {
  if (ui.printBtn) ui.printBtn.disabled = busy;
  if (ui.refreshBtn) ui.refreshBtn.disabled = busy;
}

function createPrinterRadio(printer, index) {
  const id = `printer_${index}`;
  const row = document.createElement("div");
  row.className = "printer-option";

  const input = document.createElement("input");
  input.type = "radio";
  input.id = id;
  input.name = "printer";
  input.value = printer.name;
  input.required = true;
  if (index === 0) input.checked = true;

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = printer.displayName || printer.name;

  row.appendChild(input);
  row.appendChild(label);
  return row;
}

function renderPrinters(printers) {
  if (!ui.list) return;
  ui.list.innerHTML = "";

  if (!printers.length) {
    setStatus("No printers found.");
    return;
  }

  const fragment = document.createDocumentFragment();
  printers.forEach((printer, index) => {
    fragment.appendChild(createPrinterRadio(printer, index));
  });
  ui.list.appendChild(fragment);
  setStatus(`${printers.length} printer(s) loaded.`);
}

async function loadPrinters() {
  if (!appApi) return;
  setBusy(true);
  setStatus("Loading printers...");

  try {
    const printers = await appApi.listPrinters();
    renderPrinters(printers);
  } catch (error) {
    setStatus(
      `Failed to load printers: ${String(error?.message || error)}`,
      true,
    );
  } finally {
    setBusy(false);
  }
}

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected?.value || "";
}

async function onPrintSubmit(event) {
  event.preventDefault();

  const printerName = getSelectedValue("printer");
  const width = getSelectedValue("width");
  if (!width) {
    setStatus("Select width before printing.", true);
    return;
  }

  setBusy(true);
  setStatus(printerName ? "Sending print job..." : "Opening preview window...");

  try {
    const result = await appApi.print({ printerName, width });
    if (result?.mode === "preview") {
      setStatus(
        "Preview opened. Use Cmd+P in preview window, then choose Save as PDF.",
      );
    } else {
      setStatus(`Print job sent to "${printerName}".`);
    }
  } catch (error) {
    setStatus(`Print failed: ${formatError(error)}`, true);
  } finally {
    setBusy(false);
  }
}

function cacheDom() {
  ui.form = document.getElementById("printForm");
  ui.list = document.getElementById("list_printers");
  ui.status = document.getElementById("status");
  ui.printBtn = document.getElementById("printBtn");
  ui.refreshBtn = document.getElementById("refreshPrintersBtn");
}

function bindEvents() {
  ui.form?.addEventListener("submit", onPrintSubmit);
  ui.refreshBtn?.addEventListener("click", loadPrinters);
}

window.addEventListener("DOMContentLoaded", () => {
  cacheDom();
  setVersions();

  if (!appApi) {
    setStatus("Electron bridge is unavailable.", true);
    return;
  }

  bindEvents();
  loadPrinters();
});
