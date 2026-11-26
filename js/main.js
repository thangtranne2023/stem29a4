/**
 * ============================================================================
 * NHÓM 4 (9A4) — THIẾT KẾ MÔ HÌNH CẤU TRÚC PHÂN TỬ DNA TỪ VẬT LIỆU ĐƠN GIẢN
 * Quy ước màu thật: A Đỏ - T Xanh dương - G Xanh lá - C Vàng
 * Tương thích cả HTTP và mở trực tiếp file://
 * ============================================================================
 */

const EMBED_URL = "";

const SLIDES = [
  { src: "assets/slides/slide-01.jpg", title: "1. THIẾT KẾ MÔ HÌNH CẤU TRÚC PHÂN TỬ DNA TỪ VẬT LIỆU ĐƠN GIẢN" },
  { src: "assets/slides/slide-02.jpg", title: "2. NHÓM 4 — PHÂN CÔNG NHIỆM VỤ" },
  { src: "assets/slides/slide-03.jpg", title: "3. Ý TƯỞNG THIẾT KẾ" },
  { src: "assets/slides/slide-04.jpg", title: "4. VẬT LIỆU SỬ DỤNG" },
  { src: "assets/slides/slide-05.jpg", title: "5. QUY ƯỚC MÀU SẮC" },
  { src: "assets/slides/slide-06.jpg", title: "6. CÁCH THỂ HIỆN CẤU TRÚC DNA" },
  { src: "assets/slides/slide-07.jpg", title: "7. MỘT SỐ HÌNH ẢNH QUÁ TRÌNH LÀM" },
  { src: "assets/slides/slide-08.jpg", title: "8. SẢN PHẨM HOÀN THIỆN (1)" },
  { src: "assets/slides/slide-09.jpg", title: "9. SẢN PHẨM HOÀN THIỆN (2)" },
  { src: "assets/slides/slide-10.jpg", title: "10. THANK YOU FOR WATCHING" }
];

const GALLERY_ITEMS = [
  {
    src: "assets/images/anh-01.jpg",
    alt: "Hai học sinh Nhóm 4 cầm mô hình DNA khung nền vàng gắn chữ A T G C trước lớp 9A4",
    caption: "Ảnh 01 — Đại diện Nhóm 4 cầm mô hình DNA khung nền vàng gắn nổi hàng chữ A T G C trước lớp 9A4.",
    wide: true
  },
  {
    src: "assets/images/anh-02.jpg",
    alt: "Bốn tấm bìa màu Đỏ, Xanh dương, Vàng, Xanh lá gắn cố định trên mặt đáy carton",
    caption: "Ảnh 02 — Bốn bảng chú thích màu (Đỏ, Xanh dương, Vàng, Xanh lá) gắn dưới mặt đế mô hình."
  },
  {
    src: "assets/images/anh-03.jpg",
    alt: "Thành viên Nhóm 4 dùng súng bắn keo gắn cố định chuỗi xoắn que kem và viên đất sét trắng lên khung",
    caption: "Ảnh 03 — Dùng súng bắn keo gắn chuỗi bậc que kem và các hạt đất sét trắng vào khung."
  },
  {
    src: "assets/images/anh-04.jpg",
    alt: "Các que kem tô hai nửa màu Đỏ-Xanh dương và Xanh lá-Vàng xoắn quanh dây kẽm cạnh hộp keo nến",
    caption: "Ảnh 04 — Lắp xoắn các que kem hai nửa màu (Đỏ–Xanh dương và Xanh lá–Vàng) trên trục dây kẽm."
  },
  {
    src: "assets/images/anh-05.jpg",
    alt: "Tập thể 6 thành viên Nhóm 4 lớp 9A4 đứng trước bảng lớp cùng sản phẩm DNA hoàn thiện",
    caption: "Ảnh 05 — Tập thể 6 thành viên Nhóm 4 chụp cùng sản phẩm hoàn chỉnh tại lớp 9A4.",
    wide: true
  },
  {
    src: "assets/images/anh-06.jpg",
    alt: "Ba chữ cái D N A nặn bằng đất sét màu tự khô gắn trang trí trên nền bảng",
    caption: "Ảnh 06 — Bộ chữ D N A nặn thủ công từ đất sét tự khô tạo điểm nhấn cho mô hình."
  },
  {
    src: "assets/images/anh-07.jpg",
    alt: "Học sinh chuẩn bị bìa carton, đất sét nhiều màu và hộp súng bắn keo thực hành tại nhà",
    caption: "Ảnh 07 — Chuẩn bị thùng bìa carton, các gói đất sét màu và dụng cụ súng bắn keo."
  }
];

