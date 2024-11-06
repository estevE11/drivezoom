const DZDebug = false;

function log(message) {
    if (DZDebug) return;
    console.log("[DRIVE ZOOM Debug]: " + message);
}

function setStoredZoom(zoomInput) {
    const storedZoom = localStorage.getItem('zoomLevel');
    if(storedZoom) {
        zoomInput.focus();
        zoomInput.value = storedZoom;
        hitEnter(zoomInput);
    }
}

function startListening(zoomInputContainer) {
    const zoomInput = zoomInputContainer.querySelector('input');
    if(!zoomInput) setTimeout(() => startListening(zoomInputContainer), 100);
    else {
        setStoredZoom(zoomInput);
        setInterval(() => {
            const zoomLevel = zoomInput.value;
            log("Zoom level changed to " + zoomLevel);
            localStorage.setItem('zoomLevel', zoomLevel);
        }, 5*1000);
    }
}

window.onload = function () {
    let zoomInputContainer = document.getElementById('zoomSelect');
    startListening(zoomInputContainer);
}

function hitEnter(element) {
    hitKey(element, 'Enter', 13);
}

function hitEscape(element) {
    hitKey(element, 'Escape', 27);
}

function hitKey(element, keyStr, keyCode) {
    const keyData = {
        key: keyStr,
        code: keyStr,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true
    };

    let keydownEvent = new KeyboardEvent('keydown', keyData);
    let keypressEvent = new KeyboardEvent('keypress', keyData);

    element.dispatchEvent(keydownEvent);
    element.dispatchEvent(keypressEvent);

    log(keyStr + " pressed");
}