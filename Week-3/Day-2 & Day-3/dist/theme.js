let toggleTheme = document.getElementById("theme-toggler");

let theme = localStorage.getItem("theme") || "light";

// Setting theme on reload
document.documentElement.classList.add(theme);
setTheme();

// Toggling Theme
toggleTheme.addEventListener("click", function () {
  theme === "light" ? (theme = "dark") : (theme = "light");

  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", theme);

  setTheme();
});

function setTheme() {
  document.getElementById("theme").textContent =
    theme === "light" ? "dark" : "light";

  document.getElementById("theme-img").src =
    theme === "light" ? "./assets/icon-moon.svg" : "./assets/icon-sun.svg";
}