/* Quy ước đúng Slide 05 của Nhóm 4 */
const BASE_INFO = {
  A: { full: "Adenine", complement: "T", bonds: 2, modelColor: "Đỏ", hex: "#EF4444" },
  T: { full: "Thymine", complement: "A", bonds: 2, modelColor: "Xanh dương", hex: "#2563EB" },
  G: { full: "Guanine", complement: "C", bonds: 3, modelColor: "Xanh lá", hex: "#16A34A" },
  C: { full: "Cytosine", complement: "G", bonds: 3, modelColor: "Vàng", hex: "#EAB308" }
};

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  if (children.length) node.append(...children);
  return node;
}

const spriteCache = new Map();
function getSprite(hex) {
  if (spriteCache.has(hex)) return spriteCache.get(hex);
  const size = 120;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const gctx = c.getContext("2d");
  const r = size * 0.5 - 4;
  const grad = gctx.createRadialGradient(size * 0.36, size * 0.34, r * 0.08, size * 0.5, size * 0.5, r);
  grad.addColorStop(0, "#FFFFFF");
  grad.addColorStop(0.35, hex);
  grad.addColorStop(0.95, "#0B182E");
  gctx.beginPath();
  gctx.arc(size * 0.5, size * 0.5, r, 0, Math.PI * 2);
  gctx.fillStyle = grad;
  gctx.fill();
  spriteCache.set(hex, c);
  return c;
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderGallery();
  initHelices();
  initStructureSection();
  initPairingChallenge();
  initLightbox();
  initSlideViewer();
  initScrollReveals();
});

function initNavigation() {
  const toggleBtn = $("mobile-menu-toggle");
  const drawer = $("mobile-nav-drawer");
  if (toggleBtn && drawer) {
    const setOpen = (open) => {
      toggleBtn.setAttribute("aria-expanded", String(open));
      drawer.hidden = !open;
    };
    toggleBtn.addEventListener("click", () => setOpen(drawer.hidden));
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawer.hidden) {
        setOpen(false);
        toggleBtn.focus();
      }
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const targets = Array.from(navLinks).map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && targets.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
      });
    }, { rootMargin: "-25% 0px -60% 0px" });
    targets.forEach((sec) => obs.observe(sec));
  }
}

function renderGallery() {
  const host = $("photo-gallery");
  if (!host) return;
  host.replaceChildren(...GALLERY_ITEMS.map((item, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const btn = el("button", { type: "button", class: "photo-trigger", "data-open-lightbox": String(idx), "aria-label": `Phóng to Ảnh ${num}: ${item.caption}` }, [
      el("img", { src: item.src, alt: item.alt, loading: "lazy", decoding: "async" }),
      el("span", { class: "photo-pill", text: `Ảnh ${num}` }),
      el("span", { class: "zoom-tag", text: "Xem lớn" })
    ]);
    return el("figure", { class: `gal-item gs-reveal ${item.wide ? "gal-item--wide" : ""}`.trim() }, [
      btn,
      el("figcaption", { text: item.caption })
    ]);
  }));
}

