/**
 * ============================================================================
 * MÔ HÌNH CẤU TRÚC PHÂN TỬ DNA — MAIN JAVASCRIPT (KHÔNG DÙNG ES MODULE / FETCH)
 * Tương thích mở trực tiếp file:// bằng trình duyệt.
 * ============================================================================
 */

/* ============================================================================
   1. CẤU HÌNH BÀI THUYẾT TRÌNH (CHỈNH SỬA DỄ DÀNG TẠI ĐÂY)
   - Dán link Google Slides / OneDrive embed vào EMBED_URL nếu muốn nhúng trực tuyến.
   - Chỉnh số lượng / đường dẫn slide trong mảng SLIDES (tỉ lệ 16:9).
   ============================================================================ */
const EMBED_URL = "";

const SLIDES = [
  { src: "assets/slides/slide-01.jpg", title: "1. MÔ HÌNH DNA — Khám phá cấu trúc phân tử của sự sống" },
  { src: "assets/slides/slide-02.jpg", title: "2. GIỚI THIỆU DỰ ÁN" },
  { src: "assets/slides/slide-03.jpg", title: "3. CÂU HỎI KHÁM PHÁ DNA (Mẫu 1)" },
  { src: "assets/slides/slide-04.jpg", title: "4. CÂU HỎI KHÁM PHÁ DNA (Mẫu 2)" },
  { src: "assets/slides/slide-05.jpg", title: "5. CẤU TRÚC PHÂN TỬ DNA" },
  { src: "assets/slides/slide-06.jpg", title: "6. NGUYÊN LIỆU & CHẾ TẠO" },
  { src: "assets/slides/slide-07.jpg", title: "7. SẢN PHẨM HOÀN THIỆN" },
  { src: "assets/slides/slide-08.jpg", title: "8. CÂU HỎI VẬN DỤNG" }
];

/* Danh sách 7 ảnh tư liệu thực tế (5 ảnh quy trình/sản phẩm + 2 ảnh ghi chép thiết kế) */
const GALLERY_ITEMS = [
  {
    src: "assets/images/anh-01.jpg",
    alt: "Bộ bút lông nhiều màu, que gỗ, thanh xốp trắng, cọ vẽ và màu dùng chuẩn bị làm mô hình DNA",
    caption: "Ảnh 01 — Tập hợp bút lông màu, que gỗ, thanh xốp trắng, cọ và màu vẽ."
  },
  {
    src: "assets/images/anh-02.jpg",
    alt: "Hai học sinh đang sơn phủ mặt trong khung hộp carton tái chế và tô màu que gỗ bằng cọ vẽ",
    caption: "Ảnh 02 — Gia công khung hộp carton tái chế và tô màu chi tiết."
  },
  {
    src: "assets/images/anh-03.jpg",
    alt: "Tay học sinh cầm bút lông màu xanh lá tô lên que gỗ để phân biệt màu các cặp base",
    caption: "Ảnh 03 — Tô màu phân biệt que gỗ bằng bút lông acrylic."
  },
  {
    src: "assets/images/anh-04.jpg",
    alt: "Khung hộp carton phủ trắng mặt trong đặt cạnh bộ màu Water Color và các túi đất sét khô màu trắng",
    caption: "Ảnh 04 — Khung hộp carton phủ trắng, bộ màu nước và đất sét khô trắng."
  },
  {
    src: "assets/images/anh-05.jpg",
    alt: "Nhóm 2 lớp 9A4 trình bày mô hình cấu trúc phân tử DNA hoàn chỉnh trước màn hình STEM",
    caption: "Ảnh 05 — Nhóm 2 trình bày mô hình DNA hoàn chỉnh trước lớp 9A4."
  },
  {
    src: "assets/images/anh-06.jpg",
    alt: "Trang ghi chép viết tay của Nhóm 2 về ý tưởng thiết kế, vật liệu sử dụng và bảng quy ước màu sắc",
    caption: "Ảnh 06 — Ghi chép thiết kế trang 1: Ý tưởng, vật liệu và quy ước màu base (A Đỏ, T Vàng, G Xanh biển, C Xanh lá)."
  },
  {
    src: "assets/images/anh-07.jpg",
    alt: "Trang ghi chép viết tay của Nhóm 2 về cách tạo hình hai mạch khung và góc xoắn 30 đến 36 độ",
    caption: "Ảnh 07 — Ghi chép thiết kế trang 2: Uốn hai dải mạch carton (1–1,5 cm) và xoay bậc 30°–36° theo chiều xoắn phải."
  }
];

