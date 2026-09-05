/* ============================================================
   VELOURIA — منوی دیجیتال · خام (Vanilla JS)
   بدون بک‌اند، بدون سرور، بدون کتابخانه
   ============================================================ */

(function () {
  "use strict";

  /* ---------- ابزارها ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const esc = (str) =>
    String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  /* ---------- حالت ---------- */
  const state = {
    activeCategory: null,
    modalProduct: null,
    toastTimer: null,
  };

  /* ---------- DOM ---------- */
  const refs = {
    categorySection: $("#categorySection"),
    categoryStrip: $("#categoryStrip"),
    productSection: $("#productSection"),
    modal: $("#modal"),
    modalSheet: $("#modalSheet"),
drawer: $("#drawer"),
    drawerNav: $(".drawer-nav"),
    socialBtn: $("#socialBtn"),
    socialPanel: $("#socialPanel"),
    catSheet: $("#categorySheet"),
    catSheetList: $("#categorySheetList"),
    toast: $("#toast"),
    body: document.body,
  };

  /* ---------- تصویر: جایگزین خودکار در صورت نبود فایل ---------- */
  document.addEventListener(
    "error",
    function (e) {
      const img = e.target;
      if (img && img.tagName === "IMG" && img.src && !/placeholder\.svg$/.test(img.src)) {
        img.onerror = null;
        img.src = "images/placeholder.svg";
      }
    },
    true
  );

  /* ============================================================
     کارت‌های دسته‌بندی (صفحه اصلی)
     ============================================================ */
  function renderCategoryCards() {
    const wrap = el("div", "section-cards section");
    wrap.style.maxWidth = "64rem";

    MENU.categories.forEach(function (cat, i) {
      const card = el(
        "button",
        "cat-card stagger",
        "" +
          '<span class="cat-card-media">' +
          '<img src="' + esc(cat.image) + '" alt="' + esc(cat.title) + '" loading="eager">' +
          '<span class="cat-card-mark">' + cat.icon + "</span>" +
          "</span>" +
          '<span class="cat-card-body">' +
          '<span class="cat-card-name">' + esc(cat.title) + "</span>" +
          '<span class="cat-card-en">' + esc(cat.englishTitle) + "</span>" +
          (cat.tagline ? '<span class="cat-card-tagline">' + esc(cat.tagline) + "</span>" : "") +
          "</span>" +
          '<span class="cat-card-arrow"><span>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M15 4l-8 8 8 8"/></svg>' +
          "</span></span>"
      );
      card.style.animationDelay = i * 70 + "ms";
      card.type = "button";
      card.setAttribute("aria-label", "انتخاب دسته " + cat.title);
      card.addEventListener("click", function () {
        selectCategory(cat.id);
      });
      wrap.appendChild(card);
    });

    refs.categorySection.replaceChildren(wrap);
  }

  /* ============================================================
     نوار دسته‌بندی جمع‌وجور (بعد از انتخاب، همان‌جا می‌ماند)
     ============================================================ */
  function renderStrip() {
    const inner = el("div", "cat-strip-inner");

    /* --- موبایل: کلید همبرگر --- */
    const active = MENU.categories.find(function (c) {
      return c.id === state.activeCategory;
    });
    const sw = el(
      "button",
      "strip-switch",
      '<span class="ss-hamb">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="icon"><path d="M5.5 8h13"/><path d="M5.5 12h13"/><path d="M5.5 16h13"/></svg>' +
        "</span>" +
        (active
          ? '<span class="ss-meta">' +
            '<span class="ss-ic2">' +
            active.icon.replace(/stroke-width="1.6"/g, 'stroke-width="1.9"') +
            "</span>" +
            '<span class="ss-text">' +
            '<span class="ss-name">' + esc(active.title) + "</span>" +
            '<span class="ss-en">' + esc(active.englishTitle) + "</span>" +
            "</span>" +
            "</span>"
          : "") +
        '<span class="ss-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M6 9l6 6 6-6"/></svg></span>'
    );
    sw.type = "button";
    sw.setAttribute("aria-label", "تغییر دسته");
    sw.addEventListener("click", openCategorySheet);
    inner.appendChild(sw);

    /* --- دسکتاپ: قرص‌های افقی --- */
    const pills = el("div", "strip-pills");

    const allBtn = el(
      "button",
      "pill",
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="pill-icon"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>' +
        '<span class="pill-all-label">همه</span>'
    );
    allBtn.type = "button";
    allBtn.addEventListener("click", resetCategories);
    pills.appendChild(allBtn);

    MENU.categories.forEach(function (cat) {
      const isActive = cat.id === state.activeCategory;
      const b = el(
        "button",
        "pill" + (isActive ? " active" : ""),
        '<span class="pill-icon">' +
          cat.icon.replace(/stroke-width="1.6"/g, 'stroke-width="2"') +
          "</span>" +
          esc(cat.title) +
          (isActive ? '<span class="pill-dot"></span>' : "")
      );
      b.type = "button";
      b.setAttribute("aria-pressed", isActive ? "true" : "false");
      if (!isActive) {
        b.addEventListener("click", function () {
          selectCategory(cat.id);
        });
      }
      pills.appendChild(b);
    });

    inner.appendChild(pills);
    refs.categoryStrip.replaceChildren(inner);
  }

  /* ============================================================
     شیت انتخاب دسته (همبرگر موبایل)
     ============================================================ */
  function renderCategorySheet() {
    refs.catSheetList.innerHTML = "";

    refs.catSheetList.appendChild(categorySheetRow(null, "همه دسته‌ها", "ALL CATEGORIES", 0));

    MENU.categories.forEach(function (cat, i) {
      refs.catSheetList.appendChild(categorySheetRow(cat.id, null, null, i + 1));
    });
  }

  function categorySheetRow(id, customTitle, customEn, index) {
    const isAll = id === null;
    const isActive = isAll
      ? state.activeCategory === null
      : state.activeCategory === id;
    const cat = isAll
      ? null
      : MENU.categories.find(function (c) {
          return c.id === id;
        });
    const title = isAll ? customTitle : cat.title;
    const en = isAll ? customEn : cat.englishTitle;
    const icon = isAll
      ? '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="10" y="10" width="11" height="11" rx="3"/><rect x="27" y="10" width="11" height="11" rx="3"/><rect x="10" y="27" width="11" height="11" rx="3"/><rect x="27" y="27" width="11" height="11" rx="3"/></g></svg>'
      : cat.icon;

    const row = el(
      "button",
      "cs-row" + (isActive ? " active" : ""),
      '<span class="cs-icon">' +
        icon.replace(/stroke-width="1.6"/g, 'stroke-width="2"') +
        "</span>" +
        '<span class="cs-text">' +
        '<span class="cs-name">' + esc(title) + "</span>" +
        '<span class="cs-en">' + esc(en) + "</span>" +
        "</span>" +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cs-check"><path d="M4 12.5l5 5L20 6.5"/></svg>'
    );
    row.type = "button";
    row.style.animationDelay = (index || 0) * 55 + "ms";
    row.addEventListener("click", function () {
      closeCategorySheet();
      if (isAll) {
        resetCategories();
      } else {
        selectCategory(id);
      }
    });
    return row;
  }

  function openCategorySheet() {
    renderCategorySheet();
    refs.catSheet.classList.add("open");
    refs.catSheet.setAttribute("aria-hidden", "false");
    refs.body.classList.add("modal-open");
  }

  function closeCategorySheet() {
    refs.catSheet.classList.remove("open");
    refs.catSheet.setAttribute("aria-hidden", "true");
    refs.body.classList.remove("modal-open");
  }

  /* ============================================================
     محصولات
     ============================================================ */
  function renderProducts() {
    const cat = MENU.categories.find(function (c) {
      return c.id === state.activeCategory;
    });
    refs.productSection.innerHTML = "";

    if (!cat) return;

    /* سربرگ */
    refs.productSection.appendChild(
      el(
        "div",
        "product-head",
        "<h2>" + esc(cat.title) + "</h2>" +
          '<span class="product-head-en">' + esc(cat.englishTitle) + "</span>" +
          '<div class="divider"><span></span><span></span><span></span></div>'
      )
    );

    /* حالت خالی */
    if (!cat.products.length) {
      refs.productSection.appendChild(
        el(
          "div",
          "empty-state",
          '<span class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="icon-lg"><path d="M17 8h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg></span>' +
            '<p class="empty-title">به‌زودی طعم‌های جدیدی در این بخش قرار می‌گیرند.</p>' +
            '<p class="empty-en">COMING SOON</p>'
        )
      );
      return;
    }

    /* شبکه محصولات */
    const grid = el("div", "product-grid");
    cat.products.forEach(function (product, i) {
      grid.appendChild(productCard(product, i));
    });
    refs.productSection.appendChild(grid);
  }

  function productCard(product, i) {
    const card = el(
      "article",
      "product-card stagger",
      '<div class="product-card-media">' +
        '<img src="' + esc(product.image) + '" alt="' + esc(product.name) + '" loading="lazy">' +
        (product.featured ? '<span class="p-badge">انتخاب ولوریا</span>' : "") +
        "</div>" +
        '<div class="product-card-body">' +
        '<div class="p-name">' + esc(product.name) + "</div>" +
        (product.englishName ? '<div class="p-en">' + esc(product.englishName) + "</div>" : "") +
        (product.description ? '<p class="p-desc">' + esc(product.description) + "</p>" : "") +
        "</div>"
    );
    card.style.animationDelay = i * 70 + "ms";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", product.name);

    const open = function () {
      openModal(product);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    return card;
  }

  /* ============================================================
     انتخاب دسته — همان‌جا باز می‌شود، بدون رفتن به صفحه جدید
     ============================================================ */
  function selectCategory(id) {
    state.activeCategory = id;
    try {
      history.replaceState(null, "", "?category=" + id);
    } catch (_) {
      /* فایل محلی ممکن است history را محدود کند */
    }

    refs.categorySection.replaceChildren();
    refs.categoryStrip.classList.remove("hidden");
    renderStrip();
    renderProducts();
    refs.productSection.classList.remove("hidden");

    requestAnimationFrame(function () {
      refs.productSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function resetCategories() {
    state.activeCategory = null;
    try {
      history.replaceState(null, "", location.pathname);
    } catch (_) {}

    refs.categoryStrip.replaceChildren();
    refs.categoryStrip.classList.add("hidden");
    refs.productSection.replaceChildren();
    refs.productSection.classList.add("hidden");
    renderCategoryCards();

    window.scrollTo({ top: 0, behavior: "smooth" });
    closeDrawer();
    closeCategorySheet();
  }

  /* ============================================================
     مودال محصول (bottom sheet)
     ============================================================ */
  function openModal(product) {
    state.modalProduct = product;
    renderModal();
    refs.modal.classList.add("open");
    refs.modal.setAttribute("aria-hidden", "false");
    refs.body.classList.add("modal-open");
  }

  function closeModal() {
    refs.modal.classList.remove("open");
    refs.modal.setAttribute("aria-hidden", "true");
    refs.body.classList.remove("modal-open");
    state.modalProduct = null;
  }

  function renderModal() {
    const p = state.modalProduct;
    if (!p) return;

    const cat = MENU.categories.find(function (c) {
      return c.id === state.activeCategory;
    });

    refs.modalSheet.innerHTML =
      '<div class="modal-grabber"><span></span></div>' +
      '<div class="modal-media">' +
      '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '">' +
      '<button type="button" class="modal-close" data-close-modal aria-label="بستن">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="icon"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      "</button>" +
      (cat
        ? '<span class="modal-chip">' + esc(cat.title) + "</span>"
        : "") +
      "</div>" +
      '<div class="modal-body">' +
      '<div class="modal-name">' + esc(p.name) + "</div>" +
      (p.englishName ? '<div class="modal-en">' + esc(p.englishName) + "</div>" : "") +
      (p.description ? '<p class="modal-desc">' + esc(p.description) + "</p>" : "") +
      (cat && cat.note ? '<p class="modal-note">' + esc(cat.note) + "</p>" : "") +

      '<div class="modal-order">' +
      '<div class="modal-order-head">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10a3 3 0 0 1 3 3"/><path d="M12 9a5 5 0 0 1 3 3"/></svg>' +
      "<span>ثبت سفارش</span>" +
      "</div>" +
      '<p class="modal-order-note">' + esc(MENU.orderNote) + "</p>" +
      '<a class="modal-order-phone" href="' + esc(MENU.contact.phoneHref) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 4h4l1.5 4.5L8 10a11 11 0 0 0 5 5l1.5-2.5L19 14v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>' +
      esc(MENU.contact.phoneDisplay) +
      "</a>" +
      "</div>" +
      "</div>";
  }

  // کلیک‌های داخل مودال (Delegation)
  refs.modalSheet.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-modal]")) {
      closeModal();
      return;
    }
  });

  /* ============================================================
     منوی کشویی (همبرگری)
     ============================================================ */
  function openDrawer() {
    renderDrawerNav();
    refs.drawer.classList.add("open");
    refs.drawer.setAttribute("aria-hidden", "false");
    refs.body.classList.add("modal-open");
  }

  function closeDrawer() {
    refs.drawer.classList.remove("open");
    refs.drawer.setAttribute("aria-hidden", "true");
    refs.body.classList.remove("modal-open");
  }

  function renderDrawerNav() {
    const label = el("p", "drawer-nav-label", "دسته‌ها");
    const ul = el("ul");
    MENU.categories.forEach(function (cat, i) {
      const li = el("li");
      li.style.animationDelay = (i + 1) * 55 + "ms";
      const btn = el(
        "button",
        "drawer-link" + (cat.id === state.activeCategory ? " active" : ""),
        '<span class="dl-icon">' + cat.icon + "</span>" +
          '<span class="dl-text">' +
          '<span class="dl-name">' + esc(cat.title) + "</span>" +
          '<span class="dl-en">' + esc(cat.englishTitle) + "</span>" +
          "</span>"
      );
      btn.type = "button";
      btn.addEventListener("click", function () {
        closeDrawer();
        selectCategory(cat.id);
      });
      li.appendChild(btn);
      ul.appendChild(li);
    });
    refs.drawerNav.replaceChildren(label, ul);
  }

  /* ============================================================
     پنل شیشه‌ای شبکه‌های اجتماعی
     ============================================================ */
  function whatsappHref() {
    return (
      "https://wa.me/" +
      MENU.contact.waNumber +
      "?text=" +
      encodeURIComponent(MENU.contact.waText)
    );
  }

  function socialHref(s) {
    if (s.id === "phone") return MENU.contact.phoneHref;
    if (s.id === "whatsapp") return whatsappHref();
    if (s.id === "instagram") return MENU.contact.instagram;
    return s.href || "#";
  }

  function renderSocialPanel() {
    refs.socialPanel.replaceChildren();
    MENU.social.forEach(function (s, i) {
      const link = el("a", "social-link " + s.id);
      link.href = socialHref(s);
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", s.name);
      link.innerHTML = s.icon;
      link.style.animationDelay = i * 55 + "ms";
      refs.socialPanel.appendChild(link);
    });
  }

  function setSocial(open) {
    refs.socialPanel.classList.toggle("open", open);
    refs.socialBtn.setAttribute("aria-expanded", String(open));
  }

  function toggleSocial() {
    if (refs.socialPanel.classList.contains("open")) {
      setSocial(false);
    } else {
      renderSocialPanel();
      setSocial(true);
    }
  }

  function closeSocial() {
    setSocial(false);
  }

  /* ============================================================
     توست
     ============================================================ */
  function showToast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.add("show");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(function () {
      refs.toast.classList.remove("show");
    }, 2800);
  }

  function renderFooter() {
    const nav = document.querySelector(".footer-social");
    const note = document.querySelector(".footer-note");
    if (!nav) return;

    nav.replaceChildren();

    const findItem = function (id) {
      return MENU.social.find(function (s) {
        return s.id === id;
      });
    };

    // اینستاگرام — بالای دکمه‌ها
    const ig = findItem("instagram");
    if (ig) {
      const igLink = el("a", "footer-ig");
      igLink.href = MENU.contact.instagram;
      igLink.target = "_blank";
      igLink.rel = "noopener";
      igLink.setAttribute("aria-label", "اینستاگرام " + MENU.contact.instagramHandle);
      igLink.innerHTML =
        ig.icon + '<span class="footer-ig-text">اینستاگرام · ' + esc(MENU.contact.instagramHandle) + "</span>";
      nav.appendChild(igLink);
    }

    // ردیفِ دکمه‌های تماس و واتساپ
    const row = el("div", "footer-row");

    const phone = findItem("phone");
    if (phone) {
      const p = el("a", "footer-action phone");
      p.href = MENU.contact.phoneHref;
      p.setAttribute("aria-label", "تماس با ولوریا");
      p.innerHTML =
        phone.icon +
        '<span class="footer-action-text"><small>تماس</small>' +
        esc(MENU.contact.phoneDisplay) +
        "</span>";
      row.appendChild(p);
    }

    const wa = findItem("whatsapp");
    if (wa) {
      const w = el("a", "footer-action whatsapp");
      w.href = whatsappHref();
      w.setAttribute("aria-label", "سفارش در واتساپ");
      w.innerHTML =
        wa.icon +
        '<span class="footer-action-text"><small>واتساپ</small>' +
        esc(MENU.contact.phoneDisplay) +
        "</span>";
      row.appendChild(w);
    }

    nav.appendChild(row);

    if (note) {
      note.textContent = MENU.orderNote;
    }
  }

  /* ============================================================
     اتصال رویدادها
     ============================================================ */
  function bindEvents() {
    // هدر
    $("#menuBtn").addEventListener("click", openDrawer);
    refs.socialBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleSocial();
    });

    // بستن پنل اجتماعی با کلیک بیرون آن
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".header-action")) closeSocial();
    });

    // شماره تلفن و واتساپ در پنل اجتماعی ← پرش به فوتر
    document.addEventListener("click", function (e) {
      const go = e.target.closest("a.social-link.phone, a.social-link.whatsapp");
      if (!go) return;
      e.preventDefault();
      const footer = document.querySelector(".site-footer");
      if (footer) footer.scrollIntoView({ behavior: "smooth", block: "start" });
      closeSocial();
    });

    // واتساپ در فوتر: فقط نشان دادن شماره + پیام ثبت سفارش
    document.addEventListener("click", function (e) {
      const wa = e.target.closest("a.footer-action.whatsapp");
      if (!wa) return;
      e.preventDefault();
      showToast("برای ثبت سفارش در واتساپ پیام دهید: " + MENU.contact.phoneDisplay);
    });

    // مودال
    $$("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });

    // منوی کشویی
    $("#drawerClose").addEventListener("click", closeDrawer);
    $$("[data-close-drawer]").forEach(function (btn) {
      btn.addEventListener("click", closeDrawer);
    });

    // شیت انتخاب دسته
    $("#catSheetClose").addEventListener("click", closeCategorySheet);
    $$("[data-close-catsheet]").forEach(function (btn) {
      btn.addEventListener("click", closeCategorySheet);
    });

    // کلیدها
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (refs.modal.classList.contains("open")) closeModal();
        if (refs.catSheet.classList.contains("open")) closeCategorySheet();
        if (refs.drawer.classList.contains("open")) closeDrawer();
        closeSocial();
      }
    });
  }

  /* ============================================================
     پرده لودینگ
     ============================================================ */
  function hideLoader() {
    const loader = $(".loader");
    if (!loader) return;
    loader.classList.add("hide");
    loader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("loading");
    setTimeout(function () {
      loader.remove();
    }, 800);
  }

  /* ============================================================
     پیش‌بارگذاری همه تصاویر به ترتیب (بعد از لود صفحه)
     تا تصاویر محصولات قبل از ورود به دسته آماده باشند
     ============================================================ */
  function preloadImages() {
    const srcs = [];
    MENU.categories.forEach(function (cat) {
      if (cat.image) srcs.push(cat.image);
      (cat.products || []).forEach(function (p) {
        if (p.image) srcs.push(p.image);
      });
    });

    const seen = {};
    const list = srcs.filter(function (s) {
      if (seen[s]) return false;
      seen[s] = true;
      return true;
    });

    function loadNext(i) {
      if (i >= list.length) return;
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = function () {
        loadNext(i + 1);
      };
      img.src = list[i];
    }
    loadNext(0);
  }

  function init() {
    // پرده لودینگ — همیشه محو شود تا اسکرول قفل نماند
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const done = function () {
      setTimeout(hideLoader, reduce ? 300 : 5000);
    };
    if (reduce || document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", function () {
        if (document.readyState === "complete") done();
      });
      // بازگشتی امن: اگر رویداد load هرگز نیامد، باز اسکرول باز شود
      setTimeout(done, 4000);
    }

    renderSocialPanel();
    renderFooter();

    // خواندن دسته از آدرس (اختیاری): ?category=cakes
    const param = new URLSearchParams(location.search).get("category");
    const valid = param && MENU.categories.some(function (c) {
      return c.id === param;
    });

    if (valid) {
      selectCategory(param);
    } else {
      renderCategoryCards();
    }

    bindEvents();

    // پیش‌بارگذاری تصاویر پس از لود کامل صفحه
    const runPreload = function () {
      setTimeout(preloadImages, 250);
    };
    if (document.readyState === "complete") {
      runPreload();
    } else {
      window.addEventListener("load", runPreload);
    }
  }

  init();
})();