(function () {
  if (typeof FISH === 'undefined' || !Array.isArray(FISH)) return;
  const exists = FISH.some(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    return /á đĩa ica bar|ica bar discus/.test(key);
  });
  if (exists) return;
  FISH.unshift({
    vn: 'Cá Đĩa Ica Bar',
    en: 'Ica Bar Discus',
    img: 'ica bar.jpeg',
    photo: true,
    price: 3399000,
    desc: 'Cá đĩa Ica Bar là dòng cá đĩa được yêu thích nhờ vẻ đẹp nổi bật và màu sắc cuốn hút. Cá sở hữu thân hình tròn dẹt đặc trưng, kết hợp cùng những đường sọc dọc rõ nét chạy dọc cơ thể, tạo nên vẻ ngoài hài hòa và ấn tượng. Khi bơi, các vây xòe rộng, chuyển động mềm mại, uyển chuyển, mang lại cảm giác thanh thát và sang trọng.\n\nVới màu sắc nổi bật cùng dáng bơi duyên dáng, cá đĩa Ica Bar là lựa chọn phù hợp cho những người yêu thích cá cảnh và muốn tạo điểm nhấn cho bể cá. Cá sẽ phát triển tốt trong môi trường nước sạch, ổn định, được chăm sóc và cung cấp chế độ dinh dưỡng phù hợp.',
    origin: 'Lai tạo chọn lọc',
    size: '10–12 cm',
    promo: 'Không có',
    contactText: '',
    gallery: ['assets/img/ica bar.jpeg'],
    src: 'assets/img/ica bar.jpeg',
    filter: ''
  });
})();
