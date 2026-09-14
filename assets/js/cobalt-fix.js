/* HPZ Aquaroom - approved images for Cá Đĩa Xanh Cobalt */
(function () {
  if (typeof FISH === 'undefined') return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (!/cá đĩa xanh cobalt|cobalt blue discus|xanh cobalt/.test(key)) return;
    f.img = 'xanh coban 1.jpg';
    f.src = 'assets/img/xanh coban 1.jpg';
    f.gallery = [
      'assets/img/xanh coban 1.jpg',
      'assets/img/xanh coban 2.webp'
    ];
  });
})();
