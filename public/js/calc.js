import { units, sIUnits, roman_num_data, roman_num_data_2 } from '../data.js'

//NUMBER METHOD TO CHECK NEGATIVE NUMBERS//
Number.prototype.isNegative = e => (/^\-/).test(e.toString());
let result;

let direction_pad = document.getElementById("direction-pad");
let calc_direction_pad = direction_pad;
let inner_pad = document.querySelector("#direction-pad > div");
direction_pad = Array.from(direction_pad.children);
let date_conv_interval = undefined;

let cursorPosition = 0;
let cursorPositionIndex = 0;
let blinkingCursor = document.getElementById('blinking-cursor');

let switchCalcBtn = document.getElementById('switch-calc');
switchCalcBtn.addEventListener('click', () => {
  window.open('./index.html', '_self');
})

direction_pad.forEach(direction => {
  direction.addEventListener("click", () => {
    // this code is responisble for the display of the shadow from each direction
    //button pressed on the direction keypad.//
    switch (direction.id) {
      case "up-btn":
        directionPadAnimation("0 3px 0 1px #2f2f2f", "inset 0 2px 0 2px #1f1f1f, 0 0 20px 1px black");
      case "right-btn":
        directionPadAnimation("-3px 0 0 1px #2f2f2f", "inset -2px 0 0 2px #1f1f1f, 0 0 20px 1px black");
        moveCursor().right();;
        break;
      case "down-btn":
        directionPadAnimation("0 -3px 0 1px #2f2f2f", "inset 0 -2px 0 2px #1f1f1f, 0 0 20px 1px black");
        break;
      case "left-btn":
        directionPadAnimation("3px 0 0 1px #2f2f2f", "inset 2px 0 0 2px #1f1f1f, 0 0 20px 1px black");
        moveCursor().left();;
        break;
      default:
        break;
    }
  });
});

function directionPadAnimation(outerBoxShadow, innerBoxShadow) {
  calc_direction_pad.style.boxShadow = outerBoxShadow;
  inner_pad.style.boxShadow = innerBoxShadow;
  setTimeout(() => {
    calc_direction_pad.style.boxShadow = "";
    inner_pad.style.boxShadow = "0 0 20px 1px black";
  }, 300);
};

//BUTTONS ON CLICK ANIMATION//
let keys = document.querySelectorAll(".key");
keys = Array.from(keys);

keys.forEach(key => button_effect(key));

function button_effect(e) {
  e.addEventListener("click", () => {
    if (e.id !== "color-mode") {
      window.clearInterval(date_conv_interval);
    }
    e.style.animation = "button 0.3s linear running infinite";
    setTimeout(() => {
      e.style.animationPlayState = "paused";
    }, 300);
  });
};

//POWER BUTTON CODE//
//turns on if on and turns off is on
//clear everything on the screen and reset the mode to NUM
//change the screen color to dark grey.

//set the power state to OFF on load.
window.onload = function () {
  batteryStatus();
  let localStorage = window.localStorage;
  localStorage.setItem("power_state", "OFF");

  //set screen default values to off.
  screenVariables().get_input_area().innerHTML = "";
  screenVariables().get_result_area().style.visibility = "hidden";
  screenVariables().get_calc_screen().style.backgroundColor = "#222f38";
  screenVariables().get_calc_screen().style.boxShadow =
    "inset 0 2px 10px 1px #111";
  screenVariables().get_top_screen().style.visibility = "hidden";
  screenVariables().get_cursor().style.visibility = "hidden";

  //listen for keypress and pass it into the input area//
  key_press_active();
  mode_switch();
};

//add a power toggle event to the power btn
const power_btn = document.getElementById("power-btn");

power_btn.addEventListener("click", () => {
  localStorage.power_state = localStorage.power_state == "OFF" ? "ON" : "OFF";
  let state_data = { ON: ["visible", "aqua"], OFF: ["hidden", "#333"] };

  screenVariables().get_input_area().innerHTML = "";
  screenVariables().get_result_area().style.visibility = "visible";
  screenVariables().get_result_area().innerHTML = 0;
  screenVariables().get_calc_screen().style.backgroundColor =
    state_data[localStorage.power_state][1];
  screenVariables().get_top_screen().style.visibility =
    state_data[localStorage.power_state][0];
  screenVariables().get_cursor().style.visibility =
    state_data[localStorage.power_state][0];
  screenVariables().get_result_area().style.visibility =
    state_data[localStorage.power_state][0];

  resetCusor();
  if (localStorage.power_state == 'OFF') {
    screenVariables().get_conv_mode().style.visibility = 'hidden';
    screenVariables().get_calc_mode().innerHTML = 'date';
  }
  window.clearInterval(date_conv_interval);
});

