$(document).ready(function () {
    // Globals
    var position = {
        top: '50%',
        left: '50%'
    };

    // Event handlers
    /**
     * On contextmenu click save the mouse position
     */
    $(document).on('contextmenu', function (ev) {
        position = {
            top: ev.pageY,
            left: ev.pageX
        }
    });
    /**
     * On message received analyze a request and call the appropriate method
     */
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        var msgId;

        msgId = request.msgId;
        alert(msgId);
        switch (msgId) {
            case 'drawSquare':
                drawSquare();
                break;
            case 'saveImg':
                saveImage(request.data);
                break;
        }
    });
    /**
     * Draws draggable resizable transparent red square on the page
     */
    function drawSquare() {
        $('<div>')
            .addClass('screenshothelper')
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
            .mouseenter(function () {
                $(this).find('.ui-resizable-se')
                    .addClass('ui-icon ui-icon-gripsmall-diagonal-se');
            }).mouseleave(function () {
                $(this).find('.ui-resizable-se')
                    .removeClass('ui-icon ui-icon-gripsmall-diagonal-se');
            });
    }

    /**
     * Opens a new page with the image
     *
     * @param {string} imgData
     */
    function saveImage(imgData) {
        window.open(imgData);
    }
});