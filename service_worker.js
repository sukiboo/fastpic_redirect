const ICON_ON = "icons/on.png";
const ICON_OFF = "icons/off.png";

let enabled = true;

function transformUrl(rawUrl) {
  const url = new URL(rawUrl);
  const path = url.pathname;
  if (!path.endsWith(".html") || !path.includes("/view/")) {
    return null;
  }
  url.pathname = path.replace(/\.html$/, "").replace("/view/", "/fullview/");
  return url.href;
}

chrome.action.onClicked.addListener(() => {
  enabled = !enabled;
  console.log("fastpic_redirect:", enabled ? "on" : "off");
  chrome.action.setIcon({ path: enabled ? ICON_ON : ICON_OFF });
});

chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    if (!enabled) return;
    const newUrl = transformUrl(details.url);
    if (newUrl) {
      console.log("fastpic_redirect:", details.url, "->", newUrl);
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  },
  { url: [{ hostPrefix: "fastpic", pathSuffix: ".html" }] }
);
