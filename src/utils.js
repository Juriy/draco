'use strict';

/**
 * Checks if we're working with the touchscreen or with the
 * regular desktop browser. Used to determine, what kind of events should we use:
 * mouse events or touch events.
 */
function isTouchDevice() {
	return ('ontouchstart' in document.documentElement);
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export {isTouchDevice, dist};
