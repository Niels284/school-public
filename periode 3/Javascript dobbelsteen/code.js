function init() {
  console.log("code.js is succesfully loaded");
}

function roll() {
  // selections
  const dobbelsteen = document.querySelector(".dobbelsteen");
  const valueLogsList = document.querySelector(".valueLogsList");
  const averageLogsList = document.querySelector(".averageLogsList");
  const countedLogsList = document.querySelector(".countedLogsList");

  // generated dobbelsteen value
  const dobbelsteenValue = Math.floor(Math.random() * 6 + 1);
  console.log(dobbelsteenValue);
}
