// Starting variables
var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var start = false;

// Initiate game
$(document).on("keydown",function() {
    if (!start) {
        $("#level-title").html("Level " + level);
        nextSequence();
        start = true;
    }
});

// Record buttons pressed and check against game pattern answers
$(".btn").click(function () {                   // find all with class btn and add listener for click
    var userChosenColor = $(this).attr("id");   // get color id of the clicked button
    userClickedPattern.push(userChosenColor);   // add color to userClickedPattern array

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);   // get index number so you can use when comparing arrays
});

// FUNCTIONS
// Call color sequence
function nextSequence() {
    userClickedPattern = [];                            // need this array cleared when given next sequence because need user to put in whole sequence again. otherwise, previous clicks are stored.
    level ++;                                           // increase level when previous level is cleared
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);    
    var randomChosenColor = buttonColors[randomNumber]; // choose random color
    gamePattern.push(randomChosenColor);                // add color to gamePattern array

    for (let i = 0; i < gamePattern.length; i++) {      // for loop to replay each color in the sequence
        setTimeout(() => {
            $("#" + gamePattern[i])
                .animate({ opacity: 0 }, 500)
                .animate({ opacity: 1 }, 500);
            playSound(gamePattern[i]); 
        }, i * 1000);                                   // Delay animation/sound of each successive item in array by i * 1000ms (1 second per step)
    }
};

// Play sound function
function playSound(name) {
    var colorSound = new Audio("./sounds/" + name + ".mp3");
    colorSound.play();
};

// Animate button function
function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");
    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100)
}

// Check User's answer against Game's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();}, 1000);                                    // Play next color sequence if correct
        }
    } else {                                                                // Show game over status
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over. Press Any Key to Restart.");
        
        startOver();                                                        // Call start over function to reset variables
    }
}

// Start over function
function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}