/* HPZ Aquaroom - use approved images for Cá Chuột Mỹ */
(function () {
  if (typeof FISH === 'undefined') return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (!/cá chuột mỹ|united states cory|chuột mỹ/.test(key)) return;
    f.img = 'chuot my 1.jpeg';
    f.src = 'assets/img/chuot my 1.jpeg';
    f.gallery = [
      'assets/img/chuot my 1.jpeg',
      'assets/img/chuot my 2.jpeg'
    ];
  });
})();