const BASE_INFO = {
  A: { full: "Adenine", complement: "T", bonds: 2, modelColor: "Đỏ", group: "Purine (lớn)" },
  T: { full: "Thymine", complement: "A", bonds: 2, modelColor: "Vàng", group: "Pyrimidine (nhỏ)" },
  G: { full: "Guanine", complement: "C", bonds: 3, modelColor: "Xanh dương", group: "Purine (lớn)" },
  C: { full: "Cytosine", complement: "G", bonds: 3, modelColor: "Xanh lá", group: "Pyrimidine (nhỏ)" }
};

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Tiện ích debounce dùng cho sự kiện resize */
function debounce(fn, delay = 150) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ============================================================================
   2. KHỞI CHẠY KHI DOM SẴN SÀNG
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHeroAndEndingHelices();
  initStructureSection();
  initPairingChallenge();
  initLightbox();
  initSlideViewer();
  initScrollAnimations();
});

/* ============================================================================
   3. THANH ĐIỀU HƯỚNG CỐ ĐỊNH, MENU DI ĐỘNG & SCROLLSPY
   ============================================================================ */
function initNavigation() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
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
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const hash = `#${entry.target.id}`;
          navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === hash));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    targets.forEach((sec) => spy.observe(sec));
  }
}

/* ============================================================================
   4. HÀM VẼ HELIX CANVAS 2D GIẢ 3D THAM SỐ HÓA (MỤC 8.1 — DÙNG LẠI CHO HERO, CẤU TRÚC, KẾT)
   - Cặp i: θ = i*0.42 + t*ω (ω = 0.25 rad/s), x = R*cosθ, z = R*sinθ
   - Phối cảnh: scale = f / (f + z); sắp xếp z giảm dần (xa trước, gần sau)
   ============================================================================ */
