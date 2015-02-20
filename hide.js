var radius = 275;
var angle = - Math.PI / 2;
var tick = 0.01;
var offsetLeft = 300;
var offsetTop = 10;
var posX = 0;
var posY = 0;

var countHit = 0;
var countMiss = -1;
var isVisible = false;

var reportScore = function() {
  isVisible = true;
  var score = "" + countHit + " hits<br>" + countMiss + " misses";
  $("#score").html(score);
  $("#target").fadeTo(500, 1.0, function() {
    $("#target").fadeTo(500, 0.01, function() {
      isVisible = false;
    });
  });
}
var boxCaught = function() {
  if (isVisible) {
    return;
  }
  countHit++;
  reportScore();
}
var boxMissed = function() {
  if (isVisible) {
    return;
  }
  countMiss++;
  reportScore();
}

var setPosition = function() {
  $("#target").offset({left: posX, top: posY});
};
var updateAngle = function(delta) {
  angle += delta;
  if (angle >= 2 * Math.PI) {
    angle = 0.0;
  }
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  posX = radius * cos + radius + offsetLeft;
  posY = radius * sin + radius + offsetTop;
};
var move = function() {
  updateAngle(tick);
  setPosition();
}

