/**
 * TOOL MOCKUPS
 * ---------------------------------------------------------------
 * Every lesson's "watch me do it" walkthrough happens inside a fake
 * browser window that impersonates the real AI tool's web UI. Instead
 * of hand-building a new fake-UI component for every tool, a lesson's
 * data file just points at a `uiKind` (how the tool's screen is laid
 * out) and a `mediaType` (what kind of thing the tool produces), and
 * everything else — colors, copy, url, screenshots-in-miniature — is
 * data.
 *
 * Add a new tool (e.g. Day 2's video generator) by adding an entry to
 * a lesson file like:
 *   tool: { id: "veo", name: "Veo", url: "...", uiKind: "chatStyle", mediaType: "video", ... }
 * If a tool's real UI is too different for chatStyle (e.g. a canvas
 * editor), register a new uiKind renderer below and reference it the
 * same way — the blueprint doesn't need to change.
 * ---------------------------------------------------------------
 */

/**
 * Small shared renderer for a tokenized prompt string, e.g.
 * "An upbeat pop song about a brave penguin" with certain words
 * highlighted (mood/genre/detail). Duplicated (not imported) from
 * LessonPlayer.jsx on purpose, to keep this file import-free and
 * safe to drop into any bundler without circular-import surprises.
 */
export function PromptTokens({ tokens }) {
  return (
    <span>
      {tokens.map((tok, i) => (
        <span
          key={i}
          className={tok.h ? `gsl-token gsl-token-${tok.h}` : undefined}
        >
          {tok.t}
        </span>
      ))}
    </span>
  );
}

/* ---------- result-card renderers, keyed by what the tool produces ---------- */

