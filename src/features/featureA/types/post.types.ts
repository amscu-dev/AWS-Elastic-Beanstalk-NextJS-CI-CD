import z from "zod";
import {
  createPostSchema,
  postSchema,
  updatePostSchema,
} from "../schemas/post.schema";

// Tipuri derivate din scheme
export type Post = z.infer<typeof postSchema>;
export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
