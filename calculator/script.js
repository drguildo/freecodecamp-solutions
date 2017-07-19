// jshint esversion: 6

let currentNumber = "0";
let currentCalculation = "0";

$('#ac').on('click', function (e) {
  currentNumber = "0";
  currentCalculation = "0";
  setDisplayInput(currentNumber);
  setDisplayCalculation(currentCalculation);
});

$('#c').on('click', function (e) {
  currentNumber = "0";
  setDisplayInput(currentNumber);
  setDisplayCalculation(currentCalculation);
});

$('#equals').on('click', function (e) {
  currentCalculation += currentNumber;
  console.log(currentCalculation);
  let result = truncateNumber(math.eval(currentCalculation), 15);
  setDisplayInput(result);
  currentNumber = result;
  currentCalculation = "0";
});

$('.numeric').on('click', clickedNumber);

$('.operation').on('click', clickedOperation);

function clickedNumber(e) {
  if (currentNumber.length === 15) {
    return;
  }

  if (currentNumber === "0") {
    currentNumber = e.srcElement.textContent;
  } else {
    currentNumber += e.srcElement.textContent;
  }

  setDisplayInput(currentNumber);
  if (currentCalculation === "0") {
    setDisplayCalculation(currentNumber);
  } else {
    setDisplayCalculation(currentCalculation + currentNumber);
  }
}

function clickedOperation(e) {
  let op;

  switch (e.srcElement.textContent) {
    case "÷":
      op = "/";
      break;
    case "×":
      op = "*";
      break;
    case "−":
      op = "-";
      break;
    case "+":
      op = "+";
      break;
  }

  setDisplayInput(op);
  if (currentCalculation === "0") {
    currentCalculation = currentNumber + op;
  } else {
    currentCalculation += currentNumber + op;
  }
  setDisplayCalculation(currentCalculation);

  currentNumber = "0";
}

function setDisplayInput(val) {
  $('#input').text(val);
}

function setDisplayCalculation(val) {
  $('#calculation').text(val);
}

// Round a number so that it fits the specified space.
function truncateNumber(val, len) {
  let str = val.toString();

  if (str.length <= len) {
    return val;
  }

  let parts = str.split(".", 2);
  let integerPart = parts[0];
  let fractionalPart = parts[1];

  if (integerPart.length > len) {
    throw new Error("Unable to round value without truncating integer");
  }

  if (integerPart.length == len) {
    return Math.round(val);
  }

  let roundPlaces = len - (integerPart.length + 1);
  let result = math.round(val, roundPlaces)

  return result;
}