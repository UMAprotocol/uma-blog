"use client";
import { useTheme } from "next-themes";
import { Prism } from "react-syntax-highlighter";
import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeProps = {
  codeString: string;
  language: string;
};

export function Code({ codeString, language }: CodeProps) {
  const { resolvedTheme } = useTheme();

  const codeTheme = resolvedTheme === "dark" ? styles.oneDark : styles.oneLight;

  return (
    <Prism
      customStyle={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: "12px",
        padding: "12px",
        fontSize: "14px",
        border: "1px solid hsl(var(--text-primary) / 0.03) !important",
      }}
      wrapLines
      language={language}
      style={codeTheme}
    >
      {codeString}
    </Prism>
  );
}
