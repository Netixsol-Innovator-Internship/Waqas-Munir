let bill = document.getElementById("bill");
let form = document.querySelector("form");
let persons = document.getElementById("persons");
let btns = document.querySelectorAll(".btn");
let customTip = document.getElementById("custom-tip");
let reset = document.getElementById("reset");

let tip = 0;

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  hideErrors();
  const billVal = validate(bill);
  if (!billVal) return;
  const personVal = validate(persons);
  if (!personVal) return;

  if (tip === 0) {
    document.getElementById("tip-error").style.display = "block";
    document.getElementById("tip-error").textContent = "Select a tip";
    return;
  }

  const { tipPerPerson, totalPerPerson } = calculateBill(billVal, personVal);

  document.getElementById("tip").textContent = `$${tipPerPerson.toFixed(2)}`;
  document.getElementById("total").textContent = `$${totalPerPerson.toFixed(
    2
  )}`;
}

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    removeBtnStyles();
    customTip.value = "";
    document.getElementById("tip-error").style.display = "none";
    tip = +btn.id;
    document.getElementById(`${btn.id}`).style.background =
      "hsl(172, 67%, 45%)";
    document.getElementById(`${btn.id}`).style.color = "hsl(183, 100%, 15%)";

    btnClick(tip);
  });
});

function btnClick(id) {
  tip = id;
  handleSubmit(new Event("submit"));
}

customTip.addEventListener("input", function (event) {
  removeBtnStyles();
  if (!customTip.value) {
    document.getElementById("tip-error").textContent = "Can't be zero";
    document.getElementById("tip-error").style.display = "block";
    return;
  }
  if (customTip.value < 0) {
    document.getElementById("tip-error").textContent =
      "Must be greater than zero";
    document.getElementById("tip-error").style.display = "block";
    return;
  }
  if (customTip.value > 100) {
    document.getElementById("tip-error").textContent =
      "Can't be greater then 0";
    document.getElementById("tip-error").style.display = "block";
    return;
  }
  tip = event.target.value;
  handleSubmit(new Event("submit"));
});

bill.addEventListener("input", function (event) {
  if (persons.value && tip > 0) {
    handleSubmit(new Event("submit"));
  }
});

persons.addEventListener("input", function () {
  if (bill.value && tip > 0) {
    handleSubmit(new Event("submit"));
  }
});

reset.addEventListener("click", function () {
  removeBtnStyles();
  hideErrors();
  tip = 0;
  bill.value = "";
  persons.value = "";
  customTip.value = "";
  document.getElementById("tip").textContent = "$0.00";
  document.getElementById("total").textContent = "$0.00";
});

function calculateBill(billVal, personVal) {
  console.log(billVal, personVal);
  const tipAmount = (billVal * tip) / 100;
  const tipPerPerson = tipAmount / personVal;
  const totalPerPerson = (billVal + tipAmount) / personVal;

  return { tipPerPerson, totalPerPerson };
}

function validate(input) {
  if (input.value <= 0) {
    document.getElementById(`${input.id}-error`).style.display = "block";
    document.getElementById(`${input.id}-error`).textContent = "Can't be zero";
    return;
  }
  if (input.value > 1000000) {
    document.getElementById(`${input.id}-error`).style.display = "block";
    document.getElementById(`${input.id}-error`).textContent =
      "Exceeds Max Limit";
    return;
  }
  return +input.value;
}

function hideErrors() {
  document.getElementById("bill-error").style.display = "none";
  document.getElementById("persons-error").style.display = "none";
  document.getElementById("tip-error").style.display = "none";
}

function removeBtnStyles() {
  btns.forEach((btn) => {
    document.getElementById(`${btn.id}`).style.background =
      "hsl(183, 100%, 15%)";
    document.getElementById(`${btn.id}`).style.color = "white";
  });
}
