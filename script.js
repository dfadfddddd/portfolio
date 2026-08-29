"use strict";

/* ================= helpers ================= */
const qs = (sel, ctx) => (ctx || document).querySelector(sel);
const qsa = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const pad = n => String(n).padStart(2, "0");
const isFine = window.matchMedia("(pointer: fine)").matches;

/* ================= data ================= */
const WORKS = [
  {
    id: "jinlie",
    title: "烬猎海报设计",
    sub: "数智影像 · 中国好创意获奖作品",
    cat: "ai",
    catName: "AI 设计",
    tag: "竞赛 · 中国好创意",
    meta: "海报设计 / 数智影像",
    desc: "为数字影像作品《烬猎》（Hunt of Embers）设计的主视觉海报，以克制的光影秩序与游戏向动作视觉构建画面氛围，作品获第 20 届中国好创意全国总决赛二等奖。",
    images: ["poster-jinlie-1", "poster-jinlie-2"]
  },

  {
    id: "xcup",
    title: "新人杯 · AI 适老化设计",
    sub: "基于差序格局的社区营造",
    cat: "ai",
    catName: "AI 设计",
    tag: "竞赛 · 新人杯",
    meta: "AI 工作流 / 适老空间",
    desc: "以“差序格局”为理论框架，探索 AI 辅助下的适老化社区空间生成方法。从人群画像、模块化空间原型到建造逻辑，构建一套人机协同的设计工作流。",
    images: ["xcup-board-1", "xcup-board-2", "xcup-moodboard", "xcup-floorplan", "xcup-zoning", "xcup-ai-modules", "xcup-axo-1", "xcup-section", "xcup-render-3", "xcup-render-5", "xcup-construction-2"]
  },
  {
    id: "yunxing",
    title: "云展星球 · 虚拟展厅",
    sub: "人文内容线上展陈",
    cat: "exh",
    catName: "展陈展示",
    tag: "虚拟场景",
    meta: "场景搭建 / 灯光渲染",
    desc: "面向人文内容的线上展陈空间，负责场景搭建、灯光氛围与最终渲染，探索数字时代“无墙展厅”的观看方式与空间语言。",
    images: ["yunxing-1", "yunxing-2", "yunxing-3", "yunxing-4", "yunxing-5", "yunxing-6", "yunxing-8", "yunxing-10"]
  },
 {
    id: "chanju",
    title: "七境蝉居适老化设计",
    sub: "AI 适老化居住空间方案",
    cat: "space",
    catName: "空间设计",
    tag: "室内 · 适老化",
    meta: "全周期照护 / AI 辅助设计",
    desc: "面向全周期照护体系的适老化居住空间设计：从区位与户型调研、人物与灵感分析出发，完成功能分区、隐藏式适老化轴测分析、施工图与效果图，并借助 AI 家居控制模块辅助方案生成。",
    images: ["chanju-1", "chanju-2", "chanju-3", "chanju-4", "chanju-5", "chanju-6", "chanju-7", "chanju-8"]
 },
  {
    id: "board",
    title: "环境展板设计",
    sub: "传统村落空间营造研究",
    cat: "space",
    catName: "空间设计",
    tag: "研究 · 展板",
    meta: "研究与展示系统",
    desc: "以“空间叙事”为方法对传统村落空间营造进行拆解与转译，形成一套可输出的分析框架与展板展示系统。",
    images: ["board-1", "board-2", "board-panel-1", "board-panel-2", "board-system-2", "board-system-3", "board-manbu-poster", "board-analysis", "board-poster-1", "board-poster-2"]
  }
];

const FILTERS = [
  { key: "all", label: "全部" },
  { key: "space", label: "空间设计" },
  { key: "exh", label: "展陈展示" },
  { key: "concept", label: "概念设计" },
  { key: "ai", label: "AI 设计" }
];

const FILMS = [
  { id: "gai", title: "GAI GAME TIME", poster: "poster-gai", src: "gai-game-time", spec: "2K · 30FPS · 3′30″", tag: "AI 生成 · 游戏视觉" },
  { id: "manbu", title: "漫步人参路", poster: "poster-td", src: "td-manbu-renshenlu", spec: "8K · 60FPS · 1′30″", tag: "非遗纪录 · 空间漫游" },
  { id: "zhaolu", title: "朝露席间", poster: "poster-zhaolu", src: "zhaolu-xijian", spec: "1080P · 60FPS · 1′20″", tag: "氛围短片" },
  { id: "jinlie", title: "烬猎", poster: "poster-jinlie", src: "jinlie", spec: "4K · 60FPS · 3′30″", tag: "游戏向 · 动作视觉" },
  { id: "shengmiao", title: "长白山圣庙", poster: "poster-shengmiao", src: "changbaishan-shengmiao", spec: "2K · 30FPS · 2′00″", tag: "环境叙事" }
];

