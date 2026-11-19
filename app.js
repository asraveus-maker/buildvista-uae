(() => {
  const page = document.body.dataset.page || "home";

  const navItems = [
    ["index.html", "Home", "home"],
    ["design-studio.html", "Design Studio", "design-studio"],
    ["services.html", "Services", "services"],
    ["contractors.html", "Contractors", "contractors"],
    ["materials.html", "Materials", "materials"],
    ["faq.html", "FAQ", "faq"],
  ];

  const moreItems = [
    ["request-quote.html", "Request a Quote", "request-quote"],
    ["contact.html", "Contact", "contact"],
    ["team.html", "Management & Employment", "team"],
    ["guarantee.html", "Guarantee & Disputes", "guarantee"],
    ["feedback.html", "Customer Feedback", "feedback"],
    ["privacy.html", "Privacy & Security", "privacy"],
  ];

  const icon = `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M7 25.5 15.7 6.5c.2-.5.9-.5 1.1 0l8.2 19" fill="none" stroke="currentColor" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.1 20.2h10.7" fill="none" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/>
      <path d="M6.5 25.5h19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`;

  const brand = `
    <span class="brand-mark">${icon}</span>
    <span class="brand-copy"><strong>BuildVista</strong><span>Design to build</span></span>`;

  const header = document.querySelector("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="topbar">
        <div class="container topbar-inner">
          <span>UAE design-to-build marketplace</span>
          <span><strong>Verified professionals</strong> · Clear estimates</span>
        </div>
      </div>
      <header class="site-header">
        <div class="container nav-shell">
          <a class="brand" href="index.html" aria-label="BuildVista home">${brand}</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Open navigation"><span></span></button>
          <nav class="site-nav" id="main-navigation" aria-label="Main navigation">
            ${navItems.map(([href, label, key]) => `<a href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
            <details class="nav-more"${moreItems.some(([, , key]) => key === page) ? " open" : ""}>
              <summary${moreItems.some(([, , key]) => key === page) ? ' aria-current="page"' : ""}>More <span aria-hidden="true">⌄</span></summary>
              <div class="nav-more-menu">${moreItems.map(([href, label, key]) => `<a href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</div>
            </details>
          </nav>
          <a class="nav-cta" href="request-quote.html">Start a project <span aria-hidden="true">→</span></a>
        </div>
      </header>`;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    toggle?.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });
  }

  const footer = document.querySelector("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-main">
          <div class="footer-brand">
            <a class="brand" href="index.html" aria-label="BuildVista home">${brand}</a>
            <p>Design, price, compare, and build with more confidence. A course prototype for a UAE-focused design-to-build marketplace.</p>
            <p class="legal-note">BuildVista is a concept marketplace. It does not approve structural plans, issue permits, provide engineering sign-off, or replace a customer’s contract with a licensed professional.</p>
          </div>
          <div class="footer-column">
            <h3>Explore</h3>
            <div class="footer-links">
              <a href="design-studio.html">Design Studio</a>
              <a href="services.html">Service packages</a>
              <a href="contractors.html">Contractor directory</a>
              <a href="materials.html">Materials library</a>
            </div>
          </div>
          <div class="footer-column">
            <h3>Company</h3>
            <div class="footer-links">
              <a href="team.html">Management & employment</a>
              <a href="feedback.html">Customer feedback</a>
              <a href="guarantee.html">Guarantee & disputes</a>
              <a href="privacy.html">Privacy & security</a>
            </div>
          </div>
          <div class="footer-column">
            <h3>Help</h3>
            <div class="footer-links">
              <a href="faq.html">Frequently asked questions</a>
              <a href="contact.html">Contact BuildVista</a>
              <a href="request-quote.html">Request a quote</a>
              <a href="mailto:202202311@uae.ae.ac">202202311@uae.ae.ac</a>
            </div>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© <span data-year></span> BuildVista UAE · Course demonstration</span>
          <span>No real payments or contractor transactions are enabled.</span>
        </div>
      </footer>`;
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const formatAED = (value) => `AED ${Number(value).toLocaleString("en-AE")}`;

  const packageSelect = document.querySelector("#package");
  const quantityInput = document.querySelector("#quantity");
  const packageName = document.querySelector("#summary-package");
  const quantityLabel = document.querySelector("#summary-quantity");
  const totalLabel = document.querySelector("#summary-total");

  const updateOrderSummary = () => {
    if (!packageSelect || !quantityInput) return;
    const option = packageSelect.options[packageSelect.selectedIndex];
    const price = Number(option?.dataset.price || 0);
    const quantity = Math.max(1, Number(quantityInput.value || 1));
    if (packageName) packageName.textContent = option?.textContent || "Select a package";
    if (quantityLabel) quantityLabel.textContent = String(quantity);
    if (totalLabel) totalLabel.textContent = formatAED(price * quantity);
  };

  packageSelect?.addEventListener("change", updateOrderSummary);
  quantityInput?.addEventListener("input", updateOrderSummary);
  if (packageSelect) {
    const requestedPackage = new URLSearchParams(window.location.search).get("package");
    if (requestedPackage && [...packageSelect.options].some((option) => option.value === requestedPackage)) {
      packageSelect.value = requestedPackage;
    }
  }
  updateOrderSummary();

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const targetId = form.dataset.successTarget;
      const success = targetId ? document.querySelector(`#${targetId}`) : null;
      if (success) {
        success.classList.add("is-visible");
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.querySelectorAll("input:not([type=hidden]), textarea").forEach((field) => {
        if (field.type !== "radio" && field.type !== "checkbox") field.value = "";
      });
      if (form.id === "request-form") {
        packageSelect && (packageSelect.selectedIndex = 0);
        quantityInput && (quantityInput.value = "1");
        updateOrderSummary();
      }
    });
  });

  const styleData = {
    modern: {
      name: "Modern courtyard",
      description: "Clean lines, shaded glazing, and a calm material palette for a confident first brief.",
      cost: "AED 1.2M–1.8M",
    },
    warm: {
      name: "Warm minimal",
      description: "Natural oak, soft stone, and layered light for a home that feels quiet and welcoming.",
      cost: "AED 1.1M–1.7M",
    },
    courtyard: {
      name: "Contemporary majlis",
      description: "A privacy-first plan with a generous courtyard and flexible entertaining zones.",
      cost: "AED 1.3M–2.0M",
    },
  };

  const studioPreview = document.querySelector(".studio-preview");
  const studioName = document.querySelector("#studio-style-name");
  const studioDescription = document.querySelector("#studio-style-description");
  const studioCost = document.querySelector("#studio-cost");

  const selectStyle = (key) => {
    const data = styleData[key];
    if (!data) return;
    document.querySelectorAll("[data-style]").forEach((card) => {
      card.classList.toggle("is-selected", card.dataset.style === key);
      card.setAttribute("aria-pressed", String(card.dataset.style === key));
    });
    studioPreview?.setAttribute("data-style", key);
    if (studioName) studioName.textContent = data.name;
    if (studioDescription) studioDescription.textContent = data.description;
    if (studioCost) studioCost.textContent = data.cost;
  };

  document.querySelectorAll("[data-style]").forEach((card) => {
    card.addEventListener("click", () => selectStyle(card.dataset.style));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectStyle(card.dataset.style);
      }
    });
  });
  selectStyle("modern");

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const chips = group.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(`[data-filter-card="${group.dataset.filterGroup}"]`);
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((item) => item.classList.remove("is-active"));
        chip.classList.add("is-active");
        const filter = chip.dataset.filter;
        cards.forEach((card) => {
          card.hidden = filter !== "all" && card.dataset.category !== filter;
        });
      });
    });
  });
})();

