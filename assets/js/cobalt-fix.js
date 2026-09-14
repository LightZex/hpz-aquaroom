/* HPZ Aquaroom - approved images for Cá Đĩa Xanh Cobalt */
(function () {
  if (typeof FISH === 'undefined') return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (!/cá đĩa xanh cobalt|cobalt blue discus|xanh cobalt/.test(key)) return;
    f.img = 'xanh cobalt 1.webp';
    f.src = 'assets/img/xanh cobalt 1.webp';
    f.gallery = [
      'assets/img/xanh cobalt 1.webp',
      'assets/img/xanh cobalt 2.jpg'
    ];
  });
})();
