// =========================================================
// Ready to Respond — Preparedness Quiz
// 16 scored yes/no questions (2 of them have a neutral third option)
// plus 2 unscored questions, shown one at a time with a progress bar.
// Results appear instantly and don't wait on anything -- the same
// answers are also submitted in the background to the campaign's
// existing Google Form so responses keep landing in the HOSA impact
// Sheet. If that submission fails (offline, blocked, etc), the
// visitor still sees their results; it's fire-and-forget.
//
// Entry IDs below were read directly from the Google Form's public
// page data (FB_PUBLIC_LOAD_DATA_) and matched to each question by
// its exact question text -- never guessed. If the Form's questions
// ever change, re-extract IDs the same way before editing this file.
// =========================================================

(function () {
  var FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfNhRfwjiFznY54ZBXw3zssCAhbhF7gwcs-K6ZoxBK7d2jcXA/formResponse";

  // TODO: the Google Form has no "ref" short-answer field yet, so the
  // site's ?ref= query param (used elsewhere for printed QR codes,
  // see js/tracking.js) can't be passed through to the Sheet. To wire
  // it up: add a short-answer "ref" question to the Form, re-extract
  // its entry.ID from FB_PUBLIC_LOAD_DATA_ the same way every
  // question below was matched, then append it in submitToForm().

  var QUESTIONS = [
    {
      id: "water",
      entry: "entry.1179085211",
      text: "Do you have at least 14 gallons of water per person in your household stored at home?",
      options: ["Yes", "No"],
      action: { label: "Store water for your household.", href: "kit.html" }
    },
    {
      id: "food",
      entry: "entry.173627307",
      text: "Do you have at least 14 days of food for everyone in your household?",
      options: ["Yes", "No"],
      action: { label: "Build up a 14-day food supply.", href: "kit.html" }
    },
    {
      id: "medication",
      entry: "entry.2094626678",
      text: "Does everyone who takes prescription medication have at least a 14-day supply?",
      options: ["Yes", "No", "Not applicable, no one in my house takes prescription medication"],
      neutral: "Not applicable, no one in my house takes prescription medication",
      action: { label: "Talk to your doctor or pharmacist about refills." }
    },
    {
      id: "cook",
      entry: "entry.1185071822",
      text: "Could your family cook a meal if the power went out for 3 days?",
      options: ["Yes", "No"],
      action: { label: "Add a backup way to cook, like a camp stove, to your kit.", href: "kit.html" }
    },
    {
      id: "meetspot",
      entry: "entry.1906237540",
      text: "Does your family have a meeting spot if your home is unsafe?",
      options: ["Yes", "No"],
      action: { label: "Pick a family meeting spot.", href: "kit.html" }
    },
    {
      id: "contact",
      entry: "entry.401222423",
      text: "Do you have an out-of-state contact your family would check in with?",
      options: ["Yes", "No"],
      action: { label: "Choose an out-of-state contact everyone can check in with.", href: "kit.html" }
    },
    {
      id: "docs",
      entry: "entry.1206562254",
      text: "Could you grab all your important documents in under 5 minutes?",
      options: ["Yes", "No"],
      action: { label: "Put copies of important documents in one waterproof bag you can grab fast.", href: "kit.html" }
    },
    {
      id: "plan",
      entry: "entry.1050282298",
      text: "Has your household talked through an emergency plan together?",
      options: ["Yes", "No"],
      action: { label: "Sit down as a household and talk through your emergency plan.", href: "kit.html" }
    },
    {
      id: "gas",
      entry: "entry.46837763",
      text: "Do you know how to shut off your home’s gas, if you have it?",
      options: ["Yes", "No", "I don't have gas"],
      neutral: "I don't have gas",
      action: { label: "Learn where your home’s gas shutoff is and how to use it." }
    },
    {
      id: "extinguisher",
      entry: "entry.190077450",
      text: "Do you have a fire extinguisher at home?",
      options: ["Yes", "No"],
      action: { label: "Get a fire extinguisher for your home.", href: "kit.html" }
    },
    {
      id: "extinguisher-use",
      entry: "entry.1643536233",
      text: "Do you know how to use a fire extinguisher?",
      options: ["Yes", "No"],
      action: { label: "Learn how to use a fire extinguisher — ask your local fire department or take a class." }
    },
    {
      id: "flashlight",
      entry: "entry.2032668530",
      text: "Do you have a working flashlight and extra batteries?",
      options: ["Yes", "No"],
      action: { label: "Add a flashlight and extra batteries to your kit.", href: "kit.html" }
    },
    {
      id: "firstaidkit",
      entry: "entry.1314230405",
      text: "Do you have a first aid kit?",
      options: ["Yes", "No"],
      action: { label: "Put together a first aid kit.", href: "kit.html" }
    },
    {
      id: "firstaidtraining",
      entry: "entry.846217453",
      text: "Have you ever had first aid or CPR training?",
      options: ["Yes", "No"],
      action: { label: "Consider taking a CPR or first aid class." }
    },
    {
      id: "alerts",
      entry: "entry.1011061053",
      text: "Are you signed up for emergency alerts (HNL Alert)?",
      options: ["Yes", "No"],
      action: { label: "Sign up for HNL Alert emergency alerts.", href: "https://www.honolulu.gov/dem/hnl-alert/" }
    },
    {
      id: "officialinfo",
      entry: "entry.9863964",
      text: "Do you know where to get official information during a disaster?",
      options: ["Yes", "No"],
      action: { label: "Bookmark HI-EMA’s site for official emergency updates.", href: "https://dod.hawaii.gov/hiema/" }
    }
  ];

  var FIRST_TIME_ENTRY = "entry.793070490";
  var ZIP_ENTRY = "entry.669032595";

  var LEVELS = [
    { max: 5, label: "Just getting started", message: "Everyone starts somewhere — you’ve just taken the first step. Pick one thing from your next steps below and knock it out this week." },
    { max: 10, label: "On your way", message: "You’ve already got real pieces in place. A few more steps and your household will be in much better shape." },
    { max: 14, label: "Almost 2 Weeks Ready", message: "You’re close! Just a few gaps left before your household meets the 2 Weeks Ready standard." },
    { max: 16, label: "2 Weeks Ready", message: "Your household meets the 2 Weeks Ready standard. Keep your kit fresh, and help someone else get started." }
  ];

  function levelFor(score) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (score <= LEVELS[i].max) return LEVELS[i];
    }
    return LEVELS[LEVELS.length - 1];
  }

  document.addEventListener("DOMContentLoaded", function () {
    var questionsEl = document.getElementById("quizQuestions");
    var progressWrap = document.getElementById("quizProgressWrap");
    var progressFill = document.getElementById("quizProgressFill");
    var progressLabel = document.getElementById("quizProgressLabel");
    var backBtn = document.getElementById("quizBackBtn");
    var nextBtn = document.getElementById("quizNextBtn");
    var formEl = document.getElementById("quizForm");
    var resultsEl = document.getElementById("quizResults");

    if (!questionsEl || !formEl) return; // not on this page

    var TOTAL = QUESTIONS.length; // 16 scored questions
    var step = 0; // 0..TOTAL-1 = scored questions, TOTAL = bonus step
    var answers = {}; // question id -> selected option text
    var firstTime = null;
    var zip = "";

    function makeOptionRow(name, value, checked, onPick) {
      var label = document.createElement("label");
      label.className = "quiz-option" + (checked ? " is-selected" : "");

      var input = document.createElement("input");
      input.type = "radio";
      input.name = name;
      input.value = value;
      input.required = true;
      if (checked) input.checked = true;
      input.addEventListener("change", function () {
        Array.prototype.forEach.call(label.parentNode.querySelectorAll(".quiz-option"), function (el) {
          el.classList.remove("is-selected");
        });
        label.classList.add("is-selected");
        onPick();
      });

      var span = document.createElement("span");
      span.textContent = value;

      label.appendChild(input);
      label.appendChild(span);
      return label;
    }

    function renderStep() {
      questionsEl.innerHTML = "";

      if (step < TOTAL) {
        var q = QUESTIONS[step];

        var card = document.createElement("div");
        card.className = "quiz-card";

        var fieldset = document.createElement("fieldset");
        fieldset.className = "quiz-fieldset";

        var legend = document.createElement("legend");
        legend.className = "quiz-question-text";
        legend.textContent = q.text;
        fieldset.appendChild(legend);

        var optsWrap = document.createElement("div");
        optsWrap.className = "quiz-options";
        q.options.forEach(function (opt) {
          optsWrap.appendChild(makeOptionRow("q_" + q.id, opt, answers[q.id] === opt, function () {
            answers[q.id] = opt;
            updateNextState();
          }));
        });
        fieldset.appendChild(optsWrap);
        card.appendChild(fieldset);
        questionsEl.appendChild(card);

        progressFill.style.width = Math.round((step / TOTAL) * 100) + "%";
        progressLabel.textContent = "Question " + (step + 1) + " of " + TOTAL;
        nextBtn.textContent = "Next";
      } else {
        // Bonus step: unscored, doesn't count toward "Question N of 16".
        var wrap = document.createElement("div");
        wrap.className = "quiz-card";

        var heading = document.createElement("h3");
        heading.textContent = "Just two more things";
        heading.style.textAlign = "center";
        heading.style.marginBottom = "20px";
        wrap.appendChild(heading);

        var ftField = document.createElement("fieldset");
        ftField.className = "quiz-bonus-field quiz-fieldset";
        var ftLegend = document.createElement("legend");
        ftLegend.className = "quiz-question-text";
        ftLegend.textContent = "Is this your first time taking this quiz?";
        ftField.appendChild(ftLegend);
        var ftOpts = document.createElement("div");
        ftOpts.className = "quiz-options";
        ["Yes", "No"].forEach(function (opt) {
          ftOpts.appendChild(makeOptionRow("q_firsttime", opt, firstTime === opt, function () {
            firstTime = opt;
            updateNextState();
          }));
        });
        ftField.appendChild(ftOpts);
        wrap.appendChild(ftField);

        var zipField = document.createElement("div");
        zipField.className = "quiz-bonus-field";
        var zipLabel = document.createElement("label");
        zipLabel.setAttribute("for", "quizZip");
        zipLabel.textContent = "ZIP code (optional)";
        var zipInput = document.createElement("input");
        zipInput.type = "text";
        zipInput.id = "quizZip";
        zipInput.className = "quiz-zip-input";
        zipInput.inputMode = "numeric";
        zipInput.placeholder = "96818";
        zipInput.maxLength = 5;
        zipInput.value = zip;
        zipInput.addEventListener("input", function () {
          zip = zipInput.value.replace(/[^0-9]/g, "").slice(0, 5);
          zipInput.value = zip;
        });
        zipField.appendChild(zipLabel);
        zipField.appendChild(zipInput);
        wrap.appendChild(zipField);

        questionsEl.appendChild(wrap);

        progressFill.style.width = "100%";
        progressLabel.textContent = "Almost done";
        nextBtn.textContent = "See My Results";
      }

      backBtn.disabled = step === 0;
      updateNextState();
    }

    function updateNextState() {
      nextBtn.disabled = step < TOTAL ? !answers[QUESTIONS[step].id] : !firstTime;
    }

    function scrollToForm() {
      window.scrollTo({ top: formEl.offsetTop - 100, behavior: "smooth" });
    }

    backBtn.addEventListener("click", function () {
      if (step === 0) return;
      step -= 1;
      renderStep();
      scrollToForm();
    });

    nextBtn.addEventListener("click", function () {
      if (nextBtn.disabled) return;
      if (step < TOTAL) {
        step += 1;
        renderStep();
        scrollToForm();
      } else {
        finishQuiz();
      }
    });

    function finishQuiz() {
      var score = 0;
      QUESTIONS.forEach(function (q) {
        if (answers[q.id] === "Yes") score += 1;
      });

      submitToForm(); // fire-and-forget, never blocks results
      showResults(score);
    }

    function submitToForm() {
      try {
        var body = new URLSearchParams();
        QUESTIONS.forEach(function (q) { body.append(q.entry, answers[q.id]); });
        body.append(FIRST_TIME_ENTRY, firstTime);
        if (zip) body.append(ZIP_ENTRY, zip);

        fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: body }).catch(function () {
          // Offline, blocked, etc -- the visitor already has their
          // results, so a failed submission is silently ignored.
        });
      } catch (e) {
        // Never let a submission problem block the results screen.
      }
    }

    function showResults(score) {
      formEl.hidden = true;
      progressWrap.hidden = true;

      var level = levelFor(score);
      var nextSteps = QUESTIONS.filter(function (q) { return answers[q.id] === "No"; }).slice(0, 3);

      resultsEl.innerHTML = "";

      var scoreBlock = document.createElement("div");
      scoreBlock.className = "quiz-score";
      scoreBlock.innerHTML =
        '<div class="quiz-score-number">' + score + " of " + TOTAL + "</div>" +
        '<div class="quiz-score-level">' + level.label + "</div>" +
        '<p class="quiz-score-message">' + level.message + "</p>";
      resultsEl.appendChild(scoreBlock);

      var stepsBlock = document.createElement("div");
      stepsBlock.className = "quiz-next-steps";
      if (nextSteps.length) {
        var h3 = document.createElement("h3");
        h3.textContent = "Your Next " + nextSteps.length + " Step" + (nextSteps.length > 1 ? "s" : "");
        stepsBlock.appendChild(h3);
        nextSteps.forEach(function (q) {
          var item = document.createElement("div");
          item.className = "quiz-step-item";
          if (q.action.href) {
            var a = document.createElement("a");
            a.href = q.action.href;
            if (/^https?:\/\//.test(q.action.href)) {
              a.target = "_blank";
              a.rel = "noopener";
            }
            a.textContent = q.action.label;
            item.appendChild(a);
          } else {
            item.textContent = q.action.label;
          }
          stepsBlock.appendChild(item);
        });
      } else {
        var congrats = document.createElement("p");
        congrats.className = "quiz-score-message";
        congrats.style.textAlign = "center";
        congrats.textContent = "Nothing urgent left on this list — just keep your kit fresh.";
        stepsBlock.appendChild(congrats);
      }
      resultsEl.appendChild(stepsBlock);

      var actions = document.createElement("div");
      actions.className = "quiz-results-actions";

      var kitBtn = document.createElement("a");
      kitBtn.href = "kit.html";
      kitBtn.className = "btn btn-coral";
      kitBtn.textContent = "Build Your 14-Day Kit";
      kitBtn.addEventListener("click", function () { trackSafe("quiz_result_click", { target: "kit" }); });
      actions.appendChild(kitBtn);

      var pioBtn = document.createElement("a");
      pioBtn.href = "pass-it-on.html";
      pioBtn.className = "btn btn-outline";
      pioBtn.textContent = "Pass It On";
      pioBtn.addEventListener("click", function () { trackSafe("quiz_result_click", { target: "pass-it-on" }); });
      actions.appendChild(pioBtn);

      var retakeBtn = document.createElement("button");
      retakeBtn.type = "button";
      retakeBtn.className = "btn btn-outline";
      retakeBtn.textContent = "Retake Quiz";
      retakeBtn.addEventListener("click", retakeQuiz);
      actions.appendChild(retakeBtn);

      resultsEl.appendChild(actions);

      var retakeNote = document.createElement("p");
      retakeNote.className = "quiz-retake-note";
      retakeNote.textContent = "Retake this quiz in a month to see how far you’ve come.";
      resultsEl.appendChild(retakeNote);

      resultsEl.hidden = false;
      trackSafe("quiz_completed", { score: score });
      window.scrollTo({ top: resultsEl.offsetTop - 100, behavior: "smooth" });
    }

    function retakeQuiz() {
      step = 0;
      answers = {};
      firstTime = null;
      zip = "";
      resultsEl.hidden = true;
      formEl.hidden = false;
      progressWrap.hidden = false;
      renderStep();
      scrollToForm();
    }

    function trackSafe(name, props) {
      if (typeof trackEvent === "function") trackEvent(name, props);
    }

    renderStep();
  });
})();
