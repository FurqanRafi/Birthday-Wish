/**
 * ===================================================================
 * ✨ ROMANTIC PARTICLES, FIREWORKS, HEARTS & NIGHT SKY CANVAS ENGINE ✨
 * ===================================================================
 */

class RomanticParticleEngine {
  constructor() {
    this.bgCanvas = document.getElementById('bg-particles-canvas');
    this.fxCanvas = document.getElementById('fx-particles-canvas');
    this.skyCanvas = document.getElementById('night-sky-canvas');

    this.bgCtx = this.bgCanvas ? this.bgCanvas.getContext('2d') : null;
    this.fxCtx = this.fxCanvas ? this.fxCanvas.getContext('2d') : null;
    this.skyCtx = this.skyCanvas ? this.skyCanvas.getContext('2d') : null;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.bgParticles = [];
    this.fxParticles = [];
    this.stars = [];
    this.shootingStars = [];
    this.skyLanterns = [];

    this.isSkyActive = false;
    this.isFireworksActive = false;
    this.fireworksTimer = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.createBgParticles(45);
    this.createStars(140);

    // Start continuous animation loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const canvases = [this.bgCanvas, this.fxCanvas, this.skyCanvas];
    canvases.forEach(c => {
      if (c) {
        c.width = this.width;
        c.height = this.height;
      }
    });

    if (this.stars.length === 0) {
      this.createStars(140);
    }
  }

