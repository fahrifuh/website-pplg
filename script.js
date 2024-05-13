const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

//read more aboutpage
const readMoreButton = document.getElementById("readMoreBtn");
const hiddenContent = document.querySelector(".hidden-content");

readMoreButton.addEventListener("click", () => {
  if (hiddenContent.style.display === "none") {
    hiddenContent.style.display = "block";
    readMoreButton.textContent = "Read less";
    document
      .getElementById("about-page")
      .setAttribute("style", "height:fit-content");
  } else {
    hiddenContent.style.display = "none";
    readMoreButton.textContent = "Read more";
    document.getElementById("about-page").setAttribute("style", "height:100vh");
  }
});
