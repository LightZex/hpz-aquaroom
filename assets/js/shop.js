/* HPZ Aquaroom - catalogue: search, category filters and pagination */
(function () {
  const grid = document.getElementById('fish-grid');
  const search = document.getElementById('fish-search');
  const pager = document.getElementById('pager');
  if (!grid || typeof FISH === 'undefined') return;

  const PER = 50;
  const CATEGORIES = [
    { id: 'all', label: 'Tất cả' },
    { id: 'stream', label: 'Cá Suối' },
    { id: 'discus', label: 'Cá Đĩa' },
    { id: 'angelfish', label: 'Cá Thần Tiên' },
    { id: 'goldfish', label: 'Cá Vàng' },
    { id: 'planted', label: 'Cá Thuỷ Sinh' },
    { id: 'tetra', label: 'Cá Tetra' },
    { id: 'bottom', label: 'Cá Tầng Đáy' }
  ];

  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (/checkered bard|checked bard|dicrossus/.test(key)) {
      f.vn = 'Cá Diếc Bàn cờ';
      if (!f.en || /checked bard|checkered bard/i.test(f.en)) f.en = 'Dicrossus filamentosus';
      f.img = 'checkered_bard.jpg';
      f.src = 'assets/img/checkered_bard.jpg';
      f.gallery = ['assets/img/checkered_bard.jpg'];
    }
  });

  function textOf(f) {
    return `${f.vn || ''} ${f.en || ''} ${f.desc || ''}`.toLowerCase();
  }

  function systemOf(f) {
    const t = textOf(f);
    if (/longfin 24k|shortfin 24k|cá longfin 24k|cá shortfin 24k/.test(t)) return 'bottom';
    if (/paraiba|cá thần tiên paraiba/.test(t)) return 'angelfish';
    if (/thần tiên|angelfish|pterophyllum|altum|dantum|pinoy|isabel|blue ghost/.test(t)) return 'angelfish';
    if (/whitefin tetra|flame tetra|congo|cánh cụt|penguin tetra|paracheirodon|hyphessobrycon|thayeria|phenacogrammus/.test(t)) return 'tetra';
    if (/cá đĩa|đĩa tiger|đĩa bông|đĩa beo|đĩa hoa|đĩa ngũ|đĩa chỉ|đĩa valentine|đĩa xanh|đĩa bồ|đĩa panda|đĩa đỏ|đĩa red|discus|symphysodon|bạch ngọc|beo tuyết|hồng nhung vây dài|red devil|red ab/.test(t)) return 'discus';
    if (/cá chuột|corydoras|pleco|lau kiếng|tỳ bà|bống|goby|botia|cá bám|optimus prime/.test(t)) return 'bottom';
    if (/cá vàng|goldfish|ryukin/.test(t)) return 'goldfish';
    if (/tetra/.test(t)) return 'tetra';
    if (/mương|zacco|opsariichthys|cá suối|hmbd|tambra|fila|hồng my bóng đêm|hồng mi bóng đêm/.test(t)) return 'stream';
    return 'planted';
  }

  FISH.forEach(function (f) { f.system = systemOf(f); });

  let activeSystem = 'all';
  let filtered = FISH.slice();
  let page = 1;
  const vnd = function (n) { return typeof n === 'string' ? n : Number(n || 0).toLocaleString('vi-VN') + '₫'; };
  const label = function (id) { const c = CATEGORIES.find(function (x) { return x.id === id; }); return c ? c.label : 'Cá cảnh'; };

  const style = document.createElement('style');
  style.textContent = '.fish-system-filter{width:100%;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)}.fish-system-filter__label{display:block;color:var(--cyan);font-size:.9rem;font-weight:800;letter-spacing:.04em;margin-bottom:9px}.fish-system-filter__buttons{display:flex;gap:8px;flex-wrap:wrap}.fish-system-filter button{font:inherit;font-weight:700;color:var(--ink);background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:8px 13px;cursor:pointer}.fish-system-filter button.is-active{color:#04121d;background:linear-gradient(90deg,var(--cyan),var(--accent));border-color:transparent}.fish-system-tag{display:inline-block;margin-top:9px;padding:3px 9px;border:1px solid var(--border);border-radius:999px;color:var(--cyan);font-size:.76rem;font-weight:800}';
  document.head.appendChild(style);

  function cardHTML(f) {
    const styleAttr = f.filter ? ` style="filter:${f.filter}"` : '';
    return `<a class="card" href="fish.html?fish=${encodeURIComponent(f.en)}"><div class="ph"><img class="fish-sprite${f.photo ? ' photo' : ''}" src="${f.src}" alt="${f.vn}" loading="lazy"${styleAttr}></div><div class="body"><div class="vn">${f.vn}</div><div class="en">${f.en}</div><div class="price">${vnd(f.price)}</div><div class="fish-system-tag">${label(f.system)}</div></div></a>`;
  }

  function render() {
    const pages = Math.max(1, Math.ceil(filtered.length / PER));
    page = Math.min(page, pages);
    grid.innerHTML = filtered.slice((page - 1) * PER, page * PER).map(cardHTML).join('') || '<p style="color:var(--muted);grid-column:1/-1">Chưa có cá phù hợp trong hệ này.</p>';
    pager.innerHTML = `<button id="prev" ${page === 1 ? 'disabled' : ''}>← Trước</button><span class="page-info">Trang ${page}/${pages} · ${filtered.length} cá</span><button id="next" ${page === pages ? 'disabled' : ''}>Sau →</button>`;
    document.getElementById('prev').onclick = function () { if (page > 1) { page--; render(); } };
    document.getElementById('next').onclick = function () { if (page < pages) { page++; render(); } };
  }

  function apply() {
    const q = search ? search.value.trim().toLowerCase() : '';
    filtered = FISH.filter(function (f) { return (activeSystem === 'all' || f.system === activeSystem) && (!q || `${f.vn || ''} ${f.en || ''}`.toLowerCase().includes(q)); });
    render();
  }

  const toolbar = search && search.closest('.toolbar');
  if (toolbar) {
    const filter = document.createElement('div');
    filter.className = 'fish-system-filter';
    filter.innerHTML = `<span class="fish-system-filter__label">PHÂN LOẠI HỆ CÁ</span><div class="fish-system-filter__buttons">${CATEGORIES.map(function (c) { return `<button type="button" data-system="${c.id}" class="${c.id === 'all' ? 'is-active' : ''}">${c.label}</button>`; }).join('')}</div>`;
    toolbar.appendChild(filter);
    filter.onclick = function (event) {
      const button = event.target.closest('button[data-system]');
      if (!button) return;
      activeSystem = button.dataset.system;
      filter.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === button); });
      page = 1;
      apply();
    };
  }
  if (search) search.oninput = function () { page = 1; apply(); };
  apply();
})();
