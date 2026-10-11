const ICON_ON = "icons/on.png";
const ICON_OFF = "icons/off.png";

function enable() {
  chrome.storage.local.set({ enabled: true });
  chrome.action.setIcon({ path: ICON_ON });
}

function disable() {
  chrome.storage.local.set({ enabled: false });
  chrome.action.setIcon({ path: ICON_OFF });
}

// Turn the extension on at install
chrome.runtime.onInstalled.addListener(() => enable());

// Sync icon state when service worker wakes up
chrome.runtime.onStartup.addListener(async () => {
  const { enabled } = await chrome.storage.local.get("enabled");
  chrome.action.setIcon({ path: enabled ? ICON_ON : ICON_OFF });
});

// Toggle extension on/off via toolbar icon
chrome.action.onClicked.addListener(async () => {
  const { enabled } = await chrome.storage.local.get("enabled");
  if (enabled) {
    disable();
  } else {
    enable();
  }
});
