function onClickHandler(info) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, info);
    });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

    chrome.contextMenus.create({
        "contexts": ["all"],
        "title": "Square here!",
        "id": "square"
    });

//    chrome.contextMenus.create({
//        "contexts": ["all"],
//        "title": "Arrow",
//        "id": "arrow"
//    });

});
