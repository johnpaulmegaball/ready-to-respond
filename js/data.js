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
    label: "State of Hawaiʻi — Increased Food Security and Food Self-Sufficiency Strategy (about 85–90% of Hawaiʻi's food is imported)",
    url: "https://files.hawaii.gov/dbedt/op/spb/INCREASED_FOOD_SECURITY_AND_FOOD_SELF_SUFFICIENCY_STRATEGY.pdf"
  },
  {
    id: 5,
    label: "Hawaiʻi Sea Grant, citing HI-EMA — “How Food Secure Are We if Natural Disaster Strikes?” (commercial food stocks last about 5–7 days)",
    url: "https://seagrant.soest.hawaii.edu/how-food-secure-are-we-if-natural-disaster-strikes/"
  },
  {
    id: 6,
    label: "State of Hawaiʻi Dept. of Defense — 2018 All-Hazards Preparedness Improvement Action Plan and Report, p.7 (port damage requiring heavy salvage/dredging equipment “will result in the loss of mass importation for 19–30 days”)",
    url: "https://dod.hawaii.gov/hiema/files/2018/02/Preparedness-Report-18FEB2018.pdf"
  },
  {
    id: 7,
    label: "Hawaiʻi Sea Grant, citing HI-EMA — “How Food Secure Are We if Natural Disaster Strikes?” (about 3,000 tons of food and 400 shipping containers arrive at Honolulu Harbor daily)",
    url: "https://seagrant.soest.hawaii.edu/how-food-secure-are-we-if-natural-disaster-strikes/"
  },
  {
    id: 8,
    label: "State of Hawaiʻi Dept. of Defense — 2018 All-Hazards Preparedness Improvement Action Plan and Report, p.7 (“After five days of no food importation, the market capacity will be below forty percent”)",
    url: "https://dod.hawaii.gov/hiema/files/2018/02/Preparedness-Report-18FEB2018.pdf"
  },
  {
    id: 9,
    label: "Hawaiʻi Emergency Management Agency — 2 Weeks Ready in Hawaiʻi",
    url: "https://dod.hawaii.gov/hiema/2-weeks-ready-in-hawai%ca%bbi/"
  },
  {
    id: 10,
    label: "Hawaiʻi State Energy Office — Energy Facts & Figures (Hawaiʻi relies on imported fossil fuel for roughly 90% of its energy)",
    url: "https://energy.hawaii.gov/wp-content/uploads/2020/11/HSEO_FactsAndFigures-2020.pdf"
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

// ---- Partners ----
// Intentionally empty — do not list an organization here until it is
// a confirmed real partner of the campaign.
var PARTNERS = [];

// ---- Past events ----
// Each event renders as one Instagram-post-style card with a photo
// carousel. "date" is left as a TODO string (not invented) until the
// HOSA team confirms it.
var EVENTS = [
  {
    id: "emergency-training",
    title: "Emergency Training",
    date: "[TODO: event date]",
    caption: "Together we covered the 3 pillars of preparedness:\n\n" +
      "✅ Be 2 Weeks Ready: build a kit with enough supplies for your household to last 14 days\n" +
      "🤝 Know Your Neighbors: in an emergency, the people next door are your first responders\n" +
      "🩹 Learn Skills: hands-on CPR and first aid practice",
    images: [
      {
        src: "images/events/emergency-training-1.jpeg",
        alt: "HOSA members gather around a table of emergency supplies, including a first aid kit and flashlight, during a demonstration."
      },
      {
        src: "images/events/emergency-training-2.jpeg",
        alt: "Students practice hands-only CPR on training manikins laid out across desks."
      },
      {
        src: "images/events/emergency-training-3.jpeg",
        alt: "A small group of HOSA members plan together around a table covered in notes and handouts."
      },
      {
        src: "images/events/emergency-training-4.jpeg",
        alt: "HOSA members lead a classroom discussion with an emergency-scenario quiz slide shown on the TV behind them."
      },
      {
        src: "images/events/emergency-training-6.jpeg",
        alt: "Students role-play a CPR scenario on the floor, one practicing chest compressions while another calls for help, as classmates watch."
      },
      {
        src: "images/events/emergency-training-5.jpeg",
        alt: "Two students read through a Ready to Respond tri-fold brochure together at their desk."
      }
    ]
  }
];
