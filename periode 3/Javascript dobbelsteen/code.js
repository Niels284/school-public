const history = {
  countedLogs: [],
  valueLogs: [],
  // calculate the average value and return the average
  get average() {
    return (
      this.valueLogs.reduce((a, b) => a + b) / this.valueLogs.length
    ).toFixed(0);
  },
  set logs(diceValue) {
    this.valueLogs.push(diceValue);
    console.log(`current value: ${diceValue}`);
    // push the diceValue in the object based array 'countedLogs'
    if (this.countedLogs.length == 0) {
      this.countedLogs[this.countedLogs.length] = {
        dobbelsteenWaarde: diceValue,
        count: 1,
      };
    } else {
      let alreadyAdded = false;
      this.countedLogs.forEach((key) => {
        if (key.dobbelsteenWaarde === diceValue) {
          key.count++;
          alreadyAdded = true;
        }
      });
      if (alreadyAdded === false) {
        this.countedLogs[this.countedLogs.length + 1] = {
          dobbelsteenWaarde: diceValue,
          count: 1,
        };
      }
    }
  },
};

// selections
const sortButton = document.querySelector(".sortButton");
let diceValue = Math.floor(Math.random() * 6 + 1);

// initialize the page
function init() {
  loadCountedLogs();
  console.log("code.js is succesfully loaded");
}

function roll() {
  // generated dobbelsteen
  history.logs = diceValue;
  // logs the values in the valueLogs list and display it in the DOM
  document.querySelector(
    ".valueLogsList"
  ).innerHTML += `<li><object data="img/svg/dobbelsteen_${diceValue}.svg" width="100" height="100"></object></li>`;
  document.querySelector(
    ".valueLogsList2"
  ).innerHTML += `<li><p>roll ${history.valueLogs.length} = </p><object data="img/svg/dobbelsteen_${diceValue}.svg" width="50" height="50"></object></li>`;
  document.querySelector(
    ".averageValue"
  ).innerText = `The average die value is: ${history.average}`;
  loadCountedLogs();
}

// change the data attribute 'data-order' of the .countedLogs
function sortCountedLogs() {
  if (sortButton.dataset.order === "count") {
    sortButton.dataset.order = "dobbelsteenWaarde";
  } else if (sortButton.dataset.order === "dobbelsteenWaarde") {
    sortButton.dataset.order = "count";
  }
  loadCountedLogs();
}

// load the countedLogs in the DOM
function loadCountedLogs() {
  if (sortButton.dataset.order === "count") {
    // sort countedLogs DESC by count
    history.countedLogs.sort((a, b) =>
      a.count > b.count ? -1 : a.count < b.count ? 1 : 0
    );
    sortButton.innerHTML = "Order ASC by dobbelsteen values";
  } else if (sortButton.dataset.order === "dobbelsteenWaarde") {
    // sort countedLogs ASC by dobbelsteenWaarde
    history.countedLogs.sort((a, b) =>
      a.dobbelsteenWaarde > b.dobbelsteenWaarde
        ? 1
        : a.dobbelsteenWaarde < b.dobbelsteenWaarde
        ? -1
        : 0
    );
    sortButton.innerHTML = "Order DESC by counted dobbelsteen values";
  }
  // display it in the DOM
  document.querySelector(".countedValues").innerHTML = "";
  history.countedLogs.forEach((key) => {
    document.querySelector(
      ".countedValues"
    ).innerHTML += `<li>${key.dobbelsteenWaarde} = ${key.count} times</li>`;
  });
}

// dice animation

// selections
const dobbelsteenBox = document.querySelector(".box");
const valueLogs = document.querySelector(".valueLogs");
const rightSide = document.querySelector(".rightSide");
const root = document.querySelector(":root");

// values
let statusArray = { resetPosition: true, pauseDice: false };
const dicePositions = [
  { dice: "front", positionX: 45, positionY: 0, positionZ: 315 },
  { dice: "left", positionX: 315, positionY: 135, positionZ: 90 },
  { dice: "right", positionX: 315, positionY: 135, positionZ: 270 },
  { dice: "top", positionX: 315, positionY: 135, positionZ: 0 },
  { dice: "bottom", positionX: 315, positionY: 135, positionZ: 180 },
  { dice: "back", positionX: 45, positionY: 180, positionZ: 315 },
];

