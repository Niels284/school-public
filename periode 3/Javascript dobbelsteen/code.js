const history = {
  countedLogs: [],
  valueLogs: [],
  // calculate the average value and return the average
  get average() {
    return (
      this.valueLogs.reduce((a, b) => a + b) / this.valueLogs.length
    ).toFixed(0);
  },
  set logs(dieValue) {
    this.valueLogs.push(dieValue);
    console.log(`current value: ${dieValue}`);
    // push the dieValue in the object based array 'countedLogs'
    if (this.countedLogs.length == 0) {
      this.countedLogs[this.countedLogs.length] = {
        dobbelsteenWaarde: dieValue,
        count: 1,
      };
    } else {
      let alreadyAdded = false;
      this.countedLogs.forEach((key) => {
        if (key.dobbelsteenWaarde === dieValue) {
          key.count++;
          alreadyAdded = true;
        }
      });
      if (alreadyAdded === false) {
        this.countedLogs[this.countedLogs.length + 1] = {
          dobbelsteenWaarde: dieValue,
          count: 1,
        };
      }
    }
  },
};

// selections
const sortButton = document.querySelector(".sortButton");

// initialize the page
function init() {
  roll();
  loadCountedLogs();
  console.log("code.js is succesfully loaded");
}

function roll() {
  // generated dobbelsteen value
  const dieValue = Math.floor(Math.random() * 6 + 1);
  history.logs = dieValue;
  document.querySelector(
    ".dobbelsteen"
  ).innerHTML = `<object data="img/svg/dobbelsteen_${dieValue}.svg" width="200" height="200"></object>`;
  // logs the values in the valueLogs list and display it in the DOM
  document.querySelector(
    ".valueLogsList"
  ).innerHTML += `<li><object data="img/svg/dobbelsteen_${dieValue}.svg" width="100" height="100"></object></li>`;
  document.querySelector(
    ".valueLogsList2"
  ).innerHTML += `<li><p>${history.valueLogs.length} draw = </p><object data="img/svg/dobbelsteen_${dieValue}.svg" width="50" height="50"></object></li>`;
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
    history.countedLogs.sort(function (a, b) {
      if (a.count > b.count) {
        return -1;
      } else if (a.count < b.count) {
        return 1;
      } else {
        return 0;
      }
    });
    sortButton.innerHTML = "Order ASC by dobbelsteen values";
  } else if (sortButton.dataset.order === "dobbelsteenWaarde") {
    // sort countedLogs ASC by dobbelsteenWaarde
    history.countedLogs.sort(function (a, b) {
      if (a.dobbelsteenWaarde < b.dobbelsteenWaarde) {
        return -1;
      } else if (a.dobbelsteenWaarde > b.dobbelsteenWaarde) {
        return 1;
      } else {
        return 0;
      }
    });
    sortButton.innerHTML = "Order DESC by counted dobbelsteen values";
  }
  console.log(history.countedLogs);
  // display it in the DOM
  document.querySelector(".countedValues").innerHTML = "";
  history.countedLogs.forEach((key) => {
    document.querySelector(
      ".countedValues"
    ).innerHTML += `<li>${key.dobbelsteenWaarde} = ${key.count} times</li>`;
  });
}
