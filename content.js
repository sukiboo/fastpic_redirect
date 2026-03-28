// Remove the "Click to continue" overlay on /fullview/ pages
const link = document.querySelector('a[href="#"]');
if (link && link.textContent.includes("Click to continue")) {
  const overlay = link.closest("div[id]");
  if (overlay) overlay.remove();
}
