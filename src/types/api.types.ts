import { z } from "zod";

import { metaSchema } from "@/schemas/api.schemas";

type ApiErrorResponse = {
  statusCode: number;
  message: string;
  code: string;
};

type ApiResponse<T> = {
  meta: z.infer<typeof metaSchema>;
  data: T;
};

export type { ApiErrorResponse, ApiResponse };
