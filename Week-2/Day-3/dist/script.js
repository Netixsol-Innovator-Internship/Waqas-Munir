let ratings = document.querySelectorAll(".rating");
let btn = document.getElementById("btn");
let error = document.getElementById("error");
let rating = document.getElementById("rating-card");
let success = document.getElementById("success-card");
let text = document.getElementById("rating-text");
let count = 0;
let submit = false;

ratings.forEach((rating, index) => {
  rating.addEventListener("click", function () {
    removeActiveStyles();
    rating.classList.add("active");
    count = index + 1;
  });
});

function removeActiveStyles() {
  error.style.display = "none";
  ratings.forEach((rating) => {
    rating.classList.remove("active");
  });
}

btn.addEventListener("click", function () {
  if (count === 0) {
    error.style.display = "block";
    return;
  }

  if (count > 0) {
    rating.style.display = "none";
    success.style.display = "block";
    text.textContent = `You selected ${count} out of 5`;
  }
});
