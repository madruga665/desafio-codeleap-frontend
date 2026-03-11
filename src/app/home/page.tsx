import { PostForm } from "@/src/components/post-form/post-form";
import { Heading1 } from "@/src/components/typography/heading/heading1";
import { Metadata } from "next";
import { postsService } from "@/src/services/posts.service";
import { PostContainer } from "@/src/components/post-container/post-container";
import { PostsEmptyState } from "@/src/components/posts-empty-state/posts-empty-state";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: 'CodeLeap Network | home',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await postsService.getPaginatedPosts(10, 0, '');


  return (
    <>
      <section className="flex flex-col w-[90%] max-w-188 bg-white border border-[#999999] p-6 rounded-2xl gap-6">
        <Heading1 >What’s on your mind?</Heading1>
        <PostForm />
      </section>

      <section className="flex flex-col w-[90%] max-w-188 gap-6">
        {data.posts.length === 0 ? (
          <PostsEmptyState />
        ) : (
          data.posts.map((item) => (
            <PostContainer
              id={item.id}
              content={item.content}
              title={item.title}
              key={item.id}
              createdAt={item.createdAt}
              username={item.username}
            />
          ))
        )}
      </section>
    </>
  )
}
