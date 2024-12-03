require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const { getUsers, createUser } = require("./utils");
const initializePassport = require("./passport-config");

initializePassport(passport, getUserByEmail, async (id) => {
  const users = await getUsers();
  for (const user in users) {
    if (user == id) {
      return users[user];
    }
  }
  return null;
});

const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

function preventCache(req, res, next) {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  next();
}

app.get("/", checkAuthenticated, preventCache, (req, res) => {
  res.render("index.ejs", {
    name: req.user.name,
  });
});

app.get("/login", checkNotAuthenticated, preventCache, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, preventCache, (req, res) => {
  res.render("register.ejs", {
    message: null,
  });
});

app.post("/register", checkNotAuthenticated, preventCache, async (req, res) => {
  try {
    const users = await getUsers();

    let user = await getUserByEmail(req.body.email);

    if (user) {
      return res.render("register.ejs", {
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users[user.id] = user;
    await createUser(users);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register", {
      message: null,
    });
  }
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.redirect("/login");
    });
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

async function getUserByEmail(email) {
  const users = await getUsers();
  for (const user in users) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  return null;
}

app.listen(8000);
