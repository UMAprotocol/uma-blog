import { highlight } from "@/lib/shiki";

type CodeProps = {
  codeString: string;
  language: string;
};

export async function Code({ codeString, language }: CodeProps) {
  const out = await highlight(codeString, language);

  return (
    <div
      className="w-full [&>pre]:w-full [&>pre]:py-5 [&>pre]:px-4 [&>pre]:rounded-sm [&>pre]:w-full-max-w-[100%] [&>pre]:overflow-x-scroll"
      dangerouslySetInnerHTML={{ __html: out }}
    />
  );
}
