let inputs = document.querySelectorAll("input");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("form");

function checkRequired(input) {
  if (!input.value) {
    input.style.border = "2px solid #ff7a7a";
    document.getElementById(`${input.id}-error`).style.display = "block";
    document.getElementById(`${input.id}-symbol`).style.display = "block";
    return false;
  }
  return true;
}

function validateEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.match(pattern)) {
    document.getElementById("email").style.border = "2px solid #ff7a7a";
    document.getElementById("email").style.color = "#ff7a7a";
    document.getElementById("email-error").textContent =
      "Looks like this is not an email";
    document.getElementById("email-error").style.display = "block";
    document.getElementById(`email-symbol`).style.display = "block";

    return false;
  }
  return true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkRequired(firstName);
  checkRequired(lastName);
  checkRequired(password);
  if (checkRequired(email)) {
    if (!validateEmail(email.value)) {
      return;
    }
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", function (event) {
    input.style.border = "1px solid #b9b6d3";
    document.getElementById(`${input.id}`).style.color = "black";
    document.getElementById(`${input.id}-error`).style.display = "none";
    document.getElementById(`${input.id}-symbol`).style.display = "none";
  });
});
