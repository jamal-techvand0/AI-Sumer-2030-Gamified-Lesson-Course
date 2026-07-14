import { useState, useEffect, useMemo } from "react";
import { TOOL_UI_KINDS, TOOL_MOCKUP_CSS } from "./toolMockups";

/**
 * LESSON PLAYER — the blueprint
 * ---------------------------------------------------------------
 * This file has ZERO lesson-specific content (no "penguin", no
 * "Gemini", no song words). It only knows how to play back a fixed
 * sequence of "beats" (hook -> roadmap -> concept -> vocab ->
 * walkthrough -> compare -> gallery -> practice -> builder ->
 * mission -> launch -> completion) using whatever content a lesson
 * data object hands it.
 *
 * To make a new lesson: write a new file in /lessons that exports an
 * object matching the shape documented in lessons/day1-gemini-song.js
 * and lessons/README.md, then render <LessonPlayer lesson={thatData} />.
 * ---------------------------------------------------------------
 */

export const DEFAULT_BEATS = ["hook", "roadmap", "concept", "vocab", "walkthrough", "compare", "gallery", "practice", "builder", "mission", "launch", "completion"];
const BEAT_LABELS = { hook: "Hook", roadmap: "Your journey", concept: "Big idea", vocab: "Vocab", walkthrough: "Walkthrough", compare: "Predict", gallery: "Examples", practice: "Practice", builder: "Build it", mission: "Mission", launch: "Launch", completion: "Complete" };

/* ================= SHARED PRIMITIVES ================= */

function useTypewriter(text, speed, onDone) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); onDone && onDone(); }
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return shown;
}

function Typewriter({ text, speed = 28, onDone }) {
  const shown = useTypewriter(text, speed, onDone);
  return <span>{shown}</span>;
}

function NextButton({ onClick, children = "Next", disabled = false }) {
  return <button className="gsl-btn gsl-btn-primary" onClick={onClick} disabled={disabled}>{children}</button>;
}

function BeatShell({ eyebrow, title, subtitle, children }) {
  return (
    <div className="gsl-beat gsl-fadein">
      {eyebrow && <span className="gsl-eyebrow">{eyebrow}</span>}
      {title && <h2 className="gsl-title">{title}</h2>}
      {subtitle && <p className="gsl-subtitle">{subtitle}</p>}
      <div className="gsl-beat-body">{children}</div>
    </div>
  );
}

function NoteParticles({ count = 10, glyphs = ["♪", "♫", "🎵", "🎶"] }) {
  const notes = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, glyph: glyphs[i % glyphs.length],
    left: Math.round(Math.random() * 96), delay: (Math.random() * 6).toFixed(2),
    duration: (7 + Math.random() * 6).toFixed(2), size: (1 + Math.random() * 1.2).toFixed(2),
  })), [count]);
  return (
    <div className="gsl-particles" aria-hidden="true">
      {notes.map((n) => (
        <span key={n.id} className="gsl-note" style={{ left: `${n.left}%`, animationDelay: `${n.delay}s`, animationDuration: `${n.duration}s`, fontSize: `${n.size}rem` }}>{n.glyph}</span>
      ))}
    </div>
  );
}

function ConfettiBurst({ count = 60 }) {
  const pieces = useMemo(() => {
    const colors = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#B19CD9", "#FF69B4", "#8FD14F"];
    return Array.from({ length: count }, (_, i) => ({
      id: i, left: Math.round(Math.random() * 100), color: colors[i % colors.length],
      delay: (Math.random() * 0.6).toFixed(2), duration: (2.2 + Math.random() * 1.6).toFixed(2),
      rotate: Math.round(Math.random() * 360), size: Math.round(6 + Math.random() * 6),
    }));
  }, [count]);
  return (
    <div className="gsl-confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span key={p.id} className="gsl-confetti-piece" style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, width: p.size, height: p.size * 0.4, transform: `rotate(${p.rotate}deg)` }} />
      ))}
    </div>
  );
}