function createHelixRenderer(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const sequence = options.sequence || ["A", "G", "T", "C", "A", "T", "G", "C", "A", "G", "C", "T"];
  const pairCount = options.pairCount ?? 12;
  const omega = options.omega ?? 0.28;
  const focal = 420;
  let width = 0;
  let height = 0;
  let t = 0;
  let lastTs = 0;
  let rafId = null;
  let isVisible = true;
  let isPlaying = options.autoPlay !== false && !REDUCED_MOTION;
  let showLabels = Boolean(options.showLabels);
  let activePair = options.activePair ?? -1;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let lastProjected = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width || canvas.parentElement?.clientWidth || 320;
    height = rect.height || canvas.parentElement?.clientHeight || 300;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;

    const N = pairCount;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const R = Math.min(width * (options.radiusRatio ?? 0.25), options.maxRadius ?? 108);
    const maxScale = focal / Math.max(focal - R, focal * 0.58);
    const spanH = ((height - 32) * 0.88) / maxScale;
    const gap = spanH / Math.max(N - 1, 1);
    const cosTilt = Math.cos((options.baseTilt ?? 0) + tiltX);
    const sinTilt = Math.sin((options.baseTilt ?? 0) + tiltX);

    // Trục dây kẽm đứng ở giữa đặc trưng mô hình Nhóm 4
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - spanH * 0.52);
    ctx.lineTo(cx, cy + spanH * 0.52);
    ctx.strokeStyle = "rgba(250, 204, 21, 0.35)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.restore();

    const s1Points = [];
    const s2Points = [];
    const queue = [];
    lastProjected = [];

    for (let i = 0; i < N; i++) {
      const theta = i * 0.54 + t * omega + tiltY * 1.2;
      const yLocal = (i - (N - 1) * 0.5) * gap;
      const x1 = R * Math.cos(theta);
      const z1 = R * Math.sin(theta);
      const x2 = -x1;
      const z2 = -z1;

      const s1 = focal / (focal + z1);
      const s2 = focal / (focal + z2);
      const p1 = { x: cx + (x1 * cosTilt - yLocal * sinTilt) * s1, y: cy + (x1 * sinTilt + yLocal * cosTilt) * s1, z: z1, s: s1 };
      const p2 = { x: cx + (x2 * cosTilt - yLocal * sinTilt) * s2, y: cy + (x2 * sinTilt + yLocal * cosTilt) * s2, z: z2, s: s2 };
      s1Points.push(p1);
      s2Points.push(p2);

      const leftCode = sequence[i % sequence.length];
      const rightCode = BASE_INFO[leftCode].complement;
      const zAvg = (z1 + z2) * 0.5;
      const selected = i === activePair;

      lastProjected.push({ index: i, leftCode, rightCode, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
      queue.push({ z: zAvg + 1, type: 0, p1, p2, leftCode, rightCode, selected });
      queue.push({ z: z1, type: 1, p: p1, code: leftCode, selected });
      queue.push({ z: z2, type: 1, p: p2, code: rightCode, selected });
    }

    const drawLine = (pts, stroke) => {
      if (pts.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.restore();
    };
    drawLine(s1Points, "rgba(248, 250, 252, 0.72)");
    drawLine(s2Points, "rgba(147, 197, 253, 0.72)");

    queue.sort((a, b) => b.z - a.z);
    const baseR = options.nodeRadius ?? 8.5;
    for (const q of queue) {
      if (q.type === 0) {
        const midX = (q.p1.x + q.p2.x) * 0.5;
        const midY = (q.p1.y + q.p2.y) * 0.5;
        const alpha = q.selected ? 1 : Math.max(0.32, Math.min(1, 0.68 - (q.z - 1) / (2 * R + 1)));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.lineCap = "round";
        ctx.lineWidth = (q.selected ? 7 : 4.2) * ((q.p1.s + q.p2.s) * 0.5);
        ctx.beginPath(); ctx.moveTo(q.p1.x, q.p1.y); ctx.lineTo(midX, midY);
        ctx.strokeStyle = BASE_INFO[q.leftCode].hex; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(midX, midY); ctx.lineTo(q.p2.x, q.p2.y);
        ctx.strokeStyle = BASE_INFO[q.rightCode].hex; ctx.stroke();
        ctx.restore();
      } else {
        const radius = baseR * q.p.s * (q.selected ? 1.24 : 1);
        const alpha = q.selected ? 1 : Math.max(0.38, Math.min(1, 0.75 - q.z / (2 * R + 1)));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(getSprite(BASE_INFO[q.code].hex), q.p.x - radius, q.p.y - radius, radius * 2, radius * 2);
        if (q.selected) {
          ctx.beginPath();
          ctx.arc(q.p.x, q.p.y, radius + 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = "#FACC15";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (showLabels && radius > 5.2) {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = `700 ${Math.max(10, Math.round(radius * 0.9))}px 'Be Vietnam Pro', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(q.code, q.p.x, q.p.y + 0.5);
        }
        ctx.restore();
      }
    }
  }

  function frame(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;
    if (isPlaying) t += dt;
    draw();
    if (isVisible) rafId = requestAnimationFrame(frame);
    else rafId = null;
  }

  function start() { if (!rafId && isVisible) { lastTs = 0; rafId = requestAnimationFrame(frame); } }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) start();
      else if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }, { threshold: 0.05 }).observe(canvas);
  }
  window.addEventListener("resize", () => { resize(); draw(); });
  resize();
  draw();
  if (isVisible) start();

  if (options.interactiveMouse) {
    const scope = options.hoverScope || canvas;
    scope.addEventListener("mousemove", (e) => {
      const r = scope.getBoundingClientRect();
      targetTiltY = ((e.clientX - r.left) / Math.max(r.width, 1) - 0.5) * 0.28;
      targetTiltX = ((e.clientY - r.top) / Math.max(r.height, 1) - 0.5) * 0.24;
    });
    scope.addEventListener("mouseleave", () => { targetTiltX = 0; targetTiltY = 0; });
  }

  return {
    setPlaying(next) { isPlaying = next; if (next) start(); },
    setShowLabels(next) { showLabels = next; draw(); },
    setActivePair(idx) { activePair = idx; draw(); },
    hitTest(cx, cy) {
      const rect = canvas.getBoundingClientRect();
      const px = cx - rect.left;
      const py = cy - rect.top;
      let best = null;
      let bestDist = 28;
      for (const p of lastProjected) {
        const dx = p.x2 - p.x1;
        const dy = p.y2 - p.y1;
        const lenSq = dx * dx + dy * dy;
        const ratio = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - p.x1) * dx + (py - p.y1) * dy) / lenSq));
        const d = Math.hypot(px - (p.x1 + ratio * dx), py - (p.y1 + ratio * dy));
        if (d < bestDist) { bestDist = d; best = p; }
      }
      return best;
    }
  };
}

function initHelices() {
  const heroCanvas = $("hero-dna-canvas");
  if (heroCanvas) {
    createHelixRenderer(heroCanvas, {
      pairCount: 16,
      omega: 0.30,
      radiusRatio: 0.27,
      maxRadius: 102,
      nodeRadius: 8.6,
      showLabels: true,
      interactiveMouse: true,
      hoverScope: $("hero")
    });
  }
  const endCanvas = $("ending-dna-canvas");
  if (endCanvas) {
    createHelixRenderer(endCanvas, { pairCount: 16, omega: 0.16, radiusRatio: 0.18, maxRadius: 128, baseTilt: 0.32 });
  }
}

function initStructureSection() {
  const canvas = $("structure-dna-canvas");
  const bar = $("pair-selector-bar");
  if (!canvas || !bar) return;

  const sequence = ["A", "T", "G", "C", "A", "G", "C", "T", "G", "A", "T", "C"];
  let activeIndex = 0;

  const renderer = createHelixRenderer(canvas, {
    sequence,
    pairCount: sequence.length,
    omega: 0.25,
    radiusRatio: 0.25,
    maxRadius: 112,
    nodeRadius: 10,
    showLabels: true,
    activePair: 0
  });

  const pills = sequence.map((leftCode, idx) => {
    const btn = el("button", { type: "button", class: "pair-pill", text: `#${idx + 1} ${leftCode}–${BASE_INFO[leftCode].complement}` });
    btn.addEventListener("click", () => selectPair(idx));
    bar.append(btn);
    return btn;
  });

  function selectPair(idx) {
    activeIndex = (idx + sequence.length) % sequence.length;
    renderer?.setActivePair(activeIndex);
    pills.forEach((b, i) => b.classList.toggle("is-active", i === activeIndex));

    const leftCode = sequence[activeIndex];
    const info = BASE_INFO[leftCode];
    const rightCode = info.complement;
    const rightInfo = BASE_INFO[rightCode];

    $("insp-idx").textContent = `#${activeIndex + 1}`;
    const bondEl = $("insp-bond-pill");
    bondEl.textContent = `${info.bonds} liên kết hydro`;
    bondEl.classList.toggle("is-triple", info.bonds === 3);

    $("insp-left-code").textContent = leftCode;
    $("insp-left-code").style.color = info.hex;
    $("insp-left-name").textContent = info.full;
    $("insp-right-code").textContent = rightCode;
    $("insp-right-code").style.color = rightInfo.hex;
    $("insp-right-name").textContent = rightInfo.full;
    $("insp-bonds-visual").innerHTML = "<span></span>".repeat(info.bonds);
    $("insp-title").textContent = `${info.full} (${leftCode}) – ${rightInfo.full} (${rightCode})`;
    $("insp-desc").textContent = info.bonds === 2
      ? `${info.full} (${leftCode}) ghép bổ sung với ${rightInfo.full} (${rightCode}) bằng 2 liên kết hydro (A = T).`
      : `${info.full} (${leftCode}) ghép bổ sung với ${rightInfo.full} (${rightCode}) bằng 3 liên kết hydro (G ≡ C).`;
    $("insp-model-color").textContent = `Nửa ${info.modelColor} (${leftCode}) – Nửa ${rightInfo.modelColor} (${rightCode})`;
  }

  canvas.addEventListener("click", (e) => {
    const hit = renderer?.hitTest(e.clientX, e.clientY);
    if (hit) selectPair(hit.index);
  });
  canvas.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); selectPair(activeIndex + 1); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); selectPair(activeIndex - 1); }
  });

  const playBtn = $("helix-play-btn");
  if (playBtn) {
    let playing = !REDUCED_MOTION;
    playBtn.setAttribute("aria-pressed", String(playing));
    playBtn.textContent = playing ? "Tạm dừng xoay" : "Tiếp tục xoay";
    playBtn.addEventListener("click", () => {
      playing = !playing;
      playBtn.setAttribute("aria-pressed", String(playing));
      playBtn.textContent = playing ? "Tạm dừng xoay" : "Tiếp tục xoay";
      renderer?.setPlaying(playing);
    });
  }

  const labelBtn = $("helix-labels-btn");
  if (labelBtn) {
    let shown = true;
    labelBtn.addEventListener("click", () => {
      shown = !shown;
      labelBtn.setAttribute("aria-pressed", String(shown));
      labelBtn.textContent = shown ? "Ẩn chữ A T G C" : "Hiện chữ A T G C";
      renderer?.setShowLabels(shown);
    });
  }

  selectPair(0);
}

