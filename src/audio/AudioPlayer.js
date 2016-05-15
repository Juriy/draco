'use strict';

export default class AudioPlayer {

	constructor() {
		this._actx = AudioPlayer.getAudioContext();

		if (this._actx === null) {
			// Probably a bit too strict...
			throw Error('Sound is not supported');
		}
	}

	loadSounds(sounds) {
		
		Object.getOwnPropertyNames(sounds).forEach(() => {
			
		});
		
		var dogBarkingBuffer = null;

		function loadDogSound(url) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';

			// Decode asynchronously
			request.onload = function() {
				context.decodeAudioData(request.response, function(buffer) {
					dogBarkingBuffer = buffer;
				}, onError);
			}
			request.send();
		}
	}

	static getAudioContext() {
		let AudioContext = window.AudioContext || window.webkitAudioContext;

		if (!constructor) {
			return null;
		}

		return new AudioContext();
	}
}