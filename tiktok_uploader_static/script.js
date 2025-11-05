
(function(){
  const drop = document.getElementById('drop');
  const input = document.getElementById('file');
  const logs = document.getElementById('logs');
  const caption = document.getElementById('caption');
  const tags = document.getElementById('tags');
  const oauthBtn = document.getElementById('oauth');
  const simulateBtn = document.getElementById('simulate');

  function log(line){
    const el = document.createElement('div');
    el.className = 'log';
    const ts = new Date().toLocaleTimeString();
    el.textContent = '['+ts+'] ' + line;
    logs.appendChild(el);
    logs.scrollTop = logs.scrollHeight;
  }

  if(oauthBtn){
    oauthBtn.addEventListener('click', ()=>{
      alert('Demo: Hier würde der OAuth‑Flow zu TikTok starten. In der statischen Version findet keine Anmeldung statt.');
      log('OAuth-Flow (Demo) getriggert.');
    });
  }

  function handle(file){
    if(!file) return;
    const name = file.name || 'Unbekannt';
    const sizeMB = (file.size/1024/1024).toFixed(2);
    log('Datei gewählt: '+name+' ('+sizeMB+' MB)');
  }

  if(input){
    input.addEventListener('change', (e)=>{
      const f = e.target.files && e.target.files[0];
      handle(f);
    });
  }

  if(drop){
    ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev, e=>{
      e.preventDefault();e.stopPropagation();
      drop.classList.add('drag');
    }));
    ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev, e=>{
      e.preventDefault();e.stopPropagation();
      drop.classList.remove('drag');
    }));
    drop.addEventListener('drop', (e)=>{
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      handle(f);
    });
    drop.addEventListener('click', ()=> input && input.click());
  }

  if(simulateBtn){
    simulateBtn.addEventListener('click', ()=>{
      if(!logs) return;
      log('Starte Demo-Upload…');
      const cap = (caption && caption.value || '').trim();
      const tg  = (tags && tags.value || '').trim();
      if(cap) log('Caption: '+cap);
      if(tg)  log('Hashtags: '+tg);
      setTimeout(()=>log('Video verarbeiten…'), 600);
      setTimeout(()=>log('Entwurf angelegt (Demo, lokal)'), 1400);
      setTimeout(()=>log('Fertig. Öffne TikTok Studio, um zu veröffentlichen.'), 2100);
    });
  }
})();