//SCREEN VARIABLES //
function screenVariables() {
  let input_area = document.getElementById("input-area");
  let result_area = document.querySelector("#result>p");
  let calc_screen = document.getElementById("screen");
  let top_screen_area = document.getElementById("top-screen");
  let cursor = document.getElementById("blinking-cursor");
  let conversion_mode = document.getElementById("conversion-mode");
  let calc_mode = document.getElementById("calc-mode");

  return {
    get_input_area: () => input_area,
    get_result_area: () => result_area,
    get_calc_screen: () => calc_screen,
    get_top_screen: () => top_screen_area,
    get_cursor: () => cursor,
    get_conv_mode: () => conversion_mode,
    get_calc_mode: () => calc_mode
  };
}

function moveCursor() {
  let displayed_text = screenVariables().get_input_area().innerHTML;
  return {
    left: () => {
      // let movLeftOverSubSuperscript = () => (screenVariables().get_input_area()).removeChild((screenVariables().get_input_area()).lastElementChild);
      // let moveLeftOverUnits = (i) => displayed_text.slice(0, displayed_text.length - units[i].length);
      // let moveLeftOnce = () => displayed_text.slice(0, displayed_text.length - 1);
      // lookAhead(moveLeftOverUnits, movLeftOverSubSuperscript, moveLeftOnce, units, displayed_text)
      moveBlinkingCursor('left', displayed_text, sIUnits)
    },
    right: () => {
      moveBlinkingCursor('right', displayed_text, sIUnits)
    },
    down: () => {

    },
    up: () => {

    }
  }
}

