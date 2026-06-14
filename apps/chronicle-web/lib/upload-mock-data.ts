export type UploadFile = {
  id: string;
  fileName: string;
  format: "txt" | "md" | "pdf" | "docx";
  size: string;
  status: "Queued" | "Extracted" | "Chunked" | "Complete";
  memories: number;
  observations: number;
  hypotheses: number;
  themes: string[];
  note: string;
};

export const uploadFiles: UploadFile[] = [
  {
    id: "career-history",
    fileName: "career-history.pdf",
    format: "pdf",
    size: "4.2 MB",
    status: "Complete",
    memories: 34,
    observations: 6,
    hypotheses: 2,
    themes: ["Independence", "Teaching", "Building Systems"],
    note: "Chronicle recognized recurring autonomy, service, and systems thinking."
  },
  {
    id: "family-letter",
    fileName: "family-letter.md",
    format: "md",
    size: "18 KB",
    status: "Chunked",
    memories: 8,
    observations: 2,
    hypotheses: 1,
    themes: ["Belonging", "Memory"],
    note: "Local extraction found a reflective personal letter with clean paragraph structure."
  },
  {
    id: "notes-1998",
    fileName: "notes-1998.txt",
    format: "txt",
    size: "74 KB",
    status: "Extracted",
    memories: 5,
    observations: 1,
    hypotheses: 0,
    themes: ["Routine", "Work"],
    note: "Chronicle is still splitting a dense plain-text notebook export."
  }
];

export const uploadHighlights = [
  {
    label: "Artifact registration",
    description: "File captured, named, and assigned provenance metadata."
  },
  {
    label: "Text extraction",
    description: "Local parsing only. No OCR. No audio transcription."
  },
  {
    label: "Chunk creation",
    description: "Page-aware chunks preserve file name, page number, and chunk number."
  },
  {
    label: "Memory creation",
    description: "Memory candidates are generated with provenance references."
  }
];