const AWARDS = [
  { img: "award-zcs", name: "第 20 届中国好创意", sub: "全国二等奖 · 国家级 · 2026" },
  { img: "award-cada", name: "CADA 日本概念艺术设计奖", sub: "二等奖 · 2026" },
  { img: "award-bingxu", name: "2025年全国第七届冰雪创意大赛", sub: "三等奖 · 2025" },
  { img: "award-shengsheng", name: "2025年学院杯中国室内与环境设计大赛", sub: "入围奖 · 2025" },
  { img: "award-ncda", name: "未来设计师大赛 NCDA", sub: "省级二等奖 · 吉林赛区 · 2026" }
];

/* ================= works render ================= */
const gridEl = qs("#works-grid");
let activeFilter = "all";

const SPAN = {
  all: [7, 5, 6, 6, 4, 4],
  space: [8, 4, 12],
  exh: [7, 5],
  concept: [8],
  ai: [8]
};

function filterCount(key) {
  return key === "all" ? WORKS.length : WORKS.filter(w => w.cat === key).length;
}

function renderFilters() {
  const wrap = qs("#works-filters");
  wrap.innerHTML = FILTERS.map(f =>
    `<button class="filter${f.key === activeFilter ? " is-active" : ""}" data-filter="${f.key}" type="button" aria-pressed="${f.key === activeFilter}">
      <span>${f.label}</span><i>${filterCount(f.key)}</i>
    </button>`
  ).join("");
  qsa(".filter", wrap).forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.filter === activeFilter) return;
      activeFilter = btn.dataset.filter;
      qsa(".filter", wrap).forEach(b => b.classList.toggle("is-active", b === btn));
      gridEl.classList.add("is-switching");
      setTimeout(() => {
        renderWorks();
        requestAnimationFrame(() => gridEl.classList.remove("is-switching"));
      }, 240);
    });
  });
}

function renderWorks() {
  const list = activeFilter === "all" ? WORKS : WORKS.filter(w => w.cat === activeFilter);
  gridEl.innerHTML = list.map((w, i) => {
    const span = 4;
    return `
      <article class="work work--${span}" data-id="${w.id}" data-hover>
        <div class="work__media">
          <img src="assets/img/${w.images[0]}.jpg" alt="${w.title}" loading="lazy">
          <div class="work__veil"></div>
          <span class="work__cat">${w.catName}</span>
          <span class="work__view">VIEW +</span>
          <span class="work__idx">${pad(i + 1)}</span>
        </div>
        <div class="work__info">
          <h3 class="work__title">${w.title}</h3>
          <span class="work__tag">${w.tag}</span>
        </div>
      </article>`;
  }).join("");
  qsa(".work", gridEl).forEach((card, i) => {
    card.style.animationDelay = i * 70 + "ms";
    card.addEventListener("click", () => openLightbox(card.dataset.id));
  });
  initTextFX();
}

/* ================= film render ================= */
function renderFilms() {
  qs("#film-list").innerHTML = FILMS.map((f, i) => `
    <article class="film__card" data-id="${f.id}" data-hover>
      <div class="film__media">
        <img src="assets/img/${f.poster}.jpg" alt="${f.title}" loading="lazy">
        
        <div class="film__veil"></div>
        <span class="film__play"><i>▶</i></span>
        <span class="film__idx">${pad(i + 1)}</span>
        <span class="film__spec">${f.spec}</span>
      </div>
      <div class="film__info">
        <h3>${f.title}</h3>
        <span>${f.tag}</span>
      </div>
    </article>`).join("");
  qsa(".film__card").forEach((card, i) => {
    card.style.animationDelay = i * 90 + "ms";
    card.addEventListener("click", () => {
      const f = FILMS.find(x => x.id === card.dataset.id);
      if (f) openFilm(f);
    });
  });
}