function moveBlinkingCursor(direction, displayed_text, sIUnits) {
  // issue is from the cursorpositionindex, it doesnt subtract on the first left click it 
  let displayedInnerText = screenVariables().get_input_area().innerText;
  cursorPositionIndex = cursorPositionIndex == 0 && cursorPosition == ""
    ? displayedInnerText.length : cursorPositionIndex;
  let isLastOrFirst;
  switch (direction) {
    case 'left':
      // debugger

      isLastOrFirst = blinkingCursor.style.right === "" && cursorPositionIndex === 0 ? false
        : cursorPositionIndex === displayedInnerText.length
          ? true : cursorPosition === 0 && cursorPositionIndex !== 0 ? true : cursorPositionIndex !== 0 ? true : false;
      console.log(isLastOrFirst, displayedInnerText.length, cursorPositionIndex)
      switch (isLastOrFirst) {
        case true:
          let i;
          for (i = 0; i < sIUnits.length; i += 1) {
            if (displayed_text.endsWith(sIUnits[i])) {
              console.log(cursorPosition);
              cursorPosition = cursorPosition ? (+(cursorPosition.replace('px', '')) + (sIUnits[i].length * 8.8)) + 'px'
                : (cursorPosition + (sIUnits[i].length * 8.8)) + 'px';
              cursorPositionIndex -= sIUnits[i].length;
              blinkingCursor.style.right = cursorPosition;
              console.log(cursorPositionIndex, cursorPosition)
              break;
            };
          };
          if (displayed_text.endsWith('>')) {
            let n = (displayed_text.match(/<[\w]+>[\w]+<\/[\w]+>/gi)[displayed_text.match(/<[\w]+>[\w]+<\/[\w]+>/gi)
              .length - 1]).replace(/(<\/[\w]+>)|(<[\w]+>)/gi, '').length;
            cursorPosition = cursorPosition ? (+(cursorPosition.replace('px', '')) + (n * 8.8)) + 'px' : '';
            cursorPositionIndex -= n;
            blinkingCursor.style.right = cursorPosition;
            console.log(cursorPositionIndex, cursorPosition)
            break;
          };
          cursorPosition = (+((blinkingCursor.style.right).replace('px', '')) + 8.8) + 'px';
          if (blinkingCursor.style.right === "") cursorPosition = 0;
          cursorPositionIndex -= 1;
          blinkingCursor.style.right = cursorPosition;

          console.log(blinkingCursor.style.right);
          console.log(cursorPositionIndex, cursorPosition)
          break;
        default:
          //do nothing
          break;
      }
      break;
    default:
      //for right direction
      // debugger
      isLastOrFirst = cursorPositionIndex !== displayedInnerText.length
        ? true : cursorPosition !== "" ? true : false;
      console.log(isLastOrFirst, displayedInnerText.length, cursorPositionIndex)
      switch (isLastOrFirst) {
        case true:
          let i;
          for (i = 0; i < sIUnits.length; i += 1) {
            if (displayed_text.endsWith(sIUnits[i])) {
              cursorPosition = cursorPosition ? (+(cursorPosition.replace('px', '')) - (sIUnits[i].length * 8.8)) + 'px'
                : (cursorPosition - (sIUnits[i].length * 8.8)) + 'px';
              cursorPositionIndex += sIUnits[i].length;
              blinkingCursor.style.right = cursorPosition;
              console.log(cursorPositionIndex, cursorPosition)
              break;
            };
          };
          if (displayed_text.endsWith('>')) {
            let n = (displayed_text.match(/<[\w]+>[\w]+<\/[\w]+>/gi)[displayed_text.match(/<[\w]+>[\w]+<\/[\w]+>/gi)
              .length - 1]).replace(/(<\/[\w]+>)|(<[\w]+>)/gi, '').length;
            cursorPosition = cursorPosition ? (+(cursorPosition.replace('px', '')) - (n * 8.8)) + 'px' : '';
            cursorPositionIndex += n;
            blinkingCursor.style.right = cursorPosition;
            console.log(cursorPositionIndex, cursorPosition)
            break;
          };

          cursorPosition = (+((blinkingCursor.style.right).replace('px', '')) - 8.8) + 'px';
          cursorPosition = cursorPosition === '0px' ? 0 : cursorPosition;

          if (cursorPosition === "-8.8px") cursorPosition = "";
          if (cursorPosition !== "") cursorPositionIndex += 1;
          if (cursorPosition === "") cursorPositionIndex = displayedInnerText.length;
          blinkingCursor.style.right = cursorPosition;

          console.log(blinkingCursor.style.right);
          console.log(cursorPositionIndex, cursorPosition)
          break;
        default:
          //do nothing
          break;
      }
      break;
  }
}
function resetCusor() {
  cursorPositionIndex = 0;
  cursorPosition = 0;
  blinkingCursor.style.right = "";
}
//COLOR MODES CODE///////
//get the root element and pass the values for the selected mode
// default mode is dark-mode.. on click of the color-mode btn
//the id is checked for the previous and pushes the data of the other then
//they are pushed into the css
let current_color_mode = "dark";
let color_mode_props = [
  "--bg-color",
  "--calc-body-color",
  "--text-color-keys",
  "--screen-color",
  "--screen-box-shadow",
  "--button-color",
  "--mode-label-color",
  "--keys-font-weight"
];
let color_modes_data = {
  dark: [
    "#000",
    "linear-gradient(180deg, #0e0e0e, #333333)",
    "#000",
    "aqua",
    " inset 0 2px 10px 1px #018874",
    "#fff",
    "#1b1b1b",
    "500"
  ],
  light: [
    "#fff",
    "linear-gradient(180deg, #999, #ccc)",
    "#fff",
    "#fff",
    " inset 0 2px 10px 1px #222",
    "#000",
    "#aaa9a9",
    "lighter"
  ]
};

const color_mode_toggle_btn = document.getElementById("color-mode");
color_mode_toggle_btn.addEventListener("click", () => {
  current_color_mode = current_color_mode === "dark" ? "light" : "dark";
  let i;
  for (i = 0; i < color_mode_props.length; i += 1) {
    document.documentElement.style.setProperty(
      `${color_mode_props[i]}`,
      color_modes_data[current_color_mode][i]
    );
  };
});

function key_press_active() {
  let button = document.getElementById("other-keys");
  button.onclick = function (event) {
    let el = event.target;
    if (localStorage.power_state === "ON") {
      if (el.dataset.value) {
        if (el.dataset.value === "Backspace") erase_input();
        else if (el.dataset.value === "equal") {
        } else {
          screenVariables().get_input_area().innerHTML += el.dataset.value;
          input_handler().set_input(el.dataset.value);
          cursorPositionIndex = screenVariables().get_input_area().innerText.length;
        };
      };
    };
  };
};

