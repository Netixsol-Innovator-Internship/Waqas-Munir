let email = document.getElementById("input");
let btn = document.getElementById("btn");
let error = document.getElementById("error");
let errorMsg = document.getElementById("errormsg");

btn.addEventListener("click", () => {
  console.log(email.value);

  error.textContent = "";

  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value.length === 0) {
    error.textContent = "Whoops! It looks like you forgot to add your email";
    errormsg.textContent = "Whoops! It looks like you forgot to add your email";
  } else if (!email.value.match(pattern)) {
    error.textContent = "Please provide a valid email address";
    errormsg.textContent = "Please provide a valid email address";
  }

  clearError();
});

function clearError() {
  setTimeout(() => {
    error.textContent = "";
    errorMsg.textContent = "";
  }, 5000);
}
