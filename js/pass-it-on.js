// =========================================================
// Ready to Respond — Pass It On
// Share buttons (native share sheet when available, with copy/SMS/
// email fallbacks) and the printable Kūpuna Check-In Card.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var siteUrl = window.location.origin + window.location.pathname;
  var shareMessage = "Hawaiʻi only has about a week of food on store shelves. Take this 3-minute quiz to see if our family is 2 Weeks Ready: " + siteUrl;

  var nativeBtn = document.getElementById("shareNativeBtn");
  var copyBtn = document.getElementById("shareCopyBtn");
  var smsBtn = document.getElementById("shareSmsBtn");
  var emailBtn = document.getElementById("shareEmailBtn");
  var copiedNote = document.getElementById("shareCopiedNote");

  // Prefer the device's native share sheet when it's available; show
  // it in place of (not alongside) the Copy Link button so there
  // isn't a redundant pair of "do basically the same thing" buttons.
  if (nativeBtn && navigator.share) {
    nativeBtn.hidden = false;
    if (copyBtn) copyBtn.hidden = true;
    nativeBtn.addEventListener("click", function () {
      navigator.share({ title: "Ready to Respond", text: shareMessage, url: siteUrl }).catch(function () {
        // User canceled the share sheet or it failed silently -- nothing to do.
      });
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      function showCopied() {
        if (!copiedNote) return;
        copiedNote.hidden = false;
        window.setTimeout(function () { copiedNote.hidden = true; }, 2500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareMessage).then(showCopied).catch(function () {
          window.prompt("Copy this link:", siteUrl);
        });
      } else {
        window.prompt("Copy this link:", siteUrl);
      }
    });
  }

  if (smsBtn) {
    smsBtn.href = "sms:?&body=" + encodeURIComponent(shareMessage);
  }

  if (emailBtn) {
    var subject = encodeURIComponent("Get your household 2 Weeks Ready");
    var body = encodeURIComponent(shareMessage);
    emailBtn.href = "mailto:?subject=" + subject + "&body=" + body;
  }

  // ---- Kūpuna card print ----
  var kupunaPrintBtn = document.getElementById("kupunaPrintBtn");
  if (kupunaPrintBtn) {
    kupunaPrintBtn.addEventListener("click", function () {
      document.body.setAttribute("data-printing", "kupuna");
      window.print();
    });
  }
});

window.addEventListener("afterprint", function () {
  document.body.removeAttribute("data-printing");
});
