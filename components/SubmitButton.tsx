"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

type SubmitButtonProps = ButtonProps & {
  pendingLabel?: React.ReactNode; // can be spinner or whatever
};

export function SubmitButton({
  children,
  pendingLabel = "submitting...",
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