/* ================= awards render ================= */
function renderAwards() {
  qs("#awards-grid").innerHTML = AWARDS.map((a, i) => `
    <figure class="award" data-hover>
      <div class="award__frame">
        <img src="assets/img/${a.img}.jpg" alt="${a.name}" loading="lazy">
        <div class="award__veil"><span class="award__zoom">+</span></div>
      </div>
      <figcaption class="award__cap">
        <span class="award__name">${a.name}</span>
        <span class="award__sub">${a.sub}</span>
      </figcaption>
    </figure>`).join("");
  qsa(".award").forEach((fig, i) => {
    fig.style.animationDelay = i * 90 + "ms";
    fig.addEventListener("click", () => openCert(qs(".award__frame img", fig).src));
  });
}

function renderAll() {
  renderFilters();
  renderWorks();
  renderFilms();
  renderAwards();
  initTextFX();
}
/* ================= preloader ================= */
function initPreloader() {
  const root = qs("#preloader");
  const bar = qs("#preloader-bar");
  const pct = qs("#preloader-pct");
  const label = qs("#preloader-label");
  const labels = ["INITIALIZING", "LOADING FONTS", "COMPILING ASSETS", "CALIBRATING GRID", "READY"];
  const start = performance.now();
  const dur = 2100;
  let li = -1;
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    root.classList.add("is-done");
    renderAll();
    initReveal();
    startBgm();
    setTimeout(() => { root.style.display = "none"; }, 850);
  }

  (function step(now) {
    const t = clamp((now - start) / dur, 0, 1);
    const e = 1 - Math.pow(1 - t, 3);
    const p = Math.round(e * 100);
    pct.textContent = p + "%";
    bar.style.transform = "scaleX(" + e + ")";
    const idx = Math.min(labels.length - 1, Math.floor((p / 100) * (labels.length - 1)));
    if (idx !== li) { li = idx; label.textContent = labels[idx]; }
    if (t < 1) requestAnimationFrame(step); else finish();
  })(performance.now());
  setTimeout(finish, 2600);
}

/* ================= custom cursor ================= */
function initCursor() {
  if (!isFine) return;
  document.documentElement.classList.add("has-cursor");
  const dot = qs(".cursor__dot");
  const ring = qs(".cursor__ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = "translate3d(" + (mx - 3) + "px," + (my - 3) + "px,0)";
  });

  (function loop() {
    rx = lerp(rx, mx, 0.16);
    ry = lerp(ry, my, 0.16);
    ring.style.transform = "translate3d(" + (rx - 18) + "px," + (ry - 18) + "px,0)";
    requestAnimationFrame(loop);
  })();

  const HOVER = "a, button, .work, .film__card, .award, [data-hover]";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(HOVER)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(HOVER)) ring.classList.remove("is-hover");
  });
}

