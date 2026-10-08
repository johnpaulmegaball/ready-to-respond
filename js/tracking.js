// =========================================================
// Ready to Respond — Lightweight analytics hook
// Wraps Vercel Web Analytics' custom-events API (window.va) behind a
// single trackEvent() function, so the rest of the site never talks
// to Vercel directly. If Web Analytics isn't enabled for this project
// (Vercel dashboard -> Project -> Analytics), window.va still exists
// (queued by the inline snippet in <head>) but nothing is sent
// anywhere -- this file is safe to call either way, and safe if the
// insights script fails to load at all.
//
// To plug in a different analytics tool later, this is the one
// function to change.
//
// Supports a ?ref=... query param (e.g. ?ref=event-flyer,
// ?ref=kupuna-card) so printed QR codes can be tracked back to which
// printout people scanned. It's read once on load and attached to
// every event automatically.
// =========================================================

var REF_PARAM = (function () {
  try {
    return new URLSearchParams(window.location.search).get("ref") || null;
  } catch (e) {
    return null;
  }
})();

function trackEvent(name, props) {
  var payload = Object.assign({}, props || {});
  if (REF_PARAM) payload.ref = REF_PARAM;

  try {
    if (typeof window.va === "function") {
      window.va("event", { name: name, data: payload });
    }
  } catch (e) {
    // Analytics should never break the page.
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Auto-wire any element with data-track="event_name" (optionally
  // data-track-* attributes become event properties) so most clicks
  // don't need bespoke JS -- see index.html for examples (quiz
  // button, alert signup, print buttons, share buttons).
  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () {
      var props = {};
      Array.prototype.forEach.call(el.attributes, function (attr) {
        if (attr.name.indexOf("data-track-") === 0) {
          props[attr.name.replace("data-track-", "")] = attr.value;
        }
      });
      trackEvent(el.getAttribute("data-track"), props);
    });
  });
});
