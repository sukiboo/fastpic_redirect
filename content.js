// Remove the "Click to continue" overlay on /fullview/ pages
function removeOverlay() {
  for (const link of document.querySelectorAll('a[href="#"]')) {
    if (link.textContent.includes("Click to continue")) {
      const overlay = link.closest("div[id]");
      if (overlay) overlay.remove();
    }
  }
}

removeOverlay();

new MutationObserver(() => removeOverlay()).observe(
  document.documentElement, { childList: true, subtree: true }
);
