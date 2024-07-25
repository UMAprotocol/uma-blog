import { PropsWithChildren } from "react";

export function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-lg w-full leading-6 text-text/75 tracking-widest font-normal">
      {children}
    </p>
  );
}
