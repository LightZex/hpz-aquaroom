/* HPZ Aquaroom - catalogue: search + fish-system filters + pagination */
(function(){
  const grid = document.getElementById('fish-grid');
  const search = document.getElementById('fish-search');
  const pager = document.getElementById('pager');
  if(!grid || typeof FISH === 'undefined') return;

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

  function textOf(f){
    return `${f.vn || ''} ${f.en || ''} ${f.desc || ''}`.toLowerCase();
  }

  function systemOf(f){
    const t = textOf(f);
    if(/longfin 24k|shortfin 24k|cá longfin 24k|cá shortfin 24k/.test(t)) return 'bottom';
    if(/paraiba|whitefin tetra|flame tetra|congo|cánh cụt|penguin tetra|paracheirodon|hyphessobrycon|thayeria|phenacogrammus/.test(t)) return 'tetra';
    if(/thần tiên|angelfish|pterophyllum|altum|dantum|pinoy|isabel|blue ghost/.test(t)) return 'angelfish';
    if(/cá đĩa|đĩa tiger|đĩa bông|đĩa beo|đĩa hoa|đĩa ngũ|đĩa chỉ|đĩa valentine|đĩa xanh|đĩa bồ|đĩa panda|đĩa đỏ|đĩa red|discus|symphysodon|bạch ngọc|beo tuyết|hồng nhung vây dài|red devil|red ab/.test(t)) return 'discus';
    if(/cá chuột|corydoras|pleco|lau kiếng|tỳ bà|bống|goby|botia|cá bám|optimus prime/.test(t)) return 'bottom';
    if(/cá vàng|goldfish|ryukin/.test(t)) return 'goldfish';
    if(/tetra/.test(t)) return 'tetra';
    if(/mương|zacco|opsariichthys|cá suối|hmbd|tambra|fila|hồng my bóng đêm|hồng mi bóng đêm/.test(t)) return 'stream';
    return 'planted';
  }

  FISH.forEach(f => { f.system = systemOf(f); });

  let activeSystem = 'all';
  let filtered = FISH.slice();
  let page = 1;

  const vnd = n => (typeof n === 'string' ? n : n.toLocaleString('vi-VN') + '₫');

  function installFilter(){
    const toolbar = search && search.closest('.toolbar');
    if(!toolbar || document.getElementById('fish-system-filter')) return;

    const style = document.createElement('style');
    style.textContent = `
      .fish-system-filter{width:100%;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)}
      .fish-system-filter__label{display:block;color:var(--cyan);font-size:.9rem;font-weight:800;letter-spacing:.04em;margin-bottom:9px}
      .fish-system-filter__buttons{display:flex;gap:8px;flex-wrap:wrap}
      .fish-system-filter button{font:inherit;font-weight:700;color:var(--ink);background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:8px 13px;cursor:pointer;transition:.2s}
      .fish-system-filter button:hover{border-color:var(--cyan);transform:translateY(-1px)}
      .fish-system-filter button.is-active{color:#04121d;background:linear-gradient(90deg,var(--cyan),var(--accent));border-color:transparent}
      .fish-system-tag{display:inline-block;margin-top:9px;padding:3px 9px;border:1px solid var(--border);border-radius:999px;color:var(--cyan);font-size:.76rem;font-weight:800}
      @media(max-width:640px){.fish-system-filter button{padding:7px 11px;font-size:.92rem}}
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'fish-system-filter';
    wrap.id = 'fish-system-filter';
    wrap.innerHTML = `
      <span class="fish-system-filter__label">PHÂN LOẠI HỆ CÁ</span>
      <div class="fish-system-filter__buttons" role="group" aria-label="Phân loại hệ cá">
        ${CATEGORIES.map(c => `<button type="button" data-system="${c.id}" class="${c.id === activeSystem ? 'is-active' : ''}">${c.label}</button>`).join('')}
      </div>`;
    toolbar.appendChild(wrap);

    wrap.addEventListener('click', event => {
      const button = event.target.closest('button[data-system]');
      if(!button) return;
      activeSystem = button.dataset.system;
      wrap.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b === button));
      page = 1;
      applyFilters();
    });
  }

  function applyFilters(){
    const q = search ? search.value.trim().toLowerCase() : '';
    filtered = FISH.filter(f => {
      const matchesSystem = activeSystem === 'all' || f.system === activeSystem;
      const matchesSearch = !q || `${f.vn || ''} ${f.en || ''}`.toLowerCase().includes(q);
      return matchesSystem && matchesSearch;
    });
    render();
  }

  function cardHTML(f){
    const style = f.filter ? ` style="filter:${f.filter}"` : '';
    const category = CATEGORIES.find(c => c.id === f.system);
    return `<a class="card" href="fish.html?fish=${encodeURIComponent(f.en)}">
      <div class="ph">
        <img class="fish-sprite${f.photo ? ' photo' : ''}" src="${f.src}" alt="${f.vn}" loading="lazy"${style}>
      </div>
      <div class="body">
        <div class="vn">${f.vn}</div>
        <div class="en">${f.en}</div>
        <div class="price">${vnd(f.price || 0)}</div>
        <div class="fish-system-tag">${category ? category.label : 'Cá cảnh'}</div>
      </div>
    </a>`;
  }

  function render(){
    const pages = Math.max(1, Math.ceil(filtered.length / PER));
    page = Math.min(page, pages);
    const start = (page - 1) * PER;
    const slice = filtered.slice(start, start + PER);
    grid.innerHTML = slice.length ? slice.map(cardHTML).join('')
      : `<p style="color:var(--muted);grid-column:1/-1">Chưa có cá phù hợp trong hệ này.</p>`;
    pager.innerHTML = `
      <button id="prev" ${page === 1 ? 'disabled' : ''}>← Trước</button>
      <span class="page-info">Trang ${page}/${pages} · ${filtered.length} cá</span>
      <button id="next" ${page === pages ? 'disabled' : ''}>Sau →</button>`;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    if(prev) prev.onclick = () => { if(page > 1){ page--; render(); } };
    if(next) next.onclick = () => { if(page < pages){ page++; render(); } };
  }

  if(search) search.addEventListener('input', () => { page = 1; applyFilters(); });
  installFilter();
  applyFilters();
})();
