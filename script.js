// Brew & Bean - simple JavaScript for beginners

// Lucide icons (food icon via CDN, not hand-drawn SVG)
function initLucide() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}
document.addEventListener("DOMContentLoaded", initLucide);
window.addEventListener("load", initLucide);

// 1. Mobile menu toggle (hamburger button)
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
  const closeMenu = function () {
    mainNav.classList.remove("active");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("active");
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when a link is clicked (so page scrolls nicely)
  document.querySelectorAll("#mainNav a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
}

// 2. Auto year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 3. The page brews with the day: mood + copy follow the real clock
const heroBadge = document.querySelector(".hero-badge");
const openNowText = document.getElementById("openNow");
const now = new Date();
const hour = now.getHours();
const nowMinutes = hour * 60 + now.getMinutes();

let timeOfDay = "night";
let badgeText = "Closed now • see you at 8 AM";

if (hour < 5) {
  timeOfDay = "night";
} else if (hour < 8) {
  timeOfDay = "morning"; // pre-open: dim night overlay stays, badge warms up
  badgeText = "Warming up • we open at 8 AM";
} else if (hour < 12) {
  timeOfDay = "morning";
  badgeText = "Fresh brews • cozy • friendly";
} else if (hour < 17) {
  timeOfDay = "afternoon";
  badgeText = "Afternoon pick-me-up • cozy • friendly";
} else if (hour < 21) {
  timeOfDay = "evening";
  badgeText = "Golden hour • cozy • friendly";
} else {
  timeOfDay = "night";
}

document.body.dataset.timeOfDay = timeOfDay;
if (heroBadge) {
  heroBadge.textContent = badgeText;
}

// Open-now card, kinder wording + countdown near closing time
if (openNowText) {
  if (hour >= 8 && hour < 21) {
    const minutesLeft = 21 * 60 - nowMinutes;
    if (minutesLeft <= 90) {
      openNowText.textContent = "Open now: we close at 9 PM (in " + minutesLeft + " min).";
    } else {
      openNowText.textContent = "Open now: come on in! We close at 9 PM.";
    }
    openNowText.classList.remove("is-closed");
  } else if (hour < 8) {
    // Before opening: we still open today (was wrongly saying "tomorrow")
    openNowText.textContent = "Closed now: we open today at 8 AM.";
    openNowText.classList.add("is-closed");
  } else {
    openNowText.textContent = "Closed now: we open tomorrow at 8 AM.";
    openNowText.classList.add("is-closed");
  }
}

// 4. Hero image: fade in once loaded so it does not pop on slow connections
const heroImg = document.querySelector(".hero-bg img");
if (heroImg) {
  if (heroImg.complete) {
    heroImg.classList.add("is-loaded");
  } else {
    heroImg.addEventListener("load", function () {
      heroImg.classList.add("is-loaded");
    });
  }
}

// 5. Scroll animation: fade + slide up when visible
// Uses IntersectionObserver (built into browsers). No external lib needed.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);

          // Clear the entrance delay once done, so hover feels instant
          entry.target.addEventListener(
            "transitionend",
            function () {
              entry.target.style.transitionDelay = "";
            },
            { once: true }
          );
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach(function (item, index) {
    // Stagger cards in same group a little for smooth waterfall effect
    item.style.transitionDelay = (index % 4) * 90 + "ms";
    revealObserver.observe(item);
  });
} else {
  // Very old browser: show everything without animation
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}

// 6. Header shadow + back-to-top button + mobile action bar
const headerEl = document.querySelector(".header");
const toTop = document.getElementById("toTop");
const mobileCta = document.getElementById("mobileCta");