function initPairingChallenge() {
  const board = $("pairing-board");
  const statusEl = $("pairing-status");
  const resetBtn = $("widget-reset-btn");
  if (!board || !statusEl || !resetBtn) return;

  const pool = ["A", "T", "G", "C"];
  let template = [];
  let answers = [];
  let cursor = 0;

  function setup() {
    template = Array.from({ length: 6 }, () => pool[Math.floor(Math.random() * pool.length)]);
    answers = Array(6).fill(null);
    cursor = 0;
    renderBoard();
    statusEl.textContent = `Chọn base bổ sung cho ô #1 (${template[0]}) đang đánh dấu:`;
  }

  function renderBoard(shakeIdx = -1) {
    board.replaceChildren(...template.map((code, idx) => {
      const col = el("div", { class: `pair-col ${idx === cursor ? "is-current" : ""} ${answers[idx] ? "is-solved" : ""} ${idx === shakeIdx ? "is-shake" : ""}`.trim() }, [
        el("span", { class: "template-chip", text: code }),
        el("span", { class: "hbond-mini", text: answers[idx] ? (BASE_INFO[code].bonds === 2 ? "=" : "≡") : "·" }),
        el("span", { class: "answer-chip", text: answers[idx] || "?" })
      ]);
      col.addEventListener("click", () => { if (!answers[idx]) { cursor = idx; renderBoard(); } });
      return col;
    }));
  }

  document.querySelectorAll(".pick-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (cursor < 0 || cursor >= 6) return;
      const pick = btn.dataset.pick;
      const expected = BASE_INFO[template[cursor]].complement;
      if (pick === expected) {
        answers[cursor] = pick;
        const nextEmpty = answers.findIndex((a) => a === null);
        cursor = nextEmpty;
        renderBoard();
        statusEl.textContent = nextEmpty === -1
          ? "Hoàn thành 6/6 cặp base đúng quy ước A=T và G≡C của Nhóm 4."
          : `Đúng. Tiếp tục chọn base bổ sung cho ô #${nextEmpty + 1} (${template[nextEmpty]}):`;
      } else {
        renderBoard(cursor);
        statusEl.textContent = `Chưa đúng: ${template[cursor]} chỉ ghép với ${expected} (A=T, G≡C).`;
      }
    });
  });

  resetBtn.addEventListener("click", setup);
  setup();
}

