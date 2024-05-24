import { PropsWithChildren } from "react";

export function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-lg w-full leading-6 text-text/75 tracking-wider font-light">
      {children}
    </p>
  );
}
