export const postQueryKeys = {
  all: () => ["posts"] as const,
  byId: (id: number) => ["posts", id] as const,
  create: () => ["posts-create"] as const,
  patch: () => ["posts-patch"] as const,
  delete: () => ["posts-delete"] as const,
};
