import { useState } from "react";

type Status = "SUCCESS" | "FAIL" | "PENDING" | "IDLE";

export function useStatus(initialStatus: Status = "IDLE") {
  return useState<Status>(initialStatus);
}
