'use strict';

let {Engine, GameObject, Animator} = draco;

let canvas = document.querySelector('canvas');
let engine = new Engine(canvas);

class ArmSegment extends GameObject {
	constructor() {
		super();
	}

	update(fc) {
		//this._rot += 0.02;
	}

	setSize(w, h) {
		super.setSize(w, h);
		this.setAnchor((h / 2) / w, 0.5);
	}

	_renderSelf(fc) {
		let ctx = fc.graphContext;

		let w = this._width;
		let h = this._height;

		ctx.fillStyle = '#222';
		ctx.beginPath();
		ctx.arc(h / 2, h / 2, h / 2, 0, Math.PI*2, true);

		ctx.fill();
		ctx.fillRect(h * 0.25, h*0.25, w - h * 0.5, h * 0.5);
	}
}
let scene = engine.getScene();

let box = new Box();
box.setSize(30, 30);
box.setPos(389, 278);
scene.addChild(box);

// let box2 = new Box();
// box2.setSize(30, 30);
// box2.setPos(389, 278);
// scene.addChild(box2);

// Touching the box:
// x: -94, y: 273

let press = new Press();
press.setPos(-230, 273);
scene.addChild(press);

let seg1 = new ArmSegment();
seg1.setSize(120, 30);
seg1.setPos(230, 190);
seg1.setRot(-3*Math.PI / 4);

let seg2 = new ArmSegment();
seg2.setSize(100, 25);
seg2.setPos(110, 14);
seg2.setRot(1.5);
seg1.addChild(seg2);

let seg3 = new ArmSegment();
seg3.setSize(50, 20);
seg3.setPos(90, 14);
seg3.setRot(0.7);
seg2.addChild(seg3);

// Fingers
let seg4 = new ArmSegment();
seg4.setSize(40, 14);
seg4.setPos(43, 6);
seg4.setRot(-0.6);
seg3.addChild(seg4);

let seg41 = new ArmSegment();
seg41.setSize(35, 10);
seg41.setPos(37, 8);
seg41.setRot(1);
seg4.addChild(seg41);

let seg5 = new ArmSegment();
seg5.setSize(40, 14);
seg5.setPos(43, 12);
seg5.setRot(0.6);
seg3.addChild(seg5);

let seg51 = new ArmSegment();
seg51.setSize(35, 10);
seg51.setPos(37, 8);
seg51.setRot(-1);
seg5.addChild(seg51);

scene.addChild(seg1);

let state = 0;

let PI = Math.PI;
let times = [600, 1000, 600, 1300];
let angles = [
	[-3*PI/4, 1.5, 0.7, 1.1],
	[-0.3, 0.8, 1.07, 0.75],
	[-PI + 0.3, -0.8, -1.07, 0.75],
	[-PI + 0.3, -0.8, -1.07, 0.95],
	[-3*PI/4, 1.5, 0.7, 1.1]
];

let animator1 = new Animator(times[0]);
animator1.setAcceleration(0.5);
animator1.setDeceleration(0.2);
animator1.start();

const ROBOT = 1;
const PRESS = 2;

let phase = ROBOT;


scene.update = function(fc) {
	fc.dirtyRects.markAllDirty();

	switch(phase) {
		case ROBOT:
			updateRobotPhase(fc);
			break;

		case PRESS:
			updatePressPhase(fc);
			break;
	}
};

function updateRobotPhase(fc) {
	if (state < times.length) {
		let alpha = animator1.update(fc.dt);
		if (alpha !== false) {
			seg1.setRot(interpolate(angles[state][0], angles[state + 1][0], alpha));
			seg2.setRot(interpolate(angles[state][1], angles[state + 1][1], alpha));
			seg3.setRot(interpolate(angles[state][2], angles[state + 1][2], alpha));
			seg4.setRot(-interpolate(angles[state][3], angles[state + 1][3], alpha));
			seg5.setRot(interpolate(angles[state][3], angles[state + 1][3], alpha));
		} else {
			state++;

			if (state === 1) {
				scene.removeChild(box);
				seg3.addChild(box);
				box.setPos(90, 9.5);
			} else if (state == 2) {
				seg3.removeChild(box);
				scene.addChild(box);
				box.setPos(71, 278);
			}

			animator1.stop();
			animator1.setDuration(times[state]);
			animator1.start();
		}
	} else {
		phase = PRESS;
		state = 0;
		animator1.stop();
		animator1.setDuration(pressTimes[state]);
		animator1.start();
	}
}

let pressTimes = [600, 300, 600, 700, 400, 600];
let pressPositions = [-225, -169, -169, 148, 148, -245, -245];

function updatePressPhase(fc) {

	if (state < pressTimes.length) {
		let alpha = animator1.update(fc.dt);

		if (alpha !== false) {
			let x = interpolate(
				pressPositions[state],
				pressPositions[state + 1], alpha);
			press.setX(x);
		} else {
			state++;

			if (state === 2) {
				scene.removeChild(box);
				press.addChild(box);
				// box.setAnchor(0, 0);
				box.setPos(465, 25);
				// box.setAnchor(0.5, 0.5);
			} else if (state === 4) {
				press.removeChild(box);
				scene.addChild(box);
				box.setPos(389, 278);
			}

			animator1.stop();
			animator1.setDuration(pressTimes[state]);
			animator1.start();
		}
	} else {
		phase = ROBOT;
		state = 0;
		animator1.stop();
		animator1.setDuration(times[state]);
		animator1.start();
	}
}

function interpolate(start, end, alpha) {
	return (1 - alpha)*start + (alpha) * end;
}

engine.start();