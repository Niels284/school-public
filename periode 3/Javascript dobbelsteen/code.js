// variables
let averageDieValue = 0;
let countedLogs = [];
let valueLogs = [];

function init() {
  // initialize the page
  roll();
  loadCountedLogs();
  console.log("code.js is succesfully loaded");
}

function roll() {
  // selections
  const dobbelsteen = document.querySelector(".dobbelsteen");
  const valueLogsList = document.querySelector(".valueLogsList");
  const valueLogsList2 = document.querySelector(".valueLogsList2");
  const averageValue = document.querySelector(".averageValue");
  // generated dobbelsteen value
  const dobbelsteenValue = Math.floor(Math.random() * 6 + 1);
  dobbelsteen.innerHTML = `<object data="img/svg/dobbelsteen_${dobbelsteenValue}.svg" width="200" height="200"></object>`;
  // logs the values in the valueLogs list and display it in the DOM
  valueLogs.push(dobbelsteenValue);
  valueLogsList2.innerHTML += `<li><p>${valueLogs.length} draw = </p><object data="img/svg/dobbelsteen_${dobbelsteenValue}.svg" width="50" height="50"></object></li>`;
  console.log(`current value: ${dobbelsteenValue}`);
  valueLogsList.innerHTML += `<li><object data="img/svg/dobbelsteen_${dobbelsteenValue}.svg" width="100" height="100"></object></li>`;
  // push the dobbelsteenValue in the object based array 'countedLogs'
  if (countedLogs.length == 0) {
    countedLogs[countedLogs.length] = {
      dobbelsteenWaarde: dobbelsteenValue,
      count: 1,
    };
  } else {
    let alreadyAdded = false;
    countedLogs.forEach((key) => {
      if (key.dobbelsteenWaarde === dobbelsteenValue) {
        key.count++;
        alreadyAdded = true;
      }
    });
    if (alreadyAdded === false) {
      countedLogs[countedLogs.length + 1] = {
        dobbelsteenWaarde: dobbelsteenValue,
        count: 1,
      };
    }
  }
  // calculate the average value and display it in the DOM
  let calculatedValues = valueLogs.reduce(function (a, b) {
    return a + b;
  });
  averageDieValue = (calculatedValues / valueLogs.length).toFixed(0);
  averageValue.innerHTML = `The average die value is: ${averageDieValue}`;
  loadCountedLogs();
}

// change the data attribute 'data-order' of the .countedLogs
function sortCountedLogs() {
  const sortButton = document.querySelector(".sortButton");
  if (sortButton.dataset.order === "count") {
    sortButton.dataset.order = "dobbelsteenWaarde";
  } else if (sortButton.dataset.order === "dobbelsteenWaarde") {
    sortButton.dataset.order = "count";
  }
  loadCountedLogs();
}

// load the countedLogs in the DOM
function loadCountedLogs() {
  const countedValues = document.querySelector(".countedValues");
  const sortButton = document.querySelector(".sortButton");

  if (sortButton.dataset.order === "count") {
    // sort countedLogs DESC by count
    countedLogs.sort(function (a, b) {
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
    countedLogs.sort(function (a, b) {
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
  // display it in the DOM
  countedValues.innerHTML = "";
  countedLogs.forEach((key) => {
    countedValues.innerHTML += `<li>${key.dobbelsteenWaarde} = ${key.count} times</li>`;
  });
}
