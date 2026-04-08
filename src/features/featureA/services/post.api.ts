import { customAxiosInstance } from "@/config/axios.config";
import z from "zod";
import { CreatePostDto, Post, UpdatePostDto } from "../types/post.types";
import { postSchema } from "../schemas/post.schema";
import { OptionalConfig } from "@/types/axios.types";
import { ApiResponse } from "@/types/api.types";
import { apiResponseSchema } from "@/schemas/api.schemas";

export const postsApi = {
  getAll: async (
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post[]>> => {
    const response = await customAxiosInstance<ApiResponse<Post[]>>(
      { url: "/posts", method: "GET" },
      optionalAxiosConfig,
    );
    return apiResponseSchema(z.array(postSchema)).parse(response);
  },

  getById: async (
    id: number,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post>> => {
    const response = await customAxiosInstance<ApiResponse<Post>>(
      { url: `/posts/${id}`, method: "GET" },
      optionalAxiosConfig,
    );
    return apiResponseSchema(postSchema).parse(response);
  },

  create: async (
    body: CreatePostDto,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post>> => {
    const response = await customAxiosInstance<ApiResponse<Post>>(
      { url: "/posts", method: "POST", data: body },
      optionalAxiosConfig,
    );
    return apiResponseSchema(postSchema).parse(response);
  },

  patch: async (
    id: number,
    body: UpdatePostDto,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<ApiResponse<Post>> => {
    const response = await customAxiosInstance<ApiResponse<Post>>(
      { url: `/posts/${id}`, method: "PATCH", data: body },
      optionalAxiosConfig,
    );
    return apiResponseSchema(postSchema).parse(response);
  },

  delete: async (
    id: number,
    optionalAxiosConfig?: OptionalConfig,
  ): Promise<void> => {
    await customAxiosInstance<unknown>(
      { url: `/posts/${id}`, method: "DELETE" },
      optionalAxiosConfig,
    );
  },
};