function createHelixRenderer(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const sequence = options.sequence || ["A", "G", "T", "C", "A", "G", "C", "T", "G", "A", "T", "C"];
  const omega = options.omega ?? 0.25; // rad/s
  const focal = options.focal ?? 420;
  const maxTiltRad = (8 * Math.PI) / 180; // Tối đa ±8°

  let width = 0;
  let height = 0;
  let dpr = 1;
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
  let lastProjectedPairs = [];

  function getPairCount() {
    if (typeof options.pairCount === "number") return options.pairCount;
    return window.innerWidth < 768 ? 20 : 32;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width || canvas.parentElement?.clientWidth || 320;
    height = rect.height || canvas.parentElement?.clientHeight || 360;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Mượt hóa góc nghiêng parallax ±8°
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;

    const N = getPairCount();
    const isDesktopHero = options.layout === "hero" && width >= 900;
    const cx = isDesktopHero ? width * 0.72 : width * 0.5;
    const cy = height * 0.5;
    const spanH = height * (options.heightRatio ?? 0.84);
    const gap = spanH / Math.max(N - 1, 1);
    const R = Math.min(width * (options.radiusRatio ?? 0.16), options.maxRadius ?? 135);
    const baseTilt = options.baseTilt ?? (isDesktopHero ? -0.18 : 0);

    const cosTilt = Math.cos(baseTilt + tiltX);
    const sinTilt = Math.sin(baseTilt + tiltX);

    const s1Points = [];
    const s2Points = [];
    const items = [];
    lastProjectedPairs = [];

    for (let i = 0; i < N; i++) {
      const theta = i * 0.42 + t * omega + tiltY * 1.4;
      const yLocal = (i - (N - 1) * 0.5) * gap;

      const x1Raw = R * Math.cos(theta);
      const z1 = R * Math.sin(theta);
      const x2Raw = -x1Raw;
      const z2 = -z1;

      // Xoay nhẹ toàn trục theo parallax / góc nghiêng
      const x1Tilt = x1Raw * cosTilt - yLocal * sinTilt;
      const y1Tilt = x1Raw * sinTilt + yLocal * cosTilt;
      const x2Tilt = x2Raw * cosTilt - yLocal * sinTilt;
      const y2Tilt = x2Raw * sinTilt + yLocal * cosTilt;

      const s1 = focal / (focal + z1);
      const s2 = focal / (focal + z2);

      const p1 = { x: cx + x1Tilt * s1, y: cy + y1Tilt * s1, z: z1, s: s1 };
      const p2 = { x: cx + x2Tilt * s2, y: cy + y2Tilt * s2, z: z2, s: s2 };
      s1Points.push(p1);
      s2Points.push(p2);

      const leftCode = sequence[i % sequence.length];
      const rightCode = BASE_INFO[leftCode].complement;
      const zAvg = (z1 + z2) * 0.5;
      const isSelected = i === activePair;

      lastProjectedPairs.push({
        index: i,
        leftCode,
        rightCode,
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        midX: (p1.x + p2.x) * 0.5,
        midY: (p1.y + p2.y) * 0.5
      });

      // Thanh ngang nối hai base (gradient cyan -> violet)
      items.push({
        z: zAvg + 1,
        render: () => {
          const depthNorm = Math.max(0.22, Math.min(1, 0.62 - zAvg / (2 * R + 1)));
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, "#28D7F2");
          grad.addColorStop(1, "#815CF5");

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isSelected ? 6 : 2.6 * ((p1.s + p2.s) * 0.5);
          ctx.globalAlpha = isSelected ? 1 : depthNorm * 0.85;
          if (isSelected) {
            ctx.shadowColor = "#28D7F2";
            ctx.shadowBlur = 16;
          }
          ctx.stroke();

          // Chấm nhỏ biểu diễn số liên kết hydro khi cặp được chọn hoặc đang tương tác
          if (isSelected) {
            const bonds = BASE_INFO[leftCode].bonds;
            const mx = (p1.x + p2.x) * 0.5;
            const my = (p1.y + p2.y) * 0.5;
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const step = 9;
            for (let b = 0; b < bonds; b++) {
              const offset = (b - (bonds - 1) * 0.5) * step;
              ctx.beginPath();
              ctx.arc(mx + ux * offset, my + uy * offset, 3, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.fill();
            }
          }
          ctx.restore();
        }
      });

      // Hai nút nucleotide trên hai mạch
      items.push({
        z: z1,
        render: () => drawNode(p1, "#28D7F2", leftCode, isSelected, showLabels, R)
      });
      items.push({
        z: z2,
        render: () => drawNode(p2, "#815CF5", rightCode, isSelected, showLabels, R)
      });
    }

    // Đường backbone nối các nút liên tiếp của từng mạch (vẽ phía sau nhẹ nhàng)
    drawBackbone(s1Points, "rgba(40, 215, 242, 0.42)");
    drawBackbone(s2Points, "rgba(129, 92, 245, 0.42)");

    // Sắp xếp theo z giảm dần: xa vẽ trước, gần vẽ sau
    items.sort((a, b) => b.z - a.z);
    for (const item of items) item.render();
  }

  function drawBackbone(points, color) {
    if (points.length < 2) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.restore();
  }

  function drawNode(p, color, label, isSelected, showLabelText, R) {
    const depthAlpha = Math.max(0.28, Math.min(1, 0.68 - p.z / (2 * R + 1)));
    const radius = (options.nodeRadius ?? 6.2) * p.s * (isSelected ? 1.28 : 1);

    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = isSelected ? 1 : depthAlpha;
    if (p.z < 0 || isSelected) {
      ctx.shadowColor = color;
      ctx.shadowBlur = isSelected ? 18 : 10;
    }
    ctx.fill();

    if (isSelected) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();
    }

    if (showLabelText && radius > 5.5) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = color === "#28D7F2" ? "#071426" : "#FFFFFF";
      ctx.font = `700 ${Math.max(10, Math.round(radius * 0.95))}px 'Be Vietnam Pro', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, p.x, p.y + 0.5);
    }
    ctx.restore();
  }

  function frame(ts) {
    if (!isVisible || document.hidden) {
      rafId = null;
      return;
    }
    if (lastTs) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      if (isPlaying) t += dt;
    }
    lastTs = ts;
    draw();
    if (isPlaying || Math.abs(targetTiltX - tiltX) > 0.001 || Math.abs(targetTiltY - tiltY) > 0.001) {
      rafId = requestAnimationFrame(frame);
    } else {
      rafId = null;
    }
  }

  function ensureLoop() {
    if (!rafId && isVisible && !document.hidden && !REDUCED_MOTION) {
      lastTs = 0;
      rafId = requestAnimationFrame(frame);
    }
  }

  // Theo dõi hiển thị trong viewport & chuyển tab
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        draw();
        ensureLoop();
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, { threshold: 0.05 });
    obs.observe(canvas);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && isVisible) {
      ensureLoop();
    }
  });

  // Parallax chuột / gyro tối đa ±8°
  if (options.parallaxTarget && !REDUCED_MOTION) {
    options.parallaxTarget.addEventListener("pointermove", (e) => {
      const rect = options.parallaxTarget.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      targetTiltY = Math.max(-1, Math.min(1, nx)) * maxTiltRad;
      targetTiltX = Math.max(-1, Math.min(1, ny)) * maxTiltRad;
      ensureLoop();
    });
    options.parallaxTarget.addEventListener("pointerleave", () => {
      targetTiltX = 0;
      targetTiltY = 0;
    });
  }

  window.addEventListener("resize", debounce(() => {
    resize();
    draw();
  }, 140));

  resize();
  draw();
  if (!REDUCED_MOTION && isPlaying) ensureLoop();

  return {
    setPlaying(val) {
      isPlaying = Boolean(val) && !REDUCED_MOTION;
      draw();
      if (isPlaying) ensureLoop();
    },
    isPlaying() { return isPlaying; },
    setShowLabels(val) {
      showLabels = Boolean(val);
      draw();
    },
    setActivePair(idx) {
      activePair = idx;
      draw();
    },
    hitTest(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      let best = null;
      let bestDist = 34;
      for (const p of lastProjectedPairs) {
        const d = pointToSegDist(px, py, p.x1, p.y1, p.x2, p.y2);
        if (d < bestDist) {
          bestDist = d;
          best = p;
        }
      }
      return best;
    },
    getPairs() { return lastProjectedPairs; }
  };
}

function pointToSegDist(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function initHeroAndEndingHelices() {
  const heroCanvas = document.getElementById("hero-dna-canvas");
  if (heroCanvas) {
    createHelixRenderer(heroCanvas, {
      layout: "hero",
      omega: 0.25,
      parallaxTarget: document.getElementById("hero")
    });
  }

  const endCanvas = document.getElementById("ending-dna-canvas");
  if (endCanvas) {
    createHelixRenderer(endCanvas, {
      pairCount: 22,
      omega: 0.16,
      radiusRatio: 0.18,
      maxRadius: 150,
      baseTilt: 0.28
    });
  }
}

/* ============================================================================
   5. SECTION 4: HELIX TƯƠNG TÁC + NÚT XOAY/DỪNG & HIỆN/ẨN TÊN BASE
   ============================================================================ */
function initStructureSection() {
  const canvas = document.getElementById("structure-dna-canvas");
  const playBtn = document.getElementById("helix-play-btn");
  const labelsBtn = document.getElementById("helix-labels-btn");
  const pillBar = document.getElementById("pair-selector-bar");
  if (!canvas || !pillBar) return;

  const sequence = ["A", "G", "T", "C", "A", "G", "C", "T", "A", "G", "T", "C"];
  let activeIndex = 0;

  const renderer = createHelixRenderer(canvas, {
    sequence,
    pairCount: sequence.length,
    omega: 0.22,
    radiusRatio: 0.24,
    maxRadius: 118,
    heightRatio: 0.84,
    nodeRadius: 11,
    showLabels: true,
    activePair: 0,
    autoPlay: true
  });

  // Tạo thanh nút chọn từng cặp base bằng bàn phím
  const pills = sequence.map((leftCode, idx) => {
    const rightCode = BASE_INFO[leftCode].complement;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pair-pill";
    btn.textContent = `#${idx + 1} ${leftCode}–${rightCode}`;
    btn.addEventListener("click", () => selectPair(idx));
    pillBar.appendChild(btn);
    return btn;
  });

  function selectPair(idx) {
    activeIndex = (idx + sequence.length) % sequence.length;
    renderer?.setActivePair(activeIndex);
    pills.forEach((p, i) => p.classList.toggle("is-active", i === activeIndex));

    const leftCode = sequence[activeIndex];
    const info = BASE_INFO[leftCode];
    const rightCode = info.complement;
    const rightInfo = BASE_INFO[rightCode];

    document.getElementById("insp-idx").textContent = `#${activeIndex + 1}`;
    const pill = document.getElementById("insp-bond-pill");
    pill.textContent = `${info.bonds} liên kết hydro`;
    pill.classList.toggle("bond-pill--teal", info.bonds === 3);

    document.getElementById("insp-left-code").textContent = leftCode;
    document.getElementById("insp-left-name").textContent = info.full;
    document.getElementById("insp-right-code").textContent = rightCode;
    document.getElementById("insp-right-name").textContent = rightInfo.full;
    document.getElementById("insp-bonds-visual").innerHTML = Array.from({ length: info.bonds }, () => "<span></span>").join("");
    document.getElementById("insp-title").textContent = `${info.full} (${leftCode}) – ${rightInfo.full} (${rightCode})`;

    document.getElementById("insp-desc").innerHTML = info.bonds === 2
      ? `${info.full} (${leftCode}) bắt cặp đặc hiệu với ${rightInfo.full} (${rightCode}) bằng <strong>2 liên kết hydro (A = T)</strong>, giữ đường kính chuỗi xoắn luôn ổn định (2 nm).`
      : `${info.full} (${leftCode}) bắt cặp đặc hiệu với ${rightInfo.full} (${rightCode}) bằng <strong>3 liên kết hydro (G ≡ C)</strong> — bền vững hơn cặp A–T nhờ thêm 1 liên kết hydro.`;

    document.getElementById("insp-model-color").textContent =
      `Nửa ${info.modelColor} (${leftCode}) – Nửa ${rightInfo.modelColor} (${rightCode})`;
  }

  // Rê chuột / chạm vào canvas để làm sáng cặp base gần nhất
  const handlePointer = (e) => {
    const hit = renderer?.hitTest(e.clientX, e.clientY);
    if (hit) selectPair(hit.index);
  };
  canvas.addEventListener("pointermove", handlePointer);
  canvas.addEventListener("click", handlePointer);
  canvas.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      selectPair(activeIndex + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      selectPair(activeIndex - 1);
    }
  });

  if (playBtn) {
    if (REDUCED_MOTION) {
      playBtn.setAttribute("aria-pressed", "false");
      playBtn.querySelector("span").textContent = "Xoay";
    }
    playBtn.addEventListener("click", () => {
      const next = playBtn.getAttribute("aria-pressed") !== "true";
      renderer?.setPlaying(next);
      playBtn.setAttribute("aria-pressed", String(next));
      playBtn.querySelector("span").textContent = next ? "Dừng xoay" : "Xoay";
    });
  }

  if (labelsBtn) {
    labelsBtn.addEventListener("click", () => {
      const next = labelsBtn.getAttribute("aria-pressed") !== "true";
      renderer?.setShowLabels(next);
      labelsBtn.setAttribute("aria-pressed", String(next));
      labelsBtn.querySelector("span").textContent = next ? "Ẩn tên base" : "Hiện tên base";
    });
  }

  selectPair(0);
}

