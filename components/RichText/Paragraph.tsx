import { PropsWithChildren } from "react";

export function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-md smoo text-text/75 tracking-wider font-light">
      {children}
    </p>
  );
}
