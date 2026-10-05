import { PLAYLIST } from "../data/playlist";

/**
 * Spotify-Style Audio Manager Singleton
 * Manages playlist (Rab Wangu -> Noormahal), playback state, seeking, and volume.
 */
class SpotifyAudioManager {
  constructor() {
    this.playlist = PLAYLIST;
    this.currentIndex = 0;
    this.audio = typeof Audio !== "undefined" ? new Audio() : null;
    this.listeners = new Set();
    this.isStarted = false;
    this.isLooping = true; // Auto loop playlist
    this._hasInteractionTrigger = false;
    this.isDraggingSeek = false;

    if (this.audio) {
      this.audio.preload = "auto";
      this.audio.volume = 0.85;
      this.setupAudioListeners();
      this.loadTrack(0, false);
    }
  }

  setupAudioListeners() {
    if (!this.audio) return;

    this.audio.addEventListener("timeupdate", () => {
      if (!this.isDraggingSeek) {
        this.notify();
      }
    });

    this.audio.addEventListener("loadedmetadata", () => {
      this.notify();
    });

    this.audio.addEventListener("play", () => {
      this.notify();
    });

    this.audio.addEventListener("pause", () => {
      this.notify();
    });

    this.audio.addEventListener("volumechange", () => {
      this.notify();
    });

    this.audio.addEventListener("ended", () => {
      this.handleTrackEnded();
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Audio element error", e);
      this.notify();
    });
  }

  loadTrack(index, autoPlay = true) {
    if (!this.audio || index < 0 || index >= this.playlist.length) return;
    this.currentIndex = index;
    const track = this.playlist[index];
    this.audio.src = track.src;
    this.audio.currentTime = 0;

    if (autoPlay) {
      this.audio.play().then(() => {
        this.isStarted = true;
        this.notify();
      }).catch((err) => {
        console.warn("Playback interrupted or blocked", err);
        this.notify();
      });
    } else {
      this.notify();
    }
  }

  handleTrackEnded() {
    // Automatically transition to next song
    const nextIdx = (this.currentIndex + 1) % this.playlist.length;
    if (this.isLooping || nextIdx > this.currentIndex) {
      this.loadTrack(nextIdx, true);
    } else {
      this.notify();
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error(err);
      }
    });
  }

  getState() {
    const currentTrack = this.playlist[this.currentIndex] || this.playlist[0];
    return {
      playlist: this.playlist,
      currentIndex: this.currentIndex,
      currentTrack,
      isPlaying: this.audio ? !this.audio.paused : false,
      isMuted: this.audio ? this.audio.muted : false,
      volume: this.audio ? this.audio.volume : 0.85,
      currentTime: this.audio ? this.audio.currentTime || 0 : 0,
      duration: this.audio && !isNaN(this.audio.duration) ? this.audio.duration : 0,
      isLooping: this.isLooping,
    };
  }

  // Attempt autoplay immediately
  async tryAutoplay() {
    if (!this.audio || this.isStarted) return;

    try {
      if (!this.audio.src) {
        this.loadTrack(0, false);
      }
      await this.audio.play();
      this.isStarted = true;
      this.notify();
    } catch {
      // Browser blocked autoplay with sound; arm interaction listener
      this.armFirstInteractionTrigger();
    }
  }

  armFirstInteractionTrigger() {
    if (typeof window === "undefined" || this._hasInteractionTrigger) return;
    this._hasInteractionTrigger = true;

    const onGesture = async () => {
      if (!this.audio || this.isStarted) return;
      try {
        if (!this.audio.src) {
          this.loadTrack(0, false);
        }
        await this.audio.play();
        this.isStarted = true;
        this.notify();
        cleanup();
      } catch (err) {
        console.warn("Gesture unlock pending", err);
      }
    };

    const cleanup = () => {
      window.removeEventListener("click", onGesture, { capture: true });
      window.removeEventListener("touchstart", onGesture, { capture: true });
      window.removeEventListener("keydown", onGesture, { capture: true });
    };

    window.addEventListener("click", onGesture, { capture: true, once: true });
    window.addEventListener("touchstart", onGesture, { capture: true, once: true });
    window.addEventListener("keydown", onGesture, { capture: true, once: true });
  }

  togglePlay() {
    if (!this.audio) return;
    if (this.audio.paused) {
      if (!this.audio.src) {
        this.loadTrack(this.currentIndex, true);
        return;
      }
      this.audio.play().then(() => {
        this.isStarted = true;
        this.notify();
      }).catch(console.error);
    } else {
      this.audio.pause();
      this.notify();
    }
  }

  nextTrack() {
    const nextIdx = (this.currentIndex + 1) % this.playlist.length;
    this.loadTrack(nextIdx, true);
  }

  prevTrack() {
    if (!this.audio) return;
    // If playing more than 3s, restart current song
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      this.audio.play().catch(console.error);
      this.notify();
    } else {
      // Go to previous track
      const prevIdx = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
      this.loadTrack(prevIdx, true);
    }
  }

  restartCurrentTrack() {
    if (!this.audio) return;
    this.audio.currentTime = 0;
    this.audio.play().catch(console.error);
    this.notify();
  }

  selectTrack(index) {
    if (index === this.currentIndex) {
      this.togglePlay();
    } else {
      this.loadTrack(index, true);
    }
  }

  seekTo(seconds) {
    if (!this.audio) return;
    const dur = this.audio.duration || 0;
    const target = Math.max(0, Math.min(seconds, dur));
    this.audio.currentTime = target;
    this.notify();
  }

  seekRatio(ratio) {
    if (!this.audio) return;
    const dur = this.audio.duration || 0;
    if (dur > 0) {
      this.seekTo(ratio * dur);
    }
  }

  setVolume(level) {
    if (!this.audio) return;
    const clamped = Math.max(0, Math.min(1, level));
    this.audio.volume = clamped;
    if (clamped > 0 && this.audio.muted) {
      this.audio.muted = false;
    }
    this.notify();
  }

  toggleMute() {
    if (!this.audio) return;
    this.audio.muted = !this.audio.muted;
    this.notify();
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
    this.notify();
  }
}

export const audioManager = new SpotifyAudioManager();