function batteryStatus() {
  let battery = document.getElementById('battery-level').children;
  battery = Array.from(battery);
  battery.reverse();

  if (window.navigator.getBattery()) {
    setInterval(() => {
      let battery_level;
      window.navigator.getBattery().then(function (battery) {
        battery_level = battery.level * 100;
      })
      //set timeout because the promise delays its return of the new battery level..
      setTimeout(() => {
        let num_of_full_bars = parseInt(battery_level / 20);
        let remnant_bar = (battery_level % 20) * 5;
        for (let i = 0; i < num_of_full_bars; i += 1) {
          battery[i].style = 'background:linear-gradient( 270deg,rgb(62, 255, 156) 100%, rgb(35, 46, 40) 0%)';
        }
        remnant_bar === 0 ? ''
          : battery[num_of_full_bars].style = ` background:linear-gradient( 270deg,rgb(62, 255, 156) ${remnant_bar}%, rgb(35, 46, 40) ${remnant_bar}%)`
      }, 1000);
    }, 1000);


  } else {
    battery.forEach(el => el.style = 'background:linear-gradient( 270deg,rgb(62, 255, 156) 100%, rgb(35, 46, 40) 0%)')
  }
};


function input_handler() {
  let inputed_data;

  return {
    set_input: (input) => { inputed_data = input },
    get_input: () => inputed_data
  };
}

//CLEAR TEXT ON CLICK OF BACKSPACE BUTTON
// ON click of the button, the last innerHTML is removed and put back

function erase_input() {
  let displayed_text = screenVariables().get_input_area().innerHTML;
  debugger
  let eraseSubSuperScripts = () => {
    // if ends with >
    let n = (displayed_text.match(/<[\w]+>[\w]+<\/[\w]+>/gi)[displayed_text.match(/<[\w]+>[\w]+<\/[\w]+>/gi)
      .length - 1]).replace(/(<\/[\w]+>)|(<[\w]+>)/gi, '').length
    cursorPositionIndex -= n;
    cursorPosition = cursorPosition ? (+(cursorPosition.replace('px', '')) - (n * 8.8)) + 'px' : '';
    cursorPositionIndex -= n;
    return (screenVariables().get_input_area()).removeChild((screenVariables().get_input_area()).lastElementChild);
  };
  let eraseUnitsAbove2 = (i) => {
    cursorPositionIndex -= sIUnits[i].length;
    cursorPosition = cursorPosition ? (+(cursorPosition.replace('px', '')) - (sIUnits[i].length * 8.8)) + 'px'
      : (cursorPosition - (sIUnits[i].length * 8.8)) + 'px';
    cursorPositionIndex -= sIUnits[i].length
    return displayed_text.slice(0, displayed_text.length - sIUnits[i].length)
  };
  let eraseSingleUnit = () => {
    cursorPositionIndex -= 1;
    cursorPosition = (+((blinkingCursor.style.right).replace('px', '')) - 8.8) + 'px';
    if (blinkingCursor.style.right === "") cursorPosition = 0;

    return displayed_text.slice(0, displayed_text.length - 1);
  };

  lookAhead(eraseUnitsAbove2, eraseSubSuperScripts, eraseSingleUnit, sIUnits, displayed_text);
}


function lookAhead(action1, action2, action3, sIUnits, displayed_text) {
  let i;
  for (i = 0; i < sIUnits.length; i += 1) {
    if (displayed_text.endsWith(sIUnits[i])) {
      return (screenVariables().get_input_area().innerHTML = action1(i));
    };
  };
  if (screenVariables().get_input_area().innerHTML.endsWith('>')) {
    return action2();
  };
  return (screenVariables().get_input_area().innerHTML = action3());
};

//CLEAR EVERYTHING BUTTON CODE
//Clears  all input data and any previous result still displayed
let clear_all_btn = document.getElementById("cancel");
clear_all_btn.addEventListener("click", clear_all);

// clear on press of delete key
window.onkeydown = function (event) {
  let el = event.which || event.keyCode;
  // console.log(el);
  if (el === 46) return clear_all();
  if (el === 8) return erase_input();

}
function clear_all() {
  screenVariables().get_input_area().innerHTML = "";
  screenVariables().get_result_area().innerHTML = "0";
  resetCusor();
}

