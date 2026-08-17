async function loadSite() {
  try {
    const res = await fetch('site.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    applySiteData(data);
  } catch {
    // Static fallbacks in HTML are enough offline.
  }
}

function applySiteData(data) {
  const version = data.version ? `v${data.version}` : '';
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  setText('game-name-ar', data.gameNameAr);
  setText('game-name-en', data.gameNameEn);
  setText('tagline-ar', data.taglineAr);
  setText('tagline-en', data.taglineEn);
  setText('card-version', data.version || '');
  setText('card-featured-ar', data.featuredGameAr);
  setText('card-featured-en', data.featuredGameEn);
  setText('featured-title-ar', data.featuredGameAr);
  setText('featured-title-en', data.featuredGameEn ? `${data.featuredGameEn} — Arabic localization` : '');
  setText('footer-game', data.gameNameAr || data.gameNameEn);
  setText('version-label', version);
  setText('changelog', data.changelog ? `آخر تحديث (${data.updated || ''}): ${data.changelog}` : '');

  document.title = `${data.gameNameAr || 'TSA'} | ${data.brand || 'TSA Community'}`;

  if (data.featuredImage) {
    const img = document.getElementById('featured-image');
    if (img) {
      img.src = data.featuredImage;
      img.alt = data.featuredGameAr || data.featuredGameEn || 'Featured game';
    }
  }

  if (data.downloadUrl) {
    for (const id of ['download-btn', 'download-btn-2']) {
      const btn = document.getElementById(id);
      if (btn) btn.href = data.downloadUrl;
    }
  }

  if (data.discordUrl) {
    for (const id of ['discord-btn']) {
      const btn = document.getElementById(id);
      if (btn) btn.href = data.discordUrl;
    }
  }
}

loadSite();