// dice events
dobbelsteenBox.addEventListener("mousedown", () => {
  if (statusArray.pauseDice === false) {
    dobbelsteenBox.classList.add("active");
    dobbelsteenBox.classList.remove("pause");
    dobbelsteenBox.classList.remove("idle");
    dobbelsteenBox.classList.remove("falling");

    // events
    dobbelsteenBox.addEventListener("mousemove", mousemove);
    dobbelsteenBox.addEventListener("mouseup", mouseup);

    // mousemove event - makes it possible to move the dice
    function mousemove(e) {
      this.style.left = e.clientX - 250 + "px";
      this.style.top = e.clientY - 250 + "px";
      if (e.clientX <= 0 || e.clientY <= 0) {
        defaultDiceReset();
      }
    }

    // mouseup event - registrates the dice position, and starts the 'falling' animation (see styles.css from rule 336)
    function mouseup(e) {
      // generate a random dieValue
      roll();
      console.log("dice is falling");
      // fills the variable '--dicePosition' in styles.css for the 'fallingDiceAnimation'
      root.style.setProperty(
        "--dicePosition",
        Math.abs(200 - (e.clientY - 250)) + "px"
      );
      // fills the variable '--dicePosition(X/Y/Z)' in styles.css for the 'fallingDiceAnimation'.
      // It sets the dice to the right position of the dieValue
      root.style.setProperty(
        "--dicePositionX",
        dicePositions[diceValue - 1].positionX + "deg"
      );
      root.style.setProperty(
        "--dicePositionY",
        dicePositions[diceValue - 1].positionY + "deg"
      );
      root.style.setProperty(
        "--dicePositionZ",
        dicePositions[diceValue - 1].positionZ + "deg"
      );

      // pause rotating dice
      this.classList.add("pause");
      // starts falling dice animation
      this.classList.add("falling");
      // prevents to activate the dice animation while falling
      statusArray.pauseDice = true;

      // removes event listeners
      dobbelsteenBox.removeEventListener("mousemove", mousemove);
      dobbelsteenBox.removeEventListener("mouseup", mouseup);
      rightSide.removeEventListener("mouseover", defaultDiceReset);
      valueLogs.removeEventListener("mouseover", defaultDiceReset);

      // after 4 seconds, the dice will reset to the default position
      setTimeout(() => {
        document
          .getElementById(dicePositions[diceValue - 1].dice)
          .classList.add("selected");
      }, 1250);
      setTimeout(() => {
        document
          .getElementById(dicePositions[diceValue - 1].dice)
          .classList.remove("selected");
        extremeDiceReset();
      }, 4000);
    }

    // reset dice when hover over an forbidden element
    rightSide.addEventListener("mouseover", defaultDiceReset);
    valueLogs.addEventListener("mouseover", defaultDiceReset);
  }

  // default dice reset - removes eventlisteners, the style attribute and adds the 'idle' class for the 'idleDiceAnimation'
  function defaultDiceReset() {
    dobbelsteenBox.removeEventListener("mousemove", mousemove);
    dobbelsteenBox.removeEventListener("mouseup", mouseup);
    rightSide.removeEventListener("mouseover", defaultDiceReset);
    valueLogs.removeEventListener("mouseover", defaultDiceReset);
    dobbelsteenBox.removeAttribute("style");
    dobbelsteenBox.classList.add("pause");
    dobbelsteenBox.classList.add("idle");
    // makes it possible to activate new events for the dice
    statusArray.pauseDice = false;
    console.log("dice stopped moving and position is succesfully resetted");
  }

  // extreme dice reset - removes the style attribute and falling dice animation and adds the 'idle' class for the 'idleDiceAnimation'
  function extremeDiceReset() {
    dobbelsteenBox.removeAttribute("style");
    dobbelsteenBox.classList.add("idle");
    dobbelsteenBox.classList.remove("falling");
    // generates a new random dieValue
    diceValue = Math.floor(Math.random() * 6 + 1);
    // makes it possible to activate new events for the dice
    statusArray.pauseDice = false;
  }
});
