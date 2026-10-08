const EMAIL = "caribeexquisitecatering@gmail.com";
const page = document.body.dataset.page;
const header = document.querySelector("[data-header]");
header.innerHTML = `<a href="#main" class="skip">Skip to content</a><div class="announcement"><button type="button" data-show-promo><strong>$5 meals every Thursday</strong><span>View special</span></button></div><header class="site-header"><div class="wrap header-inner"><a class="brand" href="index.html" aria-label="Blue Hills Cafe home"><span class="brand-logo"><img src="assets/blue-hills-brand.jpg" alt="Blue Hills Cafe and Bar tropical logo" width="1050" height="600"></span><span class="brand-name">blue hills<small>CAFE & BAR · HARTFORD, CT</small></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation">Menu</button><nav class="nav" id="main-navigation" aria-label="Main navigation"><a href="index.html" ${page === "home" ? 'aria-current="page"' : ""}>Home</a><a href="events.html" ${page === "events" ? 'aria-current="page"' : ""}>What’s on</a><a href="host.html" ${page === "host" ? 'aria-current="page"' : ""}>Host an event</a><a class="button" href="host.html#inquire">Plan an event</a></nav></div></header>`;
document.querySelector("[data-footer]").innerHTML =
  `<footer class="footer"><div class="wrap footer-inner"><div><p class="footer-wordmark">Blue Hills Cafe & Bar</p><p>© ${new Date().getFullYear()} Blue Hills Cafe & Bar</p><p>1329 Albany Avenue · Hartford, Connecticut</p></div><div class="footer-links"><a href="https://www.google.com/maps/search/?api=1&query=1329+Albany+Ave+Hartford+Connecticut" target="_blank" rel="noopener noreferrer">Find us in Hartford</a><a href="tel:+18604361553">(860) 436-1553</a><a href="mailto:${EMAIL}">Get in touch</a></div></div><div class="wrap footer-bottom"><nav class="footer-policy-links" aria-label="Legal and accessibility"><a href="legal.html">Legal</a><a href="privacy.html">Privacy</a><a href="accessibility.html">Accessibility</a><a href="terms.html">Terms</a></nav><p class="footer-credit">Powered By <a href="https://reimagebs.com" target="_blank" rel="noopener noreferrer">REIMAGE BUSINESS SOLUTIONS</a></p></div></footer>`;
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const mobileNavigation = window.matchMedia("(max-width: 900px)");
function closeMenu(restoreFocus = false) {
  const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  menuButton.textContent = "Menu";
  if (wasOpen && restoreFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
  menuButton.textContent = open ? "Close" : "Menu";
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu(true);
});
document.addEventListener("focusin", (event) => {
  if (mobileNavigation.matches && !event.target.closest(".site-header"))
    closeMenu();
});
mobileNavigation.addEventListener("change", () => closeMenu());
const modal = document.createElement("dialog");
modal.id = "thursday-special";
modal.setAttribute("aria-labelledby", "promo-title");
modal.setAttribute("aria-describedby", "promo-description");
modal.innerHTML = `<div class="promo-close-row"><button class="close-modal" type="button" aria-label="Close Thursday special">×</button></div><div class="promo-content"><p class="promo-label">Blue Hills Cafe & Bar</p><div class="promo-price">$5</div><h2 id="promo-title">Thursday meals</h2><p id="promo-description">A $5 meal, every Thursday at Blue Hills Cafe. Call for this week’s dishes and serving times.</p><a class="button" href="events.html#thursday">See the Thursday special</a><button class="dismiss" type="button">Take a look around</button><small>1329 Albany Ave · Hartford, Connecticut<br><a href="tel:+18604361553">(860) 436-1553</a></small></div>`;
document.body.append(modal);
function setupPromo(dialog) {
  const close = () => dialog.close();
  dialog
    .querySelectorAll(".close-modal,.dismiss,a")
    .forEach((control) => control.addEventListener("click", close));
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.toggle(
      "modal-open",
      Boolean(document.querySelector("dialog[open]")),
    );
  });
  return () => {
    if (dialog.open) return;
    dialog.showModal();
    document.body.classList.add("modal-open");
  };
}
const showPromo = setupPromo(modal);
document
  .querySelectorAll("[data-show-promo]")
  .forEach((button) => button.addEventListener("click", showPromo));
