/* HPZ Aquaroom - classify Paraiba as angelfish before category filtering */
(function () {
  if (typeof FISH === 'undefined') return;

  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '') + ' ' + (f.desc || '')).toLowerCase();
    if (!/paraiba/.test(key)) return;

    const safeParaiba = function (text) {
      return (text || '').replace(/paraiba/gi, 'Para​iba');
    };
    f.vn = safeParaiba(f.vn);
    f.en = safeParaiba(f.en);
    f.desc = safeParaiba(f.desc);
    f.category = 'angelfish';
    f.cat = 'angelfish';
    f.group = 'angelfish';
    f.type = 'angelfish';
    f.categoryLabel = 'Cá Thần Tiên';
  });
})();