//Display calculation mode//
function mode_switch() {
  let conv_units = ["length", "time", "mass", "energy", "temp", "area"];

  let count = 0;
  let mode_area = document.getElementById("modes");
  mode_area.addEventListener("click", click_check);
  function click_check(event) {
    let el = event.target;
    if (localStorage.power_state == "ON") {
      if (el.dataset.value) {
        screenVariables().get_calc_mode().innerHTML = el.dataset.value;
        screenVariables().get_calc_mode().style.backgroundColor = el.dataset.value == 'date' ? '#ffd900'
          : el.dataset.value == 'base' ? '#ee3fce' : el.dataset.value == 'rom' ? '#009dff'
            : el.dataset.value == 'conv' ? '#00ff91' : '';
        if (el.dataset.value == "conv") {
          screenVariables().get_conv_mode().innerHTML = conv_units[count];
          screenVariables().get_conv_mode().style.visibility = "visible";
          count === conv_units.length - 1 ? (count = 0) : (count += 1);
        } else {
          count = 0;
          screenVariables().get_conv_mode().style.visibility = "hidden";
        }
      }
    } else {
      screenVariables().get_conv_mode().style.visibility = 'hidden';
    }
  }
}

//CALCULATE PROBLEM CODE
let equal_btn = document.getElementById("equals-btn");
let arranged_data;
function roman_numerals_conversion() {
  let input = (screenVariables().get_input_area().innerText).replace(/\s/g, '');
  let output = screenVariables().get_result_area();
  let result = '';
  let digits = Object.keys(roman_num_data);
  let roman_numerals = Object.values(roman_num_data);

  let value = input.split(/→/g)[0];
  if (input.split(/→/g)[1] == 'NROM') {
    if (+value) {
      value = +value;
      if (value < 3999) {
        for (let i = digits.length - 1; i >= 0; i -= 1) {
          while (value >= digits[i]) {
            result += roman_numerals[i];
            value -= digits[i];
          }
        }
        return output.innerHTML = result;
      } else {
        return output.innerHTML = 'Max number is 3999'
      }
    } else {
      return output.innerHTML = 'syntaxError'
    }

  } else if (input.split(/→/g)[1] == 'N') {
    if (typeof value == "string") {
      try {
        // debugger
        let input = value;
        input = input.split('');

        let numArray = Object.keys(roman_num_data_2);
        let romArray = Object.values(roman_num_data_2);

        let result = 0;
        let previousNumber = 0;

        for (let i = 0; i < input.length; i += 1) {
          // debugger
          if (i > input.length) {
            return output.innerHTML = result;
          }

          if (romArray.find(n => n == input[i])) {
            let currentRomNum = +numArray[romArray.indexOf(input[i])];
            let nextRomNum = +numArray[romArray.indexOf(input[i + 1])];
            let nextTwoROM = input[i] + input[i + 1];
            let nextThreeROM = input[i] + input[i + 1] + input[i + 2];

            console.log(currentRomNum, nextRomNum, nextTwoROM, nextThreeROM);

            if (romArray.includes(nextThreeROM) || romArray.includes(nextTwoROM)) {
              let romanValue = romArray.includes(nextThreeROM) ? nextThreeROM : nextTwoROM;
              let roman2Num = +(numArray[romArray.indexOf(romanValue)]);
              if (previousNumber !== 0 && previousNumber < roman2Num) return output.innerHTML = 'syntaxError';

              result += roman2Num;
              previousNumber = currentRomNum;

              romArray.splice(romArray.indexOf(nextThreeROM), 1);
              numArray.splice(romArray.indexOf(nextThreeROM), 1);
              romArray.splice(romArray.indexOf(nextTwoROM), 1);
              numArray.splice(romArray.indexOf(nextTwoROM), 1);
              romArray.splice(romArray.indexOf(input[i]), 1);
              numArray.splice(romArray.indexOf(input[i]), 1);

              if (romanValue.length == 2) {
                i += 1;
              } else {
                i += 2;
              }

            } else {
              if (currentRomNum <= nextRomNum) {
                if (romArray.includes(nextTwoROM)) {
                  if (previousNumber) {
                    if (previousNumber > currentRomNum && previousNumber > (nextRomNum - currentRomNum)) {
                      result += (nextRomNum - currentRomNum);
                      previousNumber = nextRomNum - currentRomNum;
                      romArray.splice(romArray.indexOf(nextTwoROM), 1);
                      numArray.splice(romArray.indexOf(nextTwoROM), 1);
                      i += 1;
                    } else {
                      return output.innerHTML = 'syntaxError';
                    }
                  } else {
                    result += (nextRomNum - currentRomNum);
                    previousNumber = nextRomNum - currentRomNum;
                    romArray.splice(romArray.indexOf(nextTwoROM), 1);
                    numArray.splice(romArray.indexOf(nextTwoROM), 1);
                  }
                } else {
                  return output.innerHTML = 'syntaxError';
                }
              } else {
                // the current is bigger than the next
                if (previousNumber) {
                  if (previousNumber > currentRomNum) {
                    result += currentRomNum;
                    previousNumber = currentRomNum;
                    romArray.splice(romArray.indexOf(input[i]), 1);
                    numArray.splice(romArray.indexOf(input[i]), 1);
                  } else {
                    return output.innerHTML = 'syntaxError';
                  }
                } else {
                  result += currentRomNum;
                  previousNumber = currentRomNum;
                  romArray.splice(romArray.indexOf(input[i]), 1);
                  numArray.splice(romArray.indexOf(input[i]), 1);
                }
              }
            }
          } else {
            return output.innerHTML = 'syntaxError'
          }
        }
        return output.innerHTML = result;
      } catch (error) {
        return output.innerHTML = 'syntaxError'
      }

    } else {
      return output.innerHTML = 'syntaxError'
    }

  } else {
    return output.innerHTML = 'syntaxError'
  }
  return;
}

