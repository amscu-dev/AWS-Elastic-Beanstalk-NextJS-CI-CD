import { z } from "zod";

import {
  createPostSchema,
  updatePostSchema,
  postSchema,
} from "../schemas/post.schema";

type CreatePostDto = z.infer<typeof createPostSchema>;
type UpdatePostDto = z.infer<typeof updatePostSchema>;
// Tipuri derivate din scheme
type Post = z.infer<typeof postSchema>;

export type { CreatePostDto, UpdatePostDto, Post };
