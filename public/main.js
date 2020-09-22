import { convData, baseData } from './data.js';

let menuBar = document.getElementById('menu-bar');
let currentPage = document.getElementById('current-page');
let menuBgColors = {
  "unit-conv": "#df3f05",
  "rom-conv": "#c40038",
  "base-conv": "#020c72",
  "other-conv": "",
}
let allCards = document.querySelectorAll('.card');
let mainArea = document.getElementById('main');
let backBtns = document.querySelectorAll('.back-btn');
let toggleSwitch = document.getElementById('toggle-icon');
let unitsSection = document.querySelector('.units-section');
let unitUnitFrom = document.querySelector('#unit-conv .to-unit');
let unitUnitTo = document.querySelector('#unit-conv .from-unit');
let baseUnitFrom = document.querySelector('#base-conv .to-unit');
let baseUnitTo = document.querySelector('#base-conv .from-unit');
let switchUnitCoversionBtn = document.querySelector('#unit-conv .switch-conv');
let switchBaseConversionBtn = document.querySelector('#base-conv .switch-conv');
let unitConversonType = document.querySelector('.conv-type-wrapper');

let unitToSelect = '';
let selectedUnitType = '';
let currentRomConv = 'num2Rom';
let currentConverter = 'base-conv';

unitUnitFrom.addEventListener('click', showListOfUnits);
unitUnitTo.addEventListener('click', showListOfUnits);
baseUnitFrom.addEventListener('click', showListOfUnits);
baseUnitTo.addEventListener('click', showListOfUnits);

toggleSwitch.addEventListener('click', toggleMode);
switchUnitCoversionBtn.addEventListener('click', switchConversionUnits);
switchBaseConversionBtn.addEventListener('click', switchConversionUnits);

backBtns.forEach(btn => btn.addEventListener('click', goBack));

window.onload = function () {
  mainArea.addEventListener('click', selectConverter);
};

function toggleMode() {
  let rootEl = document.querySelector(':root');
  let toggleSwitch = document.getElementById('toggle-switch');
  let currentMode = toggleSwitch.classList.contains('fa-toggle-on'); //dark mode by default
  if (currentMode) {    
    toggleSwitch.classList.replace('fa-toggle-on', 'fa-toggle-off');
    unitsSection.classList.replace(unitsSection.classList[1],'light-mode');

    return rootEl.style = `--page-title: #fff; --text:#000;
              --unit-bg:#fff; --rom-bg:#fff;  --base-bg: #fff; --unit-text:#000; --bg: #fff;`
  }
  toggleSwitch.classList.replace('fa-toggle-off', 'fa-toggle-on');
  unitsSection.classList.replace('light-mode',`${currentConverter.replace('conv','color')}`);
  return rootEl.style = `--page-title: #000;--text:#fff;
          --unit-bg:#611d00;--rom-bg:#610027;  --base-bg: #002f61;  --unit-text:#fff;      --bg: #000031;`
};

function goBack() {
  selectedUnitType = '';
  closeUnitSelectionWrapper()
  hideConversionPage(this.parentElement)
  allCards.forEach(card => normalize(card));
  mainArea.style = 'overflow-y:auto;padding:1em 1em 64px 1em';
  return mainArea.addEventListener('click', selectConverter);
};

function growDiv(div) {
  div.style = `width:100%; height: 97%; display: flex; cursor: unset; pointer-events:none`;
  // div.children[0].style = 'display:initial; pointer-events:visible';
  div.children[3].style.display = 'flex';
  setTimeout(() => {
    showConversionPage(div)
  }, 3000);
};

function normalize(div) {
  div.style = `width:45%; height: 30%; display: flex; cursor:pointer; overflow: hidden;`;
  div.children[0].style = 'display:none;pointer-events:none';
  div.children[3].style.display = 'none';
  // setTimeout(()=>{div.style.flex = 'none'},5000)
};

function shrinkDiv(div) {
  div.style = `width:0%; height: 0%; display: none; `;
};

function selectConverter(event) {
  let id = event.target.id;
  if (id !== 'main' && !event.target.classList.contains('back-btn')) {
    menuBar.style.backgroundColor = `${menuBgColors[id]}`;
    currentPage.style.color = `${menuBgColors[id]}`;
    allCards.forEach(card => {
      if (card.id !== id) shrinkDiv(card);
    });
    // if(id == 'base-conv') createConvTypeUnits('base-conv');
    mainArea.removeEventListener('click', selectConverter);
    unitsSection.classList.replace(`${currentConverter.replace('conv','color')}`,`${id.replace('conv','color')}`);
    currentConverter = id;
  
    return growDiv(document.getElementById(id));
  }
};

