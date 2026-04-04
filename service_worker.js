const ICON_ON = "icons/on.png";
const ICON_OFF = "icons/off.png";
const RULE_ID = 1;

const REDIRECT_RULE = {
  id: RULE_ID,
  priority: 1,
  action: {
    type: "redirect",
    redirect: {
      regexSubstitution: "\\1/fullview/\\3"
    }
  },
  condition: {
    regexFilter: "^(https?://fastpic\\.(org|ru))/view/(.+)\\.html",
    resourceTypes: ["main_frame"]
  }
};

function enable() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [REDIRECT_RULE],
    removeRuleIds: [RULE_ID]
  });
  chrome.action.setIcon({ path: ICON_ON });
}

function disable() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID]
  });
  chrome.action.setIcon({ path: ICON_OFF });
}

// Add the redirect rule on install
chrome.runtime.onInstalled.addListener(() => enable());

// Sync icon state when service worker wakes up
chrome.runtime.onStartup.addListener(async () => {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  const isEnabled = rules.some(r => r.id === RULE_ID);
  chrome.action.setIcon({ path: isEnabled ? ICON_ON : ICON_OFF });
});

// Toggle extension on/off via toolbar icon
chrome.action.onClicked.addListener(async () => {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  const isEnabled = rules.some(r => r.id === RULE_ID);
  if (isEnabled) {
    disable();
  } else {
    enable();
  }
});
