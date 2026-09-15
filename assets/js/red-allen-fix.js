(function () {
  if (typeof FISH === 'undefined' || !Array.isArray(FISH)) return;
  const exists = FISH.some(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    return /á đĩa red allen|red allen discus|red alen/.test(key);
  });
  if (exists) return;
  FISH.unshift({
    vn: 'Cá Đĩa Red Allen',
    en: 'Red Allen Discus',
    img: 'red alen.jpeg',
    photo: true,
    price: 1399000,
    desc: 'Cá đĩa Red Allen nổi bật với sắc đỏ rực rỡ, mang đến vẻ đẹp ấn tượng và cuốn hút cho bể cá cảnh. Cá sở hữu thân hình tròn dẹt đặc trưng, kết hợp cùng những đường vân mềm mại và màu sắc nổi bật, tạo nên diện mạo sang trọng, bắt mắt. Dáng bơi uyển chuyển, nhẹ nhàng giúp cá trở thành điểm nhấn nổi bật trong bể.\n\nVới vẻ đẹp quyến rũ cùng màu sắc nổi bật, cá đĩa Red Allen là lựa chọn lý tưởng cho những người yêu thích dòng cá đĩa đỏ. Cá thích hợp nuôi trong môi trường nước sạch, ổn định và được chăm sóc đúng cách để duy trì màu sắc rực rỡ, khỏe mạnh.',
    origin: 'Lai tạo chọn lọc',
    size: '12–13 cm',
    promo: 'Không có',
    contactText: '',
    gallery: ['assets/img/red alen.jpeg'],
    src: 'assets/img/red alen.jpeg',
    filter: ''
  });
})();