function showConversionPage(div) {
  mainArea.style = 'padding:0;overflow-y:hidden;';
  div.children[0].style = 'display:initial; pointer-events:visible';
  div.children[1].style.display = 'none';
  div.children[2].style.display = 'none';
  div.children[3].style.display = 'none';
  div.style = `width:100%;height:100%;overflow-x:auto; cursor:default`;
  if (window.matchMedia('(max-width:800px)').matches) {
    document.querySelector(`#${div.id} .conversion-section`).style.margin = '2em auto 6em auto';
  }
  showPageContents(div);
};

function hideConversionPage(div) {
  div.children[0].style = 'none';
  div.children[1].style.display = 'initial';
  div.children[2].style.display = 'block';
  div.children[3].style.display = 'none';
  hidePageContents(div);
};

function showPageContents(div) {
  document.getElementById(`${div.id}-page`).style.display = 'block';
  if (div.id == 'unit-conv') populateUIWithConvType('length', div.id);
  else if (div.id == 'base-conv') populateUIWithConvType('base', div.id);
  // else if (div.id == 'rom-conv') switchRomanConvType('');
};

function hidePageContents(div) {
  document.getElementById(`${div.id}-page`).style.display = 'none';
};

unitConversonType.addEventListener('click', (event) => {
  let convType = event.target.getAttribute('data-conv-type')
  if (convType !== undefined && convType !== '') {
    // console.log(convType, event.target.parentElement.parentElement.id)
    populateUIWithConvType(convType, event.target.parentElement.parentElement.id);
  }
})

function populateUIWithConvType(convType, div) {
  let convTypeName = document.querySelector(`#${div} .unit-intro-note header`) ||
    '';
  let convDefinition = document.querySelector(`#${div} .unit-note`) || '';
  let convDefaultValue1 = document.querySelector(`#${div} .from-unit`).firstChild;
  let convDefaultValue2 = document.querySelector(`#${div} .to-unit`).firstChild;
  let convDefaultValue1SIUnit = document.querySelectorAll(`#${div} .unit-icon`)[0] || '';  //
  let convDefaultValue2SIUnit = document.querySelectorAll(`#${div} .unit-icon`)[1] || '';   //
  let el = document.querySelector(`[data-conv-type="${convType}"]`) ||
    '';

  selectedUnitType = convType;
  convTypeName ? convTypeName.textContent = convType : '';
  convDefinition ? div == 'base-conv' ? convDefinition.textContent = baseData[convType].desc :
    convDefinition.textContent = convData[convType].desc : '';

  if (div == 'base-conv') {
    convDefaultValue1.replaceWith(baseData[convType].types[0]);
    convDefaultValue2.replaceWith(baseData[convType].types[1]);
    document.querySelector(`#${div} .from-unit`).nextElementSibling.setAttribute('type',
      baseData[convType].inputType[0]);
    document.querySelector(`#${div} .to-unit`).nextElementSibling.setAttribute('type',
      baseData[convType].inputType[3]);
  } else {
    convDefaultValue1.replaceWith(convData[convType].types[0]);
    convDefaultValue2.replaceWith(convData[convType].types[1]);
  }

  if (convDefaultValue1SIUnit && convDefaultValue2SIUnit) {
    convDefaultValue1SIUnit.textContent = convData[convType].SIUnit[0];
    convDefaultValue2SIUnit.textContent = convData[convType].SIUnit[1];
  }

  if (el) {
    let parentEl = el.parentElement;
    for (let i = 0; i < parentEl.childElementCount; i += 1) {
      if (parentEl.children[i].getAttribute('data-conv-type') == convType) {
        parentEl.children[i].classList.add('opacity');
        parentEl.children[i].style = `pointer-events:default;cursor:none;`;
      } else {
        parentEl.children[i].classList.remove('opacity');
        parentEl.children[i].style = `pointer-events:visible;cursor:pointer;`;
      }
    }
  }
  createConvTypeUnits(convType);
};

function showListOfUnits(event) {
  setTimeout(() => {
    unitsSection.style.bottom = '3em';
  }, 400);
  unitsSection.style.display = 'flex';
  unitToSelect = event.target.classList[0];
};

