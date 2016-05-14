'use strict';

import EventEmitter from './EventEmitter';

export default class ImageManager extends EventEmitter {
	constructor() {
		super();
		this._store = {};
	}

	load(resources) {
		let numResources = 0;
		let loadedResources = 0;

		let onImageLoaded = (key, img, resolve) => {
			return () => {
				loadedResources++;
				this._store[key] = img;

				if (loadedResources === numResources) {
					resolve();
				}
			};
		};

		return new Promise(
			(resolve, reject) => {
				let keys = Object.getOwnPropertyNames(resources);

				keys.forEach((key) => {
					let url = resources[key];
					let img = new Image();

					numResources++;

					img.src = url;
					img.onload = onImageLoaded(key, img, resolve);
					img.onerror = reject;
				});
			}
		);
	}

	get(key) {
		return this._store[key];
	}
}

