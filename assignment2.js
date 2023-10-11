var ok;
// Retrieve the users high score, if there is one
if (localStorage.getItem("highScore") === null) {
    document.getElementById("high").innerHTML = 0; 
  }else {
    document.getElementById("high").innerHTML = localStorage.getItem("highScore"); 
}

// Method used for the timer
var s;
var timer;
function startTimer(){
if(ok == true){
  timer = setInterval(countdown,1000);
s = 5;
}

}

function countdown(){
--s;
if(s == 0){
  clearInterval(timer);
  lose();
}
}

var score = 0;
$("#start").click(function(){
// Disables the user from clicking the button again
$('#start').off('click');
$("#start").css("cursor", "default");
// Disables inputs before game begins
preventInput();
// Start the game
setTimeout(start,3000);
});


function start(){
// Changes the colour of the indicator light to green
$("#indicator").css("background-color", "green");

colors();
}

// The array that stores the generated pattern
var pattern = [];

// The array that stores the user guesses
var user = new Array(100);

function clearArray(){
user.splice(0, user.length);
}

function colors(){
// Generates a random number between 1 and 4 to represent the colours
var color = Math.floor(Math.random() * 4) + 1;

  // Add the generated number to the pattern
  pattern.push(color);
// Start the flashing
colorLoop();
}

var i = 0;
function colorLoop(){

var delay;
if(pattern.length < 5){
delay = 800;
}else if(pattern.length >= 5 && pattern.length < 9){
delay = 600;
}else if(pattern.length >= 9 && pattern.length < 13){
delay = 400;
}else if(pattern.length >= 13){
delay = 300;
}
console.log(delay);
console.log(pattern.length);
setTimeout(function(){
  
  // Flashes the colors that appear in the pattern
  if(pattern[i] == 1){
    greenFlash();
  }else if(pattern[i] == 2){
    redFlash();
  }else if(pattern[i] == 3){
    yellowFlash();
  }else if(pattern[i] == 4){
    blueFlash();
  }
  i++;
  if(i<pattern.length){
    colorLoop();
  }else{
    i = 0;
    // Start the guessing
    guess();
  }
},delay)
}


function guess(){
var position = 0;
// Allow clicking of the colour buttons
allowInput();

// Starts the 5 second countdown
ok = true;
startTimer();

// Updates the guess array with green and checks if the arrays are the same length
$("#green-circle").click(function(){
  // Resets the countdown
  clearInterval(timer); 
  // Flash the colour
  greenFlash();
  // Updates the array
  user[position] = 1;
  // Compare this answer with the correct answer
  compare();
  // Update the position
  position++;
  // Start the next 5 second timer
  startTimer();
});

// Red button
$("#red-circle").click(function(){
  clearInterval(timer); 
  redFlash();
  user[position] = 2;
  compare();
  position++;
  startTimer();
});

// Yellow button
$("#yellow-circle").click(function(){
  clearInterval(timer); 
  yellowFlash();
  user[position] = 3;
  compare();
  position++;
  startTimer();
});

// Blue button
$("#blue-circle").click(function(){
  clearInterval(timer); 
  blueFlash();
  user[position] = 4;
  compare();
  position++;
  startTimer();
});


}
var pos = 0;
var counter = 0;
function compare(){
// If the two inputs we are comparing are the same
if(pattern[pos] == user[pos]){
  // Increment the counter
  counter++;
  // Increment the position
  pos++;
}else{
  // Otherwise, you lose
  lose();
}
// If the user got all the inputs correct
if(counter == pattern.length){
  // Reset the position and counter
  pos = 0;
  counter = 0;
  // Stop the user from adding more inputs
  preventInput();
  // Increment the score
  score++;
  // Change the score on the screen
  document.getElementById("current").innerHTML = score;
  // See if it is a high score
  highScore(score);
  // Clear the user guess array
  clearArray();
  // Reset the timer
  ok = false;
  clearInterval(timer);
  // Start the next round
  setTimeout(colors,2000);
}

}

// Check if the score is the highest, if it is, update the high-score counter
function highScore(x){
var temp = document.getElementById("high").textContent;
if(x > 0){
  if(x > temp){
    document.getElementById("high").innerHTML = x;
    localStorage.setItem("highScore", x);
  }
}

}

// Allows the circles to be interacted with
function allowInput(){
$('#green-circle').on('click');
$("#green-circle").css("cursor", "pointer");
$('#red-circle').on('click');
$("#red-circle").css("cursor", "pointer");
$('#yellow-circle').on('click');
$("#yellow-circle").css("cursor", "pointer");
$('#blue-circle').on('click');
$("#blue-circle").css("cursor", "pointer");
}

// Prevents the circles from being interacted with
function preventInput(){
$('#green-circle').off('click');
$("#green-circle").css("cursor", "default");
$('#red-circle').off('click');
$("#red-circle").css("cursor", "default");
$('#yellow-circle').off('click');
$("#yellow-circle").css("cursor", "default");
$('#blue-circle').off('click');
$("#blue-circle").css("cursor", "default");
}

// Speed of the flash
var delay = 300;

// Green flash
function greenFlash() {
document.getElementById("green-circle").style.backgroundColor="#0FF60F";
setTimeout(greenOff,delay);
}

function greenOff() {
document.getElementById("green-circle").style.backgroundColor="#066303";
}

// Red flash
function redFlash() {
document.getElementById("red-circle").style.backgroundColor="#FF0000";
setTimeout(redOff,delay);
}

function redOff() {
document.getElementById("red-circle").style.backgroundColor="#6E0703";
}

// Yellow flash
function yellowFlash() {
document.getElementById("yellow-circle").style.backgroundColor="#D7FF00";
setTimeout(yellowOff,delay);
}

function yellowOff() {
document.getElementById("yellow-circle").style.backgroundColor="#877207";
}

// Blue flash
function blueFlash() {
document.getElementById("blue-circle").style.backgroundColor="#0059FF";
setTimeout(blueOff,delay);
}
function blueOff() {
document.getElementById("blue-circle").style.backgroundColor="#040733";
}

// The function for the loss condition
function lose(){
greenFlash();
redFlash();
yellowFlash();
blueFlash();

setTimeout(greenFlash, 400);
setTimeout(redFlash, 400);
setTimeout(yellowFlash, 400);
setTimeout(blueFlash, 400);

setTimeout(greenFlash, 800);
setTimeout(redFlash, 800);
setTimeout(yellowFlash, 800);
setTimeout(blueFlash, 800);

setTimeout(greenFlash, 1200);
setTimeout(redFlash, 1200);
setTimeout(yellowFlash, 1200);
setTimeout(blueFlash, 1200);

setTimeout(greenFlash, 1600);
setTimeout(redFlash, 1600);
setTimeout(yellowFlash, 1600);
setTimeout(blueFlash, 1600);

// Refreshes the page to start a new game
setTimeout(reload,1700);
}
// Reloads the page
function reload(){
location.reload();

} 