/* ============================================================================
   6. WIDGET "THỬ THÁCH GHÉP CẶP" (MỤC 8.2)
   ============================================================================ */
function initPairingChallenge() {
  const board = document.getElementById("pairing-board");
  const statusEl = document.getElementById("pairing-status");
  const resetBtn = document.getElementById("widget-reset-btn");
  const pickBtns = document.querySelectorAll(".base-pick-btn");
  if (!board || !statusEl || !resetBtn) return;

  const pool = ["A", "T", "G", "C"];
  let template = [];
  let currentSlot = 0;

  function renderBoard() {
    board.innerHTML = "";
    template.forEach((base, idx) => {
      const col = document.createElement("div");
      col.className = "pair-col";
      if (idx === currentSlot) col.classList.add("is-current");

      const topChip = document.createElement("div");
      topChip.className = "template-chip";
      topChip.textContent = base;

      const bond = document.createElement("div");
      bond.className = "hbond-mini";
      bond.textContent = "·";

      const ans = document.createElement("div");
      ans.className = "answer-chip";
      ans.textContent = "?";

      col.append(topChip, bond, ans);
      board.appendChild(col);
    });
  }

  function startChallenge() {
    template = Array.from({ length: 6 }, () => pool[Math.floor(Math.random() * pool.length)]);
    currentSlot = 0;
    renderBoard();
    statusEl.textContent = "Chọn base bổ sung cho vị trí #1 đang sáng viền:";
  }

  function handlePick(choice) {
    if (currentSlot >= template.length) return;
    const expected = BASE_INFO[template[currentSlot]].complement;
    const cols = board.querySelectorAll(".pair-col");
    const activeCol = cols[currentSlot];

    if (choice === expected) {
      activeCol.classList.remove("is-current", "is-shake");
      activeCol.classList.add("is-solved");
      const bonds = BASE_INFO[template[currentSlot]].bonds;
      activeCol.querySelector(".hbond-mini").textContent = bonds === 2 ? "= 2H" : "≡ 3H";
      activeCol.querySelector(".answer-chip").textContent = choice;
      currentSlot += 1;

      if (currentSlot < template.length) {
        cols[currentSlot].classList.add("is-current");
        statusEl.textContent = `Chính xác! Tiếp tục chọn cho vị trí #${currentSlot + 1}:`;
      } else {
        statusEl.textContent = "Hoàn thành 6/6 cặp! Bạn đã nắm vững nguyên tắc bổ sung (A=T, G≡C).";
      }
    } else {
      activeCol.classList.remove("is-shake");
      void activeCol.offsetWidth;
      activeCol.classList.add("is-shake");
      statusEl.textContent = `Chưa khớp với ${template[currentSlot]}! Hãy nhớ: A đi với T, G đi với C.`;
    }
  }

  pickBtns.forEach((btn) => {
    btn.addEventListener("click", () => handlePick(btn.dataset.pick));
  });
  document.getElementById("pairing-widget")?.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (["A", "T", "G", "C"].includes(key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handlePick(key);
    }
  });
  resetBtn.addEventListener("click", startChallenge);

  startChallenge();
}

