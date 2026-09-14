/* HPZ Aquaroom - approved Red Devil Angelfish name and images */
(function () {
  if (typeof FISH === 'undefined') return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (!/cá thần tiên red devil ab|red devil angelfish/.test(key)) return;
    f.vn = 'Cá Thần Tiên Red Devil';
    f.en = 'Red Devil Angelfish';
    f.category = 'angelfish';
    f.cat = 'angelfish';
    f.group = 'angelfish';
    f.type = 'angelfish';
    f.categoryLabel = 'Cá Thần Tiên';
    f.img = 'red devil 1.jpeg';
    f.src = 'assets/img/red devil 1.jpeg';
    f.gallery = [
      'assets/img/red devil 1.jpeg',
      'assets/img/red devil 2.webp'
    ];
  });
})();