function initLightbox() {
  const lightbox = $("lightbox");
  const img = $("lightbox-img");
  const zoomBtn = $("lightbox-zoom-btn");
  const closeBtn = $("lightbox-close-btn");
  if (!lightbox || !img || !GALLERY_ITEMS.length) return;

  let current = 0;
  let lastTrigger = null;

  function render(idx) {
    current = (idx + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    const item = GALLERY_ITEMS[current];
    img.src = item.src;
    img.alt = item.alt;
    img.classList.remove("is-zoomed");
    zoomBtn.setAttribute("aria-pressed", "false");
    zoomBtn.textContent = "Phóng to 1.5×";
    $("lightbox-caption").textContent = item.caption;
    $("lightbox-counter").textContent = `${current + 1} / ${GALLERY_ITEMS.length}`;
  }

  function open(idx, trigger) {
    lastTrigger = trigger || document.activeElement;
    render(idx);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lastTrigger?.focus?.();
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-lightbox]");
    if (trigger) open(parseInt(trigger.dataset.openLightbox || "0", 10), trigger);
  });

  $("lightbox-backdrop")?.addEventListener("click", close);
  closeBtn.addEventListener("click", close);
  $("lightbox-prev-btn")?.addEventListener("click", () => render(current - 1));
  $("lightbox-next-btn")?.addEventListener("click", () => render(current + 1));
  zoomBtn.addEventListener("click", () => {
    const next = !img.classList.contains("is-zoomed");
    img.classList.toggle("is-zoomed", next);
    zoomBtn.setAttribute("aria-pressed", String(next));
    zoomBtn.textContent = next ? "Thu nhỏ" : "Phóng to 1.5×";
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") render(current - 1);
    else if (e.key === "ArrowRight") render(current + 1);
  });
}