/* ================= starfield (global flying particles) ================= */
function initStarfield() {
  const cv = qs("#starfield");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = devicePixelRatio || 1;
  let W = 0, H = 0, docH = 0, stars = [], raf = 0;
  let press = 0, pressTarget = 0;
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, ax: innerWidth / 2, ay: innerHeight / 2 };
  function build() {
    W = cv.width = Math.floor(innerWidth * dpr);
    H = cv.height = Math.floor(innerHeight * dpr);
    docH = Math.max(document.documentElement.scrollHeight, innerHeight) * dpr;
    const n = Math.round(clamp((W * docH) / 12000, 90, 520));
    stars = [];
    for (let i = 0; i < n; i++) {
      const z = Math.random();
      stars.push({
        x: Math.random() * W,
        y: Math.random() * docH,
        z: z,
        r: (0.4 + z * 1.4) * dpr,
        a: 0.2 + Math.random() * 0.5,
        tw: 0.6 + Math.random() * 2.2,
        ph: Math.random() * Math.PI * 2,
        sp: 0.05 + z * 0.4
      });
    }
  }

  function frame(now) {
    const t = now / 1000;
    const sy = (pageYOffset || 0) * dpr;
    ctx.clearRect(0, 0, W, H);
    mouse.ax = lerp(mouse.ax, mouse.x, 0.07);
    mouse.ay = lerp(mouse.ay, mouse.y, 0.07);
    const px = mouse.ax / innerWidth - 0.5;
    const py = mouse.ay / innerHeight - 0.5;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      press = lerp(press, pressTarget, 0.08);
      s.y -= s.sp * dpr * 14 * (1 - press * 0.85);
      if (s.y < sy - 16) { s.y = sy + H + 16; s.x = Math.random() * W; }
      else if (s.y > sy + H + 16) { s.y = sy - 16; s.x = Math.random() * W; }
      const twinkle = Math.sin(t * s.tw + s.ph) * 0.22;
      const a = clamp(s.a + twinkle, 0.04, 1);
      const ox = s.x + px * 300 * s.z;
      const oy = s.y - sy + py * 90 * s.z;
      ctx.globalAlpha = a;
      ctx.fillStyle = s.z > 0.72 ? "#E6EFF7" : "#7FE7DC";
      ctx.beginPath();
      ctx.arc(ox, oy, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.z > 0.86) {
        ctx.globalAlpha = a * 0.3;
        ctx.beginPath();
        ctx.arc(ox, oy, s.r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
  function start() { if (!raf) raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  function loop(now) { frame(now); raf = requestAnimationFrame(loop); }

  build();
  if (window.ResizeObserver) new ResizeObserver(() => build()).observe(document.body);
  addEventListener("resize", build);
  addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener("pointerdown", () => { pressTarget = 1; }, { passive: true });
  addEventListener("pointerup", () => { pressTarget = 0; }, { passive: true });
  addEventListener("pointercancel", () => { pressTarget = 0; }, { passive: true });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });
  start();
}

/* ================= nav / scroll fx ================= */
function heroParallax() {
  const center = qs(".hero__center");
  if (!center || scrollY > innerHeight) return;
  center.style.transform = "translateY(" + scrollY * 0.16 + "px)";
  center.style.opacity = String(clamp(1 - scrollY / (innerHeight * 0.9), 0, 1));
}

function initNav() {
  const nav = qs("#nav");
  const burger = qs("#nav-burger");
  const progress = qs("#scroll-progress-bar");
  const sections = qsa("section[id]");
  const links = qsa(".nav__menu a[data-link]");

  function onScroll() {
    nav.classList.toggle("is-scrolled", scrollY > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? clamp(scrollY / max, 0, 1) : 0) + ")";
    heroParallax();
  }

  let ticking = false;
  addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", String(open));
  });

  qsa("[data-link]").forEach(a => {
    a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const id = "#" + en.target.id;
      links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => io.observe(s));
}

/* ================= reveal ================= */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  qsa("[data-reveal]").forEach(el => io.observe(el));
}

/* ================= lightbox ================= */
const lb = qs("#lightbox");
const lbImg = qs("#lb-image");
let lbProj = null;
let lbIdx = 0;
let lbZoom = 1;

function openLightbox(id) {
  lbProj = WORKS.find(w => w.id === id);
  if (!lbProj) return;
  lbIdx = 0;
  paintLightbox();
  lb.classList.add("is-open");
  document.body.classList.add("no-scroll");
  bgmDuck(true);
}

function paintLightbox() {
  const imgs = lbProj.images;
  lbZoom = 1;
  qs(".lightbox__figure").classList.remove("is-zoomed");
  lbImg.style.animation = "";
  lbImg.style.transform = "";
  lbImg.style.transformOrigin = "";
  lbImg.classList.remove("is-in");
  lbImg.src = "assets/img/" + imgs[lbIdx] + ".jpg";
  lbImg.alt = lbProj.title + " — " + pad(lbIdx + 1);
  qs("#lb-index").textContent = pad(lbIdx + 1) + " / " + pad(imgs.length);
  qs("#lb-cat").textContent = lbProj.catName + " · " + lbProj.tag;
  qs("#lb-title").textContent = lbProj.title;
  qs("#lb-role").textContent = lbProj.meta;
  qs("#lb-desc").textContent = lbProj.desc;
  qs("#lb-caption").textContent = imgs[lbIdx];
  qs("#lb-thumbs").innerHTML = imgs.map((s, i) =>
    `<button class="lb-thumb${i === lbIdx ? " is-active" : ""}" data-i="${i}" type="button"><img src="assets/img/${s}.jpg" alt="" loading="lazy"></button>`
  ).join("");
  qsa(".lb-thumb", qs("#lb-thumbs")).forEach(b => {
    b.addEventListener("click", () => { lbIdx = Number(b.dataset.i); paintLightbox(); });
  });
}

function lbStep(d) {
  if (!lbProj) return;
  lbIdx = (lbIdx + d + lbProj.images.length) % lbProj.images.length;
  paintLightbox();
}

function closeLightbox() {
  lb.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  bgmDuck(false);
  lbProj = null;
}

