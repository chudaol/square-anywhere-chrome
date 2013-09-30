var position = {
    top: '50%',
    left: '50%'
};

function drawSquare() {
    $('<div>')
        .attr('id','screenshothelper')
        .appendTo('body')
        .css({
            'background': 'transparent',
            'position': 'absolute',
            'border': '2px solid red',
            'width': '200px',
            'height': '200px',
            'z-index': 3000,
            'top': position.top,
            'left': position.left
        })
        .resizable()
        .draggable()
        .dblclick(function () {
            $(this).remove();
        })
        .find('.ui-icon.ui-icon-gripsmall-diagonal-se')
        .removeClass('ui-icon ui-icon-gripsmall-diagonal-se');
}

function saveImage(imgData) {
    window.open(imgData);
}

$(document).ready(function () {
    $(document).on('contextmenu', function (ev) {
        position = {
            top: ev.pageY,
            left: ev.pageX
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var msgId;

    msgId = request.msgId;

    switch (msgId) {
        case 'drawSquare':
            drawSquare();
            break;
        case 'saveImg':
            saveImage(request.imgData);

    }
});