# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Derek Li**

Time spent (required functionality): **1.5** hours spent 

Time spent (optional + additional features): **8** hours spent 

Link to project: (insert your link here, should start with https://glitch.com...)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Added a jquery animation for when you first start the game.
- [x] Replays cues after making mistake and it's not game over.
- [x] Show player their score.
- [x] Fixed some bugs related to behavior of the buttons in the origial tutorial 
    - The use of ``onmousedown`` and ``onmouseup`` caused would cause the tone of the button to play forever if you clicked on a button region and whilst holding the mouse down moved the cursor off the button region.
    - Buttons still registered as guesses as they were still enabled during ``playClueSequence`` which may not have been the intended behavior of the game.  
    - Made it clear when the cue was playing and when the user should and shouldn't press the buttons.
- [x] Added a custom favicon.

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](gif1-link-here)
![](gif2-link-here)
![](gif3-link-here)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

- For understanding various Web APIs (setTimeout, setInterval, etc): https://developer.mozilla.org/en-US/docs/Web/API
- For better understanding HTML: https://www.w3schools.com/html/default.asp
- For better understanding CSS: https://www.w3schools.com/css/default.asp
- For better understanding JS: https://www.w3schools.com/js/default.asp
- For button icons: https://www.flaticon.com/

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
[YOUR ANSWER HERE]

The primary challenge in creating this submissoin was to best understand the flow of logic in the game to properly make any desired modifications. 


- disabling buttons whilst

Tried to disable the buttons within the 

Somewhat asynchronous behavior

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[YOUR ANSWER HERE]

higher complexity when considering webapps
web based games
whatnot
incorporating more dynamic characteristics

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[YOUR ANSWER HERE]

Moreso like a game.

- [ ] Start menu and splash
- [ ] Game end menu and splash
- [ ] More diverse game difficulty selection where you can customize your game
- [ ] Mute/unmute audio button to adjust difficulty


## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright Derek Li

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.