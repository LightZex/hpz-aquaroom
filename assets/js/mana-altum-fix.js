(function () {
  if (typeof FISH === 'undefined' || !Array.isArray(FISH)) return;
  FISH.forEach(function (f) {
    const key = ((f.vn || '') + ' ' + (f.en || '')).toLowerCase();
    if (/mana red black|manacapuru red back|thần tiên mana/.test(key)) {
      f.img = 'mana red black.jpeg';
      f.src = 'assets/img/mana red black.jpeg';
      f.gallery = ['assets/img/mana red black.jpeg'];
      return;
    }
    if (/altum peru/.test(key)) {
      f.img = 'altum peru.jpeg';
      f.src = 'assets/img/altum peru.jpeg';
      f.gallery = [
        'assets/img/altum peru.jpeg',
        'assets/img/altum peru 1.jpeg'
      ];
    }
  });
})();