const eventModal = document.querySelector("#event-special");
if (eventModal) {
  const showEventPromo = setupPromo(eventModal);
  // Let direct links to the Thursday special go straight to that section.
  if (window.location.hash !== "#thursday") showEventPromo();
}
// Keep the Thursday popup on other pages, once per tab session.
const promoSessionKey = "blue-hills-thursday-seen";
if (page !== "policy" && page !== "events") {
  try {
    if (!sessionStorage.getItem(promoSessionKey)) {
      showPromo();
      sessionStorage.setItem(promoSessionKey, "true");
    }
  } catch {
    // Storage restrictions should not prevent the special or site from working.
    showPromo();
  }
}
const selection = new Set();
document.querySelectorAll("[data-bottle]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.bottle;
    if (selection.has(name)) selection.delete(name);
    else selection.add(name);
    const selected = selection.has(name);
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = selected ? "Remove from inquiry" : "Add to inquiry";
    button.closest(".bottle-row").classList.toggle("selected", selected);
    const summary = document.querySelector("#bottle-summary");
    summary.textContent = selection.size
      ? `Bottle requests: ${[...selection].join(", ")}`
      : "No bottles selected. You can add requests above.";
  });
});
const form = document.querySelector("#inquiry-form");
if (form) {
  const date = form.querySelector('[name="date"]');
  const now = new Date();
  date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const subject = `Blue Hills Cafe: ${d.get("service")} inquiry`;
    const body = `Hello Blue Hills Cafe,\n\nI would like to inquire about ${d.get("service")}.\n\nName: ${d.get("name")}\nEmail: ${d.get("email")}\nPreferred date: ${d.get("date") || "Flexible"}\nGuests: ${d.get("guests") || "To be confirmed"}\nBottle requests: ${[...selection].join(", ") || "None selected"}\n\nDetails:\n${d.get("details") || "Please contact me to discuss."}\n\nThank you!`;
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector("#form-status");
    status.replaceChildren();
    status.append(
      "Your email draft is ready. Send it from your email app to submit your inquiry. If it did not open, ",
    );
    const link = document.createElement("a");
    link.href = url;
    link.className = "text-link";
    link.textContent = "open the draft";
    status.append(link);
    status.append(` or email ${EMAIL}.`);
    window.location.href = url;
  });
}

// Match Andaleeb's first-view reveals: 18px rise, 620ms easing, 90ms stagger.
function initScrollReveals() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const targets = new Set();
  const addTarget = (target, delay = 0) => {
    targets.add(target);
    target.style.setProperty("--reveal-delay", `${delay}s`);
  };
  document
    .querySelectorAll(
      [
        ".section-head",
        ".thursday-image",
        ".thursday-copy",
        ".story-heading",
        ".story-copy",
        ".visit-grid > div",
        ".page-intro",
        ".hosting-nav",
        ".rental-layout > div:first-child",
        ".rental-photo",
        ".bottle-note",
        ".catering-grid > div",
        ".appispot > div:first-child",
        ".inquiry-grid > div",
        ".event-poster",
        ".event-detail",
        ".empty-events > *",
        ".celebration-cta > *",
        ".footer-inner > *",
      ].join(","),
    )
    .forEach((target) => addTarget(target));

  const columns = window.matchMedia("(max-width: 600px)").matches ? 1 : 3;
  document
    .querySelectorAll(
      ".experience-list, .occasion-list, .bottle-list, .steps, .inquiry-form",
    )
    .forEach((group) => {
      Array.from(group.children).forEach((target, index) => {
        // The live form status must remain available whenever it changes.
        if (!target.classList.contains("form-status")) {
          addTarget(target, (index % columns) * 0.09);
        }
      });
    });

  const reveal = (target, immediately = false) => {
    if (immediately) target.classList.add("reveal-immediate");
    target.classList.add("is-visible");
    observer.unobserve(target);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    },
    // Even tall sections can enter on short landscape screens.
    { threshold: 0, rootMargin: "0px 0px -8% 0px" },
  );

  targets.forEach((target) => {
    target.classList.add("scroll-reveal");
    observer.observe(target);
  });

  // Keyboard navigation and printing should never encounter hidden content.
  document.addEventListener("focusin", (event) => {
    let target = event.target.closest(".scroll-reveal");
    while (target) {
      reveal(target, true);
      target = target.parentElement?.closest(".scroll-reveal");
    }
  });
  const revealAll = () => {
    targets.forEach((target) => reveal(target, true));
    observer.disconnect();
  };
  window.addEventListener("beforeprint", revealAll);
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) revealAll();
  });
}
initScrollReveals();
