// =========================================================
// Ready to Respond — HOSA Community Awareness Campaign
// Fades/slides elements with the "reveal" class into view as the
// visitor scrolls past them (stat cards, reason cards). Falls back
// to showing everything immediately if IntersectionObserver isn't
// available.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { observer.observe(el); });
});
