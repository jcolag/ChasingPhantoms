// * Screen Geometry *
var radiusMax = 0;

// * Orbital Geometry *
var radius = 275;
var angle = -Math.PI / 2;
var tick = 0.01;
var offsetLeft = 300;
var offsetTop = 10;

// * Current Orbital Position *
var posX = 0;
var posY = 0;

// * User Click Position *
var clickX = 0;
var clickY = 0;

// * Timer to Reset Orbit *
var timeout = 15000;

// * Score *
var countHit = 0;
var countMiss = -1;
var isVisible = false;

// * Click Handlers *

// reportScore(e)
// *   e - click event
// * Handles common code of both (hit and miss) click-handlers.
// *
// * 1.  Deactivates the click-handlers
// * 2.  Show and hide the click-marker underneath the mouse pointer
// *     and save location
// * 3.  Populate the current score
// * 4.  Show and hide the target
// * 5.  Reactivate the click-handlers
function reportScore(e) {
  isVisible = true;
  var click = $('#click');
  var target = $('#target');
  click.offset({
    left: e.clientX - clickX - 5,
    top: e.clientY - clickY - 5,
  });
  clickX = e.clientX - 5;
  clickY = e.clientY - 5;
  click.fadeIn();
  var score = `${String(countHit)} hits<br>${countMiss} misses`;
  $('#score').html(score);
  target.fadeTo(500, 1.0, () => {
    target.fadeTo(500, 0.0, () => {
      isVisible = false;
    });
  });
  click.fadeOut();
}

// boxCaught(e)
// *   e - click event
// * Increment successes and report score, but only while clicks are accepted
function boxCaught(e) {
  if (isVisible) {
    return;
  }

  countHit += 1;
  reportScore(e);
}

// boxMissed(e)
// *   e - click event
// * Increment failures and report score, but only while clicks are accepted
function boxMissed(e) {
  if (isVisible) {
    return;
  }

  countMiss += 1;
  reportScore(e);
}

// * Geometry *

// setPosition()
// * Sets the position of the target box in its orbit
function setPosition() {
  $('#target')
    .offset({
      left: posX,
      top: posY,
    });
}

// updateAngle(delta)
// *   delta - change in angle
// * Sets position for the orbiting target at current time
// *
// * Should be obvious, but trigonometric functions use radians
function updateAngle(delta) {
  angle += delta;
  if (angle >= 2 * Math.PI) {
    angle = 0.0;
  }
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  posX = radius * cos + radius + offsetLeft;
  posY = radius * sin + radius + offsetTop;
}

// move()
// * Update target box's position in orbit
function move() {
  updateAngle(tick);
  setPosition();
}

// * Top Level *

// setup()
// * Determines new orbit
// *
// * 1.  Screen geometry
// * 2.  Radius
// * 3.  Center point
// * 4.  Change in angle each tick
// * 5.  Set reset time
function setup() {
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

  $('#target').fadeTo(500, 0.01);
  setTimeout(setup, timeout);
}

// * About Box *

// showAbout()
// * Display the about box
// *
// * Disables click-handlers as well
function showAbout() {
  isVisible = true;
  var about = $('#about');
  about.fadeIn(500);
  about.load('readme.html');
}

// hideAbout()
// * Hide the about box
// *
// * Re-enables click-handlers as well
function hideAbout() {
  $('#about').fadeOut(500);
  isVisible = false;
}