function CountUp({ to, duration = 900 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{val}</>;
}

function StudioBackdrop() {
  const vinyls = useMemo(() => ([
    { top: "6%", left: "-6%", size: 130, dur: 22 },
    { top: "58%", left: "88%", size: 100, dur: 26 },
    { top: "80%", left: "-4%", size: 80, dur: 18 },
  ]), []);
  return (
    <div className="gsl-studio-bg" aria-hidden="true">
      <div className="gsl-spotlight gsl-spotlight-a" />
      <div className="gsl-spotlight gsl-spotlight-b" />
      <div className="gsl-stage-floor" />
      {vinyls.map((v, i) => <div key={i} className="gsl-vinyl" style={{ top: v.top, left: v.left, width: v.size, height: v.size, animationDuration: `${v.dur}s` }} />)}
    </div>
  );
}

export function PromptTokens({ tokens }) {
  return (
    <span>
      {tokens.map((tok, i) => (
        <span key={i} className={tok.h ? `gsl-token gsl-token-${tok.h}` : undefined}>{tok.t}</span>
      ))}
    </span>
  );
}

/* ---------- Mascot ---------- */

function MascotAvatar({ mood = "idle", size = 64, className = "" }) {
  const mouths = {
    idle: "M 22 40 Q 32 45 42 40", happy: "M 20 38 Q 32 50 44 38", excited: "M 18 36 Q 32 52 46 36",
    thinking: "M 25 42 Q 32 40 39 42", oops: "M 22 44 Q 32 37 42 44",
  };
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`gsl-mascot gsl-mascot-${mood} ${className}`} aria-hidden="true">
      <ellipse cx="32" cy="58" rx="16" ry="4" fill="var(--lesson-ink)" opacity="0.12" />
      <path d="M9 22 Q9 8 32 8 Q55 8 55 22" stroke="var(--lesson-purple)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="9" cy="24" r="5" fill="var(--lesson-purple)" />
      <circle cx="55" cy="24" r="5" fill="var(--lesson-purple)" />
      <ellipse cx="32" cy="35" rx="27" ry="25" fill="url(#gsl-mascot-grad)" />
      <line x1="32" y1="9" x2="32" y2="2" stroke="var(--lesson-accent)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="4" r="4" fill="var(--lesson-accent)" className="gsl-mascot-antenna" />
      <circle cx="21" cy="31" r="6.5" fill="white" />
      <circle cx="43" cy="31" r="6.5" fill="white" />
      <circle cx="21" cy="31" r="2.8" fill="#241748" className="gsl-mascot-pupil" />
      <circle cx="43" cy="31" r="2.8" fill="#241748" className="gsl-mascot-pupil" />
      <path d={mouths[mood] || mouths.idle} stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {mood === "excited" && <path d="M6 18 L9 21 M58 18 L55 21" stroke="var(--lesson-accent)" strokeWidth="2.2" strokeLinecap="round" />}
      {mood === "oops" && <circle cx="32" cy="50" r="3" fill="var(--lesson-accent)" opacity="0.7" />}
      {mood === "thinking" && <circle cx="50" cy="14" r="2.4" fill="var(--lesson-aqua)" className="gsl-mascot-think-dot" />}
      <defs>
        <radialGradient id="gsl-mascot-grad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--lesson-color)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--lesson-color) 78%, var(--lesson-purple))" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function MascotLine({ text, mood = "idle", onAdvance, isLast = true, size = 56, gating = true }) {
  const [done, setDone] = useState(false);
  return (
    <div className={`gsl-mascot-row ${gating ? "gsl-mascot-gating" : ""}`} onClick={() => { if (gating && done) onAdvance && onAdvance(); }}>
      <div className="gsl-mascot-wrap"><MascotAvatar mood={mood} size={size} /></div>
      <div className="gsl-bubble">
        <p><Typewriter text={text} speed={20} onDone={() => setDone(true)} /></p>
        {gating && done && <span className="gsl-bubble-hint">{isLast ? "Tap to continue" : "Tap for more \u203a"}</span>}
      </div>
    </div>
  );
}

function MascotGuide({ lines, moods, onDone }) {
  const [i, setI] = useState(0);
  const advance = () => { if (i < lines.length - 1) setI((n) => n + 1); else onDone(); };
  const mood = moods ? (moods[i] || "idle") : "idle";
  return <MascotLine key={i} text={lines[i]} mood={mood} onAdvance={advance} isLast={i === lines.length - 1} />;
}

function MascotNote({ text, mood = "idle", size = 50 }) {
  return (
    <div className="gsl-mascot-row gsl-mascot-note">
      <MascotAvatar mood={mood} size={size} />
      <div className="gsl-bubble gsl-bubble-note"><p><Typewriter text={text} speed={18} /></p></div>
    </div>
  );
}

/* ================= BEATS (each takes `lesson` + `onDone`) ================= */

function Hook({ lesson, onDone }) {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const { headline, sub } = lesson.hook;
  return (
    <div className="gsl-hook gsl-fadein" onClick={() => line2Done && onDone()}>
      <NoteParticles count={8} glyphs={lesson.particleGlyphs} />
      <div className="gsl-hook-glow" />
      <div className="gsl-hook-badge"><ToolFreeSpark size={30} className="gsl-hook-badge-spark" /></div>
      <h1 className="gsl-hook-headline"><Typewriter text={headline} onDone={() => setLine1Done(true)} /></h1>
      {line1Done && <p className="gsl-hook-sub"><Typewriter text={sub} speed={22} onDone={() => setLine2Done(true)} /></p>}
      {line2Done && <p className="gsl-tap-hint gsl-fadein">Tap anywhere to continue ✦</p>}
    </div>
  );
}

function ToolFreeSpark({ size = 20, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 1 C12.6 6.2 13.9 9.6 16.5 11.5 C19 13.4 21.6 13.9 23 14 C21.6 14.1 19 14.6 16.5 16.5 C13.9 18.4 12.6 21.8 12 27 C11.4 21.8 10.1 18.4 7.5 16.5 C5 14.6 2.4 14.1 1 14 C2.4 13.9 5 13.4 7.5 11.5 C10.1 9.6 11.4 6.2 12 1 Z" fill="url(#gsl-sparkle-grad-lesson)" />
      <defs>
        <linearGradient id="gsl-sparkle-grad-lesson" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="var(--lesson-aqua)" /><stop offset="55%" stopColor="var(--lesson-color)" /><stop offset="100%" stopColor="var(--lesson-purple)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Works out each course day's status relative to the lesson currently playing. */
function dayStatus(dayNum, currentDay, mode) {
  if (mode === "completion") {
    if (dayNum < currentDay) return "complete";
    if (dayNum === currentDay) return "active";
    return "locked";
  }
  if (dayNum === currentDay) return "active";
  if (dayNum < currentDay) return "complete";
  return "locked";
}

function Roadmap({ lesson, onDone }) {
  const [introDone, setIntroDone] = useState(false);
  const { intro } = lesson.mascotIntro ? lesson : { intro: null };
  const days = lesson.course.days;
  return (
    <BeatShell eyebrow={`Your ${lesson.course.name || "course"} journey`} title={`Lesson ${lesson.day} of ${lesson.course.totalLessons}`} subtitle={introDone ? lesson.roadmap.subtitle : undefined}>
      {!introDone ? (
        <MascotGuide lines={lesson.mascotIntro.lines} moods={lesson.mascotIntro.moods} onDone={() => setIntroDone(true)} />
      ) : (
        <>
          <div className="gsl-roadmap gsl-fadein">
            {days.map((d) => {
              const status = dayStatus(d.day, lesson.day, "roadmap");
              return (
                <div key={d.day} className={`gsl-roadmap-node ${status}`}>
                  <div className="gsl-roadmap-circle">{status === "locked" ? "🔒" : d.emoji}</div>
                  <span className="gsl-roadmap-daylabel">Day {d.day}</span>
                  <span className="gsl-roadmap-title">{status === "locked" ? "???" : d.title}</span>
                </div>
              );
            })}
          </div>
          <p className="gsl-roadmap-note gsl-fadein">{lesson.roadmap.streakNote || "Finish today's lesson to unlock the next day and start your streak 🔥"}</p>
          <NextButton onClick={onDone}>{lesson.roadmap.cta || `Let's start Day ${lesson.day}`}</NextButton>
        </>
      )}
    </BeatShell>
  );
}

function ConceptReveal({ lesson, onDone }) {
  const [played, setPlayed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlayed(true), 1700); return () => clearTimeout(t); }, []);
  const bars = lesson.concept.bars || [10, 22, 34, 20, 40, 26, 46, 18, 30, 24, 38, 14];
  return (
    <BeatShell eyebrow="Beat 3 · The big idea" title={lesson.concept.title}>
      <MascotNote text={lesson.concept.text} mood="idle" />
      <div className="gsl-concept-stage">
        <NoteParticles count={6} glyphs={lesson.particleGlyphs} />
        <svg viewBox="0 0 320 80" className="gsl-waveform">
          {bars.map((h, i) => <rect key={i} className="gsl-wavebar" x={i * 26 + 4} width="14" rx="4" fill={i % 2 === 0 ? "var(--lesson-color)" : "var(--lesson-accent)"} style={{ "--bar-h": h, animationDelay: `${i * 0.06}s` }} />)}
        </svg>
      </div>
      {played && <NextButton onClick={onDone}>Next</NextButton>}
    </BeatShell>
  );
}

function VocabCard({ item, flipped, onFlip }) {
  return (
    <div className={`gsl-flipcard ${flipped ? "flipped" : ""}`} onClick={onFlip}>
      <div className="gsl-flipcard-inner">
        <div className="gsl-flipcard-front">
          <span className="gsl-flipcard-emoji">{item.emoji}</span>
          <span className="gsl-flipcard-label">{item.label}</span>
          <span className="gsl-flipcard-tap">tap to reveal</span>
        </div>
        <div className="gsl-flipcard-back">
          <p>{item.definition}</p>
          {item.demo === "tempo" ? (
            <div className="gsl-tempo-demo">
              <div className="gsl-tempo-lane"><div className="gsl-ball gsl-ball-fast" /><span>fast</span></div>
              <div className="gsl-tempo-lane"><div className="gsl-ball gsl-ball-slow" /><span>slow</span></div>
            </div>
          ) : <p className="gsl-flipcard-example">{item.example}</p>}
        </div>
      </div>
    </div>
  );
}

function VocabBuilder({ lesson, onDone }) {
  const [flipped, setFlipped] = useState({});
  const vocab = lesson.vocab;
  const allFlipped = vocab.every((v) => flipped[v.id]);
  return (
    <BeatShell eyebrow="Beat 4 · Learn the words" title={lesson.vocabTitle || "Words that build a great prompt"}>
      <MascotNote text={lesson.mascotLines.vocab} mood="idle" />
      <div className="gsl-flipcard-row">
        {vocab.map((v) => <VocabCard key={v.id} item={v} flipped={!!flipped[v.id]} onFlip={() => setFlipped((f) => ({ ...f, [v.id]: true }))} />)}
      </div>
      <NextButton onClick={onDone} disabled={!allFlipped}>{allFlipped ? "Next" : `Flip all ${vocab.length} cards to continue`}</NextButton>
    </BeatShell>
  );
}

function ToolWalkthrough({ lesson, onDone }) {
  const [introDone, setIntroDone] = useState(false);
  const [step, setStep] = useState(0);
  const [checkAnswer, setCheckAnswer] = useState(null);
  const [showCheck, setShowCheck] = useState(false);
  const steps = lesson.walkthroughSteps;
  const current = steps[step];
  const ToolMockup = TOOL_UI_KINDS[lesson.tool.uiKind];
  const check = lesson.microCheck;

  useEffect(() => {
    if (introDone && current.id === "loading") {
      const t = setTimeout(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 1700);
      return () => clearTimeout(t);
    }
  }, [step, introDone]);

  const handleNextStep = () => {
    if (check && current.id === check.afterStepId && !showCheck) { setShowCheck(true); return; }
    if (step < steps.length - 1) { setStep((s) => s + 1); setShowCheck(false); setCheckAnswer(null); }
    else onDone();
  };

  if (!introDone) {
    return (
      <BeatShell eyebrow="Beat 5 · See it happen" title={lesson.walkthroughIntro.title}>
        <MascotGuide lines={lesson.walkthroughIntro.lines} moods={lesson.walkthroughIntro.moods} onDone={() => setIntroDone(true)} />
      </BeatShell>
    );
  }

  return (
    <BeatShell eyebrow="Beat 5 · See it happen" title={lesson.walkthroughIntro.title}>
      {ToolMockup && <ToolMockup tool={lesson.tool} step={current} />}

      <MascotLine text={current.mascot} mood={current.mood || "idle"} gating={false} />

      <div className="gsl-step-dots">{steps.map((_, i) => <span key={i} className={`gsl-step-dot ${i === step ? "active" : ""}`} />)}</div>

      {current.id !== "loading" && !showCheck && <NextButton onClick={handleNextStep}>{step < steps.length - 1 ? "Next step" : "Continue"}</NextButton>}

      {showCheck && check && (
        <div className="gsl-microcheck gsl-fadein">
          <p className="gsl-microcheck-q">{check.question}</p>
          <p className="gsl-microcheck-prompt">"{check.prompt}"</p>
          <div className="gsl-microcheck-options">
            {check.options.map((opt) => (
              <button key={opt.word} className={`gsl-chip ${checkAnswer === opt.word ? (opt.correct ? "correct" : "wrong") : ""}`} onClick={() => setCheckAnswer(opt.word)}>{opt.word}</button>
            ))}
          </div>
          {checkAnswer && <NextButton onClick={handleNextStep}>{check.options.find((o) => o.word === checkAnswer)?.correct ? "Nice! Continue" : `It's '${check.options.find((o) => o.correct)?.word}' — Continue anyway`}</NextButton>}
        </div>
      )}

      <a className="gsl-real-link" href={lesson.tool.url} target="_blank" rel="noopener noreferrer">Prefer to explore for real right now? Open {lesson.tool.name} ↗</a>
    </BeatShell>
  );
}

function ComparePredict({ lesson, onDone }) {
  const [guess, setGuess] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const { weak, strong } = lesson.compare;
  const pick = (which) => { setGuess(which); setTimeout(() => setRevealed(true), 400); };

  return (
    <BeatShell eyebrow="Beat 6 · Predict" title={lesson.compare.question || "Which prompt works better?"}>
      <MascotNote text={lesson.mascotLines.compare} mood="thinking" />
      <div className="gsl-compare-row">
        {[["weak", weak], ["strong", strong]].map(([key, item]) => (
          <button key={key} className={`gsl-compare-card ${guess === key ? "picked" : ""}`} disabled={!!guess} onClick={() => pick(key)}>"{item.text}"</button>
        ))}
      </div>
      {revealed && (
        <div className="gsl-reveal-row gsl-fadein">
          {[["weak", weak], ["strong", strong]].map(([key, item]) => (
            <div key={key} className={`gsl-reveal-card ${key === "strong" ? "highlight" : ""}`}>
              <div className="gsl-mini-wave">{item.bars.map((h, i) => <span key={i} style={{ height: h }} />)}</div>
              <span className="gsl-reveal-label">{key === "strong" ? "Richer" : "Simple"}</span>
            </div>
          ))}
        </div>
      )}
      {revealed && <p className="gsl-insight gsl-fadein">{lesson.mascotLines.compareReveal}</p>}
      {revealed && <NextButton onClick={onDone}>Next</NextButton>}
    </BeatShell>
  );
}

function ExampleCard({ ex }) {
  const [guess, setGuess] = useState(null);
  return (
    <div className="gsl-example-card">
      <span className="gsl-example-animal">{ex.icon}</span>
      <span>{ex.name}</span>
      <p className="gsl-example-prompt">"{ex.prompt}"</p>
      {!guess ? (
        <>
          <p className="gsl-example-ask">{ex.guessLabel || "Guess the mood:"}</p>
          <div className="gsl-example-options">{ex.guessOptions.map((m) => <button key={m} className="gsl-chip" onClick={() => setGuess(m)}>{m}</button>)}</div>
        </>
      ) : (
        <div className="gsl-example-result gsl-fadein">
          <p className={guess === ex.correctGuess ? "gsl-correct" : "gsl-wrong"}>{guess === ex.correctGuess ? "Exactly right!" : `Close! It's actually ${ex.correctGuess}`}</p>
          <div className="gsl-example-wave">{(ex.wave || [8, 16, 10, 20, 12, 18, 9, 15]).map((h, i) => <span key={i} style={{ height: h }} />)}</div>
          <span className="gsl-example-title">{ex.title}</span>
        </div>
      )}
    </div>
  );
}

function ExampleGallery({ lesson, onDone }) {
  const [index, setIndex] = useState(0);
  const examples = lesson.examples;
  return (
    <BeatShell eyebrow="Beat 7 · Get inspired" title={lesson.galleryTitle || "See what other kids made"}>
      <MascotNote text={lesson.mascotLines.gallery} mood="happy" />
      <div className="gsl-gallery-nav">
        <button className="gsl-arrow" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>←</button>
        <ExampleCard ex={examples[index]} key={index} />
        <button className="gsl-arrow" onClick={() => setIndex((i) => Math.min(examples.length - 1, i + 1))} disabled={index === examples.length - 1}>→</button>
      </div>
      <div className="gsl-step-dots">{examples.map((_, i) => <span key={i} className={`gsl-step-dot ${i === index ? "active" : ""}`} />)}</div>
      <NextButton onClick={onDone}>Next</NextButton>
    </BeatShell>
  );
}

function PracticeGame({ lesson, onDone }) {
  const { matchWords, categories, mascotLines } = lesson;
  const [pool] = useState(() => [...matchWords].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [reaction, setReaction] = useState(null);
  const allMatched = Object.keys(matched).length === matchWords.length;

  const tryMatch = (catId) => {
    if (!selected) return;
    if (selected.cat === catId) {
      setMatched((m) => ({ ...m, [selected.word]: catId }));
      setReaction({ mood: "happy", text: mascotLines.practiceCorrect[Math.floor(Math.random() * mascotLines.practiceCorrect.length)] });
      setSelected(null);
    } else {
      setWrongFlash(catId);
      setReaction({ mood: "oops", text: mascotLines.practiceWrong[Math.floor(Math.random() * mascotLines.practiceWrong.length)] });
      setTimeout(() => setWrongFlash(null), 400);
      setSelected(null);
    }
  };

  return (
    <BeatShell eyebrow="Beat 8 · Practice" title="Match the words">
      <MascotNote key={reaction ? reaction.text : "practice-intro"} text={reaction ? reaction.text : mascotLines.practice} mood={reaction ? reaction.mood : "idle"} />
      <div className="gsl-practice-words">
        {pool.map((w) => (
          <button key={w.word} className={`gsl-chip gsl-practice-word ${matched[w.word] ? "matched" : ""} ${selected?.word === w.word ? "selected" : ""}`} disabled={!!matched[w.word]} onClick={() => setSelected(w)}>{w.word}</button>
        ))}
      </div>
      <div className="gsl-practice-categories">
        {categories.map((c) => (
          <button key={c.id} className={`gsl-practice-bucket ${wrongFlash === c.id ? "wrong-flash" : ""}`} onClick={() => tryMatch(c.id)}>
            <span className="gsl-practice-bucket-emoji">{c.emoji}</span>
            <span>{c.label}</span>
            <span className="gsl-practice-count">{Object.values(matched).filter((v) => v === c.id).length}/{matchWords.filter((w) => w.cat === c.id).length}</span>
          </button>
        ))}
      </div>
      <NextButton onClick={onDone} disabled={!allMatched}>{allMatched ? "Great job! Next" : `Match all ${matchWords.length} words`}</NextButton>
    </BeatShell>
  );
}

function PickerRow({ field, value, onPick }) {
  return (
    <div className={`gsl-deck-row gsl-deck-row--${field.accent || "color"}`}>
      <span className="gsl-deck-label">{field.label}</span>
      <div className="gsl-deck-options">
        {field.options.map((opt) => <button key={opt} className={`gsl-deck-chip ${field.emoji ? "gsl-deck-chip--emoji" : ""} ${value === opt ? "selected" : ""}`} onClick={() => onPick(opt)}>{opt}</button>)}
      </div>
    </div>
  );
}

function PromptBuilder({ lesson, onDone }) {
  const { fields, buildSentence, previewBars } = lesson.builder;
  const [picks, setPicks] = useState({});
  const complete = fields.every((f) => picks[f.id]);
  const sentence = complete ? buildSentence(picks) : null;
  const bars = useMemo(() => (complete && previewBars ? previewBars(picks) : []), [complete, picks]);

  return (
    <BeatShell eyebrow="Beat 9 · Build your prompt" title={lesson.builder.title || "Now you try — build your own prompt"}>
      <MascotNote text={lesson.mascotLines.builder} mood="excited" />
      <div className="gsl-builder">
        {fields.map((f) => <PickerRow key={f.id} field={f} value={picks[f.id]} onPick={(v) => setPicks((p) => ({ ...p, [f.id]: v }))} />)}
      </div>
      <div className="gsl-tape">
        <div className="gsl-tape-reel" />
        <div className="gsl-tape-window">
          {sentence ? <p className="gsl-fadein" key={sentence}>"{sentence}"</p> : <p className="gsl-sentence-placeholder">{lesson.builder.placeholder || "Pick one option from each row..."}</p>}
        </div>
        <div className="gsl-tape-reel" />
      </div>
      {complete && bars.length > 0 && (
        <div className="gsl-preview-wave-card gsl-fadein">
          <span className="gsl-reveal-label">Your preview</span>
          <div className="gsl-mini-wave">{bars.map((h, i) => <span key={i} style={{ height: h }} />)}</div>
        </div>
      )}
      <NextButton onClick={onDone} disabled={!complete}>{complete ? "Love it! Next" : `Finish all ${fields.length} picks`}</NextButton>
    </BeatShell>
  );
}

function MissionBrief({ lesson, onDone }) {
  return (
    <BeatShell eyebrow="Beat 10 · Mission" title="Your turn!">
      <MascotNote text={lesson.mascotLines.mission} mood="excited" />
      <div className="gsl-mission-card gsl-slideup">
        <p>{lesson.mission.text}</p>
        <span className="gsl-mission-reward">{lesson.mission.reward}</span>
      </div>
      <NextButton onClick={onDone}>I'm ready</NextButton>
    </BeatShell>
  );
}

function LaunchGate({ lesson, onDone }) {
  const [launched, setLaunched] = useState(false);
  if (launched) {
    return (
      <BeatShell title="Waiting for you...">
        <MascotNote text={lesson.mascotLines.launchWaiting} mood="happy" />
        <div className="gsl-waiting-pulse" />
        <NextButton onClick={onDone}>I'm back — I made it!</NextButton>
      </BeatShell>
    );
  }
  return (
    <BeatShell eyebrow="Beat 11 · Launch" title={`Ready to try ${lesson.tool.name}?`}>
      <a className="gsl-btn gsl-btn-launch" href={lesson.tool.url} target="_blank" rel="noopener noreferrer" onClick={() => setLaunched(true)}>Open {lesson.tool.name} ↗</a>
    </BeatShell>
  );
}

function Completion({ lesson }) {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [line1Done, setLine1Done] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowRoadmap(true), 1400); return () => clearTimeout(t); }, []);
  const { lines, xp } = lesson.completion;
  const days = lesson.course.days;
  return (
    <BeatShell eyebrow="Lesson complete" title={lesson.completion.title}>
      <ConfettiBurst />
      <div className="gsl-mascot-row">
        <div className="gsl-mascot-wrap"><MascotAvatar mood="excited" size={56} /></div>
        <div className="gsl-bubble">
          <p><Typewriter text={lines[0]} speed={20} onDone={() => setLine1Done(true)} /></p>
          {line1Done && <p className="gsl-fadein"><Typewriter text={lines[1]} speed={20} /></p>}
        </div>
      </div>
      <div className="gsl-stars">
        <span className="gsl-star" style={{ animationDelay: "0.1s" }}>⭐</span>
        <span className="gsl-star" style={{ animationDelay: "0.3s" }}>⭐</span>
        <span className="gsl-star" style={{ animationDelay: "0.5s" }}>⭐</span>
      </div>
      <div className="gsl-xp-row">
        <div className="gsl-xp-card"><span className="gsl-xp-label">XP earned</span><span className="gsl-xp-value">+<CountUp to={xp.xp} /></span></div>
        <div className="gsl-xp-card"><span className="gsl-xp-label">Streak</span><span className="gsl-xp-value">🔥 <CountUp to={xp.streak} /> day</span></div>
        <div className="gsl-xp-card"><span className="gsl-xp-label">Portfolio</span><span className="gsl-xp-value">{xp.portfolioIcon || "🎵"} <CountUp to={xp.portfolio} /> item</span></div>
      </div>
      {showRoadmap && (
        <div className="gsl-roadmap gsl-fadein">
          {days.map((d) => {
            const status = dayStatus(d.day, lesson.day, "completion");
            const nextDay = d.day === lesson.day + 1;
            return (
              <div key={d.day} className={`gsl-roadmap-node ${status === "active" ? "locked" : status} ${nextDay ? "active" : ""}`}>
                <div className="gsl-roadmap-circle">{status === "complete" ? "✅" : nextDay ? d.emoji : "🔒"}</div>
                <span className="gsl-roadmap-daylabel">Day {d.day}</span>
                <span className="gsl-roadmap-title">{status === "complete" || nextDay ? d.title : "???"}</span>
              </div>
            );
          })}
        </div>
      )}
      <button className="gsl-btn gsl-btn-primary" disabled>Back to course map (Day {lesson.day + 1} unlocked)</button>
    </BeatShell>
  );
}

