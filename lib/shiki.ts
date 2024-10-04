import { createHighlighter, Highlighter } from "shiki";

const initializeHighlighter = createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: [
    "javascript",
    "solidity",
    "typescript",
    "css",
    "graphql",
    "json",
    "tsx",
    "jsx",
    "python",
    "bash",
    "shell",
    "yaml",
    "rust",
  ],
});

// singleton
let highlighter: Highlighter | undefined;

export async function highlight(code: string, language: string) {
  if (!highlighter) {
    highlighter = await initializeHighlighter;
  }
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
