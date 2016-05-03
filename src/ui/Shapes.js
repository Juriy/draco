'use strict';

/**
 * A number of utility methods for drawing the polygons,
 * agents (boids), arrows, fills, etc.
 */
let Shapes = {};

Shapes.drawMarker = function (ctx, x, y, size, lineWidth, color) {
	size = size || 10;
	lineWidth = lineWidth || 5;
	color = color || 'blue';
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(x - size, y + size);
	ctx.lineTo(x + size, y - size);
	ctx.moveTo(x - size, y - size);
	ctx.lineTo(x + size, y + size);
	ctx.stroke();
	ctx.restore();
};

Shapes.drawArrow1 = function (ctx, x, y, length, offsetFromCenter, wingLength, wingDepth, angle) {
	length = length || 50;
	offsetFromCenter = offsetFromCenter || 15;
	wingLength = wingLength || 10;
	wingDepth = wingDepth || 5;
	angle = angle || 0;

	ctx.save();
	ctx.fillStyle = 'green';
	ctx.beginPath();

	if (angle) {
		ctx.translate(x, y);
		ctx.rotate(angle);
		ctx.translate(-x, -y);
	}

	ctx.moveTo(x + offsetFromCenter, y);
	ctx.lineTo(x + offsetFromCenter - wingDepth, y - wingLength);
	ctx.lineTo(x + offsetFromCenter + length, y);
	ctx.lineTo(x + offsetFromCenter - wingDepth, y + wingLength);

	ctx.closePath();
	ctx.fill();
	ctx.restore();
};

Shapes.drawPolygon = function (ctx, points) {
	ctx.save();
	ctx.strokeStyle = 'lightblue';
	ctx.fillStyle = 'rgba(173, 216, 230, 1)';
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i][0], points[i][1]);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
};

Shapes.fillPolygon = function (ctx, points) {
	ctx.save();

	ctx.strokeStyle = 'grey';
	ctx.lineWidth = 1;

	let minX = Number.MAX_VALUE;
	let minY = Number.MAX_VALUE;
	let maxX = Number.MIN_VALUE;
	let maxY = Number.MIN_VALUE;

	let angle = Math.PI / 4;

	for (let i = 0; i < points.length; i++) {
		if (points[i][0] < minX) {
			minX = points[i][0];
		}

		if (points[i][1] < minY) {
			minY = points[i][1];
		}

		if (points[i][0] > maxX) {
			maxX = points[i][0];
		}

		if (points[i][1] > maxY) {
			maxY = points[i][1];
		}
	}

	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i][0], points[i][1]);
	}
	ctx.closePath();
	ctx.clip();

	let linesOffset = (maxY - minY) / Math.tan(angle);

	ctx.beginPath();
	for (let i = minX - linesOffset; i < maxX; i += 15) {
		ctx.moveTo(i, maxY);
		ctx.lineTo(i + linesOffset, minY);
	}

	ctx.stroke();
	ctx.restore();
};

export default Shapes;
