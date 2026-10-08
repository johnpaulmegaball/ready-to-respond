// =========================================================
// Ready to Respond — Build Your 14-Day Kit
// Household calculator + tiered checklist with a progress bar.
// Everything typed here is saved to localStorage so progress survives
// a return visit, wrapped in try/catch so the page still works fully
// if storage is blocked or unavailable (private browsing, etc).
// Nothing entered here is sent anywhere -- it only ever touches the
// visitor's own browser.
// =========================================================

(function () {
  var STORAGE_KEY = "r2r-kit-v1";

  var GALLONS_PER_PERSON_PER_DAY = 1;
  var DAYS = 14;
  var GALLONS_PER_CASE = 3;

  var EXTRA_ITEMS = {
    needMeds: "14 days of medication refills for everyone who needs them",
    needPower: "A backup power plan for any power-dependent medical equipment",
    needBaby: "Infant formula, diapers, and baby supplies",
    needKupuna: "Extra supplies and support for kūpuna in the household",
    needDisability: "Mobility aids and extra supplies for accessibility needs"
  };

  function safeGet() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function safeSet(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Storage unavailable (private browsing, quota, etc) -- the kit
      // builder still works for this visit, it just won't persist.
    }
  }

  function safeClear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var peopleInput = document.getElementById("calcPeople");
    var petsInput = document.getElementById("calcPets");
    var checkIds = ["needMeds", "needPower", "needBaby", "needKupuna", "needDisability"];
    var kitCheckboxes = Array.prototype.slice.call(document.querySelectorAll("[data-kit-item]"));

    if (!peopleInput || !kitCheckboxes.length) return; // not on this page

    function currentState() {
      var kitItems = {};
      kitCheckboxes.forEach(function (cb) { kitItems[cb.getAttribute("data-kit-item")] = cb.checked; });
      var needs = {};
      checkIds.forEach(function (id) {
        var el = document.getElementById(id);
        needs[id] = el ? el.checked : false;
      });
      return {
        people: parseInt(peopleInput.value, 10) || 0,
        pets: parseInt(petsInput.value, 10) || 0,
        needs: needs,
        kitItems: kitItems
      };
    }

    function applyState(state) {
      if (!state) return;
      if (state.people) peopleInput.value = state.people;
      if (state.pets !== undefined) petsInput.value = state.pets;
      checkIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && state.needs) el.checked = !!state.needs[id];
      });
      kitCheckboxes.forEach(function (cb) {
        var key = cb.getAttribute("data-kit-item");
        if (state.kitItems && state.kitItems[key]) cb.checked = true;
      });
    }

    function save() { safeSet(currentState()); }

    function updateCalculator() {
      var people = Math.max(0, parseInt(peopleInput.value, 10) || 0);
      var pets = Math.max(0, parseInt(petsInput.value, 10) || 0);
      var gallons = people * GALLONS_PER_PERSON_PER_DAY * DAYS;
      var cases = Math.ceil(gallons / GALLONS_PER_CASE);

      var gallonsEl = document.getElementById("calcWaterGallons");
      var casesEl = document.getElementById("calcWaterCases");
      if (gallonsEl) gallonsEl.textContent = gallons;
      if (casesEl) casesEl.textContent = cases;

      var petNote = document.getElementById("calcPetNote");
      if (petNote) petNote.hidden = pets <= 0;

      var extraList = document.getElementById("calcExtraItems");
      var flaggedIds = [];
      if (extraList) {
        extraList.innerHTML = "";
        checkIds.forEach(function (id) {
          var el = document.getElementById(id);
          if (el && el.checked) {
            flaggedIds.push(id);
            var li = document.createElement("li");
            li.textContent = EXTRA_ITEMS[id];
            extraList.appendChild(li);
          }
        });
      }

      // Highlight the matching rows in "Health Needs Most Kits Forget"
      document.querySelectorAll("[data-needs-flag]").forEach(function (row) {
        var flag = row.getAttribute("data-needs-flag");
        row.classList.toggle("is-flagged", flaggedIds.indexOf(flag) !== -1);
      });
    }

    function updateProgress() {
      var total = kitCheckboxes.length;
      var done = kitCheckboxes.filter(function (cb) { return cb.checked; }).length;
      var fill = document.getElementById("kitProgressFill");
      var label = document.getElementById("kitProgressLabel");
      var pct = total ? Math.round((done / total) * 100) : 0;
      if (fill) fill.style.width = pct + "%";
      if (label) label.textContent = done + " of " + total + " done";
    }

    function refreshAll() {
      updateCalculator();
      updateProgress();
    }

    // Restore saved state, then compute the initial display.
    applyState(safeGet());
    refreshAll();

    // Wire up change handlers.
    [peopleInput, petsInput].forEach(function (input) {
      input.addEventListener("input", function () { updateCalculator(); save(); });
    });

    checkIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("change", function () { updateCalculator(); save(); });
    });

    kitCheckboxes.forEach(function (cb) {
      cb.addEventListener("change", function () {
        var item = cb.closest(".kit-item");
        if (item) item.classList.toggle("is-checked", cb.checked);
        updateProgress();
        save();
      });
      var item = cb.closest(".kit-item");
      if (item) item.classList.toggle("is-checked", cb.checked);
    });

    // ---- Reset ----
    var resetBtn = document.getElementById("kitResetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        safeClear();
        peopleInput.value = 4;
        petsInput.value = 0;
        checkIds.forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.checked = false;
        });
        kitCheckboxes.forEach(function (cb) {
          cb.checked = false;
          var item = cb.closest(".kit-item");
          if (item) item.classList.remove("is-checked");
        });
        refreshAll();
      });
    }

    // ---- Print ----
    var printBtn = document.getElementById("kitPrintBtn");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        document.body.setAttribute("data-printing", "checklist");
        window.print();
      });
    }
  });

  window.addEventListener("afterprint", function () {
    document.body.removeAttribute("data-printing");
  });
})();
