import { z } from "zod";

import { metaSchema } from "@/schemas/api.schemas";

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  code: string;
}
interface ApiResponse<T> {
  meta: ApiMeta;
  data: T;
}

type ApiMeta = z.infer<typeof metaSchema>;

export type { ApiErrorResponse, ApiResponse, ApiMeta };
