export function isVoiceSupported() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

let voicesCache = [];
let voicesDidLoad = false;

function loadVoices() {
  if (!isVoiceSupported()) return;
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  if (voices.length) {
    voicesCache = voices;
    voicesDidLoad = true;
    return;
  }

  const onVoicesChanged = () => {
    voicesCache = synth.getVoices();
    voicesDidLoad = true;
    synth.removeEventListener("voiceschanged", onVoicesChanged);
  };

  synth.addEventListener("voiceschanged", onVoicesChanged, { once: true });
}

function getPreferredVoice() {
  if (!isVoiceSupported()) return null;

  if (!voicesDidLoad) loadVoices();
  const synth = window.speechSynthesis;
  const voices = voicesCache.length ? voicesCache : synth.getVoices();

  if (!voices.length) return null;

  const preferredNames = [
    "child",
    "kids",
    "alloy",
    "samantha",
    "karen",
    "emma",
    "olivia",
    "ava",
    "luna",
    "google",
  ];

  const normalized = (name) => name.toLowerCase();

  const friendly = voices.find((voice) => {
    const name = voice.name ? normalized(voice.name) : "";
    return preferredNames.some((term) => name.includes(term));
  });
  if (friendly) return friendly;

  const locale = navigator.language || "en-US";
  const localePrefix = locale.toLowerCase().slice(0, 2);
  const localeMatch = voices.find(
    (voice) => voice.lang && voice.lang.toLowerCase().startsWith(localePrefix),
  );
  if (localeMatch) return localeMatch;

  return voices[0];
}

export function stopSpeaking() {
  if (!isVoiceSupported()) return;
  window.speechSynthesis.cancel();
}

export function speak(text, { rate = 0.85, onEnd } = {}) {
  if (!isVoiceSupported() || !text) {
    if (typeof onEnd === "function") {
      onEnd();
    }
    return;
  }

  stopSpeaking();

  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.rate = rate;

  const voice = getPreferredVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onend = () => {
    if (typeof onEnd === "function") {
      onEnd();
    }
  };

  utterance.onerror = () => {
    if (typeof onEnd === "function") {
      onEnd();
    }
  };

  window.speechSynthesis.speak(utterance);
}
