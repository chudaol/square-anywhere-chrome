// Event handlers
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

    chrome.contextMenus.create({
        "contexts": ["all"],
        "title": "Square here!",
        "id": "square"
    });

    chrome.contextMenus.create({
        "contexts": ["all"],
        "title": "Capture!",
        "id": "capture"
    });
});

/**
 * Handles click on context menu
 *
 * @param {Object} info
 */
function onClickHandler(info) {
    var id;

    id = info.menuItemId;

    switch(id) {
        case 'square':
            sendMessage('drawSquare', info);
            break;
        case 'capture':
            captureScreen();
            break;
    }
}

/**
 * Sends a message to script.js
 *
 * @param {String} msgId
 * @param {Object} info
 */
function sendMessage(msgId, info) {
    var objToSend = {msgId: msgId};

    $.extend(true, objToSend, info);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, objToSend);
    });
}

/**
 * Captures a screen and send a message with captured data
 */
function captureScreen() {
    chrome.tabs.captureVisibleTab({format: 'png'}, function (imgData) {
        sendMessage('saveImg', {imgData: imgData})
    });
}
