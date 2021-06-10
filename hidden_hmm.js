///fold:
var drawLines = function(canvas, start, positions){
  if (positions.length == 0) { return []; }
  var next = positions[0];
  canvas.line(start[0], start[1], next[0], next[1], 4, 0.2);
  drawLines(canvas, next, positions.slice(1));
  return;
}
///
var canvas = Draw(400, 400, true)

var init = function(dim){
  return repeat(dim, function(){ return gaussian(200, 1) });
}

var observeState = function(pos){
  return map(
    function(x){ return gaussian(x, 5); },
	pos
  );
};

var transition = function(lastPos, secondLastPos){
  return map2(
    function(lastX, secondLastX){
      var momentum = (lastX - secondLastX) * 0.9;
      return gaussian(lastX + momentum, 3);
    },
	lastPos,
    secondLastPos
  );
};


var semiMarkovWalk = function(n, dim) {
  var prevStates = (n==2) ? [init(dim), init(dim)] : semiMarkovWalk(n-1, dim);
  var newState = transition(last(prevStates), secondLast(prevStates));
  var newObservation = observeState(newState);
  canvas.circle(newObservation[0], newObservation[1], 2, "red", "white");
  return prevStates.concat([newState]);
};

var positions = semiMarkovWalk(80, 2);
drawLines(canvas, positions[0], positions.slice(1))
print("done")
