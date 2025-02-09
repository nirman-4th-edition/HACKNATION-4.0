"use strict";

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

//================== swipe section starts creative ==================
document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const gallery = document.querySelector(".image-gallery");

  prevBtn.addEventListener("click", () => {
    gallery.scrollBy({
      left: -gallery.offsetWidth,
      behavior: "smooth",
    });
  });

  nextBtn.addEventListener("click", () => {
    gallery.scrollBy({
      left: gallery.offsetWidth,
      behavior: "smooth",
    });
  });
});

// Creative 01 starts
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  function showSlide(index) {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
});

// Creative 01 ends

// Creative 03 starts
// script.js

// Example: Log a message when an image is clicked
document.querySelectorAll(".blog-item").forEach((item) => {
  item.addEventListener("click", () => {
    console.log("Image clicked:", item.querySelector("img").alt);
  });
});

// Creative 03 ends

// services starts
document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".services-item");

  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("hovered");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("hovered");
    });
  });
});

// services ends

// alert button

function showAlert() {
  alert("Subscription Added !!");
}

// Add an event listener to the button
document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("alert");
  button.addEventListener("click", showAlert);
});
