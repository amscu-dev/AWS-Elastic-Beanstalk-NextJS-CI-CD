import { z } from "zod";

// Schema de baza
const postSchema = z.object({
  completed: z.boolean(),
  userId: z.number(),
  title: z.string(),
  id: z.number(),
});

// DTO creare — fara id (generat de server)
const createPostSchema = postSchema.omit({ id: true });

// DTO update — toate campurile optionale (patch partial)
const updatePostSchema = postSchema.omit({ id: true }).partial();

export { createPostSchema, updatePostSchema, postSchema };
