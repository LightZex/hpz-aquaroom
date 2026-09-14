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
      f.desc = 'Cá hồng nhung vây dài (Longfin Serpae Tetra) là một dòng cá cảnh nước ngọt nổi bật với thân màu đỏ cam rực rỡ và bộ vây dài mềm mại. Cá có kích thước nhỏ, tính cách tương đối hiền và thích sống theo đàn, rất phù hợp để nuôi trong các bể thủy sinh. Với màu sắc bắt mắt cùng những chuyển động uyển chuyển của bộ vây, cá hồng nhung vây dài là lựa chọn lý tưởng cho người yêu thích vẻ đẹp sinh động và tự nhiên của bể cá.';
      f.img = 'hong nhung vay dai 1.jpeg';
      f.src = 'assets/img/hong nhung vay dai 1.jpeg';
      f.gallery = [
        'assets/img/hong nhung vay dai 1.jpeg',
        'assets/img/hong nhung vay dai 2.jpeg'
      ];
    }
  });
})();