  createBgParticles(count) {
    const types = ['heart', 'sparkle', 'petal', 'circle'];
    const colors = [
      'rgba(255, 117, 140, ', // blush pink
      'rgba(255, 182, 193, ', // light pink
      'rgba(255, 209, 102, ', // champagne gold
      'rgba(230, 190, 255, ', // soft lavender
      'rgba(255, 77, 109, '   // rose red
    ];

    for (let i = 0; i < count; i++) {
      this.bgParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: - (Math.random() * 0.8 + 0.3),
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayRange: Math.random() * 1.5 + 0.5,
        time: Math.random() * 100
      });
    }
  }

  createStars(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.3 ? '#ffffff' : (Math.random() > 0.5 ? '#ffd166' : '#ffb6c1')
      });
    }
  }

  // ─── Firework & Confetti Bursts ──────────────────────────────────
  triggerCelebrationFireworks(maxBursts = 4) {
    const limit = Math.min(Math.max(1, maxBursts), 4);
    if (this.isFireworksActive) return;
    this.isFireworksActive = true;
    let burstCount = 0;

    const launchInterval = setInterval(() => {
      if (!this.isFireworksActive || burstCount >= limit) {
        clearInterval(launchInterval);
        this.isFireworksActive = false;
        return;
      }
      this.createFirework(
        Math.random() * (this.width * 0.7) + this.width * 0.15,
        Math.random() * (this.height * 0.3) + this.height * 0.1
      );
      burstCount++;
    }, 700);
  }

  createFirework(x, y) {
    if (window.romanticAudio) {
      window.romanticAudio.playFireworkFx();
    }

    const particleCount = 28;
    const colors = ['#ff4d6d', '#ff758c', '#ffd166', '#ffb6c1', '#f72585', '#7209b7', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4 + 1.5;
      const isHeart = Math.random() > 0.6;

      this.fxParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.02,
        size: Math.random() * 3.5 + 2,
        color: color,
        gravity: 0.06,
        friction: 0.96,
        isHeart: isHeart
      });
    }
  }

  // Spark burst at specific coordinates (e.g., heart popped)
  createHeartPopBurst(x, y, count = 22) {
    const colors = ['#ff4d6d', '#ff758c', '#ffd166', '#ffffff', '#ff8fa3'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.5;
      this.fxParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.05,
        friction: 0.94,
        isHeart: Math.random() > 0.5
      });
    }
  }

  // ─── Night Sky Lanterns & Shooting Stars ─────────────────────────
  setNightSkyActive(active) {
    this.isSkyActive = active;
    if (active && this.shootingStars.length === 0) {
      this.spawnShootingStarLoop();
    }
  }

  spawnShootingStarLoop() {
    if (!this.isSkyActive) return;
    this.createShootingStar();
    const nextDelay = Math.random() * 3000 + 2000;
    setTimeout(() => this.spawnShootingStarLoop(), nextDelay);
  }

  createShootingStar() {
    const startX = Math.random() * (this.width * 0.8) + this.width * 0.1;
    const startY = Math.random() * (this.height * 0.4);
    const length = Math.random() * 120 + 80;
    const speed = Math.random() * 9 + 7;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;

    this.shootingStars.push({
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      alpha: 1,
      decay: 0.025
    });
  }

  // Lantern floating into the sky when tapped
  createSkyLantern(x, y, message = "") {
    if (window.romanticAudio) {
      window.romanticAudio.playHeartPopFx(1.1);
    }
    this.skyLanterns.push({
      x: x || (Math.random() * (this.width * 0.8) + this.width * 0.1),
      y: y || (this.height - 40),
      speedY: -(Math.random() * 1.2 + 0.8),
      speedX: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 18 + 24,
      alpha: 1,
      glowPulse: Math.random() * Math.PI,
      sway: Math.random() * 100,
      message: message
    });
  }

  // ─── Drawing Primitives ──────────────────────────────────────────
  drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Top left curve
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    // Bottom left curve
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.3);
    // Bottom right curve
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    // Top right curve
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(0, 0, size, 0);
    ctx.quadraticCurveTo(0, 0, 0, size);
    ctx.quadraticCurveTo(0, 0, -size, 0);
    ctx.quadraticCurveTo(0, 0, 0, -size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ─── Main Animation Loop ─────────────────────────────────────────
  animate() {
    // 1. Draw Ambient Background Canvas
    if (this.bgCtx) {
      this.bgCtx.clearRect(0, 0, this.width, this.height);

      this.bgParticles.forEach(p => {
        p.time += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.time) * p.swayRange;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around top
        if (p.y < -30) {
          p.y = this.height + 20;
          p.x = Math.random() * this.width;
        }

        const colorStr = p.color + p.opacity + ')';

        if (p.type === 'heart') {
          this.drawHeart(this.bgCtx, p.x, p.y, p.size, colorStr, p.opacity);
        } else if (p.type === 'sparkle') {
          this.drawSparkle(this.bgCtx, p.x, p.y, p.size * 0.8, colorStr, p.opacity);
        } else if (p.type === 'petal') {
          this.bgCtx.save();
          this.bgCtx.translate(p.x, p.y);
          this.bgCtx.rotate(p.rotation);
          this.bgCtx.fillStyle = colorStr;
          this.bgCtx.beginPath();
          this.bgCtx.ellipse(0, 0, p.size * 1.2, p.size * 0.6, 0, 0, Math.PI * 2);
          this.bgCtx.fill();
          this.bgCtx.restore();
        } else {
          // Glowing soft bokeh circle
          this.bgCtx.save();
          this.bgCtx.fillStyle = colorStr;
          this.bgCtx.beginPath();
          this.bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.bgCtx.fill();
          this.bgCtx.restore();
        }
      });
    }

    // 2. Draw FX Canvas (Fireworks, bursts, popping confetti)
    if (this.fxCtx) {
      this.fxCtx.clearRect(0, 0, this.width, this.height);

      for (let i = this.fxParticles.length - 1; i >= 0; i--) {
        const p = this.fxParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.fxParticles.splice(i, 1);
          continue;
        }

        if (p.isHeart) {
          this.drawHeart(this.fxCtx, p.x, p.y, p.size * 1.5, p.color, p.alpha);
        } else {
          this.fxCtx.save();
          this.fxCtx.fillStyle = p.color;
          this.fxCtx.globalAlpha = p.alpha;
          this.fxCtx.shadowBlur = 8;
          this.fxCtx.shadowColor = p.color;
          this.fxCtx.beginPath();
          this.fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.fxCtx.fill();
          this.fxCtx.restore();
        }
      }
    }

    // 3. Draw Night Sky Canvas (Scene 6)
    if (this.skyCtx && this.isSkyActive) {
      this.skyCtx.clearRect(0, 0, this.width, this.height);

      // Draw Twinkling Stars
      this.stars.forEach(s => {
        s.alpha += (Math.random() - 0.5) * s.twinkleSpeed;
        if (s.alpha > 0.9) s.alpha = 0.9;
        if (s.alpha < 0.2) s.alpha = 0.2;

        this.skyCtx.save();
        this.skyCtx.fillStyle = s.color;
        this.skyCtx.globalAlpha = s.alpha;
        this.skyCtx.beginPath();
        this.skyCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        this.skyCtx.fill();
        this.skyCtx.restore();
      });

      // Draw Shooting Stars
      for (let i = this.shootingStars.length - 1; i >= 0; i--) {
        const ss = this.shootingStars[i];
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.alpha -= ss.decay;

        if (ss.alpha <= 0 || ss.x > this.width || ss.y > this.height) {
          this.shootingStars.splice(i, 1);
          continue;
        }

        this.skyCtx.save();
        const grad = this.skyCtx.createLinearGradient(
          ss.x, ss.y,
          ss.x - (ss.dx / ss.speed) * ss.length,
          ss.y - (ss.dy / ss.speed) * ss.length
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        grad.addColorStop(1, 'rgba(255, 209, 102, 0)');

        this.skyCtx.strokeStyle = grad;
        this.skyCtx.lineWidth = 2;
        this.skyCtx.beginPath();
        this.skyCtx.moveTo(ss.x, ss.y);
        this.skyCtx.lineTo(
          ss.x - (ss.dx / ss.speed) * ss.length,
          ss.y - (ss.dy / ss.speed) * ss.length
        );
        this.skyCtx.stroke();
        this.skyCtx.restore();
      }

      // Draw Glowing Sky Lanterns
      for (let i = this.skyLanterns.length - 1; i >= 0; i--) {
        const l = this.skyLanterns[i];
        l.sway += 0.02;
        l.x += l.speedX + Math.sin(l.sway) * 0.6;
        l.y += l.speedY;
        l.glowPulse += 0.04;

        if (l.y < -80) {
          this.skyLanterns.splice(i, 1);
          continue;
        }

        this.skyCtx.save();
        this.skyCtx.translate(l.x, l.y);

        // Warm lantern glow aura
        const glowRad = l.size * (1.8 + Math.sin(l.glowPulse) * 0.2);
        const glowGrad = this.skyCtx.createRadialGradient(0, 0, 2, 0, 0, glowRad);
        glowGrad.addColorStop(0, 'rgba(255, 180, 50, 0.6)');
        glowGrad.addColorStop(0.5, 'rgba(255, 100, 50, 0.2)');
        glowGrad.addColorStop(1, 'rgba(255, 50, 50, 0)');

        this.skyCtx.fillStyle = glowGrad;
        this.skyCtx.beginPath();
        this.skyCtx.arc(0, 0, glowRad, 0, Math.PI * 2);
        this.skyCtx.fill();

        // Lantern Body (Soft rounded trapezoid / paper lantern)
        this.skyCtx.fillStyle = 'rgba(255, 210, 140, 0.95)';
        this.skyCtx.shadowBlur = 15;
        this.skyCtx.shadowColor = '#ffaa33';

        this.skyCtx.beginPath();
        this.skyCtx.roundRect(-l.size * 0.45, -l.size * 0.55, l.size * 0.9, l.size * 1.1, [8, 8, 4, 4]);
        this.skyCtx.fill();

        // Little inner candle flame
        this.skyCtx.fillStyle = '#ffffff';
        this.skyCtx.beginPath();
        this.skyCtx.arc(0, l.size * 0.2, l.size * 0.15, 0, Math.PI * 2);
        this.skyCtx.fill();

        this.skyCtx.restore();
      }
    }

    requestAnimationFrame(this.animate);
  }
}

// Global instance
window.romanticParticles = new RomanticParticleEngine();
