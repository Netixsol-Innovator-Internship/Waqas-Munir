let input = document.getElementById("search");
let btn = document.getElementById("btn");
let form = document.querySelector("form");
let isLoading = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  getUser();
});

async function getUser() {
  const user = input.value.trim();
  pending();
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
        return;
      } else {
        error();
        return;
      }
    }

    const data = await response.json();

    if (data.blog && !/^https?:\/\//i.test(data.blog)) {
      data.blog = `https://${data.blog}`;
    }

    const {
      avatar_url,
      bio,
      name,
      public_repos,
      followers,
      following,
      location,
      twitter_username,
      company,
      blog,
      login,
      created_at,
    } = data;

    const userData = {
      img: avatar_url,
      bio: bio,
      name: name,
      repos: public_repos,
      followers: followers,
      following: following,
      location: location,
      twitter: twitter_username,
      company: company,
      portfolio: blog,
      username: login,
      date: created_at,
    };
    success();
    setUserData(userData);
  } catch (error) {
    console.log(error);
  } finally {
    finished();
  }
}

function setUserData(user) {
  document.getElementById("avatar").src = user.img;

  if (user.name) {
    document.getElementById("name").textContent = user.name;
    document.getElementById(
      "name"
    ).href = `https://github.com/${user.username}`;
  } else {
    document.getElementById("name").textContent = "Not Available";
    document.getElementById("name").removeAttribute("href");
  }

  setContent("username", user.username ?? "Not Available");
  setContent("bio", user.bio ?? "This profile has no bio");
  setContent("repos", user.repos);
  setContent("followers", user.followers);
  setContent("following", user.following);
  setContent("location", user.location ?? "Not Available");
  setContent("company", user.company ?? "Not Available");
  setContent("twitter", user.twitter ?? "Not Available");

  if (user.portfolio && /^https?:\/\//i.test(user.portfolio)) {
    document.getElementById("portfolio").href = user.portfolio;
    document.getElementById("portfolio").textContent = "Visit Portfolio";
  } else {
    document.getElementById("portfolio").textContent = "Not Available";
    document.getElementById("portfolio").removeAttribute("href");
  }

  document.getElementById("date").textContent = `Joined ${formatDate(
    user.date
  )}`;
}

function setContent(id, text) {
  document.getElementById(id).textContent = text;
}

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}

function notFound() {
  document.getElementById("user-details").style.display = "none";
  document.getElementById("error").style.display = "none";
  document.getElementById("not-found").style.display = "flex";
}

function error() {
  document.getElementById("user-details").style.display = "none";
  document.getElementById("error").style.display = "flex";
  document.getElementById("not-found").style.display = "none";
}

function success() {
  document.getElementById("user-details").style.display = "flex";
  document.getElementById("error").style.display = "none";
  document.getElementById("not-found").style.display = "none";
}

function pending() {
  isLoading = true;
  btn.disabled = true;
  document.getElementById("btnText").style.display = "none";
  document.getElementById("loader").style.display = "block";
}

function finished() {
  isLoading = false;
  btn.disabled = false;
  document.getElementById("btnText").style.display = "block";
  document.getElementById("loader").style.display = "none";
}
