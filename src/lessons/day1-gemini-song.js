/**
 * DAY 1 — "Turn words into a song" (Gemini)
 * Feed this straight into <LessonPlayer lesson={day1GeminiSong} />.
 * See lessons/README.md for the full field-by-field schema.
 */

const FULL_PROMPT_TOKENS = [
  { t: "An ", h: null },
  { t: "upbeat pop ", h: "genre" },
  { t: "song about a ", h: null },
  { t: "brave ", h: "mood" },
  { t: "penguin ", h: null },
  { t: "who loves to surf on icebergs.", h: "detail" },
];

const day1GeminiSong = {
  id: "day1-gemini-song",
  day: 1,
  beats: [
    "hook",
    "roadmap",
    "geminiCartoon",
    "concept",
    "vocab",
    "walkthrough",
    "compare",
    "gallery",
    "practice",
    "builder",
    "geminiLiveSandbox",
    "geminiVideoShowcase",
    "mission",
    "launch",
    "completion",
  ],
  cartoonScript: [
    {
      title: "The Soundless Woods",
      message: "Nova and {animalName} were exploring the Neon Woods when they realized... there was no sound! No chirps, no beats, nothing.",
      visual: "silent-woods",
      mascotMood: "thinking",
      soundEffect: "whoosh",
    },
    {
      title: "A Bright Idea!",
      message: "'Wait!' says Nova. 'We can use Gemini AI to compose a brand new theme song for you and bring the music back!'",
      visual: "idea-spark",
      mascotMood: "excited",
      soundEffect: "chime",
    },
    {
      title: "Drafting the Recipe",
      message: "{animalName} is styling! By mixing a fun genre (Pop) with a brave mood, they wrote down their prompt recipe.",
      visual: "recipe-scroll",
      mascotMood: "happy",
      soundEffect: "flip",
    },
    {
      title: "Gemini Magic!",
      message: "They pasted it in, pressed Send, and BOOM! Sparkles flew and a retro cassette emerged. The woods started dancing!",
      visual: "cassette-magic",
      mascotMood: "celebrating",
      soundEffect: "levelup",
    }
  ],
  sandboxPresets: [
    {
      title: "⚡ Superhero Theme",
      prompt: "An epic orchestral superhero theme song for a brave {animalName} who saves the forest using laser eyes",
      genre: "Orchestral",
      mood: "Mighty",
      tempo: "Fast",
      instrument: "Violin",
    },
    {
      title: "🌴 Beach Surf Party",
      prompt: "A bouncy upbeat pop track for a chill {animalName} catching waves on an iceberg at sunset",
      genre: "Pop",
      mood: "Excited",
      tempo: "Fast",
      instrument: "Drums",
    },
    {
      title: "☕ Midnight Coffee Shop",
      prompt: "A smooth, relaxing lo-fi hip hop track with soft guitar chords for a sleepy {animalName} reading a book",
      genre: "Lo-fi",
      mood: "Sleepy",
      tempo: "Slow",
      instrument: "Guitar",
    },
    {
      title: "🎸 Garage Rock Jam",
      prompt: "An energetic, distorted rock track with synth leads for a silly {animalName} who loves drumming on pots and pans",
      genre: "Rock",
      mood: "Silly",
      tempo: "Fast",
      instrument: "Synth",
    }
  ],
  theme: {
    color: "#FF6B6B",
    accent: "#FFC93C",
    aqua: "#3DCBC3",
    purple: "#B98BF5",
    ink: "#241748",
  },
  particleGlyphs: ["♪", "♫", "🎵", "🎶"],

  course: {
    name: "AI Summer",
    totalLessons: 20,
    days: [
      { day: 1, emoji: "🎵", title: "Theme song" },
      { day: 2, emoji: "📖", title: "Storybook page" },
      { day: 3, emoji: "🪪", title: "ID card" },
      { day: 4, emoji: "🖼️", title: "Impossible photo" },
      { day: 5, emoji: "🎉", title: "Week recap" },
    ],
  },

  tool: {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com",
    urlLabel: "gemini.google.com",
    uiKind: "chatStyle",
    mediaType: "audio",
    brandGradient: ["#4285F4", "#9168C0", "#D96570"],
    greeting: "Hi Explorer, what's on your mind?",
    placeholder: "Ask Gemini to create a song…",
    loadingText: "Composing your track…",
    toolChips: ["🎨 Canvas", "🖼️ Image"],
    defaultResultData: { title: "Percy's Surf Anthem.mp3" },
  },

  hook: {
    headline: "Ever imagined a song in your head... and it became real?",
    sub: "All it takes is the right words.",
  },

  mascotIntro: {
    lines: [
      "Hey! I'm Nova ⭐ your AI guide for the summer.",
      "Today we're turning WORDS into real MUSIC using an AI tool called Gemini.",
      "I'll show you exactly how, step by step. Ready?",
    ],
    moods: ["happy", "idle", "excited"],
  },

  roadmap: {
    subtitle:
      "Every lesson unlocks a new creative superpower. Today, you're making music.",
    streakNote:
      "Finish today's lesson to unlock Day 2 and start your streak 🔥",
    cta: "Let's start Day 1",
  },

  concept: {
    title: "Words become music",
    text: "Gemini can't hear the song in your head — but it CAN read your words. The more detail you give, the better the song.",
    bars: [10, 22, 34, 20, 40, 26, 46, 18, 30, 24, 38, 14],
  },

  vocabTitle: "Three words that build a great prompt",
  vocab: [
    {
      id: "mood",
      label: "Mood",
      emoji: "🎭",
      definition:
        "The feeling a song gives you — happy, spooky, calm, brave, silly...",
      example:
        "A brave mood might sound bold and loud. A calm mood sounds soft and slow.",
    },
    {
      id: "genre",
      label: "Genre",
      emoji: "🎸",
      definition:
        "The style or category of music — pop, lo-fi, orchestral, rock...",
      example: "Pop is bouncy and catchy. Lo-fi is chill and dreamy.",
    },
    {
      id: "tempo",
      label: "Tempo",
      emoji: "⏱️",
      definition: "How fast or slow the song moves.",
      demo: "tempo",
    },
  ],

  walkthroughIntro: {
    title: "Let's watch Gemini make a song",
    lines: [
      "Okay, follow me — I'll show you exactly how this works on Gemini.",
      "Watch my cursor 👆 and read what I do at each step.",
    ],
    moods: ["happy", "idle"],
  },

  walkthroughSteps: [
    {
      id: "home",
      mascot:
        "First, open gemini.google.com — you'll land right here, ready to type.",
      mood: "idle",
      cursor: { x: "58%", y: "62%" },
      screen: "home",
    },
    {
      id: "subject",
      mascot:
        "Let's build the prompt piece by piece. Start with WHO the song is about.",
      mood: "idle",
      cursor: { x: "60%", y: "60%" },
      screen: "prompt",
      tokens: [
        { t: "A song about a ", h: null },
        { t: "penguin", h: null },
      ],
    },
    {
      id: "mood",
      mascot: "Now sprinkle in a MOOD word — how should it feel?",
      mood: "idle",
      cursor: { x: "60%", y: "60%" },
      screen: "prompt",
      tokens: [
        { t: "A song about a ", h: null },
        { t: "brave ", h: "mood" },
        { t: "penguin", h: null },
      ],
    },
    {
      id: "genre",
      mascot: "Next, pick a GENRE — what style of music is it?",
      mood: "idle",
      cursor: { x: "60%", y: "60%" },
      screen: "prompt",
      tokens: [
        { t: "An ", h: null },
        { t: "upbeat pop ", h: "genre" },
        { t: "song about a ", h: null },
        { t: "brave ", h: "mood" },
        { t: "penguin", h: null },
      ],
    },
    {
      id: "detail",
      mascot: "Add one fun detail to make it extra specific!",
      mood: "excited",
      cursor: { x: "60%", y: "60%" },
      screen: "prompt",
      tokens: FULL_PROMPT_TOKENS,
    },
    {
      id: "generate",
      mascot: "That's a great prompt! Now tap the arrow to send it.",
      mood: "excited",
      cursor: { x: "87%", y: "60%" },
      screen: "prompt-full",
      tokens: FULL_PROMPT_TOKENS,
    },
    {
      id: "loading",
      mascot: "Gemini is composing... this takes a few seconds.",
      mood: "thinking",
      screen: "loading",
    },
    {
      id: "result",
      mascot: "It's ready — listen to what it made!",
      mood: "excited",
      cursor: { x: "55%", y: "55%" },
      screen: "result",
      resultData: { title: "Percy's Surf Anthem.mp3" },
    },
    {
      id: "save",
      mascot: "Love it? Save it to your portfolio!",
      mood: "happy",
      cursor: { x: "55%", y: "80%" },
      screen: "save",
      resultData: { title: "Percy's Surf Anthem.mp3" },
    },
  ],

  microCheck: {
    afterStepId: "detail",
    question: "Which word in that prompt is the MOOD?",
    prompt:
      "An upbeat pop song about a brave penguin who loves to surf on icebergs.",
    options: [
      { word: "pop", correct: false },
      { word: "brave", correct: true },
      { word: "penguin", correct: false },
    ],
  },

  compare: {
    question: "Which prompt makes a richer song?",
    weak: { text: "a song about a dog", bars: [9, 12, 9, 12, 9, 12, 9, 12] },
    strong: {
      text: "An energetic rock song about a fearless dog named Max chasing his tail at top speed",
      bars: [18, 27, 15, 30, 21, 36, 18, 27, 33, 24, 15, 30],
    },
  },

  galleryTitle: "Songs other kids imagined",
  examples: [
    {
      icon: "🐧",
      name: "Percy the Penguin",
      prompt: "Upbeat pop song, brave penguin, surfing on icebergs",
      guessOptions: ["😌 Calm", "🤩 Excited", "😱 Scared"],
      correctGuess: "🤩 Excited",
      title: "Percy's Surf Anthem",
    },
    {
      icon: "🦊",
      name: "Fern the Fox",
      prompt: "Chill lo-fi song, clever fox, sneaking through moonlit forest",
      guessOptions: ["🤩 Excited", "😌 Calm", "😡 Angry"],
      correctGuess: "😌 Calm",
      title: "Fern's Midnight Walk",
    },
    {
      icon: "🐉",
      name: "Blaze the Dragon",
      prompt:
        "Epic orchestral song, mighty dragon, guarding a mountain of gold",
      guessOptions: ["😴 Sleepy", "😌 Calm", "💪 Mighty"],
      correctGuess: "💪 Mighty",
      title: "Blaze's Mountain Roar",
    },
    {
      icon: "🤖",
      name: "Byte the Robot Pet",
      prompt: "Silly electro-pop song, clumsy robot pet, learning to dance",
      guessOptions: ["😂 Silly", "😢 Sad", "😌 Calm"],
      correctGuess: "😂 Silly",
      title: "Byte's Wobbly Groove",
    },
  ],

  matchWords: [
    { word: "Brave", cat: "mood" },
    { word: "Sleepy", cat: "mood" },
    { word: "Lo-fi", cat: "genre" },
    { word: "Orchestral", cat: "genre" },
    { word: "Fast", cat: "tempo" },
    { word: "Slow", cat: "tempo" },
  ],
  categories: [
    { id: "mood", label: "Mood", emoji: "🎭" },
    { id: "genre", label: "Genre", emoji: "🎸" },
    { id: "tempo", label: "Tempo", emoji: "⏱️" },
  ],

  builder: {
    title: "Now you try — build your own song idea",
    placeholder: "Pick one option from each row to build your song idea...",
    fields: [
      {
        id: "animal",
        label: "Animal",
        accent: "purple",
        emoji: true,
        options: ["🐧", "🦊", "🐉", "🤖", "🐱", "🦁"],
      },
      {
        id: "mood",
        label: "Mood",
        accent: "color",
        options: ["Brave", "Calm", "Silly", "Mighty", "Sleepy", "Excited"],
      },
      {
        id: "genre",
        label: "Genre",
        accent: "accent",
        options: ["Pop", "Lo-fi", "Rock", "Orchestral", "Electro"],
      },
      {
        id: "tempo",
        label: "Tempo",
        accent: "aqua",
        options: ["Slow", "Medium", "Fast"],
      },
      {
        id: "instrument",
        label: "Instrument",
        accent: "purple",
        options: ["Piano", "Guitar", "Drums", "Synth", "Violin"],
      },
    ],
    buildSentence: (p) =>
      `A ${p.tempo.toLowerCase()}-paced ${p.genre.toLowerCase()} song with ${p.instrument.toLowerCase()}, about a ${p.mood.toLowerCase()} ${p.animal} character.`,
    previewBars: (p) => {
      const base = p.tempo === "Fast" ? 30 : p.tempo === "Slow" ? 14 : 22;
      return Array.from({ length: 12 }, (_, i) =>
        Math.max(6, base + Math.round(Math.sin(i * 1.3) * base * 0.6)),
      );
    },
  },

  mission: {
    text: "Open Gemini and use the recipe you just practiced — animal + mood + genre + tempo + instrument — to create your own theme song.",
    reward: "+1 Portfolio item · +50 XP",
  },

  completion: {
    title: "You made a song! 🎉",
    lines: [
      "YES! You just used AI to turn your words into real music. That's a superpower.",
      "See you tomorrow for Day 2!",
    ],
    xp: { xp: 50, streak: 1, portfolio: 1, portfolioIcon: "🎵" },
  },

  videoShowcase: {
    title: "Watch it happen on Gemini",
    intro:
      "This is a mini-movie of the real Gemini website — watch how a prompt turns into music!",
    stepDuration: 2200,
    steps: [
      {
        id: "open",
        label: "Open Gemini",
        screen: "home",
        caption: "First you land on gemini.google.com…",
      },
      {
        id: "type",
        label: "Write your prompt",
        screen: "prompt-full",
        tokens: FULL_PROMPT_TOKENS,
        caption: "Type a detailed recipe — genre, mood, and a fun detail!",
        cursor: { x: "60%", y: "60%" },
      },
      {
        id: "send",
        label: "Press send",
        screen: "prompt-full",
        tokens: FULL_PROMPT_TOKENS,
        caption: "Tap the arrow and Gemini gets to work…",
        cursor: { x: "87%", y: "60%" },
      },
      {
        id: "wait",
        label: "Gemini composes",
        screen: "loading",
        caption: "Sparkles mean it's cooking up your track!",
      },
      {
        id: "listen",
        label: "Listen!",
        screen: "result",
        resultData: { title: "Percy's Surf Anthem.mp3" },
        caption: "Boom — a real song appears. You can play and save it!",
        cursor: { x: "55%", y: "55%" },
      },
    ],
  },

  mascotLines: {
    cartoon:
      "Let me tell you a quick story about how we brought music back to the Neon Woods!",
    sandbox:
      "Your turn to be the DJ! Pick a vibe, hit Generate, and hear what Gemini would make.",
    sandboxResult: "Whoa — that's YOUR track! Try another preset if you want.",
    videoShowcase:
      "Now watch this mini-movie — it's the exact Gemini screen you'll use for real.",
    vocab:
      "Before we prompt, let's learn 3 magic words AI creators use — tap each card to flip it!",
    compare: "Quick challenge! Which prompt do YOU think makes a richer song?",
    compareReveal:
      "See the difference? More detail makes a fuller, richer song.",
    gallery: "Check out songs other AI Summer campers dreamed up!",
    practice:
      "Let's make sure those words stuck — tap a word, then tap the category it belongs to.",
    practiceCorrect: ["Yes! Exactly right.", "Nailed it!", "You've got this!"],
    practiceWrong: [
      "Not quite — try again!",
      "So close! Give it another shot.",
    ],
    builder: "Now it's YOUR turn — build a prompt recipe from scratch.",
    mission: "Time for your real mission — go make an actual song on Gemini!",
    launchWaiting: "Take your time — I'll be right here cheering you on 🎿",
  },
};

export default day1GeminiSong;
