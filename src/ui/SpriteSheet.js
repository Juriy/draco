'use strict';

/**
 *
 * @param image the image object to use for drawing
 * @param frames the array describing the frames of the sprite sheet in a format:
 * [
 *     [x, y, width, height, anchorX, anchorY] // - frame 1
 *     [x, y, width, height, anchorX, anchorY] // - frame 2
 *     ...
 * ]
 */

export default class SpriteSheet {
	constructor(image, frames) {
		this._image = image;
		this._frames = frames;
	}

	/**
	 * Draws the frame of the sprite sheet in the given coordinates of the
	 * Context.
	 * @param ctx the context to draw at
	 * @param index the index of the frame
	 * @param x x coordinate where the anchor will appear
	 * @param y y coordinate where the anchor will appear
	 */
	drawFrame(ctx, index, x, y) {
		let frame = this._frames[index];

		if (!frame) {
			return;
		}

		ctx.drawImage(this._image, frame[SpriteSheet.FRAME_X], frame[SpriteSheet.FRAME_Y],
			frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT],
			x - frame[SpriteSheet.FRAME_ANCHOR_X], y - frame[SpriteSheet.FRAME_ANCHOR_Y],
			frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT]);
	};
}

SpriteSheet.FRAME_X = 0;
SpriteSheet.FRAME_Y = 1;
SpriteSheet.FRAME_WIDTH = 2;
SpriteSheet.FRAME_HEIGHT = 3;
SpriteSheet.FRAME_ANCHOR_X = 4;
SpriteSheet.FRAME_ANCHOR_Y = 5;