function AudioResultCard({ data, showSave }) {
  return (
    <div className="gsl-mockup-response-card">
      <div className="gsl-mockup-albumart">
        <span className="gsl-mockup-playbtn">▶</span>
      </div>
      <div className="gsl-mockup-mini-wave">
        {(data.wave || [6, 14, 9, 18, 11, 16, 8, 13, 10, 15]).map((h, i) => (
          <span key={i} style={{ height: h, animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
      <span className="gsl-mockup-tracktitle">{data.title}</span>
      {showSave && (
        <button className="gsl-mockup-savebtn">💾 Save to portfolio</button>
      )}
    </div>
  );
}

function VideoResultCard({ data, showSave }) {
  return (
    <div className="gsl-mockup-response-card">
      <div className="gsl-mockup-videoframe">
        <span className="gsl-mockup-playbtn">▶</span>
        <span className="gsl-mockup-videolen">{data.duration || "0:08"}</span>
      </div>
      <span className="gsl-mockup-tracktitle">{data.title}</span>
      {showSave && (
        <button className="gsl-mockup-savebtn">💾 Save to portfolio</button>
      )}
    </div>
  );
}

function ImageResultCard({ data, showSave }) {
  const swatches = data.swatches || [
    "var(--lesson-color)",
    "var(--lesson-accent)",
    "var(--lesson-aqua)",
    "var(--lesson-purple)",
  ];
  return (
    <div className="gsl-mockup-response-card">
      <div className="gsl-mockup-imagegrid">
        {swatches.map((c, i) => (
          <div
            key={i}
            className="gsl-mockup-imagecell"
            style={{ background: c }}
          />
        ))}
      </div>
      <span className="gsl-mockup-tracktitle">{data.title}</span>
      {showSave && (
        <button className="gsl-mockup-savebtn">💾 Save to portfolio</button>
      )}
    </div>
  );
}

function TextResultCard({ data, showSave }) {
  return (
    <div className="gsl-mockup-response-card gsl-mockup-response-card--text">
      <p className="gsl-mockup-textblock">{data.text}</p>
      <span className="gsl-mockup-tracktitle">{data.title}</span>
      {showSave && (
        <button className="gsl-mockup-savebtn">💾 Save to portfolio</button>
      )}
    </div>
  );
}

export const RESULT_RENDERERS = {
  audio: AudioResultCard,
  video: VideoResultCard,
  image: ImageResultCard,
  text: TextResultCard,
};

/* ---------- uiKind renderers ---------- */

/**
 * "chatStyle" — a Gemini-shaped chat UI: left history sidebar, a
 * center pill you type/watch a prompt build in, a loading shimmer,
 * and a response card. Covers any tool where kids type a prompt into
 * a chat box and get media back (Gemini, most current AI tools).
 */
function ChatStyleToolMockup({ tool, step }) {
  const { screen, tokens, cursor } = step;
  const ResultCard = RESULT_RENDERERS[tool.mediaType] || TextResultCard;
  const resultData = step.resultData ||
    tool.defaultResultData || { title: "Untitled" };

  return (
    <div className="gsl-webwindow">
      <div className="gsl-webwindow-bar">
        <span className="gsl-dot red" />
        <span className="gsl-dot yellow" />
        <span className="gsl-dot green" />
        <span className="gsl-webwindow-url">
          🔒 {tool.urlLabel || tool.url.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="gsl-webapp">
        <div
          className="gsl-gemini-sidebar"
          style={{
            "--tool-grad-a": tool.brandGradient?.[0],
            "--tool-grad-b":
              tool.brandGradient?.[tool.brandGradient.length - 1],
          }}
        >
          <div className="gsl-gemini-sidebar-top">
            <span className="gsl-sidebar-icon">☰</span>
            <ToolSpark tool={tool} size={16} />
          </div>
          <button className="gsl-gemini-newchat">+ New chat</button>
          <div className="gsl-gemini-history">
            {[82, 58, 70, 45].map((w, i) => (
              <span
                key={i}
                className="gsl-gemini-hist-line"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>

        <div className="gsl-gemini-main">
          {screen === "home" && (
            <div className="gsl-gemini-home">
              <ToolSpark
                tool={tool}
                size={30}
                className="gsl-gemini-home-spark"
              />
              <p className="gsl-gemini-greeting">{tool.greeting}</p>
              <div className="gsl-gemini-pill">
                <span className="gsl-gemini-pill-plus">+</span>
                <span className="gsl-gemini-pill-placeholder">
                  {tool.placeholder}
                </span>
                <span className="gsl-gemini-pill-mic">🎙️</span>
              </div>
            </div>
          )}

          {(screen === "prompt" || screen === "prompt-full") && (
            <div className="gsl-gemini-chat">
              <div className="gsl-gemini-toolrow">
                {(tool.toolChips || ["🎨 Canvas"]).map((c) => (
                  <span key={c} className="gsl-gemini-tool-chip">
                    {c}
                  </span>
                ))}
              </div>
              <div className="gsl-gemini-pill gsl-gemini-pill--filled">
                <span className="gsl-gemini-pill-plus">+</span>
                <span className="gsl-gemini-pill-text">
                  <PromptTokens tokens={tokens || []} />
                </span>
                <span
                  className={`gsl-gemini-sendbtn ${screen === "prompt-full" ? "active" : ""}`}
                >
                  ↑
                </span>
              </div>
            </div>
          )}

          {screen === "loading" && (
            <div className="gsl-gemini-loading">
              <ToolSpark tool={tool} size={26} className="gsl-loading-spark" />
              <span className="gsl-gemini-shimmer">
                {tool.loadingText || "Working on it…"}
              </span>
            </div>
          )}

          {(screen === "result" || screen === "save") && (
            <div className="gsl-gemini-response gsl-fadein">
              <ToolSpark
                tool={tool}
                size={18}
                className="gsl-gemini-response-avatar"
              />
              <ResultCard data={resultData} showSave={screen === "save"} />
            </div>
          )}

          {cursor && (
            <div
              className="gsl-cursor"
              style={{ left: cursor.x, top: cursor.y }}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M4 2 L4 19 L8.3 15.4 L11 21 L13.6 19.8 L11 14.3 L17 14.3 Z"
                  fill="white"
                  stroke="#241748"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolSpark({ tool, size = 20, className = "" }) {
  const [c1, c2, c3] = tool.brandGradient || ["#4285F4", "#9168C0", "#D96570"];
  const gradId = `gsl-sparkle-grad-${tool.id}`;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 1 C12.6 6.2 13.9 9.6 16.5 11.5 C19 13.4 21.6 13.9 23 14 C21.6 14.1 19 14.6 16.5 16.5 C13.9 18.4 12.6 21.8 12 27 C11.4 21.8 10.1 18.4 7.5 16.5 C5 14.6 2.4 14.1 1 14 C2.4 13.9 5 13.4 7.5 11.5 C10.1 9.6 11.4 6.2 12 1 Z"
        fill={`url(#${gradId})`}
      />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const TOOL_UI_KINDS = {
  chatStyle: ChatStyleToolMockup,
};

/** Extra CSS needed for the video/image/text result cards (merged into the blueprint's stylesheet). */
export const TOOL_MOCKUP_CSS = `
.gsl-mockup-response-card { flex:1; display:flex; flex-direction:column; align-items:center; gap:0.4rem; background:var(--color-bg-warm); border-radius:var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px; padding:1rem; }
.gsl-mockup-response-card--text { align-items:flex-start; }
.gsl-mockup-textblock { font-size:var(--fs-sm); color:var(--color-text); margin:0; }
.gsl-mockup-videoframe { position:relative; width:120px; height:76px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; background:linear-gradient(160deg, var(--lesson-purple), var(--lesson-ink)); box-shadow:var(--shadow-glow); }
.gsl-mockup-videolen { position:absolute; right:6px; bottom:5px; font-size:9px; color:white; background:rgba(0,0,0,0.5); border-radius:4px; padding:1px 4px; }
.gsl-mockup-imagegrid { display:grid; grid-template-columns:1fr 1fr; gap:4px; width:100px; height:100px; border-radius:var(--radius-md); overflow:hidden; }
.gsl-mockup-imagecell { width:100%; height:100%; }
`;