/// Numbr base code

function date_conversion() {
  try {
    let input = (screenVariables().get_input_area().innerHTML).replace(/\s/g, '');
    let output = screenVariables().get_result_area();
    let result;
    let conversion_depth = (screenVariables().get_input_area().innerHTML).match(/→/g).length;
    let date_data = input.match(/[0-9]+/g);
    let conv_sign_idx = input.indexOf(input.match(/\→/g)[0]);
    let output_format = 'yr';
    let from_date;
    let to_date;
    let year, month, week, day, hour, min, sec;
    let formats = {
      cen: 3.154e+12,
      dec: 3.154e+11,
      yr: 31536000000,
      mth: 2.628e+9,
      wk: 6.048e+8,
      day: 8.64e+7,
      hr: 3.6e+6,
      min: 60000,
      s: 1000,
      // µs: 0.001
    }
    let values = Object.values(formats);
    let keys = Object.keys(formats);

    if (input.slice(0, conv_sign_idx) == 'now') {
      from_date = new Date().getTime();
      to_date = new Date(`${date_data[1]}-${date_data[0]}-${date_data[2]}`).getTime();
    } else if ((input.slice(conv_sign_idx + 1, conv_sign_idx + 4) == 'now') && (input.slice(conv_sign_idx + 1) == "") && conversion_depth == 1) {
      to_date = new Date().getTime();
      from_date = new Date(`${date_data[1]}-${date_data[0]}-${date_data[2]}`).getTime();
    } else {
      from_date = new Date(`${date_data[1]}-${date_data[0]}-${date_data[2]}`);
      to_date = new Date(`${date_data[4]}-${date_data[3]}-${date_data[5]}`);
    }

    result = to_date - from_date;

    //check if result is a negative value// then insert ago after the output// 
    let is_to_date_passed;
    if (Number.prototype.isNegative(result)) {
      result = -(result);
      is_to_date_passed = true;
    }

    if (input.match(/\→/g).length == 2) {
      output_format = input.match(/µ?[a-z]+$/gi)[0];
      if (output_format == 'µs') {
        return output.innerHTML = `${result}${output_format} ${is_to_date_passed ? 'ago' : ''}`;
      } else {
        let idx = keys.indexOf(output_format);
        let remainder = result % values[idx];
        let first_value = Math.floor(result / values[idx]);
        let output_value = `${first_value >= 1 ? first_value + (first_value > 1 ?
          ((/[s]$/).test(keys[idx])) ? keys[idx] : keys[idx] + 's' : '') : ''}`;
        let thereIsRemainder = false;

        values.reduce((remainder, value, i) => {
          if (idx + 1 === i) {
            check = true;
          }
          if (thereIsRemainder) {
            let next_value = Math.floor(remainder / value);
            output_value += ` ${next_value >= 1 ? next_value + (next_value > 1 ?
              ((/[s]$/).test(keys[i])) ? keys[i] : keys[i] + 's' : '') : ''}`;
            remainder %= value;
          }
          return remainder;;
        }, remainder);

        return output.innerHTML = `${output_value} ${is_to_date_passed ? 'ago' : ''}`;
      }

    } else {
      year = Math.floor(result / 31536000000);
      month = Math.floor((result % (31536000000)) / (2.628e+9));
      week = Math.floor(((result % (31536000000)) % (2.628e+9)) / (6.048e+8));
      day = Math.floor((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) / 8.64e+7);
      hour = Math.floor(((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) % 8.64e+7) / 3.6e+6);
      min = Math.floor((((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) % 8.64e+7) % 3.6e+6) / 60000);
      sec = Math.floor(((((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) % 8.64e+7) % 3.6e+6) % 60000) / 1000)

      return output.innerHTML = `${year >= 1 ? year + (year > 1 ? 'yrs' : 'yr')
        : ''} ${month >= 1 ? month + (month > 1 ? 'mths' : 'mth')
          : ''} ${week >= 1 ? week + (week > 1 ? 'wks' : 'wk')
            : ''} ${day >= 1 ? day + (day > 1 ? 'dys' : 'dy')
              : ''} ${hour >= 1 ? hour + (hour > 1 ? 'hrs' : 'hr')
                : ''} ${min >= 1 ? min + (min > 1 ? 'mins' : 'min')
                  : ''} ${sec >= 1 ? sec + 's'
                    : ''} ${is_to_date_passed ? 'ago' : ''}`;

    }
  } catch (error) {
    console.log(error.message);
    return (screenVariables().get_result_area().innerHTML == "" ? "" :
      screenVariables().get_result_area().innerHTML = 'syntaxError');
    window.clearInterval(date_conv_interval);
  }

}

