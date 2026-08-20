/**
 * ===================================================================
 * 🎵 ROMANTIC AUDIO & SOUND FX ENGINE 🎵
 * ===================================================================
 * - Built-in Web Audio API romantic music box / piano lullaby generator
 * - Web Audio procedural sound effects (chimes, clicks, pops, swooshes)
 * - Custom MP3 player support
 */

class RomanticAudioManager {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = (typeof BIRTHDAY_CONFIG !== 'undefined' && BIRTHDAY_CONFIG.audio && BIRTHDAY_CONFIG.audio.defaultVolume !== undefined)
      ? BIRTHDAY_CONFIG.audio.defaultVolume 
      : 0.2;
    this.customAudio = null;
    this.synthInterval = null;
    this.melodyStep = 0;
    this.isSynthesizerActive = false;

    // Classic Romantic "Happy Birthday To You" (Warm & Gentle Music Box)
    this.melodyNotes = [
      // Phrase 1: "Hap-py Birth-day to you"
      { note: 261.63, dur: 0.45 }, // C4 (Hap-)
      { note: 261.63, dur: 0.45 }, // C4 (-py)
      { note: 293.66, dur: 0.85 }, // D4 (Birth-)
      { note: 261.63, dur: 0.85 }, // C4 (-day)
      { note: 349.23, dur: 0.85 }, // F4 (to)
      { note: 329.63, dur: 1.5 },  // E4 (you...)

      // Phrase 2: "Hap-py Birth-day to you"
      { note: 261.63, dur: 0.45 }, // C4 (Hap-)
      { note: 261.63, dur: 0.45 }, // C4 (-py)
      { note: 293.66, dur: 0.85 }, // D4 (Birth-)
      { note: 261.63, dur: 0.85 }, // C4 (-day)
      { note: 392.00, dur: 0.85 }, // G4 (to)
      { note: 349.23, dur: 1.5 },  // F4 (you...)

      // Phrase 3: "Hap-py Birth-day dear Savi"
      { note: 261.63, dur: 0.45 }, // C4 (Hap-)
      { note: 261.63, dur: 0.45 }, // C4 (-py)
      { note: 523.25, dur: 0.85 }, // C5 (Birth-)
      { note: 440.00, dur: 0.85 }, // A4 (-day)
      { note: 349.23, dur: 0.85 }, // F4 (dear)
      { note: 329.63, dur: 0.85 }, // E4 (Sa-)
      { note: 293.66, dur: 1.5 },  // D4 (-vi...)

      // Phrase 4: "Hap-py Birth-day to you ❤️"
      { note: 466.16, dur: 0.45 }, // Bb4 (Hap-)
      { note: 466.16, dur: 0.45 }, // Bb4 (-py)
      { note: 440.00, dur: 0.85 }, // A4 (Birth-)
      { note: 349.23, dur: 0.85 }, // F4 (-day)
      { note: 392.00, dur: 0.85 }, // G4 (to)
      { note: 349.23, dur: 2.2 },  // F4 (you! ❤️)
    ];

