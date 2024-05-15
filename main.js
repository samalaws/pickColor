function pickColor() {
  // helper functions
  const el = (css) => document.querySelector(css);
  const create = (html) => document.createElement(html);

  //############################################################
  // variables

  let checkBox = 16; // player option, how many squares to create in play field
  let colorArray = []; // array to save the colors in it

  let whiteRGB = "rgb(255,255,255)"; // white color

  let square, // square
    masterSquare, // Master square
    pickedC, // picked color
    element; //

  let coun = 0; // counter of clicks in game
  let time; // time of playing

  let right = new Audio("audio/right.mp3");
  let wrong = new Audio("audio/wrong.wav");
  let success = new Audio("audio/success.mp3");

  function checkRadioInput() {
    checkBox = this.value;
    return checkBox;
  }

  //##########################################
  // createRandomColor() to create random Color
  function createRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
    /*
            Math.floor = rounds a number DOWN to the nearest integer
            Math.Random = create random number

            MATH.floor(MATH.random() * 256) =
            to create a random number between 0 and 255

            RGB colors foramt = rgb(255,255,255)
            RGB colors range = 
                from rgb(0,0,0) => Black
                to rgb(255,255,255) => white
        */
  }

  //##########################################
  // createPlayFiled() to create play field
  //  depending on what the player has chosen
  // 16, 36, or 64 square

  function createPlayFiled() {
    for (let i = 0; i < checkBox; i++) {
      colorArray.push(createRandomColor()); // push created color in the array
      // should be NO created White color in game filed
      if (colorArray[i].split(" ").join("") === whiteRGB) {
        // if white color was created
        //.split(' ').join('') to remove spaces in RGB
        colorArray.splice(i, ""); // splice index of white color
        colorArray.push(createRandomColor()); // return the function agine
      }
      square = create("div"); // create new div -> square
      if (checkBox == 16) {
        //  if player chose 16 square
        square.style.height = "100px"; // set style -> square height for the div
        square.style.width = "100px"; // set style -> square width for the div
      } else if (checkBox == 36) {
        //  if player chose 36 square
        square.style.height = "68px"; // set style -> square height for the div
        square.style.width = "68px"; // set style -> square width for the div
      } else if (checkBox == 64) {
        // if player chose 36 square
        square.style.height = "50px"; // set style -> square height for the div
        square.style.width = "50px"; // set style -> square width for the div
      }

      square.style.backgroundColor = colorArray[i]; // set style ->  square background color = random color was created
      //          square.setAttribute('id', i+1); // set attribute ->  square id name
      square.setAttribute("class", "square"); // set attribute ->  square class name
      el("#game-filed").appendChild(square); // append element who was created to parent element
    }
  }
  //##########################################
  // createRefrenceSquare() to create refrence square

  function createRefrenceSquare() {
    masterSquare = create("div"); // create new div => refrence square
    pickedC = colorArray[pickNumber(checkBox)]; // get randum Color from Colors array
    masterSquare.style.backgroundColor = pickedC; // set the picked color as background
    masterSquare.setAttribute("id", "master-square"); // set id attribute
    //      masterSquare.setAttribute('class', 'master-square');
    el("#ref-square").appendChild(masterSquare); // append master square to parent element

    counter = create("p"); // create paragraph to show the counter in it
    counter.setAttribute("id", "counter"); // set id attribute
    counter.innerText = coun; // show the coun in counter paragraph
    el("#master-square").appendChild(counter); // append counter to parent element

    time = create("p"); // create paragraph to show the time in it
    time.setAttribute("id", "time"); // set id attribute
    time.innerText = "00:00"; // show the time in the time paragraph
    el("#master-square").appendChild(time); // append time to parent element
  }
  //##########################################
  // when the game finshed, create fild to whow the score and time of the play
  // this replay button

  function createReplayField() {
    el("#master-square").remove(); // remove #master-square element from html
    el("#game-filed").remove(); // remove #game-filed element from html

    replayField = create("div"); // create div
    replayField.setAttribute("id", "replay-field"); // set id attribute
    el("#ref-square").appendChild(replayField); // append created element to parent element

    scoreFiled = create("div"); // create div
    scoreFiled.setAttribute("id", "score-filed"); // set id attribute
    el("#replay-field").appendChild(scoreFiled); // append created element to parent e

    clickScoure = create("p"); // create p
    clickScoure.setAttribute("id", "click-scoure"); // set id attribute
    clickScoure.innerText = `Click: ${coun}`; // show count in element
    el("#score-filed").appendChild(clickScoure); // append created element to parent e

    timeScore = create("p"); // create p
    timeScore.setAttribute("id", "time-score"); // set id attribute
    timeScore.innerText = `Time: ${buildTime(time)}`; // show time in element
    el("#score-filed").appendChild(timeScore); // append created element to parent e

    replay = create("button"); // create button
    replay.setAttribute("id", "replay-btn"); // set id attribute
    //        replay.setAttribute('value','replay');
    replay.innerText = `New play`; // set inner text to element

    el("#replay-field").appendChild(replay); // append element to parent elemenet

    el("#replay-field").addEventListener("click", gameReplay); // elect element then add eventlistener on click run gameReplay function
  }

  //############################################################
  // function to add eventlistener to all elements in game-field

  function selectElementOnList() {
    let list = document.querySelectorAll("#game-filed .square");
    list.forEach((element) => {
      element.addEventListener("click", gameLogic);
    });
  }

  //##########################################
  // function to reload the game when the player clicked on replay

  function gameReplay() {
    location.reload();
  }

  //##########################################
  // pickNumber(number) create random number from 0 to the number,
  // that should be given to the function by the parameter (number)
  function pickNumber(number) {
    const nam = Math.floor(Math.random() * number);
    return nam;
  }

  //##########################################
  // counting and showing the score
  function counterPlus() {
    coun++;
    counter.innerText = coun;
  }

  //##############################################
  // function to build time
  function buildTime(t) {
    minutes = t.getMinutes();
    seconds = t.getSeconds();
    hours = t.getHours();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }
  // function to start the timer
  function startTimer() {
    // If time isn't an object, create new Date and set seconds/minutes to 0
    time = new Date();
    time.setSeconds(0); // Sets seconds to 0
    time.setMinutes(0); // Sets minutes to 0
    time.setHours(0); // Sets hours to 0

    // Update seconds, to be executed every second or 1000 miliseconds
    function changeTimer() {
      time.setSeconds(time.getSeconds() + 1);
      if (colorArray.length < 1) {
        return;
      }
      el("#time").innerText = buildTime(time);
    }
    // Set Interval to every second
    interval = setInterval(changeTimer, 1000);
  }
  //#############################################
  // this function work when'll be clicked on any square on play field

  function gameLogic(el) {
    element = el.target;
    const eColor = element.style.backgroundColor.split(" ").join(""); // element color without spaeces
    const mColor = masterSquare.style.backgroundColor.split(" ").join(""); // master color without spaeces

    counterPlus(); // run counterPlus function to add 1 to counter

    //        console.log(element.style.backgroundColor);
    //        console.log(masterSquare.style.backgroundColor);

    if (eColor == mColor) {
      // if the colors match each other

      //          console.log("right color");

      element.style.backgroundColor = whiteRGB; // set white color to selected scaure
      for (i = 0; i < colorArray.length; i++) {
        // for loop to loop on all index of the color array
        if (colorArray[i] === mColor) {
          // if master color has found in  color array
          colorArray.splice(i, 1); // splice / remove the clicked color from the array of the colors
        }
      }
      pickedC = colorArray[pickNumber(colorArray.length)]; // new random refrence color from the colors that still in array
      masterSquare.style.backgroundColor = pickedC; // set the new refrence color in the refrence square
      right.play(); // play right sound
      element.removeEventListener("click", gameLogic); // remove click eventlistener from clicked square
      element.style.cursor = "default"; // remove curser pointer from clicked square

      if (colorArray.length < 1) {
        // if the colors in the array less than 1
        createReplayField(); // create replay field to show the score, time, and replay button
        success.play(); // play success sound
      }
    } else {
      // if the colors of the  clicked square and refrence square match not each other
      //            console.log("wrong");
      wrong.play(); // play wrong sound
    }
  }

  // startPlay() when the game start, what should be done!
  function startPlay() {
    createPlayFiled(); // run function
    selectElementOnList(); // run function
    createRefrenceSquare(); // run function
    checkRadioInput(); // run function
    el("#options").remove(); // run function
    el("#start").remove(); // run function
    startTimer(); // run function
  }

  el("#easy").addEventListener("change", checkRadioInput); // select element then set eventlistener on click run function
  el("#medium").addEventListener("change", checkRadioInput); // select element then set eventlistener on click run function
  el("#hard").addEventListener("change", checkRadioInput); // select element then set eventlistener on click run function
  el("#start-game").addEventListener("click", startPlay); // select element then set eventlistener on click run function
}

pickColor(); // run function
