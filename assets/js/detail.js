/* HPZ Aquaroom - fish detail page (fish.html?fish=<en>) */
(function(){
  const root = document.getElementById('detail-root');
  if(!root) return;
  const q = new URLSearchParams(location.search).get('fish') || '';
  const ql = q.toLowerCase().trim();
  const f = FISH.find(x => x.en.toLowerCase() === ql)
        || FISH.find(x => x.en.toLowerCase().includes(ql))
        || FISH.find(x => x.vn.toLowerCase().includes(ql))
        || FISH[0];
  const vnd = n => (typeof n === 'string' ? n : n.toLocaleString('vi-VN') + '₫');

  if(!f){
    root.innerHTML = `<p style="color:var(--muted)">Không tìm thấy thông tin cá. <a href="beca.html">Xem toàn bộ bể cá →</a></p>`;
    document.title = 'Không tìm thấy — HPZ Aquaroom';
    return;
  }
  document.title = f.vn + ' — HPZ Aquaroom';

  const idx = FISH.findIndex(x => x.en.toLowerCase() === (f.en||'').toLowerCase());
  const prevF = FISH[(idx - 1 + FISH.length) % FISH.length];
  const nextF = FISH[(idx + 1) % FISH.length];

  const style = f.filter ? ` style="filter:${f.filter}"` : '';
  const gallery = (f.gallery && f.gallery.length ? f.gallery : [f.src]);
  const imgs = gallery.map((g,i) =>
    `<img src="${g}" alt="${f.vn} ${i+1}" class="detail-img${f.photo?'':' fish-sprite'}" ${!f.photo&&i===0?style:''} loading="lazy">`).join('');

  const STATUS = { 'stock':'Còn hàng', 'pre-order':'Đặt trước', 'sold out':'Hết hàng', 'hết hàng':'Hết hàng' };
  const statusText = STATUS[(f.status||'').toLowerCase()] || f.status || '';
  const ct = f.contactText || 'Liên hệ';
  const row = (label, val, big) => val ? `
    <div class="spec-row${big?' price-row':''}"><span class="spec-label">${label}</span><span class="spec-val">${val}</span></div>` : '';

  root.innerHTML = `
  <nav class="fish-nav">
    <a class="nav-btn" href="fish.html?fish=${encodeURIComponent(prevF.en)}">‹ Quay lại</a>
    <a class="nav-btn nav-next" href="fish.html?fish=${encodeURIComponent(nextF.en)}">Chuyển tiếp ›</a>
  </nav>
  <article class="detail">
    <div class="detail-media">${imgs}</div>
    <div class="detail-info">
      <h2 class="section-title" style="margin-bottom:4px">${f.vn}</h2>
      <p class="detail-en">${f.en}</p>
      ${f.video ? (f.video.endsWith('.mp4') ? `<div class="fbp" style="margin:18px 0;border-radius:14px;overflow:hidden;border:1px solid var(--border);background:#000;position:relative;max-width:560px">
        <video src="${f.video}" playsinline preload="metadata" style="width:100%;display:block;background:#000" poster="${'assets/img/' + f.img}"></video>
        <div class="fbp-top" style="position:absolute;top:10px;left:10px;right:10px;display:flex;justify-content:space-between;align-items:center;pointer-events:none;z-index:3">
          <div style="display:flex;align-items:center;gap:8px">
            <img src="assets/img/logo.png" alt="HPZ" style="width:26px;height:26px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,.5)">
            <span style="color:#fff;font-size:13px;font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,.7)">HPZ Aquaroom</span>
          </div>
          <button class="fbp-share" style="pointer-events:auto;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px" onclick="navigator.clipboard.writeText(location.href).then(()=>{this.textContent='Đã copy ✓';setTimeout(()=>{this.innerHTML='↗ Share'},1500)})">↗ Share</button>
        </div>
        <button class="fbp-play" aria-label="Play" style="position:absolute;inset:0;margin:auto;width:64px;height:64px;border-radius:50%;background:rgba(0,0,0,.45);border:1.5px solid rgba(255,255,255,.9);cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;transition:transform .15s" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div class="fbp-bar" style="position:absolute;left:0;right:0;bottom:0;padding:8px 12px 10px;background:linear-gradient(transparent,rgba(0,0,0,.75));z-index:3;opacity:0;transition:opacity .2s">
          <div style="display:flex;align-items:center;gap:10px;color:#fff">
            <button class="fbp-toggle" aria-label="Phát" style="background:none;border:none;cursor:pointer;padding:0;display:flex" onclick="void 0"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" class="fbp-ic-play"><path d="M8 5v14l11-7z"/></svg><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" style="display:none" class="fbp-ic-pause"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg></button>
            <div class="fbp-track" style="flex:1;height:4px;background:rgba(255,255,255,.3);border-radius:2px;position:relative;cursor:pointer">
              <div class="fbp-fill" style="width:0%;height:100%;background:#3fd0ff;border-radius:2px"></div>
              <div class="fbp-knob" style="position:absolute;top:50%;left:0%;transform:translate(-50%,-50%);width:11px;height:11px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.5)"></div>
            </div>
            <span class="fbp-time" style="font-size:12px;font-variant-numeric:tabular-nums;min-width:70px;text-align:right">0:00 / 0:10</span>
            <button class="fbp-mute" aria-label="Âm lượng" style="background:none;border:none;cursor:pointer;padding:0;display:flex" onclick="void 0"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.2-3.9v7.8a4.5 4.5 0 0 0 2.2-3.9z"/></svg></button>
            <button class="fbp-fs" aria-label="Toàn màn hình" style="background:none;border:none;cursor:pointer;padding:0;display:flex" onclick="void 0"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg></button>
          </div>
        </div>
      </div>` : `<div class="detail-video" style="margin:18px 0;border-radius:14px;overflow:hidden;border:1px solid var(--border)">
        <div class="fb-video" data-href="${f.video}" data-allowfullscreen="true" data-width="560">
          <blockquote cite="${f.video}" class="fb-xfbml-parse-ignore">
            <a href="${f.video}">Xem video trên Facebook</a>
          </blockquote>
        </div>
      </div>`) : ''}
      <p class="detail-desc">${f.desc}</p>
      <div class="specs">
              ${row('Giá Niêm Yết', vnd(f.price || 0))}
              ${f.combo && f.combo[3] ? row('Combo 3', vnd(f.combo[3])) : ''}
              ${f.combo && f.combo[5] ? row('Combo 5', vnd(f.combo[5])) : ''}
              ${f.combo && f.combo[10] ? row('Combo 10', vnd(f.combo[10])) : ''}
            </div>
      <div class="detail-actions">
        <a class="btn primary" href="index.html#contact">Liên hệ mua cá</a>
        <a class="btn ghost" href="beca.html">← Xem thêm cá khác</a>
      </div>
    </div>
  </article>`;
})();


