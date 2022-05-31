/***
 * The Simon Game
 * created by abanoub mokhles
 * 23-3-2022
 */

/*----------------------
    Game Controls
----------------------*/
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

/*----------------------
    Handle Keyboard
----------------------*/
$(document).on("keydown", function () {
  if (!gameStarted) {
    // start game on first keypress
    nextSequence();
    gameStarted = true;
  }
});

/*----------------------
    Handle Clicks
----------------------*/
$(".btn").on("click", function () {
  // user choosen colour
  let userChoosenColour = $(this).attr("id");

  // add colour to the user clicked pattern
  userClickedPattern.push(userChoosenColour);

  // check user answer
  checkAnswer(userClickedPattern.length - 1);

  // animate Choosen button
  animateButton(userChoosenColour);

  // play sound of the button
  playSounds(userChoosenColour);
});

/*----------------------
    Check user answer
----------------------*/
function checkAnswer(currentLevel) {
  // checking answer
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    // game over functionality
    gameOver();

    // starting over
    startOver();
  }
}
/*----------------------
    Next Sequence
----------------------*/
function nextSequence() {
  // increase level
  level++;

  // random number from 0 to 3
  let randomNumber = Math.floor(Math.random() * 4);

  // random colour from buttonColours
  let randomColour = buttonColours[randomNumber];

  // add random colour to game pattern
  gamePattern.push(randomColour);

  // animate random button
  animateButton(randomColour);

  // play sound of the button
  playSounds(randomColour);

  // change h1 inner text to show level
  $("#level-title").text(`Level ${level}`);
}

/*----------------------
    Animate Buttons
----------------------*/
function animateButton(btn) {
  // button to animate
  let btn2Animate = $("#" + btn);

  // fade animation
  btn2Animate.fadeOut(100).fadeIn(100);

  // press animation
  btn2Animate.addClass("pressed");

  // remove pressed animation after 200 milliseconds
  setTimeout(function () {
    btn2Animate.removeClass("pressed");
  }, 100);
}

/*----------------------
    Play Sounds
----------------------*/
function playSounds(soundFileName) {
  let audio = new Audio(`sounds/${soundFileName}.mp3`);
  audio.play();
}

/*----------------------
    Game Over
----------------------*/
function gameOver() {
  // play warning sound
  playSounds("wrong");

  // apply animations to the body
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  // change the h1
  $("h1").text("Game Over, Press Any Key to Restart");
}

/*----------------------
    Start Over
----------------------*/
function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
}
