

browser
  .browserAction
  .onClicked
  .addListener(() => {
    const url = browser.extension.getURL('popup.html');
    browser.tabs.create({ url });
  }
);
