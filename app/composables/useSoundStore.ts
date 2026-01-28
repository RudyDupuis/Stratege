import { defineStore } from "pinia";

export const useSoundStore = defineStore("sound", () => {
  const sounds = ref<Record<string, HTMLAudioElement>>({});
  const isMuted = ref<boolean>(false);

  function addSound(name: string, path: string) {
    if (isDefined(sounds.value[name])) {
      return;
    }

    const audio = new Audio(path);
    audio.preload = "auto";
    sounds.value[name] = audio;
  }

  function playSound(name: string) {
    if (isMuted.value) {
      return;
    }
    const audio = sounds.value[name];
    if (isDefined(audio)) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  function toggleMuteSwitch() {
    isMuted.value = !isMuted.value;
    localStorage.setItem("soundMuted", String(isMuted.value));
  }

  function setupSoundAndMuteState() {
    if (typeof window === "undefined") {
      return;
    }

    isMuted.value = localStorage.getItem("soundMuted") === "true";

    addSound("button_click", "/sounds/button_click.mp3");
    addSound("player_turn", "/sounds/player_turn.mp3");
    addSound("kill_pawn", "/sounds/kill_pawn.mp3");
    addSound("lose_pawn", "/sounds/lose_pawn.mp3");
    addSound("win", "/sounds/win.mp3");
    addSound("lose", "/sounds/lose.mp3");
  }

  return {
    playSound,
    toggleMuteSwitch,
    setupSoundAndMuteState,
    isMuted
  };
});
