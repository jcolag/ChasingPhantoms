// * Screen Geometry *
let radiusMax = 0;

// * Orbital Geometry *
let radius = 275;
let angle = -Math.PI / 2;
let tick = 0.01;
let offsetLeft = 300;
let offsetTop = 10;

// * Current Orbital Position *
let posX = 0;
let posY = 0;

// * User Click Position *
let clickX = 0;
let clickY = 0;

// * Timer to Reset Orbit *
const timeout = 15000;

// * Score *
let countHit = 0;
let countMiss = -1;
let isVisible = false;

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
  const click = $('#click');
  const target = $('#target');

  isVisible = true;
  click.offset({
    left: e.clientX - clickX - 5,
    top: e.clientY - clickY - 5,
  });
  clickX = e.clientX - 5;
  clickY = e.clientY - 5;
  click.fadeIn();

  const score = `${String(countHit)} hits<br>${countMiss} misses`;

  document.getElementById('score').innerHTML = score;
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

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

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
  const scrWidth = $(window).width();
  const scrHeight = $(window).height();

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
  const about = $('#about');

  isVisible = true;
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
