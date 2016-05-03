'use strict';

export default class ImageManager {
	constructor() {
		this._imageQueue = [];
		this._images = {};
	}

	_addImage(key, path) {
		this._imageQueue.push({
			key: key,
			path: path
		});
	};

	load(images, onDone, onProgress) {
		let noop = () => {};
		let queue = this._imageQueue;

		for (let im in images) {
			this._addImage(im, images[im]);
		}

		onDone = onDone || noop;
		onProgress = onProgress || noop;

		this._imageQueue = [];

		if (queue.length === 0) {
			onProgress(0, 0, null, null, true);
			return;
		}

		let itemCounter = {
			loaded: 0,
			total: queue.length
		};

		for (let i = 0; i < queue.length; i++) {
			this._loadItem(queue[i], itemCounter, onDone, onProgress);
		}
	}

	_loadItem(queueItem, itemCounter, onDone, onProgress) {
		let self = this;
		let img = new Image();

		img.onload = function () {
			self._images[queueItem.key] = img;
			self._onItemLoaded(queueItem, itemCounter,
				onDone, onProgress, true);
		};

		img.onerror = function () {
			self._images[queueItem.key] = self._placeholder;
			self._onItemLoaded(queueItem, itemCounter,
				onDone, onProgress, false);
		};
		img.src = queueItem.path;
	}

	_onItemLoaded(queueItem, itemCounter, onDone, onProgress, success) {
		itemCounter.loaded++;
		onProgress(itemCounter.loaded, itemCounter.total,
			queueItem.key, queueItem.path, success);

		if (itemCounter.loaded === itemCounter.total) {
			onDone();
		}
	}

	get(key) {
		return this._images[key];
	}
}

