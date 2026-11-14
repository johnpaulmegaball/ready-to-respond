// =========================================================
// Ready to Respond — Renders content from js/data.js into the page
// (Partners, Sources). Keeping this separate from js/data.js means
// the data file stays pure data that's easy for a non-developer to
// hand-edit, with no markup mixed in.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  renderPartners();
  renderSources();
  renderEvents();
});

function renderPartners() {
  var grid = document.getElementById("partnersGrid");
  var empty = document.getElementById("partnersEmpty");
  if (!grid || typeof PARTNERS === "undefined") return;

  if (PARTNERS.length === 0) {
    grid.hidden = true;
    return;
  }

  if (empty) empty.hidden = false; // keep the "interested in partnering" line even with real partners listed
  PARTNERS.forEach(function (p) {
    var card = document.createElement("div");
    card.className = "partner-card";
    var name = p.name || "[TODO: partner name]";
    if (p.logo) {
      card.innerHTML = '<img class="partner-logo" src="' + p.logo + '" alt="' + escapeHtml(name) + ' logo">';
    } else {
      card.textContent = name;
    }
    grid.appendChild(card);
  });
}

function renderSources() {
  var list = document.getElementById("sourcesList");
  if (!list || typeof SOURCES === "undefined") return;

  SOURCES.forEach(function (src) {
    var li = document.createElement("li");
    li.className = "source-item";
    li.id = "source-" + src.id;
    var linkHtml = src.needsSource
      ? '<span class="needs-source">[SOURCE NEEDED]</span>'
      : '<a href="' + src.url + '" target="_blank" rel="noopener">View source &rarr;</a>';
    li.innerHTML =
      '<span class="source-number">' + src.id + ".</span>" +
      "<span>" + escapeHtml(src.label) + " " + linkHtml + "</span>";
    list.appendChild(li);
  });
}

// Renders EVENTS as Instagram-post-style cards, each with its own
// swipeable photo carousel (built in buildEventCarousel below).
function renderEvents() {
  var grid = document.getElementById("eventsGrid");
  if (!grid || typeof EVENTS === "undefined") return;

  var section = grid.closest("section");
  if (EVENTS.length === 0) {
    if (section) section.hidden = true;
    return;
  }

  EVENTS.forEach(function (ev) {
    var card = document.createElement("article");
    card.className = "event-card";

    var header = document.createElement("div");
    header.className = "event-card-header";
    header.innerHTML =
      '<img class="event-avatar" src="images/logo-mark.png" alt="" width="32" height="32">' +
      '<div class="event-header-text">' +
      '<span class="event-account">hosa.readytorespond</span>' +
      (ev.date ? '<span class="event-date">' + escapeHtml(ev.date) + "</span>" : "") +
      "</div>";
    card.appendChild(header);

    card.appendChild(buildEventCarousel(ev));

    var body = document.createElement("div");
    body.className = "event-card-body";
    body.innerHTML =
      "<h3>" + escapeHtml(ev.title || "[TODO: event title]") + "</h3>" +
      (ev.caption ? "<p>" + escapeHtml(ev.caption) + "</p>" : "");
    card.appendChild(body);

    grid.appendChild(card);
  });
}

// Builds one event's slideshow: a horizontal track of images plus
// prev/next buttons and dot indicators, wired up with click, keyboard
// arrow, and touch-swipe navigation. Single-image events skip the
// controls since there's nothing to page through.
function buildEventCarousel(ev) {
  var images = ev.images || [];
  var wrap = document.createElement("div");
  wrap.className = "event-carousel";

  var track = document.createElement("div");
  track.className = "event-track";
  images.forEach(function (img) {
    var el = document.createElement("img");
    el.className = "event-slide";
    el.src = img.src;
    el.alt = img.alt || "";
    el.loading = "lazy";
    track.appendChild(el);
  });
  wrap.appendChild(track);

  if (images.length > 1) {
    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "event-nav event-nav-prev";
    prevBtn.setAttribute("aria-label", "Previous photo");
    prevBtn.innerHTML = '<svg width="20" height="20"><use href="#icon-chevron-left"></use></svg>';

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "event-nav event-nav-next";
    nextBtn.setAttribute("aria-label", "Next photo");
    nextBtn.innerHTML = '<svg width="20" height="20"><use href="#icon-chevron-right"></use></svg>';

    var counter = document.createElement("span");
    counter.className = "event-counter";

    var dots = document.createElement("div");
    dots.className = "event-dots";
    images.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "event-dot";
      dot.setAttribute("aria-label", "Go to photo " + (i + 1));
      dots.appendChild(dot);
    });

    wrap.appendChild(prevBtn);
    wrap.appendChild(nextBtn);
    wrap.appendChild(counter);
    wrap.appendChild(dots);

    var index = 0;
    var dotEls = dots.querySelectorAll(".event-dot");

    var update = function () {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dotEls.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
      counter.textContent = (index + 1) + " / " + images.length;
      prevBtn.hidden = index === 0;
      nextBtn.hidden = index === images.length - 1;
    };

    var goTo = function (i) {
      index = Math.max(0, Math.min(images.length - 1, i));
      update();
    };

    prevBtn.addEventListener("click", function () { goTo(index - 1); });
    nextBtn.addEventListener("click", function () { goTo(index + 1); });
    dotEls.forEach(function (d, i) { d.addEventListener("click", function () { goTo(i); }); });

    wrap.setAttribute("tabindex", "0");
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    var touchStartX = null;
    wrap.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    wrap.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (dx > 40) goTo(index - 1);
      else if (dx < -40) goTo(index + 1);
    });

    update();
  }

  return wrap;
}

// Small helper so data-driven text can't accidentally inject markup.
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
