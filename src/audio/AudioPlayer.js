'use strict';

export default class AudioPlayer {

	constructor() {

	}

	static getAudioContext() {
		let AudioContext = window.AudioContext || window.webkitAudioContext;

		if (!constructor) {
			return null;
		}

		return new AudioContext();
	}
}