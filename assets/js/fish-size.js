/* HPZ Aquaroom - show fish size below description and before price */
(function () {
  function findFish() {
    if (typeof FISH === 'undefined') return null;
    const q = new URLSearchParams(location.search).get('fish') || '';
    const ql = q.toLowerCase();
    return FISH.find(function (f) { return (f.en || '').toLowerCase() === ql; })
      || FISH.find(function (f) { return (f.en || '').toLowerCase().includes(ql); })
      || FISH.find(function (f) { return (f.vn || '').toLowerCase().includes(ql); });
  }

  function renderSize() {
    const detail = document.getElementById('detail-root');
    const fish = findFish();
    const info = detail && detail.querySelector('.detail-info');
    const desc = detail && detail.querySelector('.detail-desc');
    if (!detail || !fish || !info || !desc || detail.querySelector('.detail-size')) return false;

    const price = detail.querySelector('.detail-price')
      || Array.from(detail.querySelectorAll('.spec-row')).find(function (row) {
        return /giá\s*niêm\s*yết/i.test(row.textContent || '');
      });
    if (!price) return false;

    const size = document.createElement('div');
    size.className = 'detail-size';
    size.innerHTML = '<span class="detail-size__label">Size</span><span class="detail-size__value">' + (fish.size || 'Liên hệ để được tư vấn size') + '</span>';
    size.style.cssText = 'display:flex;align-items:center;gap:12px;margin:0;padding:12px 0;border-bottom:1px solid var(--border);';
    size.querySelector('.detail-size__label').style.cssText = 'color:var(--cyan);font-weight:800;min-width:110px;';
    size.querySelector('.detail-size__value').style.cssText = 'color:var(--ink);font-weight:700;';

    if (price.classList.contains('detail-price')) {
      desc.insertAdjacentElement('afterend', size);
      info.insertBefore(price, size.nextSibling);
    } else {
      price.parentNode.insertBefore(size, price);
    }
    return true;
  }

  if (!renderSize()) {
    const observer = new MutationObserver(function () {
      if (renderSize()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
