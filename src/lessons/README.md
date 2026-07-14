# Writing a new lesson

`LessonPlayer.jsx` is the blueprint (no lesson-specific content at all).
Each day is just a plain JS object matching the shape below, rendered with:

```jsx
import LessonPlayer from "../LessonPlayer";
import day2 from "./lessons/day2-veo-video";

n<LessonPlayer lesson={day2} />
```

Copy `day1-gemini-song.js` as a starting template. Fields:

| n                                                    | Field                                                                                                                                                                                        | What it's for |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `day`, `id`                                          | Which day this is, used for roadmap unlock logic                                                                                                                                             |
| `theme`                                              | 5 hex colors (`color`,`accent`,`aqua`,`purple`,`ink`) — the whole UI reskins from these                                                                                                      |
| `course.days`                                        | The full week's roadmap nodes (`day`,`emoji`,`title`) — shared across lessons in the same week                                                                                               |
| `tool`                                               | The AI tool used this lesson — see "Adding a new tool" below                                                                                                                                 |
| `hook`, `mascotIntro`, `roadmap`                     | Opening beats copy                                                                                                                                                                           |
| `concept`                                            | The "big idea" beat — a one-line explanation + waveform-style bar heights                                                                                                                    |
| `vocab`                                              | Flip-card vocab list; give one card `demo: "tempo"` to show the built-in fast/slow ball animation instead of static example text                                                             |
| `walkthroughIntro`, `walkthroughSteps`, `microCheck` | The guided demo — see below                                                                                                                                                                  |
| `compare`                                            | Two prompts (`weak`/`strong`) with bar-height arrays for the "which is richer" beat                                                                                                          |
| `examples`                                           | Gallery cards kids swipe through and guess the mood/outcome of                                                                                                                               |
| `matchWords`, `categories`                           | The drag-to-bucket vocab practice game                                                                                                                                                       |
| `builder.fields`                                     | The picker rows for the "build your own prompt" beat. `builder.buildSentence(picks)` turns the picks into a sentence; `builder.previewBars(picks)` (optional) drives a fake waveform preview |
| `mission`, `completion`                              | Closing beats copy + XP/streak numbers                                                                                                                                                       |
| `mascotLines`                                        | All the mascot's one-off lines that aren't tied to a specific beat above (vocab intro, compare, gallery, practice reactions, builder, mission, launch-waiting)                               |
| `beats` (optional)                                   | Override the default 12-beat order/selection if a lesson needs to skip or reorder beats                                                                                                      |

## The walkthrough & `tool`

`tool.uiKind` picks which fake browser window renders in the walkthrough beat
(`toolMockups.jsx`). Today there's one: `"chatStyle"` — a Gemini-shaped chat UI
(sidebar, prompt pill, loading shimmer, response card). It works for any tool
where a kid types a prompt and gets media back.

n`tool.mediaType` (`"audio" | "video" | "image" | "text"`) picks which result
card renders when a walkthrough step's `screen` is `"result"` or `"save"`.

Each entry in `walkthroughSteps` is one frame of the demo:

```js
{ id: "mood", mascot: "Now pick a MOOD word...", mood: "idle",
  cursor: { x: "60%", y: "60%" }, screen: "prompt",
  tokens: [{ t: "A story about a ", h: null }, { t: "spooky ", h: "mood" }] }
```

`screen` is one of `home | prompt | prompt-full | loading | result | save`.
`tokens` (for prompt screens) are the highlighted words shown in the chat pill.
`resultData` (for result/save screens) overrides `tool.defaultResultData`.

### Adding a new tool with a different UI (e.g. a video-editor-style tool)

1. In `toolMockups.jsx`, write a new component with the same signature as
   `ChatStyleToolMockup({ tool, step })`.
2. Register it in `TOOL_UI_KINDS` under a new key, e.g. `canvasStyle`.
3. In the lesson's `tool` object, set `uiKind: "canvasStyle"`.

`LessonPlayer.jsx` never needs to change for this.
