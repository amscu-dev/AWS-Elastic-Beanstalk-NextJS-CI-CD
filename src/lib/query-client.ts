import { environmentManager, QueryClient } from "@tanstack/react-query";

import queryClientConfig from "@/config/react-query.config";

function makeQueryClient() {
  return new QueryClient(queryClientConfig);
}

let browserQueryClient: QueryClient | undefined;

export default function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- more verbose this way
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
