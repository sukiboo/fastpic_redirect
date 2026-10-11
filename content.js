const IMAGE_URLS = /https:\/\/i\d+\.fastpic\.\w+\/big\/[\w\/.]+\?md5=[\w-]+&(?:amp;)?expires=\d+/g;
// The page also embeds URLs of other images, so match on this page's file name,
// e.g. "abc.png" for "/view/128/2026/1008/abc.png.html"
const FILE_NAME = location.pathname.split("/").pop().replace(/\.html$/, "");
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000;

function imageUrlIn(html) {
  const url = html.match(IMAGE_URLS)?.find(url => url.includes(`/${FILE_NAME}?`));
  return url?.replace("&amp;", "&");
}

// Resolve with the image URL as soon as the parser reaches it,
// or with undefined if the page finishes loading without one
function imageUrlInPage() {
  return new Promise(resolve => {
    const check = () => {
      const url = imageUrlIn(document.documentElement.innerHTML);
      if (!url && document.readyState === "loading") return;
      observer.disconnect();
      resolve(url);
    };
    const observer = new MutationObserver(check);
    observer.observe(document, { childList: true, subtree: true });
    document.addEventListener("DOMContentLoaded", check);
    check();
  });
}

// The image URL needs a signed token that only the page source has. If the page
// loaded without it, the server returned an error page instead (HTTP 502, or
// "Could not connect to DB server" with HTTP 200), so fetch the page again
async function findImageUrl() {
  let url = await imageUrlInPage();
  for (let retry = 0; !url && retry < MAX_RETRIES; retry++) {
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    url = imageUrlIn(await (await fetch(location.href)).text());
  }
  return url;
}

async function redirect() {
  const { enabled } = await chrome.storage.local.get("enabled");
  if (!enabled) return;
  const url = await findImageUrl();
  if (url) location.replace(url);
}

redirect();
