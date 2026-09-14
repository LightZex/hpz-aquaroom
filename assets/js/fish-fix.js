/* HPZ Aquaroom - catalog corrections applied after fish-data.js */
(function () {
  if (typeof FISH === 'undefined') return;

  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();

    if (/checkered bard|checked bard|dicrossus/.test(key)) {
      f.vn = 'Cá Diếc Bàn cờ';
      if (!f.en || /checked bard|checkered bard/i.test(f.en)) f.en = 'Dicrossus filamentosus';
      f.img = 'checkered_bard.jpg';
      f.src = 'assets/img/checkered_bard.jpg';
      f.gallery = ['assets/img/checkered_bard.jpg'];
    }

    if (/hồng nhung|red velvet longfin|longfin serpae/.test(key)) {
      f.vn = 'Cá Hồng Nhung Vây Dài';
      f.en = 'Longfin Serpae Tetra';
      f.category = 'tetra';
      f.cat = 'tetra';
      f.group = 'tetra';
      f.type = 'tetra';
      f.categoryLabel = 'Cá Tetra';
      f.isDiscus = false;
      delete f.discus;
      f.desc = 'Cá hồng nhung vây dài (Longfin Serpae Tetra) là một dòng cá cảnh nước ngọt nổi bật với thân màu đỏ cam rực rỡ và bộ vây dài mềm mại. Cá có kích thước nhỏ, tính cách tương đối hiền và thích sống theo đàn, rất phù hợp để nuôi trong các bể thủy sinh. Với màu sắc bắt mắt cùng những chuyển động uyển chuyển của bộ vây, cá hồng nhung vây dài là lựa chọn lý tưởng cho người yêu thích vẻ đẹp sinh động và tự nhiên của bể cá.';
      f.img = 'hong nhung vay dai 1.jpeg';
      f.src = 'assets/img/hong nhung vay dai 1.jpeg';
      f.gallery = [
        'assets/img/hong nhung vay dai 1.jpeg',
        'assets/img/hong nhung vay dai 2.jpeg'
      ];
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const detail = document.getElementById('detail-root');
    if (!detail) return;

    const q = new URLSearchParams(location.search).get('fish') || '';
    const ql = q.toLowerCase();
    const fish = FISH.find(function (f) { return (f.en || '').toLowerCase() === ql; })
      || FISH.find(function (f) { return (f.en || '').toLowerCase().includes(ql); })
      || FISH.find(function (f) { return (f.vn || '').toLowerCase().includes(ql); });
    const info = detail.querySelector('.detail-info');
    const desc = detail.querySelector('.detail-desc');
    const price = detail.querySelector('.detail-price');
    if (!fish || !info || !desc || !price || detail.querySelector('.detail-size')) return;

    const size = document.createElement('div');
    size.className = 'detail-size';
    size.innerHTML = '<span class="detail-size__label">Size</span><span class="detail-size__value">' + (fish.size || 'Liên hệ để được tư vấn size') + '</span>';
    size.style.cssText = 'display:flex;align-items:center;gap:12px;margin:-8px 0 14px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface-2);';
    size.querySelector('.detail-size__label').style.cssText = 'color:var(--cyan);font-weight:800;min-width:44px;';
    size.querySelector('.detail-size__value').style.cssText = 'color:var(--ink);font-weight:700;';

    desc.insertAdjacentElement('afterend', size);
    info.insertBefore(price, size.nextSibling);
  });
})();
