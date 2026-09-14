(function () {
  if (typeof FISH === 'undefined' || !Array.isArray(FISH)) return;
  const exists = FISH.some(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    return /á đĩa royal|royal discus/.test(key);
  });
  if (exists) return;
  FISH.unshift({
    vn: 'Cá Đĩa Royal',
    en: 'Royal Discus',
    img: 'royal.jpeg',
    photo: true,
    price: 1699000,
    desc: 'Cá đĩa Royal là một trong những dòng cá đĩa được yêu thích nhờ vẻ đẹp sang trọng và màu sắc nổi bật. Cá có thân hình tròn dẹt đặc trưng, vây lưng và vây hậu môn phát triển, tạo nên dáng bơi mềm mại, uyển chuyển. Màu xanh ánh kim hoặc xanh lam đậm bao phủ cơ thể, kết hợp cùng những đường sọc dọc đặc trưng, mang đến vẻ ngoài cuốn hút và nổi bật trong bể thủy sinh. Với tính cách hiền hòa, cá đĩa Royal thích hợp nuôi theo đàn trong những bể cá rộng rãi, có môi trường nước sạch và ổn định. Đây là lựa chọn lý tưởng cho người chơi cá cảnh muốn sở hữu một loài cá vừa đẹp mắt, vừa mang lại vẻ sang trọng cho không gian sống.',
    origin: 'Lai tạo chọn lọc',
    size: '',
    promo: 'Không có',
    contactText: '',
    gallery: ['assets/img/royal.jpeg'],
    src: 'assets/img/royal.jpeg',
    filter: ''
  });
})();
