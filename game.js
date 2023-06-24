// games pattern and sounds
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeOut(200)
    .addClass("pressed")
    .fadeIn(200);
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 200);
  var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
  audio.play();
  gamePattern.push(randomChosenColour);
}

// users choices
var userClickedPattern = [];
$(".btn").click(function (event) {
  var userChosenColour = $(event.currentTarget).attr("id");
  userClickedPattern.push(userChosenColour);
});
