import type { ReactNode } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

interface Properties {
  children: ReactNode;
}

export default function NuqsProvider({ children }: Properties) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
