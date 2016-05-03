(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("draco", [], factory);
	else if(typeof exports === 'object')
		exports["draco"] = factory();
	else
		root["draco"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ui = exports.dist = exports.isTouchDevice = exports.Rect = exports.MathUtils = exports.ImageManager = exports.GameScene = exports.GameObject = exports.EventEmitter = exports.Engine = exports.DirtyRectangleManager = exports.Animator = undefined;
	
	var _Animator = __webpack_require__(1);
	
	var _Animator2 = _interopRequireDefault(_Animator);
	
	var _DirtyRectangleManager = __webpack_require__(2);
	
	var _DirtyRectangleManager2 = _interopRequireDefault(_DirtyRectangleManager);
	
	var _Engine = __webpack_require__(4);
	
	var _Engine2 = _interopRequireDefault(_Engine);
	
	var _EventEmitter = __webpack_require__(6);
	
	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);
	
	var _GameObject = __webpack_require__(12);
	
	var _GameObject2 = _interopRequireDefault(_GameObject);
	
	var _GameScene = __webpack_require__(13);
	
	var _GameScene2 = _interopRequireDefault(_GameScene);
	
	var _ImageManager = __webpack_require__(10);
	
	var _ImageManager2 = _interopRequireDefault(_ImageManager);
	
	var _MathUtils = __webpack_require__(14);
	
	var _MathUtils2 = _interopRequireDefault(_MathUtils);
	
	var _Rect = __webpack_require__(3);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _utils = __webpack_require__(11);
	
	var _index = __webpack_require__(15);
	
	var ui = _interopRequireWildcard(_index);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Animator = _Animator2.default;
	exports.DirtyRectangleManager = _DirtyRectangleManager2.default;
	exports.Engine = _Engine2.default;
	exports.EventEmitter = _EventEmitter2.default;
	exports.GameObject = _GameObject2.default;
	exports.GameScene = _GameScene2.default;
	exports.ImageManager = _ImageManager2.default;
	exports.MathUtils = _MathUtils2.default;
	exports.Rect = _Rect2.default;
	exports.isTouchDevice = _utils.isTouchDevice;
	exports.dist = _utils.dist;
	exports.ui = ui;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * This is the base class to support the animation.
	 * @param duration - the duration of the one loop of the animation in milliseconds.
	 * For example, for a 6-frame animation where each frame is staying on the
	 * screen for 50 milliseconds the duration will be 300 milliseconds.
	 *
	 * The constructor accepts the bare minimum of parameters: the rest is set via setters:
	 * setRepeatBehavior and setRepeatCount (see the function docs for the details)
	 *
	 * Animator doesn't handle the timing internally. It should be used with the external
	 * timer. The external timer calls the update() function, passing the number of milliseconds
	 * since the previous call as the parameter.
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animator = function () {
		function Animator(duration) {
			_classCallCheck(this, Animator);
	
			this._duration = duration;
	
			// total loops to do
			this._repeatCount = 1;
	
			// the fraction to accelerate
			this._acceleration = 0;
	
			// the fraction to decelerate
			this._deceleration = 0;
	
			// How many loops were actually done
			this._loopsDone = 0;
	
			// Default repeat behavior is LOOP
			this._repeatBehavior = Animator.RepeatBehavior.LOOP;
	
			// Time, passed since the start of the loop
			this._timeSinceLoopStart = 0;
	
			// This flag is used to indicate that the animator has already
			// started to work with the certain configuration of parameters (repeatCount, repeat
			this._started = false;
			this._running = false;
	
			// Flag to mark that this loop is going into the opposite direction
			this._reverseLoop = false;
		}
	
		/**
	  * Starts the animator. After the animator is started you can't
	  * change its parameters until stop() is called.
	  */
	
	
		_createClass(Animator, [{
			key: 'start',
			value: function start() {
				this._started = true;
				this._running = true;
			}
	
			/**
	   * Checks if animator is currently running
	   */
	
		}, {
			key: 'isRunning',
			value: function isRunning() {
				return this._running;
			}
	
			/**
	   * Stops the animator and resets the internal state. This function
	   * may be called multiple times.
	   */
	
		}, {
			key: 'stop',
			value: function stop() {
				this._loopsDone = 0;
				this._timeSinceLoopStart = 0;
				this._running = false;
				this._started = false;
			}
		}, {
			key: 'pause',
	
	
			/**
	   * Pauses the animator. The animator will ignore the updates while paused, "freezing"
	   * the animation but not resetting its state. The animation can be then resumed
	   */
			value: function pause() {
				this._running = false;
			}
	
			/**
	   * Returns the duration of one loop of the animation
	   */
	
		}, {
			key: 'getDuration',
			value: function getDuration() {
				return this._duration;
			}
	
			/**
	   * Sets the duration of one loop of the animation. Should be value >=1
	   */
	
		}, {
			key: 'setDuration',
			value: function setDuration(duration) {
				this._throwIfStarted();
				if (duration < 1) {
					throw Error('Duration can\'t be < 1');
				}
				this._duration = duration;
			}
	
			/**
	   * Returns the configured repeat count, default is 1.
	   */
	
		}, {
			key: 'getRepeatCount',
			value: function getRepeatCount() {
				return this._repeatCount;
			}
	
			/**
	   * Set the number of loops in the animation, default is 1. Valid values
	   * are integers, -1 or Animator.INFINITE for infinite looping
	   */
	
		}, {
			key: 'setRepeatCount',
			value: function setRepeatCount(repeatCount) {
				this._throwIfStarted();
	
				if (repeatCount < 1 && repeatCount !== Animator.INFINITE) {
					throw Error('Repeat count must be greater than 0 or INFINITE');
				}
				this._repeatCount = repeatCount;
			}
	
			/**
	   * Returns the configured repeat behavior of the animator. Possible values are
	   * Animator.RepeatBehavior.LOOP and Animator.RepeatBehavior.REPATE. Read the docs for
	   * Animator.RepeatBehavior for the details on how they differ.
	   */
	
		}, {
			key: 'getRepeatBehavior',
			value: function getRepeatBehavior() {
				return this._repeatBehavior;
			}
	
			/**
	   * Sets the repeat behavior, default value is Animator.RepeatBehavior.LOOP
	   * @param behavior the new repat behavior
	   */
	
		}, {
			key: 'setRepeatBehavior',
			value: function setRepeatBehavior(behavior) {
				this._throwIfStarted();
				if (behavior !== Animator.RepeatBehavior.LOOP && behavior !== Animator.RepeatBehavior.REVERSE) {
					throw Error('Repeat behavior should be either RepeatBehavior.LOOP' + ' or RepeatBehavior.REVERSE');
				}
				this._repeatBehavior = behavior;
			}
	
			/**
	   * Returns the current value for the acceleration, default is 0.
	   */
	
		}, {
			key: 'getAcceleration',
			value: function getAcceleration() {
				return this._acceleration;
			}
	
			/**
	   * Sets the value for the acceleration. The value must be between 0 and 1-deceleration.
	   * @param acceleration new acceleration
	   */
	
		}, {
			key: 'setAcceleration',
			value: function setAcceleration(acceleration) {
				this._throwIfStarted();
				if (acceleration < 0 || acceleration > 1 || acceleration > 1 - this._deceleration) {
					throw Error('Acceleration value must be from 0 to 1 and ' + 'cannot be greater than (1 - deceleration)');
				}
	
				this._acceleration = acceleration;
			}
	
			/**
	   * Returns the current value for the deceleration, default is 0.
	   */
	
		}, {
			key: 'getDeceleration',
			value: function getDeceleration() {
				return this._deceleration;
			}
	
			/**
	   * Sets the value for the deceleraion. The value must be between 0 and 1-deceleration.
	   * @param deceleration new deceleration
	   */
	
		}, {
			key: 'setDeceleration',
			value: function setDeceleration(deceleration) {
				this._throwIfStarted();
				if (deceleration < 0 || deceleration > 1 || deceleration > 1 - this._acceleration) {
					throw Error('Deceleration value must be from 0 to 1 ' + 'and cannot be greater than (1 - acceleration)');
				}
	
				this._deceleration = deceleration;
			}
	
			/**
	   * In the default implementation the preprocessor takes into the account
	   * only acceleration and deceleration. In more advanced implementation it might
	   * use easing functions or any other more advanced transformations.
	   */
	
		}, {
			key: '_timingEventPreprocessor',
			value: function _timingEventPreprocessor(fraction) {
				return this._accelerationDecelerationPreprocessor(fraction);
			}
	
			/**
	   * Calculates the fraction with the respect to the acceleration and deceleration values.
	   * See the SMIL 2.0 specification for details on this calculation. You shouldn't really dive deep
	   * into the details of this particular piece of code, if you're not very curious.
	   */
	
		}, {
			key: '_accelerationDecelerationPreprocessor',
			value: function _accelerationDecelerationPreprocessor(fraction) {
				if (this._acceleration || this._deceleration) {
					var runRate = 1 / (1 - this._acceleration / 2 - this._deceleration / 2);
	
					if (fraction < this._acceleration) {
						fraction *= runRate * (fraction / this._acceleration) / 2;
					} else if (fraction > 1 - this._deceleration) {
						// time spent in deceleration portion
						var tdec = fraction - (1 - this._deceleration);
						// proportion of tdec to total deceleration time
						var pdec = tdec / this._deceleration;
	
						fraction = runRate * (1 - this._acceleration / 2 - this._deceleration + tdec * (2 - pdec) / 2);
					} else {
						fraction = runRate * (fraction - this._acceleration / 2);
					}
					// clamp fraction to [0,1] since above calculations may
					// cause rounding errors
					if (fraction < 0) {
						fraction = 0;
					} else if (fraction > 1) {
						fraction = 1;
					}
				}
	
				return fraction;
			}
	
			/**
	   * This function should be called by the external timer to update the state
	   * of the animator.
	   * @param deltaTime - time passed since the last upate. 0 is valid value.
	   */
	
		}, {
			key: 'update',
			value: function update(deltaTime) {
				// Will return undefined
				if (!this._started) {
					return false;
				}
	
				// If the animator is paused we pass 0 as deltaTime - like nothing has changed
				if (!this._running) {
					deltaTime = 0;
				}
	
				this._timeSinceLoopStart += deltaTime;
	
				// If we exceeded the loop time, we must take care of what to do next:
				// adjust the direction of the animation, call hook functions etc.
				if (this._timeSinceLoopStart >= this._duration) {
	
					// Just in case, we skipped more than one loop, determine how many loops did we miss
					var loopsSkipped = Math.floor(this._timeSinceLoopStart / this._duration);
	
					this._timeSinceLoopStart %= this._duration;
	
					// truncate to the number of loops skipped. Even if we skipped 5 loops,
					// but there was only 3 left, we don't want to fire extra listeners.
					if (this._repeatCount !== Animator.INFINITE && loopsSkipped > this._repeatCount - this._loopsDone) {
						loopsSkipped = this._repeatCount - this._loopsDone;
					}
	
					// Call the hook for each of the skipped loops
					for (var i = 1; i <= loopsSkipped; i++) {
						this._loopsDone++;
						this._reverseLoop = this._repeatBehavior === Animator.RepeatBehavior.REVERSE && this._loopsDone % 2 === 1;
						this._onLoopEnd(this._loopsDone);
					}
	
					// Check if we reached the end of the animation
					if (this._repeatCount !== Animator.INFINITE && this._loopsDone === this._repeatCount) {
						this._onAnimationEnd();
						this.stop();
						return false;
					}
				}
	
				// If this is the loop that is going backwards - reverse the fraction as well
				var fraction = this._timeSinceLoopStart / this._duration;
	
				if (this._reverseLoop) {
					fraction = 1 - fraction;
				}
	
				// Give away for preprocessing (acceleration/deceleration, easing functions etc)
				fraction = this._timingEventPreprocessor(fraction);
	
				// Call update
				this._onUpdate(fraction, this._loopsDone);
				return fraction;
			}
	
			/**
	   * Hook function. Override in subclass to provide the specific
	   * implementation of the updates. For example, you may change the
	   * active frame, adjust the coordinates or color of the object.
	   *
	   * @param fraction the current fraction of the animation: from 0 to 1
	   * @param loopsDone how many loops done already.
	   */
	
		}, {
			key: '_onUpdate',
			value: function _onUpdate(fraction, loopsDone) {}
	
			/**
	   * Hook function - called when the loop ends. Should be owerwritten in
	   * subclasses if you need any extra functionality here.
	   * @param loopsDone the number of loops done from the start of the animation,
	   * the latest loop is included.
	   */
	
		}, {
			key: '_onLoopEnd',
			value: function _onLoopEnd(loopsDone) {}
	
			/**
	   * Hook function - called when the animation ends to be owerwritten in
	   * subclasses if you need any extra functionality here.
	   */
	
		}, {
			key: '_onAnimationEnd',
			value: function _onAnimationEnd() {}
	
			/**
	   * This function is called to ensure that the animator is not running
	   * (changing the setting of the running animator is not allowed)
	   */
	
		}, {
			key: '_throwIfStarted',
			value: function _throwIfStarted() {
				if (this._started) {
					throw Error('Cannot change property on the started animator');
				}
			}
		}]);
	
		return Animator;
	}();
	
	/**
	 * A possible parameter to setLoopCount.
	 */
	
	
	exports.default = Animator;
	Animator.INFINITE = -1;
	
	/**
	 * RepeatBehavior determines what animator does after reaching the end of the loop.
	 * If it is set to Animator.RepeatBehavior.LOOP, then the next loop will start from 0 again,
	 * proceeding to 1. If the behavior is Animator.RepeatBehavior.REVERSE the odd loops will run
	 * backwards - from 1 to 0. Obviously setting this parameter only makes sense when the
	 * number of loops is more than 1.
	 */
	Animator.RepeatBehavior = {
		LOOP: 1,
		REVERSE: 2
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(3);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DirtyRectangleManager = function () {
		function DirtyRectangleManager() {
			var allDirtyThreshold = arguments.length <= 0 || arguments[0] === undefined ? 0.5 : arguments[0];
	
			_classCallCheck(this, DirtyRectangleManager);
	
			this._allDirtyThreshold = allDirtyThreshold;
			this._viewport = new _Rect2.default(0, 0, 100, 100);
			this._dirtyRect = null;
			this._allDirty = true;
			this.markAllDirty();
		}
	
		_createClass(DirtyRectangleManager, [{
			key: 'clear',
			value: function clear() {
				this._dirtyRect = null;
				this._allDirty = false;
			}
		}, {
			key: 'markDirty',
			value: function markDirty(rect) {
				if (!(rect.width || rect.height) || this._allDirty) {
					return;
				}
	
				rect = this._viewport.intersection(rect);
	
				if (!rect) {
					return;
				}
	
				if (this._dirtyRect) {
					this._dirtyRect = this._dirtyRect.convexHull(rect);
					if (this._dirtyRect.width * this._dirtyRect.height > this._allDirtyThreshold * this._viewport.width * this._viewport.height) {
						this.markAllDirty();
					}
				} else {
					this._dirtyRect = this._viewport.intersection(rect);
				}
			}
		}, {
			key: 'markAllDirty',
			value: function markAllDirty() {
				this._allDirty = true;
				this._dirtyRect = this._viewport.copy();
			}
		}, {
			key: 'isClean',
			value: function isClean() {
				return !this._dirtyRect;
			}
		}, {
			key: 'isAllDirty',
			value: function isAllDirty() {
				return this._allDirty;
			}
		}, {
			key: 'getDirtyRect',
			value: function getDirtyRect() {
				return this._dirtyRect;
			}
		}, {
			key: 'setViewport',
			value: function setViewport(width, height) {
				if (this._viewport.width === width && this._viewport.height === height) {
					return;
				}
				this._viewport.width = width;
				this._viewport.height = height;
				this.markAllDirty();
			}
		}]);
	
		return DirtyRectangleManager;
	}();
	
	exports.default = DirtyRectangleManager;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * TODO: refactor-out object destructuring
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rect = function () {
		function Rect(x, y, width, height) {
			_classCallCheck(this, Rect);
	
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
	
		_createClass(Rect, [{
			key: 'copy',
			value: function copy() {
				return new Rect(this.x, this.y, this.width, this.height);
			}
		}, {
			key: 'equals',
			value: function equals(r2) {
				return this.x === r2.x && this.y === r2.y && this.width === r2.width && this.height === r2.height;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return '[x=' + this.x + ', y=' + this.y + ',' + ('width=' + this.width + ', height=' + this.height + ']');
			}
		}, {
			key: 'intersects',
			value: function intersects(x2, y2, w2, h2) {
				if (arguments.length === 1) {
					var r = x2;
	
					x2 = r.x;
					y2 = r.y;
					w2 = r.width;
					h2 = r.height;
				}
	
				return this.x <= x2 + w2 && this.x + this.width >= x2 && this.y <= y2 + h2 && this.y + this.height >= y2;
			}
	
			/**
	   * Returns true if the given rect fully covers the other one
	   */
	
		}, {
			key: 'covers',
			value: function covers(x2, y2, w2, h2) {
				if (arguments.length === 1) {
					var r = x2;
	
					x2 = r.x;
					y2 = r.y;
					w2 = r.width;
					h2 = r.height;
				}
	
				return x2 >= this.x && y2 >= this.y && x2 + w2 <= this.x + this.width && y2 + h2 <= this.y + this.height;
			}
	
			/**
	   * Assumes that neither of rectangles is zero-area
	   */
	
		}, {
			key: 'convexHull',
			value: function convexHull(x2, y2, w2, h2) {
				if (arguments.length === 1) {
					var r = x2;
	
					x2 = r.x;
					y2 = r.y;
					w2 = r.width;
					h2 = r.height;
				}
	
				var x = Math.min(this.x, x2);
				var y = Math.min(this.y, y2);
				var width = Math.max(this.x + this.width, x2 + w2) - x;
				var height = Math.max(this.y + this.height, y2 + h2) - y;
	
				return new Rect(x, y, width, height);
			}
		}, {
			key: 'intersection',
			value: function intersection(x2, y2, w2, h2) {
				if (arguments.length === 1) {
					var r = x2;
	
					x2 = r.x;
					y2 = r.y;
					w2 = r.width;
					h2 = r.height;
				}
	
				var x = Math.max(this.x, x2);
				var y = Math.max(this.y, y2);
				var width = Math.min(this.x + this.width, x2 + w2) - x;
				var height = Math.min(this.y + this.height, y2 + h2) - y;
	
				if (width <= 0 || height <= 0) {
					return null;
				}
	
				return new Rect(x, y, width, height);
			}
		}, {
			key: 'containsPoint',
			value: function containsPoint(x, y) {
				return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
			}
	
			/**
	   * Given a rectangular grid, with the grid cell size cellW, cellH test which cells
	   * are overlapped by the rectangle. cellsInRow and cellsInColumn are used only
	   * to limit the coordinates (to prevent going out of bounds in arrays for example)
	   *
	   */
	
		}, {
			key: 'getOverlappingGridCells',
			value: function getOverlappingGridCells(cellW, cellH, cellsInRow, cellsInColumn) {
				var rectX = Math.max(0, Math.floor(this.x / cellW));
				var rectY = Math.max(0, Math.floor(this.y / cellH));
				var rectWidth = Math.min(cellsInRow - rectX, Math.floor((this.x + this.width) / cellW) - rectX + 1);
				var rectHeight = Math.min(cellsInColumn - rectY, Math.floor((this.y + this.height) / cellH) - rectY + 1);
	
				return new Rect(rectX, rectY, rectWidth, rectHeight);
			}
		}]);
	
		return Rect;
	}();
	
	exports.default = Rect;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Keyboard = __webpack_require__(5);
	
	var _Keyboard2 = _interopRequireDefault(_Keyboard);
	
	var _TouchInputHandler = __webpack_require__(7);
	
	var _TouchInputHandler2 = _interopRequireDefault(_TouchInputHandler);
	
	var _MouseInputHandler = __webpack_require__(9);
	
	var _MouseInputHandler2 = _interopRequireDefault(_MouseInputHandler);
	
	var _DirtyRectangleManager = __webpack_require__(2);
	
	var _DirtyRectangleManager2 = _interopRequireDefault(_DirtyRectangleManager);
	
	var _ImageManager = __webpack_require__(10);
	
	var _ImageManager2 = _interopRequireDefault(_ImageManager);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Engine = function () {
		function Engine(id, vpWidth, vpHeight) {
			_classCallCheck(this, Engine);
	
			this._canvas = document.getElementById(id);
			this._ctx = this._canvas.getContext('2d');
			this._scenes = {};
			this._currentScene = null;
			this._lastTick = Date.now();
			this._input = (0, _utils.isTouchDevice)() ? _TouchInputHandler2.default : _MouseInputHandler2.default;
			this._keyboard = new _Keyboard2.default(this._canvas);
	
			this._dirtyRects = new _DirtyRectangleManager2.default();
			this._dirtyRects.setViewport(vpWidth, vpHeight);
			this._resourceManager = new _ImageManager2.default();
			this._tick = this._tick.bind(this);
	
			this._gameContext = {
				resourceManager: this._resourceManager,
				width: this._canvas.width,
				height: this._canvas.height
			};
		}
	
		_createClass(Engine, [{
			key: 'loadResources',
			value: function loadResources(resourceData, onDone) {
				this._resourceManager.load(resourceData, onDone, function onProgress() {});
			}
		}, {
			key: 'getResource',
			value: function getResource(name) {
				return this._resourceManager.get(name);
			}
		}, {
			key: 'scene',
			value: function scene(id, _scene) {
				if (_scene === undefined) {
					this._useScene(id);
				} else {
					_scene.init(this._gameContext);
					this._scenes[id] = _scene;
					if (!this._currentScene) {
						this._useScene(id);
					}
				}
			}
		}, {
			key: 'start',
			value: function start() {
				this._lastTick = Date.now();
				this._tick();
			}
		}, {
			key: '_tick',
			value: function _tick() {
				requestAnimationFrame(this._tick);
	
				// delta time
				var dt = Date.now() - this._lastTick;
	
				this._lastTick = Date.now();
	
				// frame context
				var fc = {
					dt: dt,
					input: this._input,
					keyboard: this._keyboard,
					graphContext: this._ctx,
					width: this._canvas.width,
					height: this._canvas.height,
					dirtyRects: this._dirtyRects
				};
	
				if (!this._currentScene) {
					return;
				}
	
				this._update(fc);
	
				if (!this._dirtyRects.isClean()) {
					this._draw(fc);
				}
	
				this._keyboard.resetPressed();
			}
		}, {
			key: '_update',
			value: function _update(fc) {
				this._currentScene.update(fc);
			}
		}, {
			key: '_draw',
			value: function _draw(fc) {
				var rect = this._dirtyRects.getDirtyRect();
	
				this._ctx.save();
				this._ctx.beginPath();
				this._ctx.rect(rect.x, rect.y, rect.width, rect.height);
				this._ctx.clip();
				this._currentScene.draw(fc);
				this._dirtyRects.clear();
				this._ctx.restore();
			}
		}, {
			key: '_useScene',
			value: function _useScene(id) {
				this._currentScene = this._scenes[id];
				this._dirtyRects.markAllDirty();
			}
		}]);
	
		return Engine;
	}();
	
	exports.default = Engine;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(6);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Keyboard = function (_EventEmitter) {
		_inherits(Keyboard, _EventEmitter);
	
		function Keyboard(element) {
			_classCallCheck(this, Keyboard);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Keyboard).call(this));
	
			_this._element = null;
			_this._stopDomEvents = true;
			_this._keys = [];
			_this._pressed = [];
	
			_this._onKeyDown = _this._onKeyDown.bind(_this);
			_this._onKeyUp = _this._onKeyUp.bind(_this);
	
			_this.attachTo(element);
			return _this;
		}
	
		_createClass(Keyboard, [{
			key: 'detach',
			value: function detach() {
				if (this._element) {
					this._detachDomListeners();
					this._element = null;
				}
			}
		}, {
			key: 'attachTo',
			value: function attachTo(el) {
				if (this._element) {
					this._detachDomListeners();
				}
	
				this._element = el;
				if (el) {
					this._attachDomListeners();
				}
				el.focus();
			}
		}, {
			key: 'getStopDomEvents',
			value: function getStopDomEvents() {
				return this._stopDomEvents;
			}
		}, {
			key: 'setStopDomEvents',
			value: function setStopDomEvents(stopDomEvents) {
				this._stopDomEvents = stopDomEvents;
			}
		}, {
			key: 'isDown',
			value: function isDown(code) {
				return this._keys[code];
			}
		}, {
			key: 'isPressed',
			value: function isPressed(code) {
				return this._pressed[code];
			}
		}, {
			key: 'resetPressed',
			value: function resetPressed() {
				this._pressed = [];
			}
		}, {
			key: '_stopEventIfRequired',
			value: function _stopEventIfRequired(e) {
				if (this._stopDomEvents) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
		}, {
			key: '_onKeyDown',
			value: function _onKeyDown(e) {
				this._pressed[e.keyCode] = !this.isDown(e.keyCode);
				this._keys[e.keyCode] = true;
				this._stopEventIfRequired(e);
			}
		}, {
			key: '_onKeyUp',
			value: function _onKeyUp(e) {
				this._keys[e.keyCode] = false;
				this._pressed[e.keyCode] = false;
				this._stopEventIfRequired(e);
			}
	
			/**
	   * Attach the listeners to the mouseXXX DOM events
	   */
	
		}, {
			key: '_attachDomListeners',
			value: function _attachDomListeners() {
				var el = this._element;
	
				el.addEventListener('keydown', this._onKeyDown, false);
				el.addEventListener('keyup', this._onKeyUp, false);
			}
	
			/**
	   * Attach the listeners to the mouseXXX DOM events
	   */
	
		}, {
			key: '_detachDomListeners',
			value: function _detachDomListeners() {
				var el = this._element;
	
				el.removeEventListener('keydown', this._onKeyDown, false);
				el.removeEventListener('keyup', this._onKeyUp, false);
			}
		}]);
	
		return Keyboard;
	}(_EventEmitter3.default);
	
	exports.default = Keyboard;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);
	
			this._listeners = {};
		}
	
		_createClass(EventEmitter, [{
			key: 'addListener',
			value: function addListener(type, listener) {
				if (typeof listener !== 'function') {
					throw Error('Listener must be a function');
				}
	
				if (!this._listeners[type]) {
					this._listeners[type] = [];
				}
	
				this._listeners[type].push(listener);
			}
		}, {
			key: 'removeListener',
			value: function removeListener(type, listener) {
				if (typeof listener !== 'function') {
					throw Error('Listener must be a function');
				}
	
				if (!this._listeners[type]) {
					return;
				}
	
				var position = this._listeners[type].indexOf(listener);
	
				if (position !== -1) {
					this._listeners[type].splice(position, 1);
				}
			}
		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners(type) {
				if (type) {
					this._listeners[type] = [];
				} else {
					this._listeners = {};
				}
			}
		}, {
			key: 'emit',
			value: function emit(type, event) {
				if (!(this._listeners[type] && this._listeners[type].length)) {
					return;
				}
	
				for (var i = 0; i < this._listeners[type].length; i++) {
					this._listeners[type][i].call(this, event);
				}
			}
		}]);
	
		return EventEmitter;
	}();
	
	exports.default = EventEmitter;
	
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * The implementation of the InputHandler for the touch interfaces.
	 * Based on the touch events.
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _InputHandlerBase2 = __webpack_require__(8);
	
	var _InputHandlerBase3 = _interopRequireDefault(_InputHandlerBase2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TouchInputHandler = function (_InputHandlerBase) {
		_inherits(TouchInputHandler, _InputHandlerBase);
	
		function TouchInputHandler(element) {
			_classCallCheck(this, TouchInputHandler);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TouchInputHandler).call(this, element));
	
			_this._isDown = false;
			_this._lastInteractionCoordinates = {
				x: 0,
				y: 0
			};
			_this._onDownDomEvent = _this._onDownDomEvent.bind(_this);
			_this._onUpDomEvent = _this._onUpDomEvent.bind(_this);
			_this._onMoveDomEvent = _this._onMoveDomEvent.bind(_this);
			_this.attachTo(element);
			return _this;
		}
	
		_createClass(TouchInputHandler, [{
			key: 'isDown',
			value: function isDown() {
				return this._isDown;
			}
		}, {
			key: 'getCoordinates',
			value: function getCoordinates() {
				return this._lastInteractionCoordinates;
			}
		}, {
			key: '_attachDomListeners',
			value: function _attachDomListeners() {
				var el = this._element;
	
				el.addEventListener('touchstart', this._onDownDomEvent, false);
				el.addEventListener('touchend', this._onUpDomEvent, false);
				el.addEventListener('touchcancel', this._onUpDomEvent, false);
				el.addEventListener('touchmove', this._onMoveDomEvent, false);
			}
		}, {
			key: '_detachDomListeners',
			value: function _detachDomListeners() {
				var el = this._element;
	
				el.removeEventListener('touchstart', this._onDownDomEvent, false);
				el.removeEventListener('touchend', this._onUpDomEvent, false);
				el.removeEventListener('touchcancel', this._onUpDomEvent, false);
				el.removeEventListener('touchmove', this._onMoveDomEvent, false);
			}
		}, {
			key: '_onDownDomEvent',
			value: function _onDownDomEvent(e) {
				this._lastInteractionCoordinates = this._getInputCoordinates(e);
				this._isDown = true;
				_get(Object.getPrototypeOf(TouchInputHandler.prototype), '_onDownDomEvent', this).call(this, e);
			}
		}, {
			key: '_onUpDomEvent',
			value: function _onUpDomEvent(e) {
				this.emit('up', {
					x: this._lastInteractionCoordinates.x,
					y: this._lastInteractionCoordinates.y,
					moved: this._moving,
					domEvent: e
				});
				this._stopEventIfRequired(e);
				this._isDown = false;
				this._moving = false;
			}
		}, {
			key: '_onMoveDomEvent',
			value: function _onMoveDomEvent(e) {
				this._lastInteractionCoordinates = this._getInputCoordinates(e);
				_get(Object.getPrototypeOf(TouchInputHandler.prototype), '_onMoveDomEvent', this).call(this, e);
			}
		}]);
	
		return TouchInputHandler;
	}(_InputHandlerBase3.default);
	
	exports.default = TouchInputHandler;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventEmitter2 = __webpack_require__(6);
	
	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The "abstract" base for MouseInputHandler and TouchInputHandler. This class is not
	 * supposed to be instantiated directly. It provides the common base for touch and
	 * mouse input handling.
	 *
	 * @param element the DOM element to work with - concrete input handlers will
	 * register as event handlers of this element. In gamedev projects the
	 * element is usually the main canvas
	 */
	
	var InputHandlerBase = function (_EventEmitter) {
		_inherits(InputHandlerBase, _EventEmitter);
	
		function InputHandlerBase(element) {
			_classCallCheck(this, InputHandlerBase);
	
			// The DOM element, descendants will set this in attach()
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputHandlerBase).call(this));
	
			_this._element = null;
			_this._moving = false;
			_this._lastMoveCoordinates = null;
			_this._moveThreshold = 10;
			_this._stopDomEvents = false;
			return _this;
		}
	
		_createClass(InputHandlerBase, [{
			key: 'detach',
			value: function detach() {
				if (this._element) {
					this._detachDomListeners();
					this._element = null;
				}
			}
		}, {
			key: 'attachTo',
			value: function attachTo(el) {
				if (this._element) {
					this._detachDomListeners();
				}
	
				this._element = el;
				if (el) {
					this._attachDomListeners();
				}
			}
		}, {
			key: 'getMoveThreshold',
			value: function getMoveThreshold() {
				return this._moveThreshold;
			}
		}, {
			key: 'setMoveThreshold',
			value: function setMoveThreshold(moveThreshold) {
				this._moveThreshold = moveThreshold;
			}
		}, {
			key: 'getStopDomEvents',
			value: function getStopDomEvents() {
				return this._stopDomEvents;
			}
		}, {
			key: 'setStopDomEvents',
			value: function setStopDomEvents(stopDomEvents) {
				this._stopDomEvents = stopDomEvents;
			}
	
			/**
	   * Listens to the "down" DOM events: mousedown and touchstart.
	   * @param e DOM Event
	   */
	
		}, {
			key: '_onDownDomEvent',
			value: function _onDownDomEvent(e) {
				// We must save this coordinates to support the moveThreshold - this
				// may be the starting point of the movement, we can't simply
				var coords = this._lastMoveCoordinates = this._getInputCoordinates(e);
	
				// Emit "down" event - all coordinates together with the
				// original DOM event are passed to listeners
				this.emit('down', { x: coords.x, y: coords.y, domEvent: e });
	
				// Usually we want to stop original the DOM events
				// from further browser processing.
				this._stopEventIfRequired(e);
			}
	
			/**
	   * Listens to the "up" DOM events: mouseup and touchend. Touchend
	   * doesn't have any coordinates associated with it so this function
	   * will be overridden in TouchInputHandler
	   * @param e DOM Event
	   */
	
		}, {
			key: '_onUpDomEvent',
			value: function _onUpDomEvent(e) {
				// Works exactly the same way as _onDownDomEvent
				var coords = this._getInputCoordinates(e);
	
				this.emit('up', {
					x: coords.x,
					y: coords.y,
					moved: this._moving,
					domEvent: e
				});
	
				this._stopEventIfRequired(e);
	
				// The interaction is ended. Reset the flag
				this._moving = false;
			}
	
			/**
	   * Listens to the "move" DOM events: mousemove and touchmove.
	   * This function keeps track of the distance travelled since the last
	   * "move" action, besides it ignores the movement and swallows the event
	   * if we are still within the _moveThreshold
	   * @param e DOM event
	   */
	
		}, {
			key: '_onMoveDomEvent',
			value: function _onMoveDomEvent(e) {
				var coords = this._getInputCoordinates(e);
	
				// Calculate deltas
				var deltaX = coords.x - this._lastMoveCoordinates.x;
				var deltaY = coords.y - this._lastMoveCoordinates.y;
	
				// Check threshold, if the distance from the initial
				// tap to the current position is more than the threshold
				// value - qualify it as a real movement
				var deltaMove = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	
				if (!this._moving && deltaMove > this._moveThreshold) {
					this._moving = true;
				}
	
				// If the current interaction is "moving" (we crossed the threshold already) then emit
				// the event, otherwise, just ignore the interaction.
				if (this._moving) {
					this.emit('move', {
						x: coords.x,
						y: coords.y,
						deltaX: deltaX,
						deltaY: deltaY,
						domEvent: e
					});
					this._lastMoveCoordinates = coords;
				}
	
				this._stopEventIfRequired(e);
			}
		}, {
			key: '_stopEventIfRequired',
			value: function _stopEventIfRequired(e) {
				if (this._stopDomEvents) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
		}, {
			key: '_getInputCoordinates',
			value: function _getInputCoordinates(e) {
				var element = this._element;
				var coords = e.targetTouches ? e.targetTouches[0] : e;
	
				var x = (coords.pageX || coords.clientX + document.body.scrollLeft) - element.offsetLeft;
	
				var y = (coords.pageY || coords.clientY + document.body.scrollTop) - element.offsetTop;
	
				// TODO: Change to destructuring
				return {
					x: x,
					y: y
				};
			}
		}]);
	
		return InputHandlerBase;
	}(_EventEmitter3.default);
	
	exports.default = InputHandlerBase;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _InputHandlerBase2 = __webpack_require__(8);
	
	var _InputHandlerBase3 = _interopRequireDefault(_InputHandlerBase2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The implementation of the InputHandler for the desktop
	 * browser based on the mouse events.
	 */
	
	var MouseInputHandler = function (_InputHandlerBase) {
		_inherits(MouseInputHandler, _InputHandlerBase);
	
		function MouseInputHandler(element) {
			_classCallCheck(this, MouseInputHandler);
	
			// We need additional property to track if the
			// mouse is down.
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MouseInputHandler).call(this, element));
	
			_this._mouseDown = false;
	
			// Bound functions
			_this._onDownDomEvent = _this._onDownDomEvent.bind(_this);
			_this._onUpDomEvent = _this._onUpDomEvent.bind(_this);
			_this._onMoveDomEvent = _this._onMoveDomEvent.bind(_this);
			_this._onMouseOut = _this._onMouseOut.bind(_this);
			_this._onHoverDomEvent = _this._onHoverDomEvent.bind(_this);
	
			_this._coords = { x: -1, y: -1 };
			_this.attachTo(element);
			return _this;
		}
	
		_createClass(MouseInputHandler, [{
			key: 'isDown',
			value: function isDown() {
				return this._mouseDown;
			}
		}, {
			key: 'getCoordinates',
			value: function getCoordinates() {
				return this._coords;
			}
	
			/**
	   * Attach the listeners to the mouseXXX DOM events
	   */
	
		}, {
			key: '_attachDomListeners',
			value: function _attachDomListeners() {
				var el = this._element;
	
				el.addEventListener('mousedown', this._onDownDomEvent, false);
				el.addEventListener('mouseup', this._onUpDomEvent, false);
				el.addEventListener('mousemove', this._onMoveDomEvent, false);
				el.addEventListener('mouseout', this._onMouseOut, false);
			}
	
			/**
	   * Attach the listeners to the mouseXXX DOM events
	   */
	
		}, {
			key: '_detachDomListeners',
			value: function _detachDomListeners() {
				var el = this._element;
	
				el.removeEventListener('mousedown', this._onDownDomEvent, false);
				el.removeEventListener('mouseup', this._onUpDomEvent, false);
				el.removeEventListener('mousemove', this._onMoveDomEvent, false);
				el.removeEventListener('mouseout', this._onMouseOut, false);
			}
	
			/**
	   * This method (and the next one) is overridden,
	   * because we have to track the state of the mouse.
	   * This could also be done in the separate listener.
	   */
	
		}, {
			key: '_onDownDomEvent',
			value: function _onDownDomEvent(e) {
				this._mouseDown = true;
				_get(Object.getPrototypeOf(MouseInputHandler.prototype), '_onDownDomEvent', this).call(this, e);
			}
		}, {
			key: '_onUpDomEvent',
			value: function _onUpDomEvent(e) {
				this._mouseDown = false;
				_InputHandlerBase3.default.prototype._onUpDomEvent.call(this, e);
			}
	
			/**
	   * We process the move event only if the mouse button is
	   * pressed, otherwise the DOM event is ignored.
	   */
	
		}, {
			key: '_onMoveDomEvent',
			value: function _onMoveDomEvent(e) {
				if (this._mouseDown) {
					_get(Object.getPrototypeOf(MouseInputHandler.prototype), '_onMoveDomEvent', this).call(this, e);
				} else {
					this._onHoverDomEvent(e);
				}
			}
	
			/**
	   * Hover is for pointer-enabled interfaces. Should rename
	   * move -> drag
	   * hover -> move
	   *
	   * TODO: support deltas in hover
	   */
	
		}, {
			key: '_onHoverDomEvent',
			value: function _onHoverDomEvent(e) {
				var coords = this._coords = this._getInputCoordinates(e);
	
				this.emit('hover', {
					x: coords.x, y: coords.y,
					/* deltaX: deltaX, deltaY: deltaY, */domEvent: e
				});
				this._stopEventIfRequired(e);
			}
		}, {
			key: '_onMouseOut',
			value: function _onMouseOut() {
				this._mouseDown = false;
			}
		}]);
	
		return MouseInputHandler;
	}(_InputHandlerBase3.default);
	
	exports.default = MouseInputHandler;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageManager = function () {
		function ImageManager() {
			_classCallCheck(this, ImageManager);
	
			this._imageQueue = [];
			this._images = {};
		}
	
		_createClass(ImageManager, [{
			key: '_addImage',
			value: function _addImage(key, path) {
				this._imageQueue.push({
					key: key,
					path: path
				});
			}
		}, {
			key: 'load',
			value: function load(images, onDone, onProgress) {
				var noop = function noop() {};
				var queue = this._imageQueue;
	
				for (var im in images) {
					this._addImage(im, images[im]);
				}
	
				onDone = onDone || noop;
				onProgress = onProgress || noop;
	
				this._imageQueue = [];
	
				if (queue.length === 0) {
					onProgress(0, 0, null, null, true);
					return;
				}
	
				var itemCounter = {
					loaded: 0,
					total: queue.length
				};
	
				for (var i = 0; i < queue.length; i++) {
					this._loadItem(queue[i], itemCounter, onDone, onProgress);
				}
			}
		}, {
			key: '_loadItem',
			value: function _loadItem(queueItem, itemCounter, onDone, onProgress) {
				var self = this;
				var img = new Image();
	
				img.onload = function () {
					self._images[queueItem.key] = img;
					self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
				};
	
				img.onerror = function () {
					self._images[queueItem.key] = self._placeholder;
					self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
				};
				img.src = queueItem.path;
			}
		}, {
			key: '_onItemLoaded',
			value: function _onItemLoaded(queueItem, itemCounter, onDone, onProgress, success) {
				itemCounter.loaded++;
				onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
	
				if (itemCounter.loaded === itemCounter.total) {
					onDone();
				}
			}
		}, {
			key: 'get',
			value: function get(key) {
				return this._images[key];
			}
		}]);
	
		return ImageManager;
	}();
	
	exports.default = ImageManager;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Checks if we're working with the touchscreen or with the
	 * regular desktop browser. Used to determine, what kind of events should we use:
	 * mouse events or touch events.
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function isTouchDevice() {
	  return 'ontouchstart' in document.documentElement;
	}
	
	function dist(x1, y1, x2, y2) {
	  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}
	
	exports.isTouchDevice = isTouchDevice;
	exports.dist = dist;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameObject = function () {
		function GameObject() {
			_classCallCheck(this, GameObject);
	
			this._x = 0;
			this._y = 0;
			this._width = 0;
			this._height = 0;
	
			this._id = GameObject.uid++;
			this._name = 'object_' + this._id;
	
			this._anchorX = 0;
			this._anchorY = 0;
	
			this._rot = 0;
	
			this._scene = null;
			this._parent = null;
			this._children = [];
		}
	
		_createClass(GameObject, [{
			key: 'update',
			value: function update(fc) {
				this._children.forEach(function (it) {
					return it.update(fc);
				});
			}
		}, {
			key: 'draw',
			value: function draw(fc) {
				this._children.forEach(function (it) {
					return it.draw(fc);
				});
			}
		}, {
			key: 'addChild',
			value: function addChild(child) {
				this._children.push(child);
				child.setParent(this);
			}
		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				var idx = this._children.indexOf(child);
	
				if (idx > -1) {
					child.setParent(null);
					return this._children.splice(idx, 1);
				}
			}
		}, {
			key: 'getChildren',
			value: function getChildren() {
				return this._children;
			}
		}, {
			key: 'setParent',
			value: function setParent(parent) {
				this._parent = parent;
			}
		}, {
			key: 'setScene',
			value: function setScene(scene) {
				this._scene = scene;
			}
		}, {
			key: 'getScene',
			value: function getScene() {
				return this._scene;
			}
		}, {
			key: 'getParent',
			value: function getParent() {
				return this._parent;
			}
		}, {
			key: 'getId',
			value: function getId() {
				return this._id;
			}
		}, {
			key: 'getName',
			value: function getName() {
				return this._name;
			}
		}, {
			key: 'setName',
			value: function setName() {
				return this._name;
			}
		}, {
			key: 'setPos',
			value: function setPos(x, y) {
				this._x = x;
				this._y = y;
			}
		}, {
			key: 'setSize',
			value: function setSize(w, h) {
				this._width = w;
				this._height = h;
			}
		}, {
			key: 'getWidth',
			value: function getWidth() {
				return this._width;
			}
		}, {
			key: 'getHeight',
			value: function getHeight() {
				return this._height;
			}
		}, {
			key: 'move',
			value: function move(dx, dy) {
				this._x += dx;
				this._y += dy;
			}
		}, {
			key: 'getPos',
			value: function getPos() {
				return {
					x: this._x,
					y: this._y
				};
			}
		}, {
			key: 'getTop',
			value: function getTop() {
				return this._y;
			}
		}, {
			key: 'getBottom',
			value: function getBottom() {
				return this._y + this._height;
			}
		}, {
			key: 'getLeft',
			value: function getLeft() {
				return this._x;
			}
		}, {
			key: 'getRight',
			value: function getRight() {
				return this._x + this._width;
			}
		}, {
			key: 'detach',
			value: function detach() {
				if (!this._parent) {
					return;
				}
	
				this._parent.removeChild(this);
			}
		}]);
	
		return GameObject;
	}();
	// should be static
	
	
	exports.default = GameObject;
	GameObject.uid = 1;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _GameObject2 = __webpack_require__(12);
	
	var _GameObject3 = _interopRequireDefault(_GameObject2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GameScene = function (_GameObject) {
		_inherits(GameScene, _GameObject);
	
		function GameScene() {
			_classCallCheck(this, GameScene);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameScene).call(this));
	
			_this._gameContext = null;
			return _this;
		}
	
		_createClass(GameScene, [{
			key: 'init',
			value: function init(gameContext) {
				this._gameContext = gameContext;
			}
		}, {
			key: 'addChild',
			value: function addChild(child) {
				_get(Object.getPrototypeOf(GameScene.prototype), 'addChild', this).call(this, child);
			}
		}, {
			key: 'registerObject',
			value: function registerObject(obj) {}
		}, {
			key: 'deregisterObject',
			value: function deregisterObject(obj) {}
		}, {
			key: 'getResource',
			value: function getResource(name) {
				return this._gameContext.resourceManager.get(name);
			}
		}]);
	
		return GameScene;
	}(_GameObject3.default);
	
	exports.default = GameScene;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Rect = __webpack_require__(3);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MathUtils = {};
	
	MathUtils.getBoundingRectangle = function (points) {
		var minX = Number.MAX_VALUE;
		var minY = Number.MAX_VALUE;
		var maxX = Number.MIN_VALUE;
		var maxY = Number.MIN_VALUE;
	
		for (var i = 0; i < points.length; i++) {
			// TODO Destructuring?
			var x = points[i][0];
			var y = points[i][1];
	
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
	
		var epsilon = Math.max(maxX - minX, maxY - minY) * 0.05;
	
		minX -= epsilon;
		maxX += epsilon;
		minY -= epsilon;
		maxY += epsilon;
		return new _Rect2.default(minX, minY, maxX - minX, maxY - minY);
	};
	
	/**
	 * http://stackoverflow.com/questions/563198
	 */
	/* eslint-disable camelcase */
	MathUtils.linesIntersect = function (p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
	
		var s1_x = void 0,
		    s1_y = void 0,
		    s2_x = void 0,
		    s2_y = void 0;
	
		s1_x = p1_x - p0_x;
		s1_y = p1_y - p0_y;
		s2_x = p3_x - p2_x;
		s2_y = p3_y - p2_y;
	
		var s = void 0,
		    t = void 0;
	
		s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
		t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
	
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			return [p0_x + t * s1_x, p0_y + t * s1_y];
		}
	
		return null;
	};
	/* eslint-enable camelcase */
	
	MathUtils.sign = function (number) {
		return number > 0 ? 1 : number === 0 ? 0 : -1;
	};
	
	MathUtils.pointInsidePolygon = function (px, py, polygon, rayX, rayY) {
		if (rayX === undefined || rayY === undefined) {
			var rect = MathUtils.getBoundingRectangle(polygon);
	
			rayX = rect.x + rect.width;
			rayY = py;
		}
	
		var intersectCount = 0;
	
		for (var i = 0; i < polygon.length; i++) {
			var polyX0 = polygon[i][0];
			var polyY0 = polygon[i][1];
			var polyX1 = i + 1 === polygon.length ? polygon[0][0] : polygon[i + 1][0];
			var polyY1 = i + 1 === polygon.length ? polygon[0][1] : polygon[i + 1][1];
	
			if (MathUtils.linesIntersect(px, py, rayX, rayY, polyX0, polyY0, polyX1, polyY1)) {
				intersectCount++;
			}
		}
		return intersectCount % 2 === 1;
	};
	
	// Can be probably optimized by checking that the both points are on one
	// "side" of the poly
	MathUtils.segmentIntersectsPolygon = function (x0, y0, x1, y1, polygon) {
		for (var i = 0; i < polygon.length; i++) {
			var polyX0 = polygon[i][0];
			var polyY0 = polygon[i][1];
			var polyX1 = i + 1 === polygon.length ? polygon[0][0] : polygon[i + 1][0];
			var polyY1 = i + 1 === polygon.length ? polygon[0][1] : polygon[i + 1][1];
	
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
	
		var lengthSquared = MathUtils.distanceSquared(segStartX, segStartY, segEndX, segEndY);
	
		if (lengthSquared === 0) {
			return MathUtils.distance(pX, pY, segStartX, segStartY);
		}
	
		var t = ((pX - segStartX) * (segEndX - segStartX) + (pY - segStartY) * (segEndY - segStartY)) / lengthSquared;
	
		if (t < 0) {
			return MathUtils.distance(pX, pY, segStartX, segStartY);
		}
	
		if (t > 1) {
			return MathUtils.distance(pX, pY, segEndX, segEndY);
		}
	
		return MathUtils.distance(pX, pY, segStartX + t * (segEndX - segStartX), segStartY + t * (segEndY - segStartY));
	};
	
	MathUtils.distanceFromPointToPolygon = function (px, py, polyPoints) {
		var minDist = MathUtils.distanceFromPointToSegment(px, py, polyPoints[polyPoints.length - 1][0], polyPoints[polyPoints.length - 1][1], polyPoints[0][0], polyPoints[0][1]);
	
		for (var i = 1; i < polyPoints.length; i++) {
			var dist = MathUtils.distanceFromPointToSegment(px, py, polyPoints[i - 1][0], polyPoints[i - 1][1], polyPoints[i][0], polyPoints[i][1]);
	
			if (dist < minDist) {
				minDist = dist;
			}
		}
	
		return minDist;
	};
	
	exports.default = MathUtils;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TileMapOrtho = exports.TileSheet = exports.SpriteSheet = exports.Sprite = exports.Shapes = exports.Rectangle = undefined;
	
	var _Rectangle = __webpack_require__(16);
	
	var _Rectangle2 = _interopRequireDefault(_Rectangle);
	
	var _Shapes = __webpack_require__(17);
	
	var _Shapes2 = _interopRequireDefault(_Shapes);
	
	var _Sprite = __webpack_require__(18);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	var _SpriteSheet = __webpack_require__(19);
	
	var _SpriteSheet2 = _interopRequireDefault(_SpriteSheet);
	
	var _TileSheet = __webpack_require__(20);
	
	var _TileSheet2 = _interopRequireDefault(_TileSheet);
	
	var _TileMapOrtho = __webpack_require__(21);
	
	var _TileMapOrtho2 = _interopRequireDefault(_TileMapOrtho);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Rectangle = _Rectangle2.default;
	exports.Shapes = _Shapes2.default;
	exports.Sprite = _Sprite2.default;
	exports.SpriteSheet = _SpriteSheet2.default;
	exports.TileSheet = _TileSheet2.default;
	exports.TileMapOrtho = _TileMapOrtho2.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GameObject2 = __webpack_require__(12);
	
	var _GameObject3 = _interopRequireDefault(_GameObject2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rectangle = function (_GameObject) {
		_inherits(Rectangle, _GameObject);
	
		function Rectangle() {
			_classCallCheck(this, Rectangle);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).apply(this, arguments));
		}
	
		_createClass(Rectangle, [{
			key: 'draw',
			value: function draw(fc) {
				var gc = fc.graphContext;
	
				gc.fillStyle = 'green';
				gc.fillRect(this._x, this._y, 10, 10);
			}
		}]);
	
		return Rectangle;
	}(_GameObject3.default);
	
	exports.default = Rectangle;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * A number of utility methods for drawing the polygons,
	 * agents (boids), arrows, fills, etc.
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Shapes = {};
	
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
		for (var i = 1; i < points.length; i++) {
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
	
		var minX = Number.MAX_VALUE;
		var minY = Number.MAX_VALUE;
		var maxX = Number.MIN_VALUE;
		var maxY = Number.MIN_VALUE;
	
		var angle = Math.PI / 4;
	
		for (var i = 0; i < points.length; i++) {
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
		for (var _i = 1; _i < points.length; _i++) {
			ctx.lineTo(points[_i][0], points[_i][1]);
		}
		ctx.closePath();
		ctx.clip();
	
		var linesOffset = (maxY - minY) / Math.tan(angle);
	
		ctx.beginPath();
		for (var _i2 = minX - linesOffset; _i2 < maxX; _i2 += 15) {
			ctx.moveTo(_i2, maxY);
			ctx.lineTo(_i2 + linesOffset, minY);
		}
	
		ctx.stroke();
		ctx.restore();
	};
	
	exports.default = Shapes;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GameObject2 = __webpack_require__(12);
	
	var _GameObject3 = _interopRequireDefault(_GameObject2);
	
	var _Rect = __webpack_require__(3);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Sprite = function (_GameObject) {
		_inherits(Sprite, _GameObject);
	
		function Sprite(img) {
			_classCallCheck(this, Sprite);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this));
	
			_this._img = img;
			_this._width = img.width;
			_this._height = img.height;
			_this._isPressed = false;
			_this._clicked = false;
			return _this;
		}
	
		_createClass(Sprite, [{
			key: 'setSize',
			value: function setSize(widthOrFraction, height) {
	
				if (height === undefined) {
					var fraction = widthOrFraction;
	
					widthOrFraction = this._img.width * fraction;
					height = this._img.height * fraction;
				}
				this._width = widthOrFraction;
				this._height = height;
			}
		}, {
			key: 'update',
			value: function update(fc) {}
		}, {
			key: 'draw',
			value: function draw(fc) {
				var ctx = fc.graphContext;
	
				ctx.save();
				ctx.drawImage(this._img, 0, 0, this._img.width, this._img.height, this._x, this._y, this._width, this._height);
				ctx.restore();
			}
		}, {
			key: 'getBounds',
			value: function getBounds() {
				return new _Rect2.default(this._x, this._y, this._width, this._height);
			}
		}]);
	
		return Sprite;
	}(_GameObject3.default);
	
	exports.default = Sprite;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SpriteSheet = function () {
		function SpriteSheet(image, frames) {
			_classCallCheck(this, SpriteSheet);
	
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
	
	
		_createClass(SpriteSheet, [{
			key: 'drawFrame',
			value: function drawFrame(ctx, index, x, y) {
				var frame = this._frames[index];
	
				if (!frame) {
					return;
				}
	
				ctx.drawImage(this._image, frame[SpriteSheet.FRAME_X], frame[SpriteSheet.FRAME_Y], frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT], x - frame[SpriteSheet.FRAME_ANCHOR_X], y - frame[SpriteSheet.FRAME_ANCHOR_Y], frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT]);
			}
		}]);
	
		return SpriteSheet;
	}();
	
	exports.default = SpriteSheet;
	
	
	SpriteSheet.FRAME_X = 0;
	SpriteSheet.FRAME_Y = 1;
	SpriteSheet.FRAME_WIDTH = 2;
	SpriteSheet.FRAME_HEIGHT = 3;
	SpriteSheet.FRAME_ANCHOR_X = 4;
	SpriteSheet.FRAME_ANCHOR_Y = 5;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TileSheet = function () {
		function TileSheet(image, w, h) {
			_classCallCheck(this, TileSheet);
	
			this._image = image;
			this._w = w;
			this._h = h;
			this._row = Math.floor(image.width / w);
		}
	
		_createClass(TileSheet, [{
			key: 'drawTile',
			value: function drawTile(ctx, index, x, y) {
				if (index < 0) {
					return;
				}
	
				var tx = index % this._row * this._w;
				var ty = Math.floor(index / this._row) * this._h;
	
				ctx.drawImage(this._image, tx, ty, this._w, this._h, x, y, this._w, this._h);
			}
		}]);
	
		return TileSheet;
	}();
	
	exports.default = TileSheet;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GameObject2 = __webpack_require__(12);
	
	var _GameObject3 = _interopRequireDefault(_GameObject2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TileMapOrtho = function (_GameObject) {
		_inherits(TileMapOrtho, _GameObject);
	
		function TileMapOrtho(mapData, image, tileSize, viewportWidth, viewportHeight) {
			_classCallCheck(this, TileMapOrtho);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TileMapOrtho).call(this));
	
			_this._mapData = mapData;
			_this._image = image;
			_this._tileSize = tileSize;
			_this._viewportWidth = viewportWidth;
			_this._viewportHeight = viewportHeight;
	
			// Coordinates of the map
			_this._x = 0;
			_this._y = 0;
	
			// Offscreen buffer
			_this._offCanvas = document.createElement('canvas');
			_this._offContext = _this._offCanvas.getContext('2d');
			_this._offBounds = { x: 0, y: 0, w: 0, h: 0 };
			_this._offDirty = true;
	
			_this._resetOffScreenCanvas();
	
			// The number of tiles in one row of the image
			_this._tilesPerRow = image.width / tileSize;
			return _this;
		}
	
		/* Draws the whole map */
	
	
		_createClass(TileMapOrtho, [{
			key: 'draw',
			value: function draw(fc) {
				var ctx = fc.graphContext;
	
				if (this._offDirty) {
					this._redrawOffscreen();
				}
	
				var offCanvasX = -Math.floor(this._x) - this._offBounds.x * this._tileSize;
				var offCanvasY = -Math.floor(this._y) - this._offBounds.y * this._tileSize;
				var offCanvasW = Math.min(this._offCanvas.width - offCanvasX, this._viewportWidth);
				var offCanvasH = Math.min(this._offCanvas.height - offCanvasY, this._viewportHeight);
	
				ctx.drawImage(this._offCanvas, offCanvasX, offCanvasY, offCanvasW, offCanvasH, 0, 0, offCanvasW, offCanvasH);
			}
		}, {
			key: 'move',
			value: function move(deltaX, deltaY) {
				this._x += deltaX;
				this._y += deltaY;
				this._updateOffscreenBounds();
			}
		}, {
			key: 'setViewportSize',
			value: function setViewportSize(width, height) {
				this._viewportWidth = width;
				this._viewportHeight = height;
				this._resetOffScreenCanvas();
			}
		}, {
			key: '_resetOffScreenCanvas',
			value: function _resetOffScreenCanvas() {
				this._updateOffscreenBounds();
				this._offCanvas.width = this._offBounds.w * this._tileSize;
				this._offCanvas.height = this._offBounds.h * this._tileSize;
				this._offDirty = true;
			}
		}, {
			key: '_redrawOffscreen',
			value: function _redrawOffscreen() {
				var ctx = this._offContext;
	
				ctx.clearRect(0, 0, this._offCanvas.width, this._offCanvas.height);
	
				var startX = Math.max(this._offBounds.x, 0);
				var endX = Math.min(startX + this._offBounds.w - 1, this._mapData[0].length - 1);
	
				var startY = Math.max(this._offBounds.y, 0);
				var endY = Math.min(startY + this._offBounds.h - 1, this._mapData.length - 1);
	
				for (var cellY = startY; cellY <= endY; cellY++) {
					for (var cellX = startX; cellX <= endX; cellX++) {
						var tileId = this._mapData[cellY][cellX];
	
						this._drawTileAt(ctx, tileId, cellX, cellY);
					}
				}
				this._offDirty = false;
			}
		}, {
			key: '_drawTileAt',
			value: function _drawTileAt(ctx, tileId, cellX, cellY) {
	
				// Position of the tile inside of a tile sheet
				var srcX = tileId % this._tilesPerRow * this._tileSize;
				var srcY = Math.floor(tileId / this._tilesPerRow) * this._tileSize;
	
				// size of the tile
				var size = this._tileSize;
	
				// position of the tile on the offscreen buffer
				var destX = (cellX - this._offBounds.x) * size;
				var destY = (cellY - this._offBounds.y) * size;
	
				ctx.drawImage(this._image, srcX, srcY, size, size, destX, destY, size, size);
			}
		}, {
			key: '_updateOffscreenBounds',
			value: function _updateOffscreenBounds() {
				var oldBounds = this._offBounds;
	
				var newBounds = {
					x: Math.floor(-this._x / this._tileSize),
					y: Math.floor(-this._y / this._tileSize),
					w: Math.ceil(this._viewportWidth / this._tileSize) + 1,
					h: Math.ceil(this._viewportHeight / this._tileSize) + 1
				};
	
				if (!(oldBounds.x === newBounds.x && oldBounds.y === newBounds.y && oldBounds.w === newBounds.w && oldBounds.h === newBounds.h)) {
	
					this._offBounds = newBounds;
					this._offDirty = true;
				}
			}
		}]);
	
		return TileMapOrtho;
	}(_GameObject3.default);
	
	exports.default = TileMapOrtho;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=draco.js.map