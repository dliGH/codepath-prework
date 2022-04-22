// ------------------ GLOBAL CONSTs --------------------------

const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const mistakes = document.getElementById("mistakes");
const score = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const userText = document.getElementById("userText");
const difficultyButtons = document.getElementById("difficultyButtons");
const gameButtonArea = document.getElementById("gameButtonArea");
const timerP = document.getElementById("timer");

// ------------------ GLOBAL VARS ----------------------------

var pattern = [];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.2;  //must be between 0.0 and 1.0
var guessCounter = 0;
var numButtons = 6;
var cluePauseTime = 333; //how long to pause in between clues
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var numMistakes = 0;
var timeoutID = 0;
var switchTextID = 0;
var timer = 11;
var timerInt = '';

// ------------------HELPER FUNCTIONS--------------------------

function generatePattern(){
  pattern = [];
  for (let i = 0; i < 9; i++){
    let v = Math.floor(Math.random() * numButtons)+1;   
    pattern.push(v);
  }
  //console.log(pattern)
}

// disable button press
function disableButtons(){
  for (let i=1; i<=numButtons; i++){
    document.getElementById("button"+i).disabled = true;
  }
}

// enable button press
function enableButtons(){
  for (let i=1; i<=numButtons; i++){
    document.getElementById("button"+i).disabled = false;
  }
}

// ------------------ACTUAL GAME--------------------------

function difficultySelect(){
  userText.innerHTML = "Choose your difficulty!"
  startBtn.classList.add("hidden");
  difficultyButtons.classList.remove("hidden");
}

function startGame(numBtns){
  // initialize / reset game variables
  progress = 0;
  numButtons = numBtns;
  generatePattern();
  cluePauseTime = 333; 
  clueHoldTime = 1000; 
  gamePlaying = true;
  numMistakes = 0
  timer = 11;
  
  //revealing and hiding things
  mistakes.classList.remove("hidden");
  score.classList.remove("hidden");
  mistakes.innerHTML = "Mistakes: " + numMistakes + "/3";  
  score.innerHTML = "Score: 0";  
  timerP.classList.remove("hidden");
  gameButtonArea.classList.remove("hidden");
  difficultyButtons.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  
  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  if(numBtns == 4){
    document.getElementById("button5").classList.add("hidden");
    document.getElementById("button6").classList.add("hidden");
  }else if(numBtns == 5){
    document.getElementById("button6").classList.add("hidden");
  }
  
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  clearTimeout(timeoutID);
  clearInterval(timerInt);
  clearTimeout(switchTextID);
  timerP.innerHTML = '';
  
  // swap buttons
  stopBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
  mistakes.classList.add("hidden");
  score.classList.add("hidden");
  gameButtonArea.classList.add("hidden");
  
  userText.innerHTML = "Thanks for playing!<br>";
  startBtn.innerHTML = "Play Again?"
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone((btn-1)*4+1,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  
  // faster as you play  
  cluePauseTime = 333 - 35 * progress;
  clueHoldTime = 1000 - 75 * progress; 
  
  //disable buttons while cue is playing
  disableButtons()
  userText.innerHTML = "The cues are currently playing. Buttons are disabled in the meantime."
  
  for (let i=0; i<=progress; i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  
  setTimeout(enableButtons,delay) 
  switchTextID = setTimeout(switchText,delay) 
  
  timeoutID = setTimeout(() => {
    timerInt = setInterval(function () {
    if (gamePlaying) {
      timer -= 1;
      timerP.innerHTML = "Timer: " + timer;
    }
    if (timer == 0) {
      clearInterval(timerInt);
      loseGame();
    }
    }, 1000);
  }, delay);
}

function switchText(){
  userText.innerHTML = "The cues are done playing. Repeat back the pattern!"
}

function loseGame(){
  stopGame();
  alert("Game over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game over. You won!");
}


function guess(btn){
  console.log("user guessed: " + btn);
  
  if(!gamePlaying){
    return;
  } 
  
  if(btn != pattern[guessCounter]){
    numMistakes++;
    mistakes.innerHTML = "Mistakes: "+ numMistakes + "/3";
    timer = 11;
    clearInterval(timerInt);
    if(numMistakes == 3){
      loseGame();  
      return;
    } else {
      playClueSequence();  
    }
  } else {
    if(guessCounter != progress){
      guessCounter++;
    } else {
      if(progress != pattern.length - 1){
        progress++;
        score.innerHTML = ("Score: "+progress);
        playClueSequence();
        timer = 11;
        clearInterval(timerInt);
      }else{
        winGame();
        return;
      }
    } 
  }  
}



// ------------------ SOUND SYNTHESIS ----------------------------

const freqMap = {
  //button 1
  1: 261.63,
  2: 329.63,
  3: 392.00,
  4: 523.25,
  //button 2
  5: 311.13,
  6: 466.16,
  7: 554.37,
  8: 783.99,
  //button3
  9: 415.30,
  10: 523.25,
  11: 622.25,
  12: 830.61,
  //button4
  13: 246.94,
  14: 369.99,
  15: 440.00,
  16: 622.25,
  //button5
  17: 329.63,
  18: 415.30,
  19: 493.88,
  20: 659.25,
  //button6
  21: 196.00,
  22: 293.66,
  23: 349.23,
  24: 493.88
}

function playTone(btn,len){ 
  o1.frequency.value = freqMap[btn]
  o2.frequency.value = freqMap[btn+1]
  o3.frequency.value = freqMap[btn+2]
  o4.frequency.value = freqMap[btn+3]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

// function startTone(btn){
//   if(!tonePlaying){
//     context.resume()
//     o1.frequency.value = freqMap[btn]
//     g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
//     context.resume()
//     tonePlaying = true
//   }
// }

function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o1 = context.createOscillator()
var o2 = context.createOscillator()
var o3 = context.createOscillator()
var o4 = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o1.connect(g)
o1.start(0)
o2.connect(g)
o2.start(0)
o3.connect(g)
o3.start(0)
o4.connect(g)
o4.start(0)