String.prototype.reverseValue = () => {
  let objects = {
  }

  return {
    get_similar: (input) => console.log(objects[input])
  }
}

function unit_conversion() {
  try {
    let input = (screenVariables().get_input_area().innerHTML).trim();
    let inValue = +(input.match(/[0-9]+/gi)[0]);
    let outValue = +(input.match(/[0-9]+/gi)[1]);
    let inUnit = input.match(/[A-Za-zµ]+/gi)[0];
    let outUnit = input.match(/[A-Za-zµ]+/gi)[1]
    let value1_inUnit = inValue * units[inUnit][outUnit];
    let value2_outUnit = outValue * units[outUnit][inUnit];

    let output1
    let output2;

    switch (input.match(/[–|+|×|\/|→]/gi).join()) {
      case '–':
        output1 = value1_inUnit - outValue;
        output2 = inValue - value2_outUnit
        break;
      case '+':
        output1 = value1_inUnit + outValue;
        output2 = inValue + value2_outUnit
        break;
      case '×':
        output1 = value1_inUnit * outValue;
        output2 = inValue * value2_outUnit
        break;
      case '/':
        output1 = value1_inUnit / outValue;
        output2 = inValue / value2_outUnit
        break;
      case '→':
        output1 = value1_inUnit.toString().length > 9 ? value1_inUnit.toExponential(2)
          : value1_inUnit.toString().includes('.') ? value1_inUnit
            : value1_inUnit.toLocaleString();
        break;
      default:
        break;
    }

    if (input.match(/[–|+|×|\/|→]/gi).join() === '→') {
      return screenVariables().get_result_area().innerHTML = output1 + outUnit;
    }
    output1 = output1.toString().length > 5 ? output1.toExponential(2) : output1.toLocaleString();
    output2 = output2.toString().length > 5 ? output2.toExponential(2) : output2.toLocaleString();
    return inUnit == outUnit ? screenVariables().get_result_area().innerHTML = output1 + outUnit
      : screenVariables().get_result_area().innerHTML = output1 + outUnit + ' or ' + output2 + inUnit;

  } catch (error) {
    screenVariables().get_result_area().innerHTML == "" ? "" :
      screenVariables().get_result_area().innerHTML = 'syntaxError';
    return {
      'error name': error.name,
      'error message': 'Check your inputs'
    }
  }
}

equal_btn.addEventListener('click', select_calculation);

