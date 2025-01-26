document.getElementById('pinTabs').addEventListener('click', function() {
  chrome.runtime.sendMessage({action: "pinTabs"});
});