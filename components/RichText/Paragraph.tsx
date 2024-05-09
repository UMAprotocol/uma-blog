import { PropsWithChildren } from "react";

export function Paragraph({ children }: PropsWithChildren) {
  return <p className="text-md text-text-secondary">{children}</p>;
}