/* ============================================================================
   7. LIGHTBOX CÓ FOCUS TRAP, ESC, MŨI TÊN & VUỐT MOBILE (POINTER EVENTS)
   ============================================================================ */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const dialog = document.getElementById("lightbox-dialog");
  const backdrop = document.getElementById("lightbox-backdrop");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const counter = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");
  const zoomBtn = document.getElementById("lightbox-zoom-btn");
  const stage = document.getElementById("lightbox-stage");
  if (!lightbox || !dialog || !img) return;

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
    caption.textContent = item.caption;
    counter.textContent = `${current + 1} / ${GALLERY_ITEMS.length}`;
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

  document.querySelectorAll("#photo-gallery .photo-card .photo-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      open(Number(btn.closest(".photo-card")?.dataset.index || 0), btn);
    });
  });

  document.querySelectorAll("[data-open-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => open(Number(btn.dataset.openLightbox || 0), btn));
  });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  prevBtn.addEventListener("click", () => render(current - 1));
  nextBtn.addEventListener("click", () => render(current + 1));

  zoomBtn.addEventListener("click", () => {
    const zoomed = img.classList.toggle("is-zoomed");
    zoomBtn.setAttribute("aria-pressed", String(zoomed));
    zoomBtn.textContent = zoomed ? "Thu gọn 1×" : "Phóng to 1.5×";
  });

  // Focus trap & điều khiển bàn phím khi Lightbox đang mở
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      render(current - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      render(current + 1);
    } else if (e.key === "Tab") {
      const focusables = Array.from(dialog.querySelectorAll("button:not([disabled])"));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Vuốt chuyển ảnh bằng Pointer Events
  let startX = 0;
  let startY = 0;
  stage.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener("pointerup", (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      render(dx < 0 ? current + 1 : current - 1);
    }
  });
}