const BEAT_COMPONENTS = {
  hook: Hook, roadmap: Roadmap, concept: ConceptReveal, vocab: VocabBuilder,
  walkthrough: ToolWalkthrough, compare: ComparePredict, gallery: ExampleGallery,
  practice: PracticeGame, builder: PromptBuilder, mission: MissionBrief,
  launch: LaunchGate, completion: Completion,
};

/* ================= THE BLUEPRINT ITSELF ================= */

export default function LessonPlayer({ lesson }) {
  const BEATS = lesson.beats || DEFAULT_BEATS;
  const [beatIndex, setBeatIndex] = useState(0);
  const beat = BEATS[beatIndex];
  const Beat = BEAT_COMPONENTS[beat];
  const next = () => setBeatIndex((i) => Math.min(i + 1, BEATS.length - 1));
  const back = () => setBeatIndex((i) => Math.max(i - 1, 0));
  const theme = lesson.theme;

  return (
    <div className="gsl-scope" style={{ "--lesson-color": theme.color, "--lesson-accent": theme.accent, "--lesson-aqua": theme.aqua, "--lesson-purple": theme.purple, "--lesson-ink": theme.ink }}>
      <style>{CSS}</style>
      <div className="gsl-root">
        <StudioBackdrop />
        <div className="gsl-progress">
          {BEATS.map((b, i) => <span key={b} className={`gsl-progress-dot ${i === beatIndex ? "active" : ""} ${i < beatIndex ? "done" : ""}`} title={BEAT_LABELS[b]} />)}
        </div>
        {beatIndex > 0 && beat !== "launch" && beat !== "completion" && <button className="gsl-back" onClick={back} aria-label="Back">←</button>}
        <div className="gsl-stage" key={beat}>
          <Beat lesson={lesson} onDone={next} />
        </div>
      </div>
    </div>
  );
}

