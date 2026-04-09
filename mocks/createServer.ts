import { setupServer } from "msw/node";

import { http, HttpResponse, HttpMethods, JsonBodyType } from "msw";

type SupportedMethod = Lowercase<HttpMethods>;

interface HandlerConfig {
  path: string;
  method?: SupportedMethod;
  // res primește requestul și returnează orice vrei să mocku iești
  res: (info: { request: Request }) => JsonBodyType;
  // opțional: status code (default 200)
  status?: number;
}

export function createServer(handlerConfigs: HandlerConfig[]) {
  const handlers = handlerConfigs.map((config) => {
    const method = config.method ?? "get";

    // http['get'](path, handler) — MSW v2 syntax
    return http[method](config.path, ({ request }) => {
      return HttpResponse.json(config.res({ request }), {
        status: config.status ?? 200,
      });
    });
  });

  const server = setupServer(...handlers);

  // Lifecycle — se apelează automat în fișierul de test care cheamă createServer()
  beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // Returnăm server-ul în caz că vrei să adaugi handlere dinamice în test
  return server;
}
