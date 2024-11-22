const inputs = document.querySelectorAll("input");
const form = document.getElementById("form");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  hideError(day);
  hideError(month);
  hideError(year);

  const isValid = required(inputs);
  if (!isValid) return;

  const dd = parseInt(day.value);
  const mm = parseInt(month.value);
  const yy = parseInt(year.value);

  const dob = checkDate(dd, mm, yy);
  if (!dob) {
    return;
  }

  const { years, months, days } = calculateAge(dob);
  animateNumbers(document.getElementById("day-display"), days);
  animateNumbers(document.getElementById("month-display"), months);
  animateNumbers(document.getElementById("year-display"), years);
});

function required(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value) {
      showError(input, "This field is required");
      isValid = false;
    } else {
      hideError(input);
    }
  });

  return isValid;
}

function checkDate(dd, mm, yy) {
  if (dd < 1 || dd > 31) {
    showError(day, "Must be a valid day");
    return;
  }

  if (mm < 1 || mm > 12) {
    showError(month, "Must be a valid month");
    return;
  }

  if (yy < 1900) {
    showError(year, "Must be a in 19s");
    return;
  }

  if (new Date().getFullYear() < yy) {
    showError(year, "Must be in the past");
    return;
  }

  const date = new Date(yy, mm, 0);

  if (dd > date.getDate()) {
    showError(day, "Must be a valid date");
    showError(month, "");
    showError(year, "");
    return;
  }

  const eneteredDate = new Date(yy, mm - 1, dd);
  if (eneteredDate > new Date()) {
    showError(day, "Must be in the past");
    showError(month, "");
    showError(year, "");
    return;
  }

  const birthDate = new Date(yy, mm - 1, dd);
  return birthDate;
}

function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
    if (months < 0) {
      months = 11;
      years--;
    }
  }

  return { years, months, days };
}

function animateNumbers(targetElement, targetValue) {
  let currentValue = 0;
  const increment = targetValue / 100;
  const interval = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(interval);
    }
    targetElement.textContent = Math.floor(currentValue);
  }, 3);
}

function showError(input, message) {
  document.getElementById(`${input.id}-error`).textContent = message;
  document.getElementById(`${input.id}-error`).classList.remove("hidden");
  document.getElementById(`${input.id}`).style.border =
    "1px solid hsl(0, 100%, 67%)";
  document.getElementById(`${input.id}-label`).style.color =
    "hsl(0, 100%, 67%)";
}

function hideError(input) {
  document.getElementById(`${input.id}-error`).classList.add("hidden");
  document.getElementById(`${input.id}`).style.border = "1px solid #dbdbdb";
  document.getElementById(`${input.id}-label`).style.color = "hsl(0, 1%, 44%)";
}
