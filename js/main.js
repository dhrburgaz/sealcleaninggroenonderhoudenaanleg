// Ziel Cleaning - kleine site-scripts (mobiel menu, jaartal, animaties, contactformulier)

document.addEventListener("DOMContentLoaded", function () {
  /* Mobiel menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Actieve link in de navigatie markeren */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* Jaartal in footer */
  document.querySelectorAll(".current-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Zachte animatie bij scrollen in beeld */
  var animatedItems = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window && animatedItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animatedItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    animatedItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* Contactformulier: eenvoudige validatie + bevestiging (verzendt via mailto) */
  var form = document.getElementById("contactForm");
  if (form) {
    var successBox = document.getElementById("formSuccess");
    form.addEventListener("submit", function () {
      if (form.checkValidity() && successBox) {
        successBox.classList.add("visible");
      }
    });
  }
});
