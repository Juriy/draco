'use strict';

import EventEmitter from './EventEmitter';

export default class ResourceManager extends EventEmitter {
	constructor() {
		super();
		this._store = {};
	}

	load(resources) {
		let numResources = 0;
		let loadedResources = 0;

		const isImage = (ext) => {
			return ext === 'jpg' || ext === 'png';
		};

		const isJson = (ext) => {
			return ext === 'json';
		};

		const resolveIfDone = (resolve) => {
			return () => {
				loadedResources++;
				if (loadedResources === numResources) {
					resolve();
				}
			};
		};

		const onImageLoaded = (key, bin, done) => {
			return () => {
				this._store[key] = bin;
				done();
			};
		};

		const onBinaryLoaded = (key, req, done) => {
			return () => {
				this._store[key] = req.response;
				done();
			};
		};

		const onJsonLoaded = (key, req, done) => {
			return () => {
				this._store[key] = JSON.parse(req.responseText);
				done();
			};
		};

		const loadResource = (resolve, reject) => {
			return (key) => {
				let url = resources[key];
				let ext = url.split('.').pop();

				numResources++;

				if (isImage(ext)) {
					let img = new Image();

					img.src = url;
					img.onload = onImageLoaded(key, img, resolveIfDone(resolve));
					img.onerror = reject;
				} else {
					let req = new XMLHttpRequest();

					if (isJson(ext)) {
						req.addEventListener(
							'load',
							onJsonLoaded(key, req, resolveIfDone(resolve)));
					} else {
						req.responseType = 'arraybuffer';
						req.addEventListener(
							'load',
							onBinaryLoaded(key, req, resolveIfDone(resolve)));
					}

					req.addEventListener('error', reject);
					req.open('GET', url);
					req.send();
				}
			};
		};

		return new Promise(
			(resolve, reject) => {
				let keys = Object.getOwnPropertyNames(resources);

				keys.forEach(loadResource(resolve, reject));
			}
		);
	}

	get(key) {
		return this._store[key];
	}
}

