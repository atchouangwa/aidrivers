(() => {
  const CONFIG = {
    bookCall: "https://cal.com/ai-driver-kabrin/discovery-call",
    checkout: "https://whop.com/aidrivers/copilot-build?a=runmorewebinars",
    social: {
      tiktok: "https://www.tiktok.com/@runmorewebinars",
      instagram: "https://www.instagram.com/runmorewebinars",
      x: "https://x.com/runmorewebinars"
    }
  };

  const map = { book: CONFIG.bookCall, checkout: CONFIG.checkout };
  document.querySelectorAll("[data-cta]").forEach((a) => {
    const key = a.getAttribute("data-cta");
    const u = map[key];
    if (!u) return;
    a.setAttribute("href", u);
    if (/^https?:/.test(u)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", key === "checkout" ? "noopener nofollow sponsored" : "noopener");
    }
  });
  document.querySelectorAll("[data-social]").forEach((a) => {
    const u = CONFIG.social[a.getAttribute("data-social")];
    if (!u) return;
    a.setAttribute("href", u);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-ev]");
    if (t) (window.dataLayer = window.dataLayer || []).push({ event: t.getAttribute("data-ev") });
  });

  document.querySelectorAll("[data-faq]").forEach((d) => {
    d.addEventListener("toggle", () => {
      const s = d.querySelector("summary span");
      if (s) s.textContent = d.open ? "–" : "+";
      if (d.open) (window.dataLayer = window.dataLayer || []).push({ event: "faq_open" });
    });
  });

  let activeClient = null;
  const paintClients = () => {
    document.querySelectorAll("[data-clientcard]").forEach((c) => {
      const on = activeClient === c.getAttribute("data-clientcard");
      c.style.borderColor = on ? "rgba(77,61,232,.7)" : "rgba(255,255,255,.1)";
      c.style.background = on ? "rgba(77,61,232,.13)" : "transparent";
      c.style.opacity = activeClient && !on ? "0.42" : "1";
    });
    document.querySelectorAll("[data-client]").forEach((b) => {
      const on = activeClient === b.getAttribute("data-client");
      b.style.borderColor = on ? "rgba(77,61,232,.7)" : "rgba(255,255,255,.14)";
      b.style.color = on ? "#F2F0EC" : "#9A9A95";
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };
  document.querySelectorAll("[data-client]").forEach((b) => b.addEventListener("click", () => {
    const k = b.getAttribute("data-client");
    activeClient = activeClient === k ? null : k;
    paintClients();
  }));
  paintClients();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.setAttribute("data-in", "");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll("[data-rv]:not([data-in])").forEach((n) => io.observe(n));
  }
})();
