// =========================================================
// Ready to Respond — Editable campaign data
// Everything a non-developer should be able to update lives here:
// sources/citations, impact counters, events, partners, and team.
// Nothing in this file should be invented — leave a field as the
// literal string "[TODO: ...]" (or null, where noted) until the
// HOSA team has a real value to put in its place.
// =========================================================

// ---- Sources & citations ----
// Every numbered citation used next to a stat on the page should
// point to one of these by id. Stats with no real source yet are
// marked needsSource: true and should show "[SOURCE NEEDED]" instead
// of a working link until a real one is added here.
var SOURCES = [
  {
    id: 1,
    label: "University of Hawaiʻi News (Dec. 2025) — peer-reviewed study on Hawaiʻi household emergency preparedness",
    url: "https://www.hawaii.edu/news/2025/12/02/emergency-preparedness-standards-publication/"
  },
  {
    id: 2,
    label: "Hawaii Tribune-Herald — “Most Hawaii households not prepared for natural disaster”",
    url: "https://www.hawaiitribune-herald.com/?p=305978"
  },
  {
    id: 3,
    label: "Honolulu Star-Advertiser editorial — most households learn about preparedness from family and friends",
    url: "https://staradvertiser.com/?p=1262736"
  },
  {
    id: 4,
    label: "[SOURCE NEEDED] 90% of Hawaiʻi's food is imported, 100% of fuel is imported",
    url: null,
    needsSource: true
  },
  {
    id: 5,
    label: "[SOURCE NEEDED] 5–7 days of food on store shelves statewide",
    url: null,
    needsSource: true
  },
  {
    id: 6,
    label: "[SOURCE NEEDED] 19–30 days for shipping to fully recover after major port damage",
    url: null,
    needsSource: true
  },
  {
    id: 7,
    label: "[SOURCE NEEDED] ~3,000 tons of food and 400 shipping containers land at Honolulu Harbor daily",
    url: null,
    needsSource: true
  },
  {
    id: 8,
    label: "[SOURCE NEEDED] Stores below 40% of normal stock after 5 days without imports",
    url: null,
    needsSource: true
  },
  {
    id: 9,
    label: "Hawaiʻi Emergency Management Agency — 2 Weeks Ready in Hawaiʻi",
    url: "https://dod.hawaii.gov/hiema/2-weeks-ready-in-hawai%ca%bbi/"
  }
];

// ---- Verified official links ----
// Checked against each agency's own site. Keep these centralized so
// the team only has to update a URL in one place if it ever changes.
// Anything still marked [TODO] below could not be confirmed and
// should not be trusted until someone checks it directly.
var OFFICIAL_LINKS = {
  alertSignup: "https://www.honolulu.gov/dem/hnl-alert/",
  hiEmaHome: "https://dod.hawaii.gov/hiema/",
  twoWeeksReady: "https://dod.hawaii.gov/hiema/2-weeks-ready-in-hawai%ca%bbi/",
  hurricane: "https://dod.hawaii.gov/hiema/hurricane/",
  tsunami: "https://dod.hawaii.gov/hiema/tsunami/",
  flashFlood: "https://dod.hawaii.gov/hiema/types-of-disaster/",
  wildfire: "https://dod.hawaii.gov/hiema/wildfire/"
};

// ---- Our Campaign / Our Impact ----
// Keep campaignGoal as the literal TODO string until the team picks a
// real, measurable goal. Impact counters should stay `null` (which
// the page renders as "[TODO]") until there's a real number to show
// — never fake a number here.
var CAMPAIGN = {
  goal: "[TODO: measurable goal, e.g. “Get 500 Oʻahu households to take the quiz by March 2027”]",
  impact: {
    quizzesTaken: null,
    checklistsPrinted: null,
    cardsShared: null,
    eventsHeld: null
  }
};

// ---- Events ----
// Add one object per event. Leave fields as "[TODO: ...]" until real
// details exist. photo should be a path under images/ or null.
var EVENTS = [
  {
    date: "[TODO: event date]",
    location: "[TODO: event location]",
    description: "[TODO: short description of the event]",
    photo: null
  }
];

// ---- Partners ----
// Intentionally empty — do not list an organization here until it is
// a confirmed real partner of the campaign.
var PARTNERS = [];

// ---- Our Team ----
// One object per team member. Leave every field as TODO until real
// info is supplied.
var TEAM = [
  {
    name: "[TODO: team member name]",
    role: "[TODO: role, e.g. Campaign Lead]",
    school: "Moanalua High School",
    chapter: "HOSA",
    contact: "[TODO: email or Instagram handle]"
  }
];

// ---- Languages ----
// Structure-only placeholder. Do NOT machine-translate safety content
// — every entry here should stay marked unavailable until a real,
// human-reviewed translation exists.
var LANGUAGES = [
  { code: "ilo", label: "Ilocano", available: false },
  { code: "tl", label: "Tagalog", available: false },
  { code: "vi", label: "Vietnamese", available: false },
  { code: "chk", label: "Chuukese", available: false },
  { code: "mh", label: "Marshallese", available: false }
];
