let btn = document.getElementById("read-notifications");
let count = document.getElementById("notifications-count");
let unreadMsgs = document.querySelectorAll(".unread");
let errors = document.querySelectorAll(".error");

btn.addEventListener("click", function () {
  count.textContent = 0;
  unreadMsgs.forEach((msg) => {
    msg.style.background = "none";
  });
  errors.forEach((err) => {
    err.style.display = "none";
  });
  btn.style.display = "none";
});
