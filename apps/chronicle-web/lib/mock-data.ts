export type Memory = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  context: string;
  tags: string[];
  source: string;
};

export type Observation = {
  id: string;
  title: string;
  confidence: number;
  summary: string;
  evidence: string[];
  relatedMemoryIds: string[];
  persona: "Historian" | "Editor" | "Skeptic";
};

export type Hypothesis = {
  id: string;
  title: string;
  confidence: number;
  summary: string;
  evidenceCount: string;
  evidence: string[];
};

export type OpenQuestion = {
  id: string;
  question: string;
  memoryIds: string[];
  tone: string;
};

export type Contradiction = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  detail: string;
  evidence: string[];
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  confidence: number;
  relatedIds: string[];
};

export type Chapter = {
  id: string;
  part: string;
  title: string;
  subtitle: string;
  sections: {
    heading: string;
    body: string[];
    citations: string[];
  }[];
};

export const memories: Memory[] = [
  {
    id: "mem-12",
    date: "Age 12",
    title: "Learning to program alone",
    excerpt: "I taught myself programming because nobody taught me.",
    context:
      "A secondhand desktop in a quiet room, a stack of printed tutorials, and long evenings of trial and error.",
    tags: ["independence", "learning", "technology"],
    source: "Notebook entry"
  },
  {
    id: "mem-18",
    date: "Age 14",
    title: "Fixing the school computer",
    excerpt: "The lab teacher let me keep the machine running after class.",
    context:
      "A school computer lab where the subject became the unofficial person to ask when machines stopped behaving.",
    tags: ["competence", "trust", "service"],
    source: "Interview 3"
  },
  {
    id: "mem-31",
    date: "Age 19",
    title: "First leadership role",
    excerpt: "I said yes before I had the confidence to say yes.",
    context:
      "A student organization elected the subject into a leadership position they had privately avoided for months.",
    tags: ["leadership", "ambition", "anxiety"],
    source: "Memory archive"
  },
  {
    id: "mem-44",
    date: "Age 27",
    title: "Leaving a stable job",
    excerpt: "I wanted more agency than the title gave me.",
    context:
      "A career pivot driven by discomfort with being managed more than by a desire for prestige.",
    tags: ["autonomy", "career", "risk"],
    source: "Chapter draft"
  },
  {
    id: "mem-58",
    date: "Age 34",
    title: "Teaching a sibling to code",
    excerpt: "You don't need permission to begin."
    ,
    context:
      "A late-night session at a kitchen table where the subject taught a younger sibling their first programming steps.",
    tags: ["teaching", "family", "agency"],
    source: "Interview 8"
  }
];

export const observations: Observation[] = [
  {
    id: "obs-14",
    title: "The subject repeatedly chooses independence over certainty.",
    confidence: 78,
    summary:
      "Across childhood and career decisions, the subject tends to act when they can claim agency, even if the outcome is uncertain.",
    evidence: ["Memory 12", "Interview 3", "Chapter 1"],
    relatedMemoryIds: ["mem-12", "mem-18", "mem-44"],
    persona: "Historian"
  },
  {
    id: "obs-15",
    title: "Self-teaching is not a phase; it is a default posture.",
    confidence: 82,
    summary:
      "The record shows repeated moments where the subject learns by building, repairing, or experimenting before asking for instruction.",
    evidence: ["Memory 12", "Memory 18", "Interview 8"],
    relatedMemoryIds: ["mem-12", "mem-18", "mem-58"],
    persona: "Editor"
  },
  {
    id: "obs-16",
    title: "Recognition appears secondary to usefulness.",
    confidence: 74,
    summary:
      "The subject often accepts responsibility when the work needs doing, but seems less motivated by visibility than by usefulness.",
    evidence: ["Memory 31", "Memory 44"],
    relatedMemoryIds: ["mem-31", "mem-44"],
    persona: "Skeptic"
  }
];

export const hypotheses: Hypothesis[] = [
  {
    id: "hyp-4",
    title: "Recognition appears less important than autonomy.",
    confidence: 74,
    summary:
      "The subject is energized by latitude, not applause. Roles seem attractive when they offer room to shape the work.",
    evidenceCount: "12 memories, 4 interviews",
    evidence: ["Memory 12", "Memory 31", "Interview 8"]
  },
  {
    id: "hyp-5",
    title: "Competence became a form of safety.",
    confidence: 69,
    summary:
      "Learning quickly and becoming useful early may have created a durable sense of security for the subject.",
    evidenceCount: "8 memories, 2 chapters",
    evidence: ["Memory 18", "Chapter 1"]
  },
  {
    id: "hyp-6",
    title: "Leadership is tolerated when it protects mission clarity.",
    confidence: 63,
    summary:
      "The subject may dislike management in the abstract but accepts leadership when it preserves direction or shields others.",
    evidenceCount: "5 memories, 3 interviews",
    evidence: ["Memory 31", "Interview 3", "Interview 8"]
  }
];

