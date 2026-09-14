/* HPZ Aquaroom - approved images for Cá Đĩa Xanh Cobalt */
(function () {
  if (typeof FISH === 'undefined') return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (!/cá đĩa xanh cobalt|cobalt blue discus|xanh cobalt/.test(key)) return;
    f.img = 'c_a_xanh_cobalt_1.jpg';
    f.src = 'assets/img/c_a_xanh_cobalt_1.jpg';
    f.gallery = [
      'assets/img/c_a_xanh_cobalt_1.jpg',
      'assets/img/c_a_xanh_cobalt_2.jpg'
    ];
  });
})();