function createConvTypeUnits(convType) {
  let contents = '';
  let convTypeData = convData[convType] || baseData[convType];
  for (let i = 0; i < convTypeData.types.length; i += 1) {
    contents +=
      `<p class="selectable-unit" data-unit="${convTypeData.types[i]}">${convTypeData.types[i]}</p>`
  }
  contents += `<span class="fa fa-times close-unit-section-btn" aria-label="close selection"></span>`;
  unitsSection.innerHTML = contents;


  setTimeout(() => {
    let closeUnitSelectionWrapperBtn = document.querySelector('.close-unit-section-btn');
    let selectableUnits = document.querySelectorAll('.selectable-unit');
    selectableUnits.forEach(unit => unit.addEventListener('click', (event) => {
      let el = event.target;
      let index;
      
      if (convTypeData.name !== 'base') {
        index = convData[selectedUnitType].types.indexOf(`${el.textContent}`);
        document.querySelector(`.${unitToSelect}`).parentElement.children[0].textContent =
          convData[selectedUnitType].SIUnit[index]
        document.querySelector(`.${unitToSelect}`).firstChild.replaceWith(`${el.textContent}`);

      } else {
        document.querySelector(`#base-conv .${unitToSelect}`).firstChild.replaceWith(`${el.textContent}`);
        
      }

      return closeUnitSelectionWrapper();
    }))
    closeUnitSelectionWrapperBtn.addEventListener('click', closeUnitSelectionWrapper)
  }, 2000);
};

function closeUnitSelectionWrapper() {
  setTimeout(() => {
    unitsSection.style.display = 'none';
  }, 400);
  unitsSection.style.bottom = '-102%';
};

function switchConversionUnits() {
  let fromUnit, toUnit, fromSIUnit, toSIUnit, toSIValue, fromSIValue, toValue, fromValue;
  if (this.parentElement.parentElement.id == 'base-page') {
    fromUnit = this.previousElementSibling.children[0];
    toUnit = this.nextElementSibling.children[0];
  } else {
    fromUnit = this.previousElementSibling.children[1];
    toUnit = this.nextElementSibling.children[1];
    fromSIUnit = this.previousElementSibling.children[0];
    toSIUnit = this.nextElementSibling.children[0];

    toSIValue = fromSIUnit.textContent;
    fromSIValue = toSIUnit.textContent;
  }

  //switch values
  toValue = fromUnit.firstChild.data;
  fromValue = toUnit.firstChild.data;

  //switch
  fromUnit.firstChild.replaceWith(fromValue);
  toUnit.firstChild.replaceWith(toValue);
  toSIUnit ? toSIUnit.textContent = toSIValue : '';
  fromSIUnit ? fromSIUnit.textContent = fromSIValue : '';

  //convert unit funtion
};

let num2RomanConvOption = document.querySelectorAll('#rom-conv .conv-type')[0]
let roman2NumConvOption = document.querySelectorAll('#rom-conv .conv-type')[1]

function switchRomanConvType() {
  let convType = this ? this.getAttribute('data-conv-type') : '' || '';
  switch (convType) {
    case 'rom2Num': switchValues(roman2NumConvOption, num2RomanConvOption, convType)
      break;
    case 'num2Rom': switchValues(num2RomanConvOption, roman2NumConvOption, convType);
      break;
    default:
      break;
  }
}
function switchValues(selectedOption, otherOption, convType) {
  let fromName = selectedOption.parentElement.nextElementSibling.children[0].children[0];
  let fromInput = selectedOption.parentElement.nextElementSibling.children[0].children[1];
  let toName = selectedOption.parentElement.nextElementSibling.children[2].children[0];
  let toInput = selectedOption.parentElement.nextElementSibling.children[2].children[1];
  let switchedToName = fromName.textContent;
  let switchedFromName = toName.textContent;
  let switchedFromInputType = toInput.getAttribute('type');
  let switchedToInputType = fromInput.getAttribute('type');
  let switchedFromInputDataValue = toInput.getAttribute('data-name');
  let switchedToInputDataValue = fromInput.getAttribute('data-name');

  if (convType !== currentRomConv) {
    fromName.textContent = switchedFromName;
    toName.textContent = switchedToName;
    fromInput.setAttribute('type', switchedFromInputType);
    fromInput.setAttribute('data-name', switchedFromInputDataValue);
    toInput.setAttribute('type', switchedToInputType);
    toInput.setAttribute('data-name', switchedToInputDataValue);
    toInput.value = '';
    fromInput.value = '';
    currentRomConv = convType;
  }


  selectedOption.classList.add('opacity');
  otherOption.classList.remove('opacity');

}
num2RomanConvOption.addEventListener('click', switchRomanConvType);
roman2NumConvOption.addEventListener('click', switchRomanConvType);

// add the data-name for each input box for beter calculation data-name ='length-meter'
//split the data value, use the first aprt to get th type of conversion then the second to get the
//value of conversion.