const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view-engine", "ejs");

let items = [];

app.get("/", (req, res) => {
  let today = new Date();
  let date = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  res.render("list.ejs", {
    today: date,
    items,
  });
});

app.post("/", (req, res) => {
  let item = req.body.todo;
  if (item.trim() === "") {
    res.redirect("/");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(5000, function () {
  console.log("Server is running on PORT 5000");
});
