// games variables and arrays
var level = 1;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// game start and level tracking
// game has not strated if level is 1
$("body").on("keydown", function () {
  if (level === 1) {
    nextSequence();
  }
});

// function for next level and title updates
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  var levelTitle = "Level " + level;
  $("#" + randomChosenColour)
    .fadeOut(200)
    .addClass("pressed")
    .fadeIn(200);
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 200);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("h1").text(levelTitle);
  level = level + 1;
}

// users choices function (on click)
$(".btn").click(function (event) {
  var userChosenColour = $(event.currentTarget).attr("id");
  $("#" + userChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);

  // game logic
  var usersAnswerLength = userClickedPattern.length - 1;
  if (userClickedPattern[usersAnswerLength] == gamePattern[usersAnswerLength]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern.length = 0;
      }, 500);
    }
  } else {
    wrongAnswer();
  }
});

// functions for sound (button press and sequence)
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// wrong answer
function wrongAnswer() {
  var audioWrong = new Audio("./sounds/wrong.mp3");
  audioWrong.play();
  userClickedPattern.length = 0;
  gamePattern.length = 0;
  level = 1;
  $("h1").text("Reset by pressing any key");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);
}
