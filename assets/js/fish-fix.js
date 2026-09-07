/* HPZ Aquaroom - catalog corrections applied after fish-data.js */
(function () {
  if (typeof FISH === 'undefined') return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (!/checkered bard|checked bard|dicrossus/.test(key)) return;
    f.vn = 'Cá Diếc Bàn cờ';
    if (!f.en || /checked bard|checkered bard/i.test(f.en)) f.en = 'Dicrossus filamentosus';
    f.img = 'checkered_bard.jpg';
    f.src = 'assets/img/checkered_bard.jpg';
    f.gallery = ['assets/img/checkered_bard.jpg'];
  });
})();