/* ================= CSS (generic — every color pulled from --lesson-* vars) ================= */

const CSS = `
.gsl-scope { --font-main:'Nunito',system-ui,sans-serif; --font-display:'Baloo 2','Nunito',system-ui,sans-serif; --fs-xs:0.75rem; --fs-sm:0.875rem; --fs-md:1rem; --fs-lg:1.15rem; --fs-xl:1.4rem; --fs-2xl:1.9rem; --fw-semibold:600; --fw-bold:800; --radius-md:10px; --radius-lg:16px; --radius-xl:24px; --radius-full:999px; --transition-fast:0.15s ease;
  --color-bg-card:#fff; --color-bg-warm:#FBF7F2; --color-border:#E4DED6; --color-border-light:#EDE8E1; --color-text:#241748; --color-text-secondary:#5B5468; --color-text-light:#948C99; --color-success:#3DCB6C; --color-warning:#FFB020; --color-error:#EF5A5A;
  --shadow-sm:0 2px 6px rgba(36,23,72,0.06); --shadow-card:0 6px 18px rgba(36,23,72,0.08); --shadow-lg:0 12px 30px rgba(36,23,72,0.12); --shadow-glow:0 0 0 4px color-mix(in srgb, var(--lesson-color) 18%, transparent), 0 8px 22px rgba(36,23,72,0.14);
  font-family:var(--font-main); color:var(--color-text); }
.gsl-root { position:relative; width:100%; max-width:640px; margin:0 auto; min-height:640px; background:var(--color-bg-card); border-radius:var(--radius-xl); padding:1.75rem; box-shadow:var(--shadow-lg); overflow:hidden; display:flex; flex-direction:column; }
.gsl-fadein { animation:gslFade 0.4s ease both; }
.gsl-slideup { animation:gslSlideUp 0.45s ease both; }
@keyframes gslFade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
@keyframes gslSlideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
@keyframes gslPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(0.85); } }
@keyframes gslSpin { to { transform:rotate(360deg); } }
.gsl-studio-bg { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0; }
.gsl-spotlight { position:absolute; width:260px; height:260px; border-radius:50%; filter:blur(50px); opacity:0.16; }
.gsl-spotlight-a { top:-80px; left:-60px; background:var(--lesson-color); }
.gsl-spotlight-b { bottom:-80px; right:-60px; background:var(--lesson-purple); }
.gsl-stage-floor { position:absolute; bottom:0; left:0; right:0; height:40%; background:linear-gradient(to top, color-mix(in srgb, var(--lesson-purple) 6%, transparent), transparent); }
.gsl-vinyl { position:absolute; border-radius:50%; background:repeating-radial-gradient(circle, var(--lesson-ink) 0 2px, transparent 2px 6px); opacity:0.08; animation:gslSpin linear infinite; }
.gsl-particles { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0; }
.gsl-note { position:absolute; bottom:-10%; opacity:0.35; color:var(--lesson-purple); animation:gslFloat linear infinite; }
@keyframes gslFloat { to { transform:translateY(-620px) rotate(20deg); opacity:0; } }
.gsl-progress { display:flex; gap:5px; justify-content:center; margin-bottom:1rem; z-index:1; }
.gsl-progress-dot { width:7px; height:7px; border-radius:50%; background:var(--color-border); transition:var(--transition-fast); }
.gsl-progress-dot.active { background:var(--lesson-color); width:16px; border-radius:4px; }
.gsl-progress-dot.done { background:color-mix(in srgb, var(--lesson-color) 45%, var(--color-border)); }
.gsl-back { position:absolute; top:1.6rem; left:1.6rem; z-index:2; width:32px; height:32px; border-radius:50%; border:none; background:var(--color-bg-warm); cursor:pointer; font-size:var(--fs-md); }
.gsl-stage { position:relative; z-index:1; flex:1; display:flex; align-items:center; justify-content:center; }
.gsl-beat { display:flex; flex-direction:column; align-items:center; gap:1rem; text-align:center; width:100%; }
.gsl-beat-body { display:flex; flex-direction:column; align-items:center; gap:1rem; width:100%; }
.gsl-eyebrow { font-size:var(--fs-xs); font-weight:var(--fw-semibold); color:var(--lesson-color); text-transform:uppercase; letter-spacing:0.08em; }
.gsl-title { font-family:var(--font-display); font-size:var(--fs-xl); font-weight:var(--fw-bold); margin:0; }
.gsl-subtitle { font-size:var(--fs-sm); color:var(--color-text-secondary); margin:0; max-width:420px; }
.gsl-btn { font-family:var(--font-main); font-weight:var(--fw-semibold); border:none; border-radius:var(--radius-full); padding:0.7rem 1.6rem; font-size:var(--fs-sm); cursor:pointer; transition:var(--transition-fast); }
.gsl-btn-primary { background:var(--lesson-color); color:white; box-shadow:0 4px 14px color-mix(in srgb, var(--lesson-color) 40%, transparent); }
.gsl-btn-primary:disabled { opacity:0.4; cursor:not-allowed; }
.gsl-btn-primary:hover:not(:disabled) { transform:translateY(-1px); }
.gsl-btn-launch { background:linear-gradient(135deg, var(--lesson-color), var(--lesson-purple)); color:white; box-shadow:var(--shadow-glow); text-decoration:none; display:inline-block; font-weight:var(--fw-bold); font-size:var(--fs-md); padding:0.9rem 2rem; }
.gsl-hook { position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; text-align:center; min-height:420px; cursor:pointer; padding:2rem; }
.gsl-hook-glow { position:absolute; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle, color-mix(in srgb, var(--lesson-color) 30%, transparent), transparent 70%); z-index:0; }
.gsl-hook-badge { position:relative; z-index:1; width:56px; height:56px; border-radius:50%; background:var(--color-bg-warm); display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-glow); }
.gsl-hook-headline { position:relative; z-index:1; font-family:var(--font-display); font-size:var(--fs-2xl); font-weight:var(--fw-bold); max-width:440px; margin:0; }
.gsl-hook-sub { position:relative; z-index:1; color:var(--color-text-secondary); font-size:var(--fs-md); margin:0; }
.gsl-tap-hint { position:relative; z-index:1; font-size:var(--fs-xs); color:var(--lesson-color); font-weight:var(--fw-semibold); }
.gsl-roadmap { display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center; }
.gsl-roadmap-node { display:flex; flex-direction:column; align-items:center; gap:4px; width:74px; }
.gsl-roadmap-circle { width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.3rem; background:var(--color-bg-warm); box-shadow:var(--shadow-sm); }
.gsl-roadmap-node.active .gsl-roadmap-circle { background:var(--lesson-color); box-shadow:var(--shadow-glow); }
.gsl-roadmap-node.complete .gsl-roadmap-circle { background:color-mix(in srgb, var(--color-success) 20%, var(--color-bg-warm)); }
.gsl-roadmap-node.locked .gsl-roadmap-circle { opacity:0.5; }
.gsl-roadmap-daylabel { font-size:var(--fs-xs); font-weight:var(--fw-semibold); }
.gsl-roadmap-title { font-size:var(--fs-xs); color:var(--color-text-light); text-align:center; }
.gsl-roadmap-note { font-size:var(--fs-sm); color:var(--color-text-secondary); }
.gsl-concept-stage { position:relative; width:100%; display:flex; justify-content:center; }
.gsl-waveform { width:100%; max-width:340px; height:90px; position:relative; z-index:1; }
.gsl-wavebar { animation:gslBarGrow 0.5s cubic-bezier(0.34,1.56,0.64,1) both; transform-origin:bottom; }
@keyframes gslBarGrow { from { height:4px; y:38px; } to { height:calc(var(--bar-h) * 1px); y:calc(40px - var(--bar-h) * 0.5px); } }
.gsl-flipcard-row { display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; }
.gsl-flipcard { width:150px; height:190px; perspective:1000px; cursor:pointer; }
.gsl-flipcard-inner { position:relative; width:100%; height:100%; transition:transform 0.6s; transform-style:preserve-3d; }
.gsl-flipcard.flipped .gsl-flipcard-inner { transform:rotateY(180deg); }
.gsl-flipcard-front, .gsl-flipcard-back { position:absolute; inset:0; backface-visibility:hidden; border-radius:var(--radius-lg); background:linear-gradient(160deg, var(--color-bg-card), color-mix(in srgb, var(--lesson-purple) 6%, var(--color-bg-card))); box-shadow:var(--shadow-card); border-top:3px solid color-mix(in srgb, var(--lesson-color) 55%, var(--lesson-purple)); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1rem; gap:0.25rem; }
.gsl-flipcard-emoji { font-size:2.2rem; }
.gsl-flipcard-label { font-weight:var(--fw-bold); font-size:var(--fs-lg); }
.gsl-flipcard-tap { font-size:var(--fs-xs); color:var(--color-text-light); }
.gsl-flipcard-back { transform:rotateY(180deg); background:color-mix(in srgb, var(--lesson-color) 10%, var(--color-bg-card)); font-size:var(--fs-sm); text-align:center; }
.gsl-flipcard-example { color:var(--color-text-secondary); font-size:var(--fs-xs); }
.gsl-tempo-demo { display:flex; flex-direction:column; gap:10px; align-items:flex-start; width:100%; }
.gsl-tempo-lane { display:flex; align-items:center; gap:8px; width:100%; overflow:hidden; }
.gsl-ball { width:14px; height:14px; border-radius:50%; background:var(--lesson-color); flex-shrink:0; }
.gsl-ball-fast { animation:gslBounce 0.6s ease-in-out infinite; }
.gsl-ball-slow { animation:gslBounce 2.2s ease-in-out infinite; }
@keyframes gslBounce { 0%,100% { transform:translateX(0); } 50% { transform:translateX(60px); } }
.gsl-webwindow { width:100%; max-width:460px; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-lg); background:var(--color-bg-card); border:1px solid var(--color-border-light); }
.gsl-webwindow-bar { display:flex; align-items:center; gap:6px; padding:0.55rem 0.9rem; background:var(--color-bg-warm); border-bottom:1px solid var(--color-border-light); }
.gsl-dot { width:9px; height:9px; border-radius:50%; }
.gsl-dot.red { background:#FF5F57; } .gsl-dot.yellow { background:#FEBC2E; } .gsl-dot.green { background:#28C840; }
.gsl-webwindow-url { margin-left:0.5rem; font-size:var(--fs-xs); color:var(--color-text-light); }
.gsl-webapp { display:flex; min-height:250px; background:var(--color-bg-card); }
.gsl-gemini-sidebar { width:108px; flex-shrink:0; background:color-mix(in srgb, var(--lesson-purple) 5%, var(--color-bg-warm)); border-right:1px solid var(--color-border-light); padding:0.75rem 0.6rem; display:flex; flex-direction:column; gap:0.7rem; }
.gsl-gemini-sidebar-top { display:flex; align-items:center; justify-content:space-between; }
.gsl-sidebar-icon { font-size:0.85rem; color:var(--color-text-light); }
.gsl-gemini-newchat { font-family:var(--font-main); font-size:10.5px; font-weight:var(--fw-semibold); border:1px solid var(--color-border); background:var(--color-bg-card); border-radius:var(--radius-full); padding:0.35rem 0.5rem; cursor:default; color:var(--color-text-secondary); }
.gsl-gemini-history { display:flex; flex-direction:column; gap:8px; margin-top:2px; }
.gsl-gemini-hist-line { height:6px; border-radius:3px; background:color-mix(in srgb, var(--lesson-purple) 14%, var(--color-border-light)); }
.gsl-gemini-main { position:relative; flex:1; min-height:250px; display:flex; align-items:center; justify-content:center; padding:1.3rem 1.2rem; background:linear-gradient(180deg, color-mix(in srgb, var(--lesson-purple) 4%, var(--color-bg-card)), var(--color-bg-card) 55%); }
.gsl-gemini-home { display:flex; flex-direction:column; align-items:center; gap:0.7rem; width:100%; }
.gsl-gemini-home-spark { animation:gslPulse 2.6s ease-in-out infinite; }
.gsl-gemini-greeting { font-family:var(--font-display); font-size:var(--fs-md); font-weight:var(--fw-semibold); color:var(--lesson-ink); text-align:center; }
.gsl-gemini-pill { width:100%; display:flex; align-items:center; gap:8px; background:var(--color-bg-card); border:1.5px solid var(--color-border); border-radius:var(--radius-full); padding:0.6rem 0.9rem; box-shadow:var(--shadow-sm); }
.gsl-gemini-pill--filled { border-color:color-mix(in srgb, var(--lesson-purple) 30%, var(--color-border)); }
.gsl-gemini-pill-plus { color:var(--color-text-light); font-weight:var(--fw-bold); flex-shrink:0; }
.gsl-gemini-pill-placeholder { flex:1; font-size:var(--fs-sm); color:var(--color-text-light); text-align:left; }
.gsl-gemini-pill-mic { flex-shrink:0; }
.gsl-gemini-chat { width:100%; display:flex; flex-direction:column; gap:0.6rem; }
.gsl-gemini-toolrow { display:flex; gap:6px; }
.gsl-gemini-tool-chip { font-size:10px; color:var(--color-text-secondary); background:var(--color-bg-warm); border-radius:var(--radius-full); padding:0.2rem 0.55rem; }
.gsl-gemini-pill-text { flex:1; font-size:var(--fs-sm); text-align:left; }
.gsl-gemini-sendbtn { flex-shrink:0; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:var(--color-border); color:white; font-weight:var(--fw-bold); transition:var(--transition-fast); }
.gsl-gemini-sendbtn.active { background:linear-gradient(135deg, #4285F4, #9168C0); box-shadow:0 0 0 3px color-mix(in srgb, #9168C0 30%, transparent); }
.gsl-gemini-loading { display:flex; flex-direction:column; align-items:center; gap:0.6rem; }
.gsl-loading-spark { animation:gslSpin 1.4s linear infinite; }
.gsl-gemini-shimmer { font-family:var(--font-display); font-size:var(--fs-sm); font-weight:var(--fw-semibold);
  background:linear-gradient(90deg, var(--color-text-light) 30%, var(--lesson-ink) 50%, var(--color-text-light) 70%); background-size:200% auto;
  -webkit-background-clip:text; background-clip:text; color:transparent; animation:gslShimmer 1.6s linear infinite; }
@keyframes gslShimmer { 0% { background-position:200% center; } 100% { background-position:-200% center; } }
.gsl-gemini-response { width:100%; display:flex; align-items:flex-start; gap:8px; }
.gsl-gemini-response-avatar { flex-shrink:0; margin-top:4px; }
.gsl-mockup-albumart { position:relative; width:76px; height:76px; border-radius:50%; display:flex; align-items:center; justify-content:center;
  background:conic-gradient(var(--lesson-color), var(--lesson-accent), var(--lesson-aqua), var(--lesson-purple), var(--lesson-color)); box-shadow:var(--shadow-glow); animation:gslSpin 7s linear infinite; }
.gsl-mockup-albumart:before { content:""; position:absolute; inset:28%; border-radius:50%; background:var(--lesson-ink); }
.gsl-mockup-playbtn { position:relative; z-index:1; color:white; font-size:0.8rem; animation:none; }
.gsl-mockup-mini-wave { display:flex; align-items:flex-end; gap:3px; height:30px; }
.gsl-mockup-mini-wave span { width:4px; background:linear-gradient(to top, var(--lesson-color), var(--lesson-aqua)); border-radius:2px; animation:gslDotBounce 1.1s ease-in-out infinite; }
.gsl-mockup-tracktitle { font-size:var(--fs-xs); color:var(--color-text-secondary); font-weight:var(--fw-semibold); }
.gsl-mockup-savebtn { margin-top:4px; background:var(--color-bg-warm); border:1px solid var(--color-border); border-radius:var(--radius-full); padding:0.4rem 0.9rem; font-size:var(--fs-xs); font-weight:var(--fw-semibold); }
@keyframes gslDotBounce { 0%,80%,100% { transform:translateY(0); opacity:0.5; } 40% { transform:translateY(-8px); opacity:1; } }
.gsl-cursor { position:absolute; font-size:1.3rem; color:var(--lesson-accent); filter:drop-shadow(0 0 6px color-mix(in srgb, var(--lesson-accent) 70%, transparent)); transform:translate(-30%,-30%); transition:left 0.7s ease, top 0.7s ease; }
.gsl-step-dots { display:flex; gap:6px; }
.gsl-step-dot { width:8px; height:8px; border-radius:50%; background:var(--color-border); }
.gsl-step-dot.active { background:var(--lesson-color); }
.gsl-microcheck { background:var(--color-bg-card); border-radius:var(--radius-lg); padding:1.5rem; box-shadow:var(--shadow-card); display:flex; flex-direction:column; gap:0.5rem; max-width:420px; }
.gsl-microcheck-q { font-weight:var(--fw-semibold); }
.gsl-microcheck-prompt { font-size:var(--fs-sm); color:var(--color-text-secondary); font-style:italic; }
.gsl-microcheck-options { display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; }
.gsl-chip { border:2px solid var(--color-border); background:var(--color-bg-card); border-radius:var(--radius-full); padding:0.5rem 1rem; font-size:var(--fs-sm); cursor:pointer; font-family:var(--font-main); transition:var(--transition-fast); }
.gsl-chip:hover { border-color:var(--lesson-color); }
.gsl-chip.selected { background:var(--lesson-color); border-color:var(--lesson-color); color:white; }
.gsl-chip.correct { background:var(--color-success); border-color:var(--color-success); color:white; }
.gsl-chip.wrong { background:var(--color-error); border-color:var(--color-error); color:white; }
.gsl-chip.matched { opacity:0.4; cursor:default; }
.gsl-chip:disabled { cursor:default; }
.gsl-real-link { font-size:var(--fs-xs); color:var(--color-text-light); }
.gsl-compare-row { display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; }
.gsl-compare-card { width:220px; padding:1rem; border-radius:var(--radius-lg); border:2px solid var(--color-border); background:var(--color-bg-card); font-size:var(--fs-sm); cursor:pointer; font-family:var(--font-main); transition:var(--transition-fast); box-shadow:var(--shadow-sm); }
.gsl-compare-card:hover:not(:disabled) { border-color:var(--lesson-color); transform:translateY(-2px); }
.gsl-compare-card.picked { border-color:var(--lesson-color); background:color-mix(in srgb, var(--lesson-color) 10%, var(--color-bg-card)); }
.gsl-reveal-row { display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; }
.gsl-reveal-card { width:220px; padding:1rem; border-radius:var(--radius-lg); background:var(--color-bg-card); box-shadow:var(--shadow-card); display:flex; flex-direction:column; align-items:center; gap:0.25rem; }
.gsl-reveal-card.highlight { box-shadow:var(--shadow-glow); border:2px solid var(--lesson-color); }
.gsl-reveal-label { font-size:var(--fs-xs); font-weight:var(--fw-semibold); color:var(--color-text-secondary); }
.gsl-mini-wave { display:flex; align-items:flex-end; gap:2px; height:40px; }
.gsl-mini-wave span { width:5px; background:var(--lesson-color); border-radius:2px; }
.gsl-insight { font-size:var(--fs-sm); color:var(--color-text-secondary); max-width:420px; }
.gsl-gallery-nav { display:flex; align-items:center; gap:0.75rem; width:100%; max-width:460px; justify-content:center; }
.gsl-arrow { width:36px; height:36px; border-radius:50%; border:2px solid var(--color-border); background:var(--color-bg-card); cursor:pointer; font-size:var(--fs-md); flex-shrink:0; }
.gsl-arrow:disabled { opacity:0.3; cursor:not-allowed; }
.gsl-arrow:hover:not(:disabled) { border-color:var(--lesson-color); }
.gsl-example-card { position:relative; background:linear-gradient(165deg, var(--color-bg-card), color-mix(in srgb, var(--lesson-aqua) 6%, var(--color-bg-card))); border-radius:var(--radius-lg); box-shadow:var(--shadow-card); padding:1.5rem; display:flex; flex-direction:column; align-items:center; gap:0.5rem; min-height:240px; flex:1; border-bottom:3px solid color-mix(in srgb, var(--lesson-aqua) 50%, var(--lesson-color)); }
.gsl-example-animal { font-size:2.4rem; }
.gsl-example-prompt { font-size:var(--fs-xs); color:var(--color-text-secondary); font-style:italic; text-align:center; }
.gsl-example-ask { font-size:var(--fs-sm); font-weight:var(--fw-semibold); }
.gsl-example-options { display:flex; gap:0.25rem; flex-wrap:wrap; justify-content:center; }
.gsl-example-result { display:flex; flex-direction:column; align-items:center; gap:0.25rem; }
.gsl-correct { color:var(--color-success); font-weight:var(--fw-semibold); }
.gsl-wrong { color:var(--color-warning); font-weight:var(--fw-semibold); }
.gsl-example-wave { display:flex; align-items:flex-end; gap:3px; height:30px; }
.gsl-example-wave span { width:4px; background:var(--lesson-color); border-radius:2px; }
.gsl-example-title { font-size:var(--fs-xs); color:var(--color-text-secondary); }
.gsl-practice-words { display:flex; gap:0.5rem; flex-wrap:wrap; justify-content:center; max-width:420px; }
.gsl-practice-categories { display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center; }
.gsl-practice-bucket { display:flex; flex-direction:column; align-items:center; gap:2px; padding:1rem; border-radius:var(--radius-lg); border:2px dashed var(--color-border); background:var(--color-bg-card); cursor:pointer; width:100px; font-family:var(--font-main); }
.gsl-practice-bucket:hover { border-color:var(--lesson-color); }
.gsl-practice-bucket.wrong-flash { border-color:var(--color-error); animation:gslShake 0.4s ease; }
@keyframes gslShake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-4px); } 75% { transform:translateX(4px); } }
.gsl-practice-bucket-emoji { font-size:1.5rem; }
.gsl-practice-count { font-size:var(--fs-xs); color:var(--color-text-light); }
.gsl-builder { width:100%; max-width:460px; display:flex; flex-direction:column; gap:1rem; }
.gsl-deck-row { display:flex; flex-direction:column; gap:0.4rem; align-items:flex-start; width:100%; padding:0.65rem 0.8rem; border-radius:var(--radius-lg); background:var(--color-bg-card); box-shadow:var(--shadow-sm); border-left:4px solid var(--gsl-deck-accent, var(--lesson-color)); }
.gsl-deck-row--color { --gsl-deck-accent:var(--lesson-color); }
.gsl-deck-row--accent { --gsl-deck-accent:var(--lesson-accent); }
.gsl-deck-row--aqua { --gsl-deck-accent:var(--lesson-aqua); }
.gsl-deck-row--purple { --gsl-deck-accent:var(--lesson-purple); }
.gsl-deck-label { font-family:var(--font-display); font-size:var(--fs-xs); font-weight:var(--fw-semibold); color:var(--gsl-deck-accent, var(--lesson-color)); text-transform:uppercase; letter-spacing:0.05em; }
.gsl-deck-options { display:flex; gap:0.4rem; flex-wrap:wrap; }
.gsl-deck-chip { border:2px solid var(--color-border); background:var(--color-bg-warm); border-radius:var(--radius-md); padding:0.4rem 0.8rem; font-size:var(--fs-sm); font-family:var(--font-main); cursor:pointer; transition:var(--transition-fast); }
.gsl-deck-chip:hover { border-color:var(--gsl-deck-accent, var(--lesson-color)); transform:translateY(-1px); }
.gsl-deck-chip.selected { border-color:var(--gsl-deck-accent, var(--lesson-color)); background:var(--gsl-deck-accent, var(--lesson-color)); color:white; box-shadow:0 4px 14px color-mix(in srgb, var(--gsl-deck-accent, var(--lesson-color)) 45%, transparent); }
.gsl-deck-chip--emoji { font-size:1.3rem; padding:0.3rem 0.6rem; }
.gsl-tape { display:flex; align-items:center; gap:0.75rem; width:100%; max-width:460px; background:var(--lesson-ink); border-radius:var(--radius-lg); padding:0.9rem 1rem; box-shadow:var(--shadow-card); }
.gsl-tape-reel { width:30px; height:30px; border-radius:50%; flex-shrink:0; background:repeating-conic-gradient(color-mix(in srgb, var(--lesson-purple) 60%, white) 0deg 15deg, var(--lesson-ink) 15deg 30deg); animation:gslSpin 4s linear infinite; }
.gsl-tape-window { flex:1; min-height:2.6rem; display:flex; align-items:center; justify-content:center; text-align:center; font-weight:var(--fw-semibold); color:white; font-size:var(--fs-sm); }
.gsl-sentence-placeholder { color:color-mix(in srgb, var(--lesson-aqua) 70%, white); font-size:var(--fs-sm); font-style:italic; font-weight:var(--fw-semibold); }
.gsl-preview-wave-card { display:flex; flex-direction:column; align-items:center; gap:0.5rem; background:var(--color-bg-card); border-radius:var(--radius-lg); padding:1rem 1.5rem; box-shadow:var(--shadow-card); }
.gsl-mission-card { background:linear-gradient(160deg, var(--color-bg-card), color-mix(in srgb, var(--lesson-purple) 8%, var(--color-bg-card))); border-radius:var(--radius-xl); padding:2rem; box-shadow:var(--shadow-glow); max-width:420px; display:flex; flex-direction:column; gap:1rem; border-top:4px solid var(--lesson-color); }
.gsl-mission-reward { font-weight:var(--fw-semibold); color:var(--lesson-color); }
.gsl-waiting-pulse { width:60px; height:60px; border-radius:50%; background:var(--lesson-color); animation:gslPulse 2s ease-in-out infinite; }
.gsl-confetti { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:2; }
.gsl-confetti-piece { position:absolute; top:-10%; border-radius:2px; animation:gslConfettiFall linear forwards; }
@keyframes gslConfettiFall { 0% { transform:translateY(0) rotate(0deg); opacity:1; } 100% { transform:translateY(520px) rotate(360deg); opacity:0; } }
.gsl-stars { display:flex; gap:0.5rem; }
.gsl-star { font-size:2rem; animation:gslStarPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
@keyframes gslStarPop { from { transform:scale(0) rotate(-20deg); opacity:0; } to { transform:scale(1) rotate(0deg); opacity:1; } }
.gsl-xp-row { display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center; }
.gsl-xp-card { display:flex; flex-direction:column; align-items:center; gap:2px; background:var(--color-bg-card); border-radius:var(--radius-lg); padding:0.75rem 1.25rem; box-shadow:var(--shadow-card); min-width:110px; }
.gsl-xp-label { font-size:var(--fs-xs); color:var(--color-text-secondary); }
.gsl-xp-value { font-size:var(--fs-lg); font-weight:var(--fw-bold); color:var(--lesson-color); }
.gsl-mascot-row { display:flex; align-items:flex-end; gap:0.75rem; width:100%; max-width:460px; text-align:left; }
.gsl-mascot-wrap { flex-shrink:0; }
.gsl-mascot { flex-shrink:0; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.12)); animation:gslMascotBob 3s ease-in-out infinite; }
@keyframes gslMascotBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
.gsl-mascot-pupil { animation:gslBlink 4.5s ease-in-out infinite; transform-origin:center; }
@keyframes gslBlink { 0%,92%,100% { transform:scaleY(1); } 96% { transform:scaleY(0.1); } }
.gsl-mascot-antenna { animation:gslPulse 2s ease-in-out infinite; transform-origin:center; }
.gsl-mascot-think-dot { animation:gslPulse 1s ease-in-out infinite; }
.gsl-bubble { position:relative; background:var(--color-bg-card); border-radius:var(--radius-lg); padding:0.75rem 1rem; box-shadow:var(--shadow-card); border:1.5px solid color-mix(in srgb, var(--lesson-purple) 14%, transparent); font-size:var(--fs-sm); flex:1; }
.gsl-bubble:before { content:""; position:absolute; left:-6px; bottom:14px; width:14px; height:14px; background:var(--color-bg-card); transform:rotate(45deg); }
.gsl-bubble p { margin:0; min-height:1.3em; }
.gsl-bubble p + p { margin-top:0.4rem; }
.gsl-bubble-note { background:color-mix(in srgb, var(--lesson-color) 6%, var(--color-bg-card)); }
.gsl-bubble-note:before { background:color-mix(in srgb, var(--lesson-color) 6%, var(--color-bg-card)); }
.gsl-bubble-hint { display:block; margin-top:0.35rem; font-size:var(--fs-xs); color:var(--lesson-color); font-weight:var(--fw-semibold); }
.gsl-mascot-gating { cursor:pointer; }
.gsl-token { border-radius:6px; padding:0 2px; transition:var(--transition-fast); }
.gsl-token-mood { background:color-mix(in srgb, var(--lesson-color) 25%, transparent); font-weight:var(--fw-semibold); }
.gsl-token-genre { background:color-mix(in srgb, var(--lesson-accent) 45%, transparent); font-weight:var(--fw-semibold); }
.gsl-token-detail { background:color-mix(in srgb, #77dd77 35%, transparent); font-weight:var(--fw-semibold); }
${TOOL_MOCKUP_CSS}
@media (max-width:480px) {
  .gsl-root { padding:1rem; border-radius:var(--radius-lg); min-height:560px; }
  .gsl-title { font-size:var(--fs-xl); }
  .gsl-hook-headline { font-size:var(--fs-2xl); }
  .gsl-flipcard { width:120px; height:160px; }
  .gsl-mascot-row { max-width:100%; }
}
`;
