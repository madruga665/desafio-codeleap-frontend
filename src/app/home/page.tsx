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
  // Buscamos os dados diretamente do Service no Server Component (sem requisição HTTP interna!)
  const data = await postsService.getPaginatedPosts(10, 0, '');
  
  // Formatamos as datas no servidor
  const posts = data.results.map(item => ({
    ...item,
    createdAt: formatDistanceToNow(new Date(item.created_datetime), { addSuffix: true })
  }));

  return (
    <>
      <section className="flex flex-col w-[90%] max-w-188 bg-white border border-[#999999] p-6 rounded-2xl gap-6">
        <Heading1 >What’s on your mind?</Heading1>
        <PostForm />
      </section>

      <section className="flex flex-col w-[90%] max-w-188 gap-6">
        {posts.length === 0 ? (
          <PostsEmptyState />
        ) : (
          posts.map((item) => (
            <PostContainer
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
