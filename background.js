const urlsToPin = [
  'https://app.ynab.com/',
  'https://mail.google.com/',
  'https://cdillcdemo3.service-now.com/',
  'https://cdillcdemo2.service-now.com/',
  'https://chatgpt.com/',
  'https://thinkahead.okta.com'
];

function normalizeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace('www.', '') + parsedUrl.pathname;
  } catch (e) {
    console.error('Invalid URL:', url);
    return '';
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "pinTabs") {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      const normalizedUrlsToPin = urlsToPin.map(url => normalizeUrl(url));
      const openTabUrls = tabs.map(tab => ({ url: normalizeUrl(tab.url), pinned: tab.pinned }));

      normalizedUrlsToPin.forEach(urlToPin => {
        // const isAlreadyPinned = openTabUrls.some(tab => tab.url === urlToPin && tab.pinned);
        const isAlreadyPinned = openTabUrls.some(tab => tab.url.includes(urlToPin) && tab.pinned);
        if (!isAlreadyPinned) {
          const fullUrl = urlsToPin.find(url => normalizeUrl(url) === urlToPin);
          chrome.tabs.create({ url: fullUrl, pinned: true });
        }
        else{
          console.log('this is already pinned!');
        }
      });
    });
  }
});