    // Accompanying romantic warm bass & chords for each phrase
    this.chords = [
      [174.61, 220.00, 261.63], // F Maj
      [130.81, 164.81, 196.00], // C Maj
      [174.61, 220.00, 261.63], // F Maj
      [116.54, 146.83, 174.61], // Bb Maj
    ];

    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  ensureContextRunning() {
    if (!this.audioCtx) {
      this.initAudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
    this.updateUI();
    return this.isMuted;
  }

  togglePlay() {
    this.ensureContextRunning();
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.ensureContextRunning();
    this.isPlaying = true;

    const bgmUrl = BIRTHDAY_CONFIG.audio.bgmUrl;
    if (bgmUrl && bgmUrl.trim() !== "") {
      if (!this.customAudio) {
        this.customAudio = new Audio(bgmUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = this.isMuted ? 0 : this.volume;
      }
      this.customAudio.play().catch(e => {
        console.log("Audio play prevented or failed, using synth fallback", e);
        this.startProceduralSynth();
      });
    } else {
      this.startProceduralSynth();
    }

    this.updateUI();
  }

  pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopProceduralSynth();
    this.updateUI();
  }

  startProceduralSynth() {
    if (this.isSynthesizerActive) return;
    this.isSynthesizerActive = true;
    this.melodyStep = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.isSynthesizerActive) return;

      const item = this.melodyNotes[this.melodyStep % this.melodyNotes.length];
      const chordIndex = Math.floor((this.melodyStep / 3) % this.chords.length);
      
      // Play melody note
      this.playSynthNote(item.note, item.dur, 'sine', 0.28);

      // Play soft harmony chord on every 3 notes
      if (this.melodyStep % 3 === 0) {
        const chord = this.chords[chordIndex];
        chord.forEach(freq => {
          this.playSynthNote(freq / 2, 2.0, 'triangle', 0.08); // Lower octave warm pad
        });
      }

      this.melodyStep++;
      const nextDelay = (item.dur * 850) + 120;
      this.synthTimeout = setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  stopProceduralSynth() {
    this.isSynthesizerActive = false;
    if (this.synthTimeout) {
      clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }
  }

  playSynthNote(freq, duration = 0.5, type = 'sine', gainVal = 0.2) {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Music box sparkle overtone
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.005, now); // Slight detune for shimmer

      const actualGain = gainVal * this.volume;

      // Envelope: gentle attack, bell-like decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(actualGain, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(actualGain * 0.35, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch (e) {
      // Audio not permitted or errored
    }
  }

  // ─── Sound Effects ───────────────────────────────────────────────

  // Sparkly heart pop chime
  playHeartPopFx(pitchScale = 1.0) {
    if (this.isMuted || !this.audioCtx) return;
    this.ensureContextRunning();
    try {
      const now = this.audioCtx.currentTime;
      const freqs = [784, 987.77, 1174.66, 1567.98].map(f => f * pitchScale);
      
      freqs.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.001, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.18 * this.volume, now + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.35);
      });
    } catch (e) {}
  }

  // Magical gift box opening swoosh
  playGiftOpenFx() {
    if (this.isMuted || !this.audioCtx) return;
    this.ensureContextRunning();
    try {
      const now = this.audioCtx.currentTime;
      // Rising arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.15 * this.volume, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } catch (e) {}
  }

  // Gentle firework celebration sparkle sound
  playFireworkFx() {
    if (this.isMuted || !this.audioCtx) return;
    this.ensureContextRunning();
    try {
      const now = this.audioCtx.currentTime;
      // Ultra-soft airy pop
      const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.15);
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(70, now + 0.15);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.02 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      whiteNoise.start(now);

      // Add a very soft sparkly chime ping
      setTimeout(() => this.playHeartPopFx(1.4), 40);
    } catch (e) {}
  }

  // Gentle typewriter click
  playTypewriterFx() {
    if (this.isMuted || !this.audioCtx) return;
    this.ensureContextRunning();
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 150, now);

      gain.gain.setValueAtTime(0.03 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Soft button click chime
  playButtonFx() {
    if (this.isMuted || !this.audioCtx) return;
    this.ensureContextRunning();
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  updateUI() {
    const playBtn = document.getElementById('music-toggle-btn');
    const visualizer = document.getElementById('music-visualizer');
    const musicIcon = document.getElementById('music-icon');
    const musicText = document.getElementById('music-status-text');

    if (!playBtn) return;

    if (this.isPlaying && !this.isMuted) {
      playBtn.classList.add('playing');
      if (visualizer) visualizer.classList.add('active');
      if (musicIcon) musicIcon.innerHTML = '🎵';
      if (musicText) musicText.textContent = 'Playing Romantic Melody';
    } else {
      playBtn.classList.remove('playing');
      if (visualizer) visualizer.classList.remove('active');
      if (musicIcon) musicIcon.innerHTML = '🔇';
      if (musicText) musicText.textContent = this.isMuted ? 'Muted' : 'Paused';
    }
  }
}

// Global instance
window.romanticAudio = new RomanticAudioManager();
