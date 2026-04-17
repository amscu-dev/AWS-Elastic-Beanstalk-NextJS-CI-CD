import { z } from "zod";

// Sub-scheme
const paginationSchema = z.object({
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  totalPages: z.number(),
  pageSize: z.number(),
  total: z.number(),
  page: z.number(),
});

const rateLimitSchema = z.object({
  resetAt: z.iso.datetime(),
  remaining: z.number(),
  limit: z.number(),
});

const metaSchema = z.object({
  pagination: paginationSchema.optional(),
  timestamp: z.iso.datetime().optional(),
  processingTime: z.number().optional(),
  rateLimit: rateLimitSchema.optional(),
  apiVersion: z.string().optional(),
  traceId: z.string().optional(),
  requestId: z.string(),
});

// Schema factory with generic — receives the data schema as parameter
const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: metaSchema,
  });

export { apiResponseSchema, metaSchema };
