// Tiny Howler wrapper for SFX. TODO: replace placeholder paths with real files.
import { Howl } from "howler";
import { useProgressStore } from "../store/progressStore";

const SFX_MAP = {
  // TODO: provide real paths under /public/sfx/
  click: null, // '/sfx/click.wav'
  correct: null, // '/sfx/correct.wav'
  wrong: null, // '/sfx/wrong.wav'
  flip: null, // '/sfx/flip.wav'
  chime: null, // '/sfx/chime.wav'
  levelup: null, // '/sfx/levelup.wav'
  whoosh: null, // '/sfx/whoosh.wav'
};

const howls = {};

export function playSfx(name) {
  try {
    const muted =
      typeof useProgressStore.getState === "function"
        ? useProgressStore.getState().muted
        : false;
    if (muted) return;
  } catch (e) {
    // ignore
  }

  const url = SFX_MAP[name];
  if (!url) {
    // No URL configured yet — caller should still be safe.
    return;
  }
  if (!howls[name]) {
    howls[name] = new Howl({ src: [url], volume: 0.9 });
  }
  try {
    howls[name].play();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("[sfx] failed to play", name, e);
  }
}

export default playSfx;