export const openQuestions: OpenQuestion[] = [
  {
    id: "q-1",
    question:
      "Who first noticed the subject's persistence before the subject had language for it?",
    memoryIds: ["mem-12", "mem-18"],
    tone: "Warm, reflective"
  },
  {
    id: "q-2",
    question:
      "Why does the subject repeatedly accept leadership positions while describing dislike for management?",
    memoryIds: ["mem-31", "mem-44"],
    tone: "Investigative"
  },
  {
    id: "q-3",
    question:
      "What did the subject lose, or think they would lose, by waiting for instruction?",
    memoryIds: ["mem-12", "mem-58"],
    tone: "Skeptical"
  }
];

export const contradictions: Contradiction[] = [
  {
    id: "c-1",
    title: "Claims to dislike leadership, but repeatedly steps into it.",
    severity: "Medium",
    detail:
      "The subject describes management as draining, yet the record shows multiple moments of voluntary responsibility.",
    evidence: ["Memory 31", "Memory 44", "Interview 3"]
  },
  {
    id: "c-2",
    title: "Describes being self-taught, but also cites several mentors.",
    severity: "Low",
    detail:
      "The story leans on self-reliance, yet the notebooks reveal a web of informal support and occasional guidance.",
    evidence: ["Memory 12", "Interview 8"]
  }
];

export const themes: Theme[] = [
  {
    id: "theme-1",
    name: "Autonomy",
    description:
      "Freedom to decide, explore, and fix things without waiting for permission.",
    confidence: 86,
    relatedIds: ["obs-14", "hyp-4", "mem-44"]
  },
  {
    id: "theme-2",
    name: "Self-Teaching",
    description:
      "The subject learns by doing, then refines through repetition and reflection.",
    confidence: 84,
    relatedIds: ["obs-15", "mem-12", "mem-58"]
  },
  {
    id: "theme-3",
    name: "Useful Leadership",
    description:
      "The subject accepts responsibility when it helps others or clarifies the work.",
    confidence: 71,
    relatedIds: ["obs-16", "hyp-6", "mem-31"]
  }
];

export const chapters: Chapter[] = [
  {
    id: "chapter-1",
    part: "Part I",
    title: "Learning Alone",
    subtitle: "The first chapter of Chronicle's memoir draft",
    sections: [
      {
        heading: "Chapter 1",
        body: [
          "The first computer I remember was not a gift so much as a challenge. It arrived with instructions that were incomplete, and from the beginning the subject treated that incompleteness as an invitation.",
          "There is a pattern here that will matter later: when the subject wants something badly enough, waiting for permission becomes less appealing than figuring it out by hand.",
          "That habit is not just technical. It shows up in school, in work, and in the way the subject narrates themself. The record keeps returning to the same sentence in different forms: I learned by doing because nobody was going to do it for me."
        ],
        citations: ["Memory 12", "Observation 14", "Interview 3"]
      },
      {
        heading: "Chapter 2",
        body: [
          "In adolescence, usefulness became a kind of social language. The subject earned trust not by insisting on authority, but by making broken things less broken.",
          "That role would repeat: the helper, the fixer, the person who could hold a system together long enough for everyone else to breathe."
        ],
        citations: ["Memory 18", "Observation 15"]
      }
    ]
  },
  {
    id: "chapter-2",
    part: "Part II",
    title: "Choosing Responsibility",
    subtitle: "A later chapter draft about leadership and reluctance",
    sections: [
      {
        heading: "Chapter 1",
        body: [
          "Leadership never appears as a dream in the archives. It appears as an obligation the subject accepts because the room needs someone who can make the decision.",
          "The interesting part is not the decision itself. It is the refusal to romanticize it."
        ],
        citations: ["Memory 31", "Memory 44", "Hypothesis 4"]
      }
    ]
  }
];

export const editorDraft = {
  title: "Today’s memory",
  prompt:
    "What happened when you first realized you could teach yourself without waiting for anyone?",
  body:
    "I taught myself programming because nobody taught me. That sentence still feels true, but the memory around it is bigger than the sentence. It was a room, a machine, a stack of printouts, and the feeling that the path forward might be clumsy but still mine.",
  notes:
    "Chronicle should surface the pattern, not interrupt the story. Keep the tone reflective and specific."
};
