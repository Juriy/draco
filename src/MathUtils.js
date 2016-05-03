'use strict';

import Rect from './Rect';

let MathUtils = {};

MathUtils.getBoundingRectangle = function (points) {
	let minX = Number.MAX_VALUE;
	let minY = Number.MAX_VALUE;
	let maxX = Number.MIN_VALUE;
	let maxY = Number.MIN_VALUE;

	for (let i = 0; i < points.length; i++) {
		// TODO Destructuring?
		let x = points[i][0];
		let y = points[i][1];

		if (x < minX) {
			minX = x;
		}

		if (x > maxX) {
			maxX = x;
		}

		if (y < minY) {
			minY = y;
		}

		if (y > maxY) {
			maxY = y;
		}
	}

	let epsilon = Math.max(maxX - minX, maxY - minY) * 0.05;

	minX -= epsilon;
	maxX += epsilon;
	minY -= epsilon;
	maxY += epsilon;
	return new Rect(minX, minY, maxX - minX, maxY - minY);
};

/**
 * http://stackoverflow.com/questions/563198
 */
/* eslint-disable camelcase */
MathUtils.linesIntersect = function (p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {

	let s1_x, s1_y, s2_x, s2_y;

	s1_x = p1_x - p0_x;
	s1_y = p1_y - p0_y;
	s2_x = p3_x - p2_x;
	s2_y = p3_y - p2_y;

	let s, t;

	s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
	t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

	if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
		return [p0_x + (t * s1_x), p0_y + (t * s1_y)];
	}

	return null;
};
/* eslint-enable camelcase */

MathUtils.sign = function (number) {
	return number > 0 ? 1 : number === 0 ? 0 : -1;
};

MathUtils.pointInsidePolygon = function (px, py, polygon, rayX, rayY) {
	if ((rayX === undefined || rayY === undefined)) {
		let rect = MathUtils.getBoundingRectangle(polygon);

		rayX = rect.x + rect.width;
		rayY = py;
	}

	let intersectCount = 0;

	for (let i = 0; i < polygon.length; i++) {
		let polyX0 = polygon[i][0];
		let polyY0 = polygon[i][1];
		let polyX1 = i + 1 === polygon.length ? polygon[0][0] : polygon[i + 1][0];
		let polyY1 = i + 1 === polygon.length ? polygon[0][1] : polygon[i + 1][1];

		if (MathUtils.linesIntersect(px, py, rayX, rayY, polyX0, polyY0, polyX1, polyY1)) {
			intersectCount++;
		}
	}
	return intersectCount % 2 === 1;
};

// Can be probably optimized by checking that the both points are on one
// "side" of the poly
MathUtils.segmentIntersectsPolygon = function (x0, y0, x1, y1, polygon) {
	for (let i = 0; i < polygon.length; i++) {
		let polyX0 = polygon[i][0];
		let polyY0 = polygon[i][1];
		let polyX1 = i + 1 === polygon.length ? polygon[0][0] : polygon[i + 1][0];
		let polyY1 = i + 1 === polygon.length ? polygon[0][1] : polygon[i + 1][1];

		if (MathUtils.linesIntersect(x0, y0, x1, y1, polyX0, polyY0, polyX1, polyY1)) {
			return true;
		}
	}
	return false;
};

MathUtils.distance = function (x0, y0, x1, y1) {
	return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
};

MathUtils.distanceSquared = function (x0, y0, x1, y1) {
	return (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
};

// http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
MathUtils.distanceFromPointToSegment = function (pX, pY, segStartX, segStartY, segEndX, segEndY) {

	let lengthSquared = MathUtils.distanceSquared(segStartX, segStartY, segEndX, segEndY);

	if (lengthSquared === 0) {
		return MathUtils.distance(pX, pY, segStartX, segStartY);
	}

	let t = ((pX - segStartX) * (segEndX - segStartX) +
		(pY - segStartY) * (segEndY - segStartY)) / lengthSquared;

	if (t < 0) {
		return MathUtils.distance(pX, pY, segStartX, segStartY);
	}

	if (t > 1) {
		return MathUtils.distance(pX, pY, segEndX, segEndY);
	}

	return MathUtils.distance(pX, pY,
		segStartX + t * (segEndX - segStartX),
		segStartY + t * (segEndY - segStartY));
};

MathUtils.distanceFromPointToPolygon = function (px, py, polyPoints) {
	let minDist = MathUtils.distanceFromPointToSegment(px, py,
		polyPoints[polyPoints.length - 1][0], polyPoints[polyPoints.length - 1][1],
		polyPoints[0][0], polyPoints[0][1]);

	for (let i = 1; i < polyPoints.length; i++) {
		let dist = MathUtils.distanceFromPointToSegment(px, py,
			polyPoints[i - 1][0], polyPoints[i - 1][1],
			polyPoints[i][0], polyPoints[i][1]);

		if (dist < minDist) {
			minDist = dist;
		}
	}

	return minDist;
};

export default MathUtils;
