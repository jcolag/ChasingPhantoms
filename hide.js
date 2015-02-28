var scrHeight = 0;
var scrWidth = 0;
var radiusMax = 0;

var radius = 275;
var angle = - Math.PI / 2;
var tick = 0.01;
var offsetLeft = 300;
var offsetTop = 10;
var posX = 0;
var posY = 0;

var timeout = 15000;

var countHit = 0;
var countMiss = -1;
var isVisible = false;

var reportScore = function() {
  isVisible = true;
  var score = "" + countHit + " hits<br>" + countMiss + " misses";
  $("#score").html(score);
  $("#target").fadeTo(500, 1.0, function() {
    $("#target").fadeTo(500, 0.0, function() {
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

var setup = function() {
  var scrWidth = $(window).width();
  var scrHeight = $(window).height();
  if (scrWidth > scrHeight) {
    radiusMax = scrHeight / 2;
  } else {
    radiusMax = scrWidth / 2;
  }

  radius = Math.random() * (radiusMax - 100) + 50;
  offsetLeft = Math.random() * (scrWidth - radius * 2 - 100);
  offsetTop = Math.random() * (scrHeight - radius * 2 - 100);
  tick = Math.floor(Math.random() * 5) / 100 + 0.005;

  $("#target").fadeTo(500, 0.01);
  setTimeout(setup, timeout);
}

var showAbout = function() {
  var about = $("#about");
  about.fadeIn(500);
  about.load("readme.html");
}
var hideAbout = function() {
  $("#about").fadeOut(500);
}
