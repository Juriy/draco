'use strict';

let transMat = mat2d.create();
mat2d.translate(transMat, transMat, vec2.fromValues(10, 5));

let point = vec2.fromValues(1, 2);
vec2.transformMat2d(point, point, transMat);
console.log(point.toString());