/* ============================================================================
   8. TRÌNH XEM POWERPOINT (PRELOAD, HASH #slide-N, POINTER SWIPE, FULLSCREEN)
   ============================================================================ */
function initSlideViewer() {
  const viewer = document.getElementById("slide-viewer");
  const mainImg = document.getElementById("slide-main-img");
  const fallback = document.getElementById("slide-fallback");
  const fbBadge = document.getElementById("fallback-badge");
  const fbTitle = document.getElementById("fallback-title");
  const fbPath = document.getElementById("fallback-path");
  const counter = document.getElementById("slide-counter");
  const titleEl = document.getElementById("slide-current-title");
  const progress = document.getElementById("slide-progress-fill");
  const thumbs = document.getElementById("slide-thumbs");
  const prevBtn = document.getElementById("slide-prev-btn");
  const nextBtn = document.getElementById("slide-next-btn");
  const fsBtn = document.getElementById("slide-fullscreen-btn");
  const viewport = document.getElementById("slide-viewport");
  const embedHost = document.getElementById("embed-host");
  const embedFrame = document.getElementById("slide-embed-frame");

  // Nếu có EMBED_URL, thay thế viewer bằng iframe nhúng
  if (EMBED_URL && EMBED_URL.trim() !== "" && embedHost && embedFrame && viewer) {
    embedFrame.src = EMBED_URL.trim();
    embedHost.hidden = false;
    viewer.hidden = true;
    return;
  }

  if (!viewer || !mainImg || !thumbs || !SLIDES.length) return;

  const total = SLIDES.length;
  let current = 0;

  // Đọc deep link #slide-3 khi tải trang
  function readSlideFromHash() {
    const match = window.location.hash.match(/^#slide-(\d+)$/i);
    if (!match) return 0;
    const n = Number(match[1]);
    return n >= 1 && n <= total ? n - 1 : 0;
  }

  // Tạo dải thumbnail động theo mảng SLIDES
  const thumbBtns = SLIDES.map((slide, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumb-btn";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `Xem Slide ${idx + 1}: ${slide.title}`);

    const img = document.createElement("img");
    img.src = slide.src;
    img.alt = `Thu nhỏ Slide ${idx + 1}`;
    img.loading = "lazy";
    img.decoding = "async";

    const num = document.createElement("span");
    num.className = "thumb-num";
    num.textContent = String(idx + 1).padStart(2, "0");

    img.addEventListener("error", () => {
      img.remove();
      num.hidden = true;
      const box = document.createElement("div");
      box.className = "thumb-fallback";
      box.textContent = `Slide ${String(idx + 1).padStart(2, "0")}`;
      btn.prepend(box);
    });

    btn.append(img, num);
    btn.addEventListener("click", () => goTo(idx));
    thumbs.appendChild(btn);
    return btn;
  });

  function preloadNext(idx) {
    const nextIdx = (idx + 1) % total;
    const pre = new Image();
    pre.src = SLIDES[nextIdx].src;
  }

  function showImage() {
    viewport.classList.remove("has-fallback");
    fallback.hidden = true;
    mainImg.hidden = false;
    mainImg.classList.remove("is-animating");
    void mainImg.offsetWidth;
    mainImg.classList.add("is-animating");
  }

  function showFallback(slide, idx) {
    viewport.classList.add("has-fallback");
    mainImg.hidden = true;
    fallback.hidden = false;
    fbBadge.textContent = `Slide ${String(idx + 1).padStart(2, "0")} / ${total}`;
    fbTitle.textContent = slide.title;
    fbPath.textContent = slide.src;
  }

  mainImg.addEventListener("load", showImage);
  mainImg.addEventListener("error", () => showFallback(SLIDES[current], current));

  function goTo(idx, opts = { scrollThumb: true, updateHash: true }) {
    current = (idx + total) % total;
    const slide = SLIDES[current];

    counter.textContent = `${current + 1} / ${total}`;
    titleEl.textContent = slide.title;
    progress.style.transform = `scaleX(${((current + 1) / total).toFixed(4)})`;

    thumbBtns.forEach((b, i) => {
      const active = i === current;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-current", active ? "true" : "false");
      if (active && opts.scrollThumb) {
        const left = b.offsetLeft - (thumbs.clientWidth - b.clientWidth) * 0.5;
        thumbs.scrollTo({ left: Math.max(0, left), behavior: REDUCED_MOTION ? "auto" : "smooth" });
      }
    });

    if (opts.updateHash && window.history?.replaceState) {
      window.history.replaceState(null, "", `#slide-${current + 1}`);
    }

    mainImg.alt = `Slide ${current + 1}: ${slide.title}`;
    if (mainImg.getAttribute("src") === slide.src) {
      if (mainImg.complete) {
        if (mainImg.naturalWidth > 0) showImage();
        else showFallback(slide, current);
      }
    } else {
      mainImg.src = slide.src;
    }
    preloadNext(current);
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  // Phím tắt ← → Home End
  const presentationSec = document.getElementById("presentation");
  let secInView = false;
  if ("IntersectionObserver" in window && presentationSec) {
    new IntersectionObserver((entries) => {
      secInView = entries[0].isIntersecting;
    }, { threshold: 0.35 }).observe(presentationSec);
  }

  const isFs = () => document.fullscreenElement === viewer || viewer.classList.contains("is-pseudo-fullscreen");
  const syncFsLabel = () => {
    const span = fsBtn.querySelector("span");
    if (span) span.textContent = isFs() ? "Thoát toàn màn hình" : "Toàn màn hình";
  };

  fsBtn.addEventListener("click", async () => {
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
    syncFsLabel();
  });
  document.addEventListener("fullscreenchange", syncFsLabel);

  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox");
    if (lb && !lb.hidden) return;
    if (e.key === "Escape" && viewer.classList.contains("is-pseudo-fullscreen")) {
      viewer.classList.remove("is-pseudo-fullscreen");
      document.body.style.overflow = "";
      syncFsLabel();
      return;
    }
    if (!(viewer.contains(document.activeElement) || isFs() || secInView)) return;

    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
    else if (e.key === "Home") { e.preventDefault(); goTo(0); }
    else if (e.key === "End") { e.preventDefault(); goTo(total - 1); }
  });

  // Vuốt trên mobile bằng Pointer Events
  let pX = 0;
  let pY = 0;
  viewport.addEventListener("pointerdown", (e) => { pX = e.clientX; pY = e.clientY; });
  viewport.addEventListener("pointerup", (e) => {
    const dx = e.clientX - pX;
    const dy = e.clientY - pY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      goTo(dx < 0 ? current + 1 : current - 1);
    }
  });

  window.addEventListener("hashchange", () => {
    if (/^#slide-\d+$/i.test(window.location.hash)) {
      goTo(readSlideFromHash(), { scrollThumb: true, updateHash: false });
    }
  });

  const initialIdx = readSlideFromHash();
  const hasSlideHash = /^#slide-\d+$/i.test(window.location.hash);
  goTo(initialIdx, { scrollThumb: false, updateHash: hasSlideHash });
  if (hasSlideHash && presentationSec) {
    requestAnimationFrame(() => {
      presentationSec.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth" });
    });
  }
}