function initSlideViewer() {
  const viewer = $("slide-viewer");
  const mainImg = $("slide-main-img");
  const fallback = $("slide-fallback");
  const thumbs = $("slide-thumbs");
  if (!viewer || !mainImg || !thumbs) return;

  if (EMBED_URL.trim()) {
    $("embed-host").hidden = false;
    $("slide-embed-frame").src = EMBED_URL.trim();
  }

  let current = 0;
  const total = SLIDES.length;

  const thumbBtns = SLIDES.map((s, idx) => {
    const btn = el("button", { type: "button", class: "thumb-btn", "aria-label": `Xem Slide ${idx + 1}` }, [
      el("img", { src: s.src, alt: s.title, loading: "lazy", decoding: "async" }),
      el("span", { class: "thumb-num", text: String(idx + 1).padStart(2, "0") })
    ]);
    btn.addEventListener("click", () => goTo(idx));
    thumbs.append(btn);
    return btn;
  });

  mainImg.addEventListener("load", () => { fallback.hidden = true; mainImg.hidden = false; });
  mainImg.addEventListener("error", () => {
    mainImg.hidden = true;
    fallback.hidden = false;
    $("fallback-badge").textContent = `Slide ${String(current + 1).padStart(2, "0")} / ${total}`;
    $("fallback-title").textContent = SLIDES[current].title;
    $("fallback-path").textContent = SLIDES[current].src;
  });

  function goTo(idx) {
    current = (idx + total) % total;
    const slide = SLIDES[current];
    $("slide-counter").textContent = `${current + 1} / ${total}`;
    $("slide-current-title").textContent = slide.title;
    $("slide-progress-fill").style.transform = `scaleX(${((current + 1) / total).toFixed(4)})`;
    thumbBtns.forEach((b, i) => {
      const active = i === current;
      b.classList.toggle("is-active", active);
      if (active) thumbs.scrollTo({ left: Math.max(0, b.offsetLeft - (thumbs.clientWidth - b.clientWidth) * 0.5), behavior: REDUCED_MOTION ? "auto" : "smooth" });
    });
    mainImg.src = slide.src;
    mainImg.alt = `Slide ${current + 1}: ${slide.title}`;
  }

  $("slide-prev-btn")?.addEventListener("click", () => goTo(current - 1));
  $("slide-next-btn")?.addEventListener("click", () => goTo(current + 1));

  const fsBtn = $("slide-fullscreen-btn");
  const isFs = () => document.fullscreenElement === viewer || viewer.classList.contains("is-pseudo-fullscreen");
  fsBtn?.addEventListener("click", async () => {
    if (isFs()) {
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
      viewer.classList.remove("is-pseudo-fullscreen");
      document.body.style.overflow = "";
    } else {
      try {
        if (viewer.requestFullscreen) await viewer.requestFullscreen();
        else throw new Error("no-fs");
      } catch {
        viewer.classList.add("is-pseudo-fullscreen");
        document.body.style.overflow = "hidden";
      }
    }
    fsBtn.textContent = isFs() ? "Thu nhỏ" : "Toàn màn hình";
  });

  document.addEventListener("keydown", (e) => {
    if (!$("lightbox")?.hidden) return;
    if (e.key === "ArrowLeft" && (viewer.contains(document.activeElement) || isFs())) { e.preventDefault(); goTo(current - 1); }
    else if (e.key === "ArrowRight" && (viewer.contains(document.activeElement) || isFs())) { e.preventDefault(); goTo(current + 1); }
  });

  goTo(0);
}

function initScrollReveals() {
  if (!window.gsap || !window.ScrollTrigger || REDUCED_MOTION) return;
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.utils.toArray(".gs-reveal").forEach((node) => {
    window.gsap.from(node, {
      y: 16,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: node, start: "top 90%", once: true }
    });
  });
}
