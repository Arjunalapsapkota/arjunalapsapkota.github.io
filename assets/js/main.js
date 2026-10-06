/* Arjun Sapkota — portfolio
   Plain JavaScript, no dependencies. Everything degrades gracefully without JS. */
(function () {
  "use strict";

  var EMAIL = "arjunalapsapkota@gmail.com";

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Portrait: show initials if the photo file is missing ---- */
  var img = document.getElementById("portrait");
  var fallback = document.getElementById("portraitFallback");
  function showFallback() {
    if (!img || !fallback) return;
    img.style.display = "none";
    fallback.hidden = false;
  }
  if (img) {
    img.addEventListener("error", showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  }

  /* ---- Copy email ---- */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.textContent = "Copied";
        setTimeout(function () { copyBtn.textContent = "Copy"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done, function () { window.prompt("Copy my email:", EMAIL); });
      } else {
        window.prompt("Copy my email:", EMAIL);
      }
    });
  }

  /* ---- Contact form: validate, then open the visitor's email app ---- */
  var form = document.getElementById("contactForm");
  var errorBox = document.getElementById("formError");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var problems = [];

      [name, email, message].forEach(function (f) { f.removeAttribute("aria-invalid"); });
      if (!name.value.trim()) { problems.push("your name"); name.setAttribute("aria-invalid", "true"); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { problems.push("a valid email"); email.setAttribute("aria-invalid", "true"); }
      if (!message.value.trim()) { problems.push("a message"); message.setAttribute("aria-invalid", "true"); }

      if (problems.length) {
        errorBox.textContent = "Please add " + problems.join(", ") + ".";
        errorBox.hidden = false;
        return;
      }
      errorBox.hidden = true;

      var subject = "Portfolio inquiry from " + name.value.trim();
      var body = message.value.trim() + "\n\n— " + name.value.trim() + "\n" + email.value.trim();
      window.location.href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---- Scroll reveal ---- */
  var targets = document.querySelectorAll(
    ".hero__inner > *, .portrait, .about__text, .section__title, .stat, .job, .skillgroup, .contact__intro, .form"
  );
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