function initLightbox() {
  lbImg.addEventListener("load", () => lbImg.classList.add("is-in"));
  const lbFig = qs(".lightbox__figure");
  lbFig.addEventListener("wheel", e => {
    if (!lb.classList.contains("is-open")) return;
    e.preventDefault();
    const r = lbFig.getBoundingClientRect();
    const ox = ((e.clientX - r.left) / r.width) * 100;
    const oy = ((e.clientY - r.top) / r.height) * 100;
    lbImg.style.animation = "none";
    lbImg.style.transformOrigin = ox.toFixed(1) + "% " + oy.toFixed(1) + "%";
    lbZoom = Math.min(5, Math.max(1, lbZoom * (e.deltaY < 0 ? 1.14 : 1 / 1.14)));
    lbFig.classList.toggle("is-zoomed", lbZoom > 1);
    lbImg.style.transform = "scale(" + lbZoom.toFixed(3) + ")";
  }, { passive: false });
  lbFig.addEventListener("mousemove", e => {
    const r = lbFig.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const amp = lbZoom > 1 ? 8 + (lbZoom - 1) * 9 : 10;
    lbImg.style.transformOrigin = ((px + 0.5) * 100).toFixed(1) + "% " + ((py + 0.5) * 100).toFixed(1) + "%";
    lbImg.style.transform = "translate3d(" + (px * amp).toFixed(1) + "px," + (py * amp * 0.8).toFixed(1) + "px,0) scale(" + lbZoom.toFixed(3) + ")";
  });
  lbFig.addEventListener("mouseleave", () => { lbImg.style.transform = "scale(" + lbZoom.toFixed(3) + ")"; });
  qs("#lb-close").addEventListener("click", closeLightbox);
  qs("#lb-prev").addEventListener("click", () => lbStep(-1));
  qs("#lb-next").addEventListener("click", () => lbStep(1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
}

/* ================= certificate viewer ================= */
const iv = qs("#imgviewer");

function openCert(src) {
  qs("#iv-img").src = src;
  iv.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeCert() {
  iv.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function initCert() {
  iv.addEventListener("click", closeCert);
}

/* ================= video modal ================= */
const vb = qs("#videobox");
const video = qs("#vb-video");

function openFilm(f) {
  video.src = "assets/video/" + f.src + ".mp4";
  video.poster = "assets/img/" + f.poster + ".jpg";
  qs("#vb-title").textContent = f.title;
  qs("#vb-spec").textContent = f.spec + " — " + f.tag;
  vb.classList.add("is-open");
  document.body.classList.add("no-scroll");
  bgmSuspend();
  const p = video.play();
  if (p && p.catch) p.catch(function () {});
}

function closeFilm() {
  vb.classList.remove("is-open");
  video.pause();
  video.removeAttribute("src");
  video.load();
  document.body.classList.remove("no-scroll");
  bgmResume();
}

function initVideo() {
  qs("#vb-close").addEventListener("click", closeFilm);
  vb.addEventListener("click", e => { if (e.target === vb) closeFilm(); });
}

/* ================= keyboard ================= */
addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (vb.classList.contains("is-open")) closeFilm();
    else if (lb.classList.contains("is-open")) closeLightbox();
    else if (iv.classList.contains("is-open")) closeCert();
  }
  if (e.key === "ArrowLeft" && lb.classList.contains("is-open")) lbStep(-1);
  if (e.key === "ArrowRight" && lb.classList.contains("is-open")) lbStep(1);
});

/* ================= restrained click ripple ================= */
function initRipple() {
  const SEL = ".work, .award, .film__card, .docs__row, .filter, .nav__menu a, .contact__mail, .contact__tel";
  document.addEventListener("pointerdown", e => {
    const hit = e.target.closest(SEL);
    if (!hit) return;
    const size = clamp(Math.max(innerWidth, innerHeight) * 0.06, 46, 150);
    const r = document.createElement("i");
    r.className = "ripple";
    r.style.width = r.style.height = size + "px";
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
}

/* ================= boot ================= */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCursor();
  initStarfield();
  initNav();
  initLightbox();
  initCert();
  initVideo();
  initRipple();
  initBgm();
  qs("#to-top").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
});

/* ================= background music ================= */
const BGM_START_AT = 25;
const BGM_VOL_STEPS = [1, 0.6, 0];
const BGM_LABELS = ["MUSIC", "LOW", "OFF"];
const bgmEl = qs("#bgm");
const bgmBtn = qs("#bgm-toggle");
const bgmTxt = qs("#bgm-toggle-txt");
let bgmReady = false;
let bgmFirstPlay = true;
let bgmVolIdx = 0;
let bgmDucked = false;
let bgmSuspended = false;

function bgmApplyVolume() {
  if (!bgmEl) return;
  const base = BGM_VOL_STEPS[bgmVolIdx];
  bgmEl.volume = bgmDucked ? base * 0.3 : base;
  bgmBtn.classList.toggle("vol-2", base === 1);
  bgmBtn.classList.toggle("vol-1", base === 0.6);
  bgmBtn.classList.toggle("vol-0", base === 0);
}

function bgmRefresh() {
  if (!bgmBtn || !bgmTxt) return;
  const base = BGM_VOL_STEPS[bgmVolIdx];
  const playing = !bgmEl.paused && base > 0;
  bgmBtn.classList.toggle("is-playing", playing);
  bgmTxt.textContent = BGM_LABELS[bgmVolIdx];
  bgmApplyVolume();
}

function bgmPlay() {
  if (!bgmEl || bgmVolIdx === 2) return Promise.resolve();
  if (bgmFirstPlay) {
    bgmEl.currentTime = BGM_START_AT;
    bgmFirstPlay = false;
  }
  return bgmEl.play()
    .then(() => bgmRefresh())
    .catch(() => {});
}

function bgmPause() {
  if (bgmEl) bgmEl.pause();
  bgmRefresh();
}

function startBgm() {
  if (bgmReady || !bgmEl) return;
  bgmReady = true;
  document.body.classList.add("is-ready");
  bgmRefresh();
  bgmPlay();
  // 浏览器拦截自动播放时，在首次用户手势时补播
  const unlock = (e) => {
    if (bgmBtn && bgmBtn.contains(e.target)) return; // 交给按钮自身的点击逻辑
    if (bgmEl.paused && bgmVolIdx !== 2) bgmPlay();
    window.removeEventListener("pointerdown", unlock);
  };
  window.addEventListener("pointerdown", unlock);
}

function bgmDuck(on) {
  bgmDucked = on;
  bgmApplyVolume();
}

function bgmSuspend() {
  if (bgmSuspended) return;
  if (!bgmEl.paused && BGM_VOL_STEPS[bgmVolIdx] > 0) {
    bgmSuspended = true;
    bgmEl.pause();
    bgmRefresh();
  }
}

function bgmResume() {
  if (!bgmSuspended) return;
  bgmSuspended = false;
  if (BGM_VOL_STEPS[bgmVolIdx] > 0) bgmPlay();
  else bgmRefresh();
}

function initBgm() {
  if (!bgmEl || !bgmBtn || !bgmTxt) return;
  bgmRefresh();
  bgmBtn.addEventListener("click", () => {
    bgmVolIdx = (bgmVolIdx + 1) % BGM_VOL_STEPS.length;
    if (bgmVolIdx === 2) bgmPause();
    else bgmPlay();
  });
}

/* ================= text hover fx ================= */
const TXT_FX = ".section__title-cn,.section__title-en,.about__focus-title,.about__sign,.facts__row dt,.focus-list li,.skill-list li,.exp__row h4,.exp__time,.work__title,.work__tag,.film__info h3,.award__name,.award__sub,.docs__name,.docs__title,.contact__kicker,.contact__title,.contact__title span,.contact__mail,.contact__tel,.site-footer span,.to-top,.nav__logo,.nav__status,.nav__menu a,.hero__eyebrow,.filter span";
function initTextFX() {
  qsa(TXT_FX).forEach(el => {
    if (el.dataset.txtfx) return;
    el.dataset.txtfx = "1";
    let idx = 0;
    Array.prototype.slice.call(el.childNodes).forEach(node => {
      if (node.nodeType !== 3) return;
      if (!/\S/.test(node.nodeValue)) return;
      const frag = document.createDocumentFragment();
      const text = node.nodeValue;
      for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        const s = document.createElement("span");
        s.className = "ch";
        s.style.setProperty("--d", idx);
        s.textContent = ch === " " ? "\u00A0" : ch;
        frag.appendChild(s);
        idx++;
      }
      const wrap = document.createElement("span");
      wrap.className = "ch-wrap";
      wrap.appendChild(frag);
      el.replaceChild(wrap, node);
    });
    el.classList.add("has-txtfx");
  });
}
initTextFX();