function updateScrollUI() {
  const y = window.scrollY;
  if (headerEl) headerEl.classList.toggle("scrolled", y > 8);
  if (toTop) toTop.classList.toggle("show", y > 500);
  if (mobileCta) mobileCta.classList.toggle("show", y > 450);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

if (toTop) {
  toTop.addEventListener("click", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}

// 7. Highlight the nav link of the section currently on screen
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const pageSections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window && navLinks.length && pageSections.length) {
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  pageSections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

// 8. Toast: tiny confirmation messages
const toast = document.getElementById("toast");
const toastCheckIcon = document.getElementById("toastIconCheck");
const toastCupIcon = document.getElementById("toastIconCup");
const toastText = document.getElementById("toastText");
let toastTimer;

function showToast(message, type) {
  if (!toast || !toastText) return;

  // "wa" shows the cup icon, everything else a check mark
  const isWhatsApp = type === "wa";
  if (toastCheckIcon) toastCheckIcon.hidden = isWhatsApp;
  if (toastCupIcon) toastCupIcon.hidden = !isWhatsApp;

  toastText.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2600);
}

// WhatsApp confirmation for link buttons (dish links add to the tray instead)
if (toast) {
  document.querySelectorAll('a[href*="wa.me"]:not(.menu-order)').forEach(function (link) {
    link.addEventListener("click", function () {
      showToast("Opening WhatsApp...", "wa");
    });
  });
}

// 9. Build-your-order tray: circle first (count), expands when clicked
const tray = document.getElementById("tray");
const trayFab = document.getElementById("trayFab");
const trayCount = document.getElementById("trayCount");
const trayList = document.getElementById("trayList");
const trayTotal = document.getElementById("trayTotal");
const trayOrder = document.getElementById("trayOrder");
const trayClear = document.getElementById("trayClear");

const trayItems = [];
let trayOpen = false;

function renderTray() {
  if (!tray || !trayTotal || !trayOrder || !trayList || !trayFab || !trayCount) return;

  if (trayItems.length === 0) {
    tray.hidden = true;
    trayFab.hidden = true;
    trayOpen = false;
    trayFab.setAttribute("aria-expanded", "false");
    return;
  }

  let total = 0;
  let count = 0;
  trayItems.forEach(function (item) {
    total += item.price * item.qty;
    count += item.qty;
  });
  const parts = trayItems.map(function (item) {
    return item.qty + "x " + item.name;
  });

  trayCount.textContent = count;
  trayCount.hidden = false;
  trayFab.setAttribute("aria-label", "Open order tray, " + count + " items");
  trayTotal.textContent = "Total: $" + total.toFixed(2);
  trayOrder.href =
    "https://wa.me/123456789?text=" +
    encodeURIComponent(
      "Hi Brew & Bean! I'd like to order: " + parts.join(", ") +
      ". Total: $" + total.toFixed(2) + ". Pickup, please."
    );

  // Rebuild the item rows, each with its own remove button
  trayList.textContent = "";
  trayItems.forEach(function (item) {
    const row = document.createElement("li");
    row.className = "tray-row";

    const label = document.createElement("span");
    label.textContent = item.qty + "x " + item.name;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "tray-remove";
    remove.setAttribute("aria-label", "Remove " + item.name);
    remove.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    remove.addEventListener("click", function () {
      item.qty -= 1;
      if (item.qty <= 0) {
        trayItems.splice(trayItems.indexOf(item), 1);
      }
      renderTray();
      showToast("Removed " + item.name);
    });

    row.appendChild(label);
    row.appendChild(remove);
    trayList.appendChild(row);
  });

  tray.hidden = !trayOpen;
  trayFab.hidden = false;
  trayFab.setAttribute("aria-expanded", trayOpen ? "true" : "false");
}

if (trayFab) {
  trayFab.addEventListener("click", function () {
    trayOpen = !trayOpen;
    trayFab.setAttribute("aria-expanded", trayOpen ? "true" : "false");
    renderTray();
  });
}

document.querySelectorAll(".menu-order").forEach(function (link) {
  link.addEventListener("click", function (event) {
    if (!tray) return;
    event.preventDefault();

    const li = link.closest("li");
    const priceText = li ? li.querySelector("span").textContent : "";
    const price = parseFloat(priceText.replace("$", "")) || 0;
    const name = link.textContent.trim();

    const existing = trayItems.filter(function (item) {
      return item.name === name;
    })[0];

    if (existing) {
      existing.qty += 1;
    } else {
      trayItems.push({ name: name, price: price, qty: 1 });
    }

    renderTray();
    showToast("Added " + name + " to your tray");
  });
});

if (trayClear) {
  trayClear.addEventListener("click", function () {
    trayItems.length = 0;
    renderTray();
    showToast("Tray cleared");
  });
}
