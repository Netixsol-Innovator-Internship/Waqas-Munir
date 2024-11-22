let menuBtn = document.getElementById("menu-btn");
let overlay = document.getElementById("overlay");
let sidebar = document.getElementById("sidebar");
let closeBtn = document.getElementById("close-btn");

const menu = document.getElementById("menu");
const icon = document.getElementById("menu-icon");
const menu2 = document.getElementById("menu2");
const icon2 = document.getElementById("menu-icon2");

menuBtn.addEventListener("click", function () {
  document.body.classList.add("nav-active");
});

overlay.addEventListener("click", function () {
  document.body.classList.remove("nav-active");
  menu.classList.add("hidden");
  icon.classList.remove("rotate-animation");
  menu2.classList.add("hidden");
  icon2.classList.remove("rotate-animation");
});

closeBtn.addEventListener("click", function () {
  document.body.classList.remove("nav-active");
  menu.classList.add("hidden");
  icon.classList.remove("rotate-animation");
  menu2.classList.add("hidden");
  icon2.classList.remove("rotate-animation");
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  const icon = document.getElementById("menu-icon");

  menu.classList.toggle("hidden");

  icon.classList.toggle("rotate-animation");
}

function toggleMenu2() {
  menu2.classList.toggle("hidden");

  icon2.classList.toggle("rotate-animation");
}