/* ============================================================================
   9. GSAP SCROLLTRIGGER + ĐƯỜNG SÓNG DNA MÉP PHẢI + TIMELINE ZIGZAG
   ============================================================================ */
function initScrollAnimations() {
  const cyanRail = document.getElementById("dna-rail-cyan");
  const violetRail = document.getElementById("dna-rail-violet");
  const railPct = document.getElementById("scroll-rail-pct");
  const zigProgress = document.getElementById("zigzag-progress");
  const timeline = document.getElementById("zigzag-timeline");

  // Chuẩn bị stroke-dashoffset cho đường sóng DNA chữ ký (Mục 8.4)
  const railPaths = [cyanRail, violetRail].filter(Boolean);
  const railLengths = railPaths.map((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
    return len;
  });

  function updateScrollDecor() {
    const doc = document.documentElement;
    const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const ratio = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    railPaths.forEach((p, i) => {
      p.style.strokeDashoffset = `${railLengths[i] * (1 - ratio)}`;
    });
    if (railPct) railPct.textContent = `${Math.round(ratio * 100)}%`;

    if (timeline && zigProgress) {
      const rect = timeline.getBoundingClientRect();
      const mid = window.innerHeight * 0.62;
      const ratioTimeline = Math.max(0, Math.min(1, (mid - rect.top) / Math.max(rect.height, 1)));
      zigProgress.style.transform = `scaleY(${ratioTimeline.toFixed(4)})`;
    }
  }

  // Dùng GSAP + ScrollTrigger khi khả dụng và người dùng không giảm chuyển động
  if (window.gsap && window.ScrollTrigger && !REDUCED_MOTION) {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal fade-up nhẹ nhàng cho từng khối
    gsap.utils.toArray(".gs-reveal").forEach((el) => {
      gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.52,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        }
      });
    });

    // Thanh tiến trình đường sóng DNA & timeline zigzag đồng bộ ScrollTrigger
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        railPaths.forEach((path, i) => {
          path.style.strokeDashoffset = `${railLengths[i] * (1 - p)}`;
        });
        if (railPct) railPct.textContent = `${Math.round(p * 100)}%`;
      }
    });

    if (timeline && zigProgress) {
      gsap.to(zigProgress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 65%",
          end: "bottom 60%",
          scrub: true
        }
      });
    }
  } else {
    // Fallback an toàn (khi chạy offline không tải được CDN hoặc prefers-reduced-motion)
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          updateScrollDecor();
        });
      }
    }, { passive: true });
    updateScrollDecor();
  }
}
