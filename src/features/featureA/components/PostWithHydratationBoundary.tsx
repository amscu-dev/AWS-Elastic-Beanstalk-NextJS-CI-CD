// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Post from "./Post";
import getQueryClient from "@/lib/queryClient";
import { postsApi } from "../services/post.api";
import { postQueryKeys } from "../services/post.queryKeys";

export default async function PostWithHydratationBoundary() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: postQueryKeys.byId(1),
      queryFn: () => postsApi.getById(1),
    });
  } catch {
    // return <p>error...</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post id={1} />
    </HydrationBoundary>
  );
}