function base_conversion() {
  let input = screenVariables().get_input_area();
  let input_nodes = Array.from(input.childNodes);
  let output = '';
  let number_of_elem = input_nodes.length;
  let base_of_result = '';

  if (input.innerText.includes('→')) {
    base_of_result = input.innerText.slice((input.innerText.indexOf('N')) + 1);
    input_nodes.splice(input_nodes.length - 1);
    number_of_elem -= 1;
  };

  let i;
  input_nodes.forEach(node => {
    node.textContent = ((node.textContent.replace(/\s/gi, '')).replace(/\–/gi, '-'));
  });
  try {
    for (i = 0; i < number_of_elem; i += 1) {
      if (input_nodes[i].constructor == Text) {
        switch ((input_nodes[i].textContent).charAt(0)) {
          case '/': output += '/'
            break;
          case '+': output += '+'
            break;
          case '×': output += '*'
            break;
          case '-': output += '-'
            break;
          default:
            break;
        }
        if (number_of_elem - 1 > i && input_nodes[i + 1].constructor === HTMLElement) {
          output += parseInt((input_nodes[i].textContent).replace(/[\-\+\×\/N]/gi, ''), input_nodes[i + 1].textContent);
          i += 1;
        } else {
          output += ((input_nodes[i].textContent).replace(/[\-\+\×\/\→N]/gi, ''));
        }
      }
    }

    let str = output;
    let digits = str.split(/[\/\-\+\*]/gi);
    let ops = str.split(/[0-9\s]+/gi).filter(e => e !== "");
    let newArr = [];

    for (let i = 0; i < digits.length; i += 1) {
      if (ops[i]) newArr.push(digits[i], ops[i]);
      else newArr.push(digits[i]);
    };
    calculate(newArr);
    result == 'syntaxError' ? base_of_result = '' : '';

    result = result.toString(base_of_result || 10);
    base_of_result === "16" ? result = result.toUpperCase() : result;
    result = `${result}<sub style='color:rebeccapurple'>${base_of_result}</sub>`;
    screenVariables().get_result_area().innerHTML = result;

  } catch (error) {
    console.log(error)
    return (screenVariables().get_result_area().innerHTML == "" ? "" :
      screenVariables().get_result_area().innerHTML = 'syntaxError');
  }
}

function calculate(newArr) {
  if (newArr.includes('/')) bodmas('/');
  if (newArr.includes('*')) bodmas('*');
  if (newArr.includes('+')) bodmas('+');
  if (newArr.includes('-')) bodmas('-');

  if (newArr.length == 1) {
    return result = newArr[0];
  };

  function bodmas(op) {
    while (newArr.includes(op)) {
      let opIndex = newArr.findIndex(e => e == op);
      let output = 0;
      if (!isNaN(newArr[opIndex - 1]) && !isNaN(newArr[opIndex + 1]) && opIndex > 0 && opIndex < newArr.length - 1) {
        switch (op) {
          case '/': output = Number(newArr[opIndex - 1]) / Number(newArr[opIndex + 1]);
            break;
          case '*': output = Number(newArr[opIndex - 1]) * Number(newArr[opIndex + 1]);
            break;
          case '+': output = Number(newArr[opIndex - 1]) + Number(newArr[opIndex + 1]);
            break;
          case '-': output = Number(newArr[opIndex - 1]) - Number(newArr[opIndex + 1]);
            break;
          default: ;
            break;
        };

        newArr[opIndex - 1] = "";
        newArr[opIndex + 1] = "";
        newArr[opIndex] = output;
        newArr = newArr.filter(e => e !== "");
      } else {
        result = 'syntax error';
      };
    };
  }
}

function romToNum() {
  try {
    let input = (screenVariables().get_input_area().innerHTML).trim();
    let romanInput = input.match(/[0-9]+/gi)[0];
    romanInput = romanInput.split('');

    let numArray = Object.keys(roman_num_data);
    let romArray = Object.values(roman_num_data);
    let result = 0;

    for (let i = 0; i < romanInput.length; i += 1) {
      if (i > romanInput.length) {
        return screenVariables().get_result_area().innerHTML = result
      }

      if (romArray.find(n => n == romanInput[i])) {
        let currentRomNum = numArray[romArray.indexOf(romanInput[i])];
        let nextRomNum = numArray[romArray.indexOf(romanInput[i + 1])];
        if (currentRomNum < nextRomNum) {
          result += (nextRomNum - currentRomNum);
          i += 1;
        } else {
          result += currentRomNum;
        }
      } else {
        return screenVariables().get_result_area().innerHTML = 'syntaxError';
      }
    }

  } catch (error) {
    return screenVariables().get_result_area().innerHTML = 'syntaxError';
  }
}

//THIS CODE SWITCHES THE FORMULAR THAT CARRIES OU THE CALCUATION
function select_calculation() {
  let calc_mode = screenVariables().get_calc_mode().innerHTML;
  // let conv_mode = screenVariables().get_conv_mode().innerHTML;
  switch (calc_mode) {
    case 'base': base_conversion();
      break;
    case 'rom': roman_numerals_conversion();
      break;
    case 'conv': unit_conversion();
      break;
    case 'date': date_conv_interval = setInterval(date_conversion, 1000)
      break;
    default:
      break;
  }
}

