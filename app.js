/**
 * ===================================================================
 * 💖 ROMANTIC BIRTHDAY SURPRISE - MAIN APPLICATION LOGIC 💖
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── Application State ───────────────────────────────────────────
  const state = {
    currentScene: 1,
    totalScenes: 6,
    heartsCollected: 0,
    targetHearts: BIRTHDAY_CONFIG.miniGame.targetHearts || 7,
    isGameRunning: false,
    activeHeartElements: [],
    gameSpawnInterval: null,
    isTyping: false,
    typewriterTimeout: null,
    currentCategory: 'All',
  };

  // ─── DOM References ──────────────────────────────────────────────
  const preloader = document.getElementById('preloader');
  const scenes = document.querySelectorAll('.scene');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressLabels = document.querySelectorAll('.step-label');
  
  // Audio Controls
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const customizerDrawer = document.getElementById('customizer-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const saveCustomizerBtn = document.getElementById('save-customizer-btn');

  // Scene 1 Elements
  const giftBoxWrapper = document.getElementById('gift-box-wrapper');
  const openingInitial = document.getElementById('opening-initial');
  const openingRevealed = document.getElementById('opening-revealed');
  const toScene2Btn = document.getElementById('to-scene-2-btn');

  // Scene 2 Elements (Mini Game)
  const gameBoard = document.getElementById('game-board');
  const heartCounterEl = document.getElementById('heart-counter');
  const targetCounterEl = document.getElementById('target-counter');
  const gameToastEl = document.getElementById('game-love-toast');
  const gameCongratsModal = document.getElementById('game-congrats-modal');
  const toScene3Btn = document.getElementById('to-scene-3-btn');

  // Scene 3 Elements (Letter & Reveal)
  const letterTypingEl = document.getElementById('letter-typing-text');
  const letterSignatureEl = document.getElementById('letter-signature');
  const toScene4Btn = document.getElementById('to-scene-4-btn');

  // Scene 4 Elements (Scrapbook)
  const scrapbookGrid = document.getElementById('scrapbook-grid');
  const categoryFilters = document.getElementById('category-filters');
  const toScene5Btn = document.getElementById('to-scene-5-btn');

  // Lightbox Elements
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxDate = document.getElementById('lightbox-date');

  // Scene 5 Elements (Timeline)
  const timelineEventsList = document.getElementById('timeline-events-list');
  const toScene6Btn = document.getElementById('to-scene-6-btn');

  // Scene 6 Elements (Night Sky & Wish)
  const nightSkyScene = document.getElementById('scene-6');
  const replayStoryBtn = document.getElementById('replay-story-btn');
  const releaseLanternBtn = document.getElementById('release-lantern-btn');

  // ─── Initialize Experience ───────────────────────────────────────
  function init() {
    populateConfigData();
    renderScrapbook();
    renderTimeline();
    setupEventListeners();

    // Dismiss Preloader after gentle delay
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
    }, 1400);
  }

  // ─── Populate Config Data into HTML ──────────────────────────────
  function populateConfigData() {
    // Top Brand
    const brandName = document.getElementById('brand-gf-name');
    if (brandName) brandName.textContent = BIRTHDAY_CONFIG.girlfriendName;

    // Scene 1
    const s1Greeting = document.getElementById('scene-1-greeting');
    if (s1Greeting) s1Greeting.textContent = BIRTHDAY_CONFIG.opening.greeting;
    const s1Sub = document.getElementById('scene-1-subtitle');
    if (s1Sub) s1Sub.textContent = BIRTHDAY_CONFIG.opening.subGreeting;
    const s1Prompt = document.getElementById('scene-1-prompt');
    if (s1Prompt) s1Prompt.textContent = BIRTHDAY_CONFIG.opening.giftBoxPrompt;
    const s1RevTitle = document.getElementById('scene-1-reveal-title');
    if (s1RevTitle) s1RevTitle.textContent = BIRTHDAY_CONFIG.opening.giftRevealTitle;
    const s1RevSub = document.getElementById('scene-1-reveal-subtitle');
    if (s1RevSub) s1RevSub.textContent = BIRTHDAY_CONFIG.opening.giftRevealSubtitle;
    if (toScene2Btn) toScene2Btn.textContent = BIRTHDAY_CONFIG.opening.continueButtonText;

    // Scene 2 Mini Game
    const gameTitle = document.getElementById('game-title-text');
    if (gameTitle) gameTitle.textContent = BIRTHDAY_CONFIG.miniGame.title;
    const gameSub = document.getElementById('game-subtitle-text');
    if (gameSub) gameSub.textContent = BIRTHDAY_CONFIG.miniGame.subtitle;
    if (targetCounterEl) targetCounterEl.textContent = state.targetHearts;
    const gameWinTitle = document.getElementById('game-win-title');
    if (gameWinTitle) gameWinTitle.textContent = BIRTHDAY_CONFIG.miniGame.completedTitle;
    const gameWinSub = document.getElementById('game-win-subtitle');
    if (gameWinSub) gameWinSub.textContent = BIRTHDAY_CONFIG.miniGame.completedSubtitle;
    if (toScene3Btn) toScene3Btn.textContent = BIRTHDAY_CONFIG.miniGame.unlockButtonText;

    // Scene 3 Birthday Reveal
    const bdayHeader = document.getElementById('birthday-reveal-heading');
    if (bdayHeader) bdayHeader.textContent = BIRTHDAY_CONFIG.birthdayReveal.header;
    if (letterSignatureEl) letterSignatureEl.textContent = `— ${BIRTHDAY_CONFIG.partnerName} ❤️`;
    if (toScene4Btn) toScene4Btn.textContent = BIRTHDAY_CONFIG.birthdayReveal.nextButtonText;

    // Scene 4 Scrapbook
    const scrapTitle = document.getElementById('scrapbook-title');
    if (scrapTitle) scrapTitle.textContent = BIRTHDAY_CONFIG.memories.title;
    const scrapSub = document.getElementById('scrapbook-subtitle');
    if (scrapSub) scrapSub.textContent = BIRTHDAY_CONFIG.memories.subtitle;
    if (toScene5Btn) toScene5Btn.textContent = BIRTHDAY_CONFIG.memories.nextButtonText;

    // Scene 5 Timeline
    const timelineTitle = document.getElementById('timeline-title');
    if (timelineTitle) timelineTitle.textContent = BIRTHDAY_CONFIG.timeline.title;
    const timelineSub = document.getElementById('timeline-subtitle');
    if (timelineSub) timelineSub.textContent = BIRTHDAY_CONFIG.timeline.subtitle;
    if (toScene6Btn) toScene6Btn.textContent = BIRTHDAY_CONFIG.timeline.nextButtonText;

    // Scene 6 Final Surprise
    const wishPrelude = document.getElementById('wish-prelude-text');
    if (wishPrelude) wishPrelude.textContent = BIRTHDAY_CONFIG.finalSurprise.prelude;
    const wishStmt = document.getElementById('wish-statement-text');
    if (wishStmt) wishStmt.textContent = BIRTHDAY_CONFIG.finalSurprise.wishText;
    const finalHeading = document.getElementById('final-name-heading');
    if (finalHeading) {
      finalHeading.textContent = BIRTHDAY_CONFIG.finalSurprise.finalHeading.replace(
        '{HER_NAME}',
        BIRTHDAY_CONFIG.girlfriendName
      );
    }
    const finalSub = document.getElementById('final-subtitle-note');
    if (finalSub) finalSub.textContent = BIRTHDAY_CONFIG.finalSurprise.finalSubtitle;
    const tapHint = document.getElementById('sky-tap-hint');
    if (tapHint) tapHint.textContent = BIRTHDAY_CONFIG.finalSurprise.interactivePrompt;
    if (replayStoryBtn) replayStoryBtn.textContent = BIRTHDAY_CONFIG.finalSurprise.replayButtonText;
  }

  // ─── Scene Navigation & Progress Bar ─────────────────────────────
  function goToScene(sceneNumber) {
    if (sceneNumber < 1 || sceneNumber > state.totalScenes) return;

    // Trigger audio click chime
    if (window.romanticAudio) {
      window.romanticAudio.playButtonFx();
      if (!window.romanticAudio.isPlaying && BIRTHDAY_CONFIG.audio.autoPlayPrompt) {
        window.romanticAudio.play();
      }
    }

    state.currentScene = sceneNumber;

    // Update scene visibility
    scenes.forEach(scene => {
      const sNum = parseInt(scene.getAttribute('data-scene'), 10);
      if (sNum === sceneNumber) {
        scene.classList.add('active');
      } else {
        scene.classList.remove('active');
      }
    });

    // Update Progress Bar
    const progressPercent = ((sceneNumber - 1) / (state.totalScenes - 1)) * 100;
    if (progressBarFill) {
      progressBarFill.style.width = `${Math.max(16.6, progressPercent)}%`;
    }

    // Update Progress Labels
    progressLabels.forEach(lbl => {
      const stepNum = parseInt(lbl.getAttribute('data-step'), 10);
      if (stepNum === sceneNumber) {
        lbl.classList.add('active');
      } else {
        lbl.classList.remove('active');
      }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scene Specific Trigger Actions
    handleSceneEntry(sceneNumber);
  }

  function handleSceneEntry(sceneNumber) {
    // Stop mini-game if moving away from Scene 2
    if (sceneNumber !== 2) {
      stopMiniGame();
    }

    // Scene 2: Start Mini Game
    if (sceneNumber === 2) {
      startMiniGame();
    }

    // Scene 3: Birthday Fireworks & Typewriter
    if (sceneNumber === 3) {
      if (window.romanticParticles) {
        window.romanticParticles.triggerCelebrationFireworks(4);
      }
      startTypewriterLoveLetter();
    }

    // Scene 6: Night Sky
    if (sceneNumber === 6) {
      if (window.romanticParticles) {
        window.romanticParticles.setNightSkyActive(true);
      }
      const skyCanvas = document.getElementById('night-sky-canvas');
      if (skyCanvas) skyCanvas.classList.add('active');
    } else {
      if (window.romanticParticles) {
        window.romanticParticles.setNightSkyActive(false);
      }
      const skyCanvas = document.getElementById('night-sky-canvas');
      if (skyCanvas) skyCanvas.classList.remove('active');
    }
  }

  // ─── Scene 1: Gift Box Opening ───────────────────────────────────
  function openGiftBox() {
    if (!giftBoxWrapper || giftBoxWrapper.classList.contains('opened')) return;

    giftBoxWrapper.classList.add('opened');

    if (window.romanticAudio) {
      window.romanticAudio.playGiftOpenFx();
      if (!window.romanticAudio.isPlaying) {
        window.romanticAudio.play();
      }
    }

    const rect = giftBoxWrapper.getBoundingClientRect();
    if (window.romanticParticles) {
      window.romanticParticles.createHeartPopBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        40
      );
    }

    setTimeout(() => {
      if (openingInitial) openingInitial.style.display = 'none';
      if (openingRevealed) openingRevealed.classList.add('visible');
    }, 700);
  }

  // ─── Scene 2: "Catch The Love" Mini-Game ─────────────────────────
  function startMiniGame() {
    state.heartsCollected = 0;
    state.isGameRunning = true;
    updateHeartCounterUI();

    if (gameCongratsModal) gameCongratsModal.classList.remove('visible');

    // Spawn first batch of hearts
    for (let i = 0; i < 3; i++) {
      spawnGameHeart();
    }

    // Continuous spawn loop
    if (state.gameSpawnInterval) clearInterval(state.gameSpawnInterval);
    state.gameSpawnInterval = setInterval(() => {
      if (state.isGameRunning && state.activeHeartElements.length < 5) {
        spawnGameHeart();
      }
    }, 1100);
  }

  function stopMiniGame() {
    state.isGameRunning = false;
    if (state.gameSpawnInterval) {
      clearInterval(state.gameSpawnInterval);
      state.gameSpawnInterval = null;
    }
    // Clean up remaining hearts on board
    state.activeHeartElements.forEach(el => el.remove());
    state.activeHeartElements = [];
  }

  function spawnGameHeart() {
    if (!gameBoard || !state.isGameRunning) return;

    const heart = document.createElement('div');
    heart.className = 'floating-game-heart';

    const heartEmojis = ['💖', '❤️', '💕', '💗', '💓', '💝', '✨'];
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    const boardWidth = gameBoard.clientWidth || 320;
    const boardHeight = gameBoard.clientHeight || 300;

    const startX = Math.random() * (boardWidth - 60) + 10;
    let posY = boardHeight;
    const floatSpeed = Math.random() * 1.5 + 1.2;
    const swayAmount = Math.random() * 30 + 15;
    let swayTime = Math.random() * 10;

    heart.style.left = `${startX}px`;
    heart.style.top = `${posY}px`;

    // Heart Click / Tap handler
    const catchHandler = (e) => {
      e.stopPropagation();
      onHeartCaught(heart, e);
    };

    heart.addEventListener('pointerdown', catchHandler);

    gameBoard.appendChild(heart);
    state.activeHeartElements.push(heart);

    // Floating upward animation loop
    function moveHeart() {
      if (!heart.parentElement) return;
      posY -= floatSpeed;
      swayTime += 0.04;
      const currentX = startX + Math.sin(swayTime) * swayAmount;

      heart.style.top = `${posY}px`;
      heart.style.left = `${Math.max(10, Math.min(boardWidth - 60, currentX))}px`;

      if (posY < -60) {
        removeHeartElement(heart);
      } else {
        requestAnimationFrame(moveHeart);
      }
    }

    requestAnimationFrame(moveHeart);
  }

  function removeHeartElement(heart) {
    const idx = state.activeHeartElements.indexOf(heart);
    if (idx !== -1) state.activeHeartElements.splice(idx, 1);
    heart.remove();
  }

  function onHeartCaught(heart, event) {
    const rect = heart.getBoundingClientRect();
    const clickX = event.clientX || (rect.left + rect.width / 2);
    const clickY = event.clientY || (rect.top + rect.height / 2);

    // Sound FX & Sparkles
    if (window.romanticAudio) {
      window.romanticAudio.playHeartPopFx();
    }
    if (window.romanticParticles) {
      window.romanticParticles.createHeartPopBurst(clickX, clickY, 25);
    }

    removeHeartElement(heart);

    state.heartsCollected++;
    updateHeartCounterUI();

    // Show romantic toast message
    const messages = BIRTHDAY_CONFIG.miniGame.heartMessages;
    const randomMsg = messages[(state.heartsCollected - 1) % messages.length];
    showGameToast(randomMsg);

    // Check if target reached
    if (state.heartsCollected >= state.targetHearts) {
      triggerGameWin();
    }
  }

  function showGameToast(msg) {
    if (!gameToastEl) return;
    gameToastEl.textContent = msg;
    gameToastEl.classList.add('show');
    clearTimeout(gameToastEl.toastTimeout);
    gameToastEl.toastTimeout = setTimeout(() => {
      gameToastEl.classList.remove('show');
    }, 2400);
  }

  function updateHeartCounterUI() {
    if (heartCounterEl) heartCounterEl.textContent = state.heartsCollected;
  }

  function triggerGameWin() {
    state.isGameRunning = false;
    if (state.gameSpawnInterval) clearInterval(state.gameSpawnInterval);

    if (window.romanticParticles) {
      window.romanticParticles.triggerCelebrationFireworks(3);
    }

    if (gameCongratsModal) {
      gameCongratsModal.classList.add('visible');
    }
  }

  // ─── Scene 3: Typewriter Love Letter ──────────────────────────────
  function startTypewriterLoveLetter() {
    if (state.isTyping) return;
    state.isTyping = true;

    if (!letterTypingEl) return;
    letterTypingEl.innerHTML = '<span class="typewriter-cursor"></span>';

    const fullText = BIRTHDAY_CONFIG.birthdayReveal.letterParagraphs.join('\n\n');
    let charIndex = 0;

    function typeChar() {
      if (charIndex < fullText.length) {
        const char = fullText.charAt(charIndex);
        const currentContent = fullText.substring(0, charIndex + 1);
        
        letterTypingEl.innerHTML = currentContent.replace(/\n/g, '<br>') + '<span class="typewriter-cursor"></span>';
        charIndex++;

        // Gentle click sound on occasional letters
        if (charIndex % 3 === 0 && window.romanticAudio) {
          window.romanticAudio.playTypewriterFx();
        }

        const delay = char === '.' || char === '!' || char === '?' ? 280 : (char === ',' ? 150 : 32);
        state.typewriterTimeout = setTimeout(typeChar, delay);
      } else {
        state.isTyping = false;
        // Keep cursor blinking for romantic feel
        letterTypingEl.innerHTML = fullText.replace(/\n/g, '<br>') + '<span class="typewriter-cursor"></span>';
      }
    }

    if (state.typewriterTimeout) clearTimeout(state.typewriterTimeout);
    typeChar();
  }

  // ─── Scene 4: Memory Scrapbook & Gallery ──────────────────────────
  function renderScrapbook() {
    if (!scrapbookGrid || !categoryFilters) return;

    // Render Filter Chips
    const categories = BIRTHDAY_CONFIG.memories.categories;
    categoryFilters.innerHTML = '';
    categories.forEach(cat => {
      const chip = document.createElement('button');
      chip.className = `category-chip ${cat === state.currentCategory ? 'active' : ''}`;
      chip.textContent = cat;
      chip.addEventListener('click', () => {
        state.currentCategory = cat;
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderGalleryItems();
      });
      categoryFilters.appendChild(chip);
    });

    renderGalleryItems();
  }

  function renderGalleryItems() {
    if (!scrapbookGrid) return;
    scrapbookGrid.innerHTML = '';

    const items = BIRTHDAY_CONFIG.memories.items;
    const filtered = state.currentCategory === 'All' 
      ? items 
      : items.filter(item => item.category === state.currentCategory);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';

      const isVideo = item.type === 'video';

      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          ${isVideo 
            ? `<video class="polaroid-img" src="${item.url}" muted loop playsinline preload="metadata"></video>`
            : `<img class="polaroid-img" src="${item.url}" alt="${item.title}" loading="lazy" />`
          }
          ${isVideo ? '<div class="video-indicator-badge">▶ Video</div>' : ''}
        </div>
        <div class="polaroid-caption-area">
          <span class="polaroid-tag">${item.tag || item.category}</span>
          <h4 class="polaroid-title">${item.title}</h4>
          <span class="polaroid-date">${item.date}</span>
        </div>
      `;

      // Hover preview for video cards
      if (isVideo) {
        const vidEl = card.querySelector('video');
        if (vidEl) {
          card.addEventListener('mouseenter', () => vidEl.play().catch(() => {}));
          card.addEventListener('mouseleave', () => {
            vidEl.pause();
            vidEl.currentTime = 0;
          });
        }
      }

      card.addEventListener('click', () => openLightbox(item));
      scrapbookGrid.appendChild(card);
    });
  }

  function openLightbox(item) {
    if (!lightboxOverlay) return;

    if (window.romanticAudio) {
      window.romanticAudio.playButtonFx();
    }

    if (item.type === 'video') {
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = item.url;
      lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxImg.style.display = 'block';
      lightboxImg.src = item.url;
    }

    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxDate) lightboxDate.textContent = `${item.category} • ${item.date}`;

    lightboxOverlay.classList.add('active');
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = '';
    }
    lightboxOverlay.classList.remove('active');
  }

  // ─── Scene 5: "Our Story" Timeline ────────────────────────────────
  function renderTimeline() {
    if (!timelineEventsList) return;
    timelineEventsList.innerHTML = '';

    const events = BIRTHDAY_CONFIG.timeline.events;
    events.forEach(evt => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-node">${evt.icon || '❤️'}</div>
        <div class="timeline-card">
          <span class="timeline-badge">${evt.badge}</span>
          <h4 class="timeline-title">${evt.title}</h4>
          <div class="timeline-date">${evt.date}</div>
          <p class="timeline-desc">${evt.description}</p>
          ${evt.quote ? `<div class="timeline-quote">"${evt.quote}"</div>` : ''}
        </div>
      `;
      timelineEventsList.appendChild(item);
    });
  }

  // ─── Scene 6: Night Sky Lanterns & Replay ─────────────────────────
  function releaseSkyLantern(e) {
    const x = e ? e.clientX : (window.innerWidth / 2);
    const y = e ? e.clientY : (window.innerHeight - 50);

    if (window.romanticParticles) {
      window.romanticParticles.createSkyLantern(x, y);
    }
  }

  function replayStory() {
    if (window.romanticParticles) {
      window.romanticParticles.triggerCelebrationFireworks(3);
      window.romanticParticles.setNightSkyActive(false);
    }

    // Reset Gift Box
    if (giftBoxWrapper) giftBoxWrapper.classList.remove('opened');
    if (openingInitial) openingInitial.style.display = 'block';
    if (openingRevealed) openingRevealed.classList.remove('visible');

    // Go back to Scene 1
    goToScene(1);
  }

  // ─── In-App Live Customizer ───────────────────────────────────────
  function openCustomizer() {
    if (!customizerDrawer) return;

    // Fill form fields with current config
    const nameInput = document.getElementById('cfg-gf-name');
    const partnerInput = document.getElementById('cfg-partner-name');
    const bdayHeaderInput = document.getElementById('cfg-bday-header');
    const wishInput = document.getElementById('cfg-wish-text');
    const musicUrlInput = document.getElementById('cfg-music-url');

    if (nameInput) nameInput.value = BIRTHDAY_CONFIG.girlfriendName;
    if (partnerInput) partnerInput.value = BIRTHDAY_CONFIG.partnerName;
    if (bdayHeaderInput) bdayHeaderInput.value = BIRTHDAY_CONFIG.birthdayReveal.header;
    if (wishInput) wishInput.value = BIRTHDAY_CONFIG.finalSurprise.wishText;
    if (musicUrlInput) musicUrlInput.value = BIRTHDAY_CONFIG.audio.bgmUrl || '';

    customizerDrawer.classList.add('open');
  }

  function closeCustomizer() {
    if (customizerDrawer) customizerDrawer.classList.remove('open');
  }

  function saveCustomizer() {
    const nameInput = document.getElementById('cfg-gf-name');
    const partnerInput = document.getElementById('cfg-partner-name');
    const bdayHeaderInput = document.getElementById('cfg-bday-header');
    const wishInput = document.getElementById('cfg-wish-text');
    const musicUrlInput = document.getElementById('cfg-music-url');

    if (nameInput && nameInput.value.trim()) {
      BIRTHDAY_CONFIG.girlfriendName = nameInput.value.trim();
    }
    if (partnerInput && partnerInput.value.trim()) {
      BIRTHDAY_CONFIG.partnerName = partnerInput.value.trim();
    }
    if (bdayHeaderInput && bdayHeaderInput.value.trim()) {
      BIRTHDAY_CONFIG.birthdayReveal.header = bdayHeaderInput.value.trim();
    }
    if (wishInput && wishInput.value.trim()) {
      BIRTHDAY_CONFIG.finalSurprise.wishText = wishInput.value.trim();
    }
    if (musicUrlInput) {
      BIRTHDAY_CONFIG.audio.bgmUrl = musicUrlInput.value.trim();
    }

    populateConfigData();
    closeCustomizer();

    if (window.romanticParticles) {
      window.romanticParticles.createHeartPopBurst(window.innerWidth / 2, window.innerHeight / 2, 35);
    }
  }

  // ─── Setup Event Listeners ───────────────────────────────────────
  function setupEventListeners() {
    // Scene 1 Gift Box
    if (giftBoxWrapper) {
      giftBoxWrapper.addEventListener('click', openGiftBox);
    }
    if (toScene2Btn) {
      toScene2Btn.addEventListener('click', () => goToScene(2));
    }

    // Scene 2 Mini Game
    if (toScene3Btn) {
      toScene3Btn.addEventListener('click', () => goToScene(3));
    }

    // Scene 3 Birthday Reveal
    if (toScene4Btn) {
      toScene4Btn.addEventListener('click', () => goToScene(4));
    }

    // Scene 4 Scrapbook
    if (toScene5Btn) {
      toScene5Btn.addEventListener('click', () => goToScene(5));
    }

    // Lightbox
    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', closeLightbox);
    }
    if (lightboxOverlay) {
      lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
      });
    }

    // Scene 5 Timeline
    if (toScene6Btn) {
      toScene6Btn.addEventListener('click', () => goToScene(6));
    }

    // Scene 6 Night Sky
    if (replayStoryBtn) {
      replayStoryBtn.addEventListener('click', replayStory);
    }
    if (releaseLanternBtn) {
      releaseLanternBtn.addEventListener('click', (e) => releaseSkyLantern(e));
    }

    // Tap ANYWHERE on screen during Scene 6 to release a lantern at tap position
    document.addEventListener('pointerdown', (e) => {
      if (state.currentScene !== 6) return;
      // Don't trigger on buttons to avoid double-fire
      if (e.target.closest('button') || e.target.closest('.icon-btn')) return;
      releaseSkyLantern(e);
    });

    // Audio Controller Toggle
    if (musicToggleBtn) {
      musicToggleBtn.addEventListener('click', () => {
        if (window.romanticAudio) {
          window.romanticAudio.togglePlay();
        }
      });
    }

    // Customizer Modal
    if (settingsBtn) settingsBtn.addEventListener('click', openCustomizer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeCustomizer);
    if (saveCustomizerBtn) saveCustomizerBtn.addEventListener('click', saveCustomizer);

    // Progress Bar Steps Clickable
    progressLabels.forEach(lbl => {
      lbl.addEventListener('click', () => {
        const step = parseInt(lbl.getAttribute('data-step'), 10);
        goToScene(step);
      });
    });

    // Keyboard navigation (Escape closes modal)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        closeCustomizer();
      }
    });
  }

  // Run initialization
  init();
});
