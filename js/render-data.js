// =========================================================
// Ready to Respond — Renders content from js/data.js into the page
// (Partners, Sources). Keeping this separate from js/data.js means
// the data file stays pure data that's easy for a non-developer to
// hand-edit, with no markup mixed in.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  renderPartners();
  renderSources();
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
    card.textContent = p.name || "[TODO: partner name]";
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

// Small helper so data-driven text can't accidentally inject markup.
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
