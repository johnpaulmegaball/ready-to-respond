// =========================================================
// Ready to Respond — Renders content from js/data.js into the page
// (Campaign goal, Impact counters, Events, Partners, Team, Languages,
// Sources). Keeping this separate from js/data.js means the data
// file stays pure data that's easy for a non-developer to hand-edit,
// with no markup mixed in.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  renderCampaignGoal();
  renderImpact();
  renderEvents();
  renderPartners();
  renderTeam();
  renderLanguages();
  renderSources();
});

function renderCampaignGoal() {
  var el = document.getElementById("campaignGoalText");
  if (el && typeof CAMPAIGN !== "undefined") el.textContent = CAMPAIGN.goal;
}

function renderImpact() {
  var grid = document.getElementById("impactGrid");
  if (!grid || typeof CAMPAIGN === "undefined") return;

  var labels = {
    quizzesTaken: "Quizzes Taken",
    checklistsPrinted: "Checklists Printed",
    cardsShared: "Cards Shared",
    eventsHeld: "Events Held"
  };

  Object.keys(labels).forEach(function (key) {
    var value = CAMPAIGN.impact[key];
    var card = document.createElement("div");
    card.className = "impact-card";
    var isTodo = value === null || value === undefined;
    card.innerHTML =
      '<div class="impact-number' + (isTodo ? " is-todo" : "") + '">' + (isTodo ? "[TODO]" : value) + "</div>" +
      '<div class="impact-label">' + labels[key] + "</div>";
    grid.appendChild(card);
  });
}

function renderEvents() {
  var grid = document.getElementById("eventsGrid");
  if (!grid || typeof EVENTS === "undefined") return;

  EVENTS.forEach(function (ev) {
    var card = document.createElement("div");
    card.className = "event-card";
    var photoHtml = ev.photo ? '<img src="' + ev.photo + '" alt="" style="width:100%;border-radius:10px;margin-bottom:10px;">' : "";
    card.innerHTML =
      photoHtml +
      "<h4>" + escapeHtml(ev.description && ev.description.indexOf("[TODO") === 0 ? "[TODO: event name]" : ev.description) + "</h4>" +
      '<p class="event-meta">' + escapeHtml(ev.date) + " &middot; " + escapeHtml(ev.location) + "</p>" +
      "<p>" + escapeHtml(ev.description) + "</p>";
    grid.appendChild(card);
  });
}

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

function renderTeam() {
  var grid = document.getElementById("teamGrid");
  if (!grid || typeof TEAM === "undefined") return;

  TEAM.forEach(function (member) {
    var card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML =
      '<div class="team-avatar"><svg width="26" height="26"><use href="#icon-user"></use></svg></div>' +
      "<h3>" + escapeHtml(member.name) + "</h3>" +
      '<p class="team-role">' + escapeHtml(member.role) + "</p>" +
      '<p class="team-meta">' + escapeHtml(member.school) + " &middot; " + escapeHtml(member.chapter) + "</p>" +
      '<p class="team-meta">' + escapeHtml(member.contact) + "</p>";
    grid.appendChild(card);
  });
}

function renderLanguages() {
  var list = document.getElementById("languageList");
  if (!list || typeof LANGUAGES === "undefined") return;

  LANGUAGES.forEach(function (lang) {
    var pill = document.createElement("span");
    pill.className = "language-pill";
    pill.innerHTML = escapeHtml(lang.label) + '<span class="status">' + (lang.available ? "Available" : "Coming soon") + "</span>";
    list.appendChild(pill);
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