// === Custom FB-style mp4 player wiring ===
(function () {
  function initFbp() {
    document.querySelectorAll('.fbp').forEach(box => {
      if (box.dataset.fbpInit) return;
      box.dataset.fbpInit = '1';
      const v = box.querySelector('video');
      const play = box.querySelector('.fbp-play');
      const toggle = box.querySelector('.fbp-toggle');
      const icPlay = box.querySelector('.fbp-ic-play');
      const icPause = box.querySelector('.fbp-ic-pause');
      const track = box.querySelector('.fbp-track');
      const fill = box.querySelector('.fbp-fill');
      const knob = box.querySelector('.fbp-knob');
      const time = box.querySelector('.fbp-time');
      const mute = box.querySelector('.fbp-mute');
      const fs = box.querySelector('.fbp-fs');
      const bar = box.querySelector('.fbp-bar');
      const fmt = s => (isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00');
      const upd = () => {
        const p = (v.currentTime / (v.duration || 1)) * 100;
        fill.style.width = p + '%'; knob.style.left = p + '%';
        time.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
      };
      const setState = () => {
        const playing = !v.paused && !v.ended;
        icPlay.style.display = playing ? 'none' : '';
        icPause.style.display = playing ? '' : 'none';
        play.style.display = playing ? 'none' : 'flex';
      };
      const flip = () => v.paused ? v.play().catch(() => {}) : v.pause();
      play.addEventListener('click', flip);
      toggle.addEventListener('click', flip);
      v.addEventListener('click', flip);
      v.addEventListener('timeupdate', upd);
      v.addEventListener('loadedmetadata', upd);
      v.addEventListener('play', setState);
      v.addEventListener('pause', () => { setState(); bar.style.opacity = 1; });
      v.addEventListener('ended', setState);
      let seek = e => {
        const r = track.getBoundingClientRect();
        v.currentTime = Math.max(0, Math.min(1, ((e.clientX ?? e.touches[0].clientX) - r.left) / r.width)) * (v.duration || 0);
      };
      let down = false;
      track.addEventListener('mousedown', e => { down = true; seek(e); });
      window.addEventListener('mousemove', e => { if (down) seek(e); });
      window.addEventListener('mouseup', () => down = false);
      track.addEventListener('touchstart', e => seek(e), { passive: true });
      box.addEventListener('mousemove', () => bar.style.opacity = 1);
      box.addEventListener('mouseleave', () => { if (!v.paused) bar.style.opacity = 0; });
      mute.addEventListener('click', () => { v.muted = !v.muted; mute.style.opacity = v.muted ? .45 : 1; });
      fs.addEventListener('click', () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else (box.requestFullscreen ? box : v).webkitRequestFullscreen ? v.webkitRequestFullscreen() : box.requestFullscreen().catch?.(()=>{});
      });
      setState(); upd();
    });
  }
  initFbp();
  document.addEventListener('DOMContentLoaded', initFbp);
  window.addEventListener('load', initFbp);